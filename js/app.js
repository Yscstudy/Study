/* ============================================================
   学习助手 — 主应用逻辑
   ============================================================ */

// 合并所有数据源
if (typeof PROB_STAT_KNOWLEDGE !== 'undefined') {
  KNOWLEDGE_DATA.push(...PROB_STAT_KNOWLEDGE);
}
if (typeof PROB_STAT_QUESTIONS !== 'undefined') {
  QUIZ_DATA.push(...PROB_STAT_QUESTIONS);
}

const App = {
  currentTab: 'review',
  quizState: null,

  init() {
    this.bindTabs();
    this.renderKnowledge();
    this.renderQuizCategories();
  },

  // ==================== 标签页 ====================
  bindTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => this.switchTab(btn.dataset.tab));
    });
  },

  switchTab(tab) {
    this.currentTab = tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.tab-btn[data-tab="' + tab + '"]').classList.add('active');
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.getElementById('panel-' + tab).classList.add('active');
    if (tab === 'quiz') {
      if (!this.quizState || this.quizState.phase === 'done') {
        document.getElementById('quiz-select').style.display = 'block';
        document.getElementById('quiz-active').style.display = 'none';
      }
    }
  },

  // ==================== 知识复习 ====================
  renderKnowledge(filterCat, searchTerm) {
    filterCat = filterCat || '全部';
    searchTerm = searchTerm || '';
    const list = document.getElementById('knowledge-list');
    const categories = ['全部'].concat([...new Set(KNOWLEDGE_DATA.map(function(k) { return k.category; }))]);

    const filterEl = document.getElementById('category-filters');
    filterEl.innerHTML = categories.map(function(cat) {
      return '<span class="cat-chip' + (cat === filterCat ? ' active' : '') + '" data-cat="' + cat + '">' + cat + '</span>';
    }).join('');

    filterEl.querySelectorAll('.cat-chip').forEach(function(chip) {
      chip.addEventListener('click', function() {
        filterEl.querySelectorAll('.cat-chip').forEach(function(c) { c.classList.remove('active'); });
        chip.classList.add('active');
        App.renderKnowledge(chip.dataset.cat, searchTerm);
      });
    });

    var items = KNOWLEDGE_DATA;
    if (filterCat !== '全部') items = items.filter(function(k) { return k.category === filterCat; });
    if (searchTerm) {
      var kw = searchTerm.toLowerCase();
      items = items.filter(function(k) {
        return k.title.toLowerCase().indexOf(kw) >= 0 || k.content.toLowerCase().indexOf(kw) >= 0 || k.category.toLowerCase().indexOf(kw) >= 0;
      });
    }

    if (items.length === 0) {
      list.innerHTML = '<div class="empty-state"><div class="empty-icon">📭</div><p>没有找到匹配的知识点</p></div>';
      return;
    }

    list.innerHTML = items.map(function(k) {
      return '<div class="knowledge-card" data-id="' + k.id + '"><div class="card-header"><span class="arrow">▶</span><span class="cat-badge">' + k.category + '</span><span class="title">' + k.title + '</span></div><div class="card-body">' + k.content + '</div></div>';
    }).join('');

    list.querySelectorAll('.card-header').forEach(function(header) {
      header.addEventListener('click', function() {
        var card = header.parentElement;
        card.classList.toggle('open');
      });
    });
  },

  // ==================== 刷题 ====================
  renderQuizCategories() {
    var container = document.getElementById('quiz-select');
    var cats = {};
    QUIZ_DATA.forEach(function(q) {
      if (!cats[q.category]) cats[q.category] = [];
      cats[q.category].push(q);
    });

    // Count subtypes for display
    var subtypeCounts = { '选择': 0, '填空': 0, '计算': 0, '证明': 0 };
    QUIZ_DATA.forEach(function(q) {
      if (q.subtype && subtypeCounts[q.subtype] !== undefined) subtypeCounts[q.subtype]++;
    });

    var emojis = { '概率统计': '📊' };
    var catCards = Object.entries(cats).map(function(entry) {
      var cat = entry[0], qs = entry[1];
      return '<div class="quiz-cat-card" data-cat="' + cat + '"><div class="cat-icon">' + (emojis[cat] || '📚') + '</div><div class="cat-name">' + cat + '</div><div class="cat-count">' + qs.length + ' 道题 | 选择' + subtypeCounts['选择'] + ' 填空' + subtypeCounts['填空'] + ' 计算' + subtypeCounts['计算'] + ' 证明' + subtypeCounts['证明'] + '</div></div>';
    }).join('');

    container.innerHTML = '<h3 style="margin-bottom:16px;">📝 选择刷题分类</h3><div class="quiz-categories">' + catCards + '<div class="quiz-cat-card" data-cat="__all__"><div class="cat-icon">🔥</div><div class="cat-name">全部题目</div><div class="cat-count">' + QUIZ_DATA.length + ' 道题</div></div></div>';

    container.querySelectorAll('.quiz-cat-card').forEach(function(card) {
      card.addEventListener('click', function() { App.startQuiz(card.dataset.cat); });
    });
  },

  startQuiz(category) {
    var questions = category === '__all__' ? QUIZ_DATA.slice() : QUIZ_DATA.filter(function(q) { return q.category === category; });

    // 保持原始顺序（不随机打乱）
    this.quizState = {
      phase: 'active',
      questions: questions,
      currentIndex: 0,
      answers: {},
      revealed: {}
    };

    document.getElementById('quiz-select').style.display = 'none';
    document.getElementById('quiz-active').style.display = 'block';
    this.renderQuizQuestion();
  },

  // ---- 题目导航栏渲染 ----
  _renderNavigator(state, total, idx) {
    var html = '<div class="q-nav"><div class="q-nav-title">📋 题目导航</div><div class="q-nav-grid">';
    for (var i = 0; i < total; i++) {
      var q = state.questions[i];
      var cls = 'q-nav-item';
      if (i === idx) cls += ' current';
      else if (q.id in state.revealed) {
        cls += (App._isAnswerCorrect(q) ? ' correct' : ' wrong');
      } else if (q.id in state.answers) {
        cls += ' answered';
      }
      // Show subtype abbreviation
      var label = (q.subtype || '选')[0];
      html += '<span class="' + cls + '" data-idx="' + i + '" title="第' + (i+1) + '题 - ' + (q.subtype||'选择') + '">' + (i+1) + '<small>' + label + '</small></span>';
    }
    html += '</div></div>';
    return html;
  },

  renderQuizQuestion() {
    var state = this.quizState;
    var total = state.questions.length;
    var idx = state.currentIndex;
    if (idx >= total) { this.showQuizResult(); return; }

    var q = state.questions[idx];
    var answered = q.id in state.answers;
    var revealed = q.id in state.revealed;
    var answeredCount = Object.keys(state.answers).length;
    var pct = Math.round((answeredCount / total) * 100);

    document.getElementById('quiz-progress-fill').style.width = pct + '%';
    document.getElementById('quiz-progress-text').textContent = (idx + 1) + ' / ' + total + '  ·  已答 ' + answeredCount + ' 题';

    var subtypeColors = { '选择': 'single', '填空': 'fill', '计算': 'calc', '证明': 'proof' };
    var subtypeClass = subtypeColors[q.subtype] || 'single';

    var navHtml = this._renderNavigator(state, total, idx);

    var multiHint = '';
    var optHtml = q.options.map(function(opt, i) {
      var optClass = '';
      if (revealed) {
        var isCorrect = (Array.isArray(q.answer) ? q.answer.indexOf(i) >= 0 : q.answer === i);
        if (isCorrect) optClass = 'correct';
        else if (App._isSelected(q, i)) optClass = 'wrong';
      } else if (App._isSelected(q, i)) {
        optClass = 'selected';
      }
      return '<div class="option-item ' + optClass + '" data-idx="' + i + '"><span class="opt-marker">' + String.fromCharCode(65 + i) + '</span><span>' + opt + '</span></div>';
    }).join('');

    var explHtml = '';
    if (revealed) {
      explHtml = '<div class="explanation-box show ' + (App._isAnswerCorrect(q) ? 'correct-answer' : 'wrong-answer') + '"><div class="exp-title">' + (App._isAnswerCorrect(q) ? '✅ 回答正确！' : '❌ 回答错误') + '</div><div class="exp-text">' + q.explanation + '</div></div>';
    }

    var actionsHtml = '';
    if (!revealed) {
      actionsHtml += '<button class="btn btn-primary" id="btn-submit"' + (!answered ? ' disabled' : '') + '>✓ 提交答案</button>';
    }
    if (idx > 0) actionsHtml += '<button class="btn btn-outline" id="btn-prev">◀ 上一题</button>';
    if (idx < total - 1) actionsHtml += '<button class="btn btn-primary" id="btn-next">下一题 ▶</button>';
    if (idx === total - 1 && revealed) actionsHtml += '<button class="btn btn-success" id="btn-finish">🏁 查看成绩</button>';
    actionsHtml += '<button class="btn btn-outline" id="btn-back">↩ 返回分类</button>';

    var container = document.getElementById('quiz-active');
    container.innerHTML = navHtml + '<div class="question-card"><div class="q-header"><span class="q-num">' + (idx + 1) + '</span><span class="q-type-badge ' + subtypeClass + '">' + (q.subtype || '选择') + '题</span><span style="font-size:.8rem;color:var(--text-secondary);">' + q.category + '</span>' + multiHint + '</div><div class="q-text">' + q.question + '</div><div class="options-list">' + optHtml + '</div>' + explHtml + '<div class="question-actions">' + actionsHtml + '</div></div>';

    this.bindQuizEvents(q, idx);
    this._bindNavEvents(state, total);
  },

  _bindNavEvents(state, total) {
    var self = this;
    document.querySelectorAll('.q-nav-item').forEach(function(item) {
      item.addEventListener('click', function() {
        var targetIdx = parseInt(this.dataset.idx);
        state.currentIndex = targetIdx;
        self.renderQuizQuestion();
        // Scroll to top of question
        document.querySelector('.question-card').scrollIntoView({ behavior: 'smooth' });
      });
    });
  },

  bindQuizEvents(q, idx) {
    var container = document.getElementById('quiz-active');
    var self = this;
    var state = this.quizState;

    if (!(q.id in state.revealed)) {
      container.querySelectorAll('.option-item').forEach(function(opt) {
        opt.addEventListener('click', function() {
          var i = parseInt(this.dataset.idx);
          state.answers[q.id] = i;
          self.renderQuizQuestion();
        });
      });
    }

    var submitBtn = container.querySelector('#btn-submit');
    if (submitBtn) {
      submitBtn.addEventListener('click', function() {
        state.revealed[q.id] = true;
        self.renderQuizQuestion();
      });
    }

    var prevBtn = container.querySelector('#btn-prev');
    if (prevBtn) prevBtn.addEventListener('click', function() { state.currentIndex--; self.renderQuizQuestion(); });
    var nextBtn = container.querySelector('#btn-next');
    if (nextBtn) nextBtn.addEventListener('click', function() { state.currentIndex++; self.renderQuizQuestion(); });
    var finishBtn = container.querySelector('#btn-finish');
    if (finishBtn) finishBtn.addEventListener('click', function() { self.showQuizResult(); });
    var backBtn = container.querySelector('#btn-back');
    if (backBtn) backBtn.addEventListener('click', function() { self.backToCategories(); });
  },

  showQuizResult() {
    var state = this.quizState;
    var total = state.questions.length;
    var correct = 0, wrong = 0, unanswered = 0;

    state.questions.forEach(function(q) {
      if (!(q.id in state.answers)) { unanswered++; return; }
      if (App._isAnswerCorrect(q)) correct++;
      else wrong++;
    });

    var score = total > 0 ? Math.round((correct / total) * 100) : 0;
    var emoji = score >= 90 ? '🎉' : score >= 70 ? '👍' : score >= 50 ? '📚' : '💪';

    state.phase = 'done';
    document.getElementById('quiz-progress-fill').style.width = '100%';
    document.getElementById('quiz-progress-text').textContent = '完成! 共 ' + total + ' 题';

    var container = document.getElementById('quiz-active');
    container.innerHTML = '<div class="quiz-result"><div class="result-icon">' + emoji + '</div><div class="result-score">' + score + ' 分</div><div class="result-text">' + total + ' 道题中答对 ' + correct + ' 道</div><div class="result-detail"><div class="stat-item"><div class="stat-val green">' + correct + '</div><div class="stat-label">✅ 正确</div></div><div class="stat-item"><div class="stat-val red">' + wrong + '</div><div class="stat-label">❌ 错误</div></div><div class="stat-item"><div class="stat-val amber">' + unanswered + '</div><div class="stat-label">⬜ 未答</div></div></div><div class="question-actions" style="justify-content:center;"><button class="btn btn-primary" id="btn-retry">🔄 重新刷题</button><button class="btn btn-outline" id="btn-back2">↩ 返回分类</button></div></div>';

    container.querySelector('#btn-retry').addEventListener('click', function() {
      App.startQuiz(state.questions[0] ? state.questions[0].category : '__all__');
    });
    container.querySelector('#btn-back2').addEventListener('click', function() { App.backToCategories(); });
  },

  backToCategories() {
    this.quizState = null;
    document.getElementById('quiz-select').style.display = 'block';
    document.getElementById('quiz-active').style.display = 'none';
    document.getElementById('quiz-progress-fill').style.width = '0%';
    document.getElementById('quiz-progress-text').textContent = '选择一个分类开始刷题';
    this.renderQuizCategories();
  },

  _isSelected(q, optIdx) {
    var ans = this.quizState.answers[q.id];
    if (ans === undefined) return false;
    return ans === optIdx;
  },

  _isAnswerCorrect(q) {
    var ans = this.quizState.answers[q.id];
    if (ans === undefined) return false;
    return ans === q.answer;
  }
};

document.addEventListener('DOMContentLoaded', function() {
  App.init();
  var searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', function(e) {
    var activeCat = document.querySelector('#category-filters .cat-chip.active');
    var cat = activeCat ? activeCat.dataset.cat : '全部';
    App.renderKnowledge(cat, e.target.value);
  });
});
