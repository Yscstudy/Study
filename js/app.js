/* ============================================================
   学习助手 — 主应用逻辑
   ============================================================ */

// 合并所有数据源（若已加载概率统计数据则合并）
if (typeof PROB_STAT_KNOWLEDGE !== 'undefined') {
  KNOWLEDGE_DATA.push(...PROB_STAT_KNOWLEDGE);
}
if (typeof PROB_STAT_QUESTIONS !== 'undefined') {
  QUIZ_DATA.push(...PROB_STAT_QUESTIONS);
}

const App = {
  currentTab: 'review',   // 'review' | 'quiz'
  quizState: null,        // 刷题状态机

  // ---- 初始化 ----
  init() {
    this.bindTabs();
    this.renderKnowledge();
    this.renderQuizCategories();
  },

  // ==================== 标签页切换 ====================
  bindTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        this.switchTab(tab);
      });
    });
  },

  switchTab(tab) {
    this.currentTab = tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`.tab-btn[data-tab="${tab}"]`).classList.add('active');
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.getElementById(`panel-${tab}`).classList.add('active');

    if (tab === 'quiz') {
      // 如果正在刷题则保持状态，否则显示分类选择
      if (!this.quizState || this.quizState.phase === 'done') {
        document.getElementById('quiz-select').style.display = 'block';
        document.getElementById('quiz-active').style.display = 'none';
      }
    }
  },

  // ==================== 知识复习 ====================
  renderKnowledge(filterCat = '全部', searchTerm = '') {
    const list = document.getElementById('knowledge-list');
    const categories = ['全部', ...new Set(KNOWLEDGE_DATA.map(k => k.category))];

    // 渲染分类筛选按钮
    const filterEl = document.getElementById('category-filters');
    filterEl.innerHTML = categories.map(cat =>
      `<span class="cat-chip${cat === filterCat ? ' active' : ''}"
            data-cat="${cat}">${cat}</span>`
    ).join('');

    // 绑定分类点击
    filterEl.querySelectorAll('.cat-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        filterEl.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.renderKnowledge(chip.dataset.cat, searchTerm);
      });
    });

    // 筛选
    let items = KNOWLEDGE_DATA;
    if (filterCat !== '全部') items = items.filter(k => k.category === filterCat);
    if (searchTerm) {
      const kw = searchTerm.toLowerCase();
      items = items.filter(k =>
        k.title.toLowerCase().includes(kw) ||
        k.content.toLowerCase().includes(kw) ||
        k.category.toLowerCase().includes(kw)
      );
    }

    // 渲染
    if (items.length === 0) {
      list.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📭</div>
          <p>没有找到匹配的知识点</p>
        </div>`;
      return;
    }

    list.innerHTML = items.map(k => `
      <div class="knowledge-card" data-id="${k.id}">
        <div class="card-header">
          <span class="arrow">▶</span>
          <span class="cat-badge">${k.category}</span>
          <span class="title">${k.title}</span>
        </div>
        <div class="card-body">${k.content}</div>
      </div>
    `).join('');

    // 绑定折叠
    list.querySelectorAll('.card-header').forEach(header => {
      header.addEventListener('click', () => {
        const card = header.parentElement;
        card.classList.toggle('open');
        // MathJax 重新渲染展开的内容
        if (card.classList.contains('open') && window.MathJax) {
          MathJax.typesetPromise([card.querySelector('.card-body')]);
        }
      });
    });

    // MathJax 渲染可见内容
    if (window.MathJax) {
      MathJax.typesetPromise([list]);
    }
  },

  // ==================== 刷题 ====================
  renderQuizCategories() {
    const container = document.getElementById('quiz-select');
    const cats = {};
    QUIZ_DATA.forEach(q => {
      if (!cats[q.category]) cats[q.category] = [];
      cats[q.category].push(q);
    });

    const emojis = { '前端开发': '🎨', '计算机网络': '🌐', '算法与数据结构': '🧮', '数据库': '🗄️', '概率统计': '📊' };

    container.innerHTML = `
      <h3 style="margin-bottom:16px;">📝 选择刷题分类</h3>
      <div class="quiz-categories">
        ${Object.entries(cats).map(([cat, qs]) => `
          <div class="quiz-cat-card" data-cat="${cat}">
            <div class="cat-icon">${emojis[cat] || '📚'}</div>
            <div class="cat-name">${cat}</div>
            <div class="cat-count">${qs.length} 道题目</div>
          </div>
        `).join('')}
        <div class="quiz-cat-card" data-cat="__all__">
          <div class="cat-icon">🔥</div>
          <div class="cat-name">全部题目</div>
          <div class="cat-count">${QUIZ_DATA.length} 道题目</div>
        </div>
      </div>`;

    container.querySelectorAll('.quiz-cat-card').forEach(card => {
      card.addEventListener('click', () => {
        this.startQuiz(card.dataset.cat);
      });
    });
  },

  startQuiz(category) {
    const questions = category === '__all__'
      ? [...QUIZ_DATA]
      : QUIZ_DATA.filter(q => q.category === category);

    // 随机打乱
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }

    this.quizState = {
      phase: 'active',
      questions,
      currentIndex: 0,
      answers: {},    // { questionId: selectedAnswer }
      revealed: {},   // { questionId: true } — 已揭晓答案
    };

    document.getElementById('quiz-select').style.display = 'none';
    document.getElementById('quiz-active').style.display = 'block';
    this.renderQuizQuestion();
  },

  renderQuizQuestion() {
    const state = this.quizState;
    const total = state.questions.length;
    const idx = state.currentIndex;
    if (idx >= total) { this.showQuizResult(); return; }

    const q = state.questions[idx];
    const answered = q.id in state.answers;
    const revealed = q.id in state.revealed;

    // 更新进度
    const answeredCount = Object.keys(state.answers).length;
    const pct = Math.round((answeredCount / total) * 100);
    document.getElementById('quiz-progress-fill').style.width = pct + '%';
    document.getElementById('quiz-progress-text').textContent =
      `${idx + 1} / ${total}  ·  已答 ${answeredCount} 题`;

    const typeLabel = { single: '单选', multiple: '多选', judge: '判断' };
    const multiHint = q.type === 'multiple' ? '<span style="font-size:.78rem;color:var(--warning);">（可多选，点击选项切换选中状态）</span>' : '';

    const container = document.getElementById('quiz-active');
    container.innerHTML = `
      <div class="question-card">
        <div class="q-header">
          <span class="q-num">${idx + 1}</span>
          <span class="q-type-badge ${q.type}">${typeLabel[q.type]}</span>
          <span style="font-size:.8rem;color:var(--text-secondary);">${q.category}</span>
          ${multiHint}
        </div>
        <div class="q-text">${q.question}</div>
        <div class="options-list">
          ${q.options.map((opt, i) => {
            let optClass = '';
            if (revealed) {
              const isCorrect = Array.isArray(q.answer) ? q.answer.includes(i) : (q.type === 'judge' ? q.answer === (i === 0) : q.answer === i);
              if (isCorrect) optClass = 'correct';
              else if (this._isSelected(q, i)) optClass = 'wrong';
            } else if (this._isSelected(q, i)) {
              optClass = q.type === 'multiple' ? 'selected' : 'selected';
            }
            return `
              <div class="option-item ${optClass}" data-idx="${i}">
                <span class="opt-marker">${String.fromCharCode(65 + i)}</span>
                <span>${opt}</span>
              </div>`;
          }).join('')}
        </div>

        ${revealed ? `
          <div class="explanation-box show ${this._isAnswerCorrect(q) ? 'correct-answer' : 'wrong-answer'}">
            <div class="exp-title">${this._isAnswerCorrect(q) ? '✅ 回答正确！' : '❌ 回答错误'}</div>
            <div class="exp-text">${q.explanation}</div>
          </div>
        ` : ''}

        <div class="question-actions">
          ${!revealed ? `
            <button class="btn btn-primary" id="btn-submit" ${!answered ? 'disabled' : ''}>
              ✓ 提交答案
            </button>
          ` : ''}
          ${idx > 0 ? `<button class="btn btn-outline" id="btn-prev">◀ 上一题</button>` : ''}
          ${idx < total - 1 ? `<button class="btn btn-primary" id="btn-next">下一题 ▶</button>` : ''}
          ${idx === total - 1 && revealed ? `<button class="btn btn-success" id="btn-finish">🏁 查看成绩</button>` : ''}
          <button class="btn btn-outline" id="btn-back">↩ 返回分类</button>
        </div>
      </div>
    `;

    this.bindQuizEvents(q, idx);

    // MathJax 重新渲染题目中的公式
    if (window.MathJax) {
      MathJax.typesetPromise([container]);
    }
  },

  bindQuizEvents(q, idx) {
    const container = document.getElementById('quiz-active');

    // 选项点击（仅在未揭晓时）
    if (!(q.id in this.quizState.revealed)) {
      container.querySelectorAll('.option-item').forEach(opt => {
        opt.addEventListener('click', () => {
          const i = parseInt(opt.dataset.idx);
          if (q.type === 'multiple') {
            // 多选：切换
            let sel = this.quizState.answers[q.id];
            if (!Array.isArray(sel)) sel = [];
            const pos = sel.indexOf(i);
            if (pos >= 0) sel.splice(pos, 1);
            else sel.push(i);
            this.quizState.answers[q.id] = sel.length > 0 ? sel : undefined;
          } else if (q.type === 'judge') {
            this.quizState.answers[q.id] = i === 0; // true if first option
          } else {
            this.quizState.answers[q.id] = i;
          }
          this.renderQuizQuestion();
        });
      });
    }

    // 提交按钮
    const submitBtn = container.querySelector('#btn-submit');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        // 多选题未选择时提示
        if (q.type === 'multiple' && (!this.quizState.answers[q.id] || this.quizState.answers[q.id].length === 0)) {
          return;
        }
        this.quizState.revealed[q.id] = true;
        this.renderQuizQuestion();
      });
    }

    // 导航按钮
    const prevBtn = container.querySelector('#btn-prev');
    if (prevBtn) prevBtn.addEventListener('click', () => { this.quizState.currentIndex--; this.renderQuizQuestion(); });

    const nextBtn = container.querySelector('#btn-next');
    if (nextBtn) nextBtn.addEventListener('click', () => { this.quizState.currentIndex++; this.renderQuizQuestion(); });

    const finishBtn = container.querySelector('#btn-finish');
    if (finishBtn) finishBtn.addEventListener('click', () => this.showQuizResult());

    const backBtn = container.querySelector('#btn-back');
    if (backBtn) backBtn.addEventListener('click', () => this.backToCategories());
  },

  showQuizResult() {
    const state = this.quizState;
    const total = state.questions.length;
    let correct = 0, wrong = 0, unanswered = 0;

    state.questions.forEach(q => {
      if (!(q.id in state.answers)) { unanswered++; return; }
      if (this._isAnswerCorrect(q)) correct++;
      else wrong++;
    });

    const score = total > 0 ? Math.round((correct / total) * 100) : 0;
    const emoji = score >= 90 ? '🎉' : score >= 70 ? '👍' : score >= 50 ? '📚' : '💪';

    state.phase = 'done';
    document.getElementById('quiz-progress-fill').style.width = '100%';
    document.getElementById('quiz-progress-text').textContent = `完成! 共 ${total} 题`;

    const container = document.getElementById('quiz-active');
    container.innerHTML = `
      <div class="quiz-result">
        <div class="result-icon">${emoji}</div>
        <div class="result-score">${score} 分</div>
        <div class="result-text">${total} 道题中答对 ${correct} 道</div>
        <div class="result-detail">
          <div class="stat-item">
            <div class="stat-val green">${correct}</div>
            <div class="stat-label">✅ 正确</div>
          </div>
          <div class="stat-item">
            <div class="stat-val red">${wrong}</div>
            <div class="stat-label">❌ 错误</div>
          </div>
          <div class="stat-item">
            <div class="stat-val amber">${unanswered}</div>
            <div class="stat-label">⬜ 未答</div>
          </div>
        </div>
        <div class="question-actions" style="justify-content:center;">
          <button class="btn btn-primary" id="btn-retry">🔄 重新刷题</button>
          <button class="btn btn-outline" id="btn-back2">↩ 返回分类</button>
        </div>
      </div>
    `;

    container.querySelector('#btn-retry').addEventListener('click', () => {
      this.startQuiz(state.questions[0]?.category || '__all__');
    });

    container.querySelector('#btn-back2').addEventListener('click', () => this.backToCategories());
  },

  backToCategories() {
    this.quizState = null;
    document.getElementById('quiz-select').style.display = 'block';
    document.getElementById('quiz-active').style.display = 'none';
    document.getElementById('quiz-progress-fill').style.width = '0%';
    document.getElementById('quiz-progress-text').textContent = '选择一个分类开始刷题';
    this.renderQuizCategories();
  },

  // ---- 工具方法 ----
  _isSelected(q, optIdx) {
    const ans = this.quizState.answers[q.id];
    if (ans === undefined) return false;
    if (q.type === 'multiple') return Array.isArray(ans) && ans.includes(optIdx);
    if (q.type === 'judge') return (optIdx === 0) === ans;
    return ans === optIdx;
  },

  _isAnswerCorrect(q) {
    const ans = this.quizState.answers[q.id];
    if (ans === undefined) return false;
    if (q.type === 'multiple') {
      const correct = q.answer.sort().join(',');
      const given = (ans || []).sort().join(',');
      return correct === given;
    }
    if (q.type === 'judge') return ans === q.answer;
    return ans === q.answer;
  }
};

// ---- 搜索绑定 ----
document.addEventListener('DOMContentLoaded', () => {
  App.init();

  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', (e) => {
    const activeCat = document.querySelector('#category-filters .cat-chip.active');
    const cat = activeCat ? activeCat.dataset.cat : '全部';
    App.renderKnowledge(cat, e.target.value);
  });
});
