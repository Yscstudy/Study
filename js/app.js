/* ============================================================
   学习助手 — 主应用逻辑
   ============================================================ */

// ---- 公式转换：LaTeX → 可读文本 ----
function fixMath(txt) {
  if (!txt) return txt;
  var s = txt;
  // === Complete Greek alphabet ===
  var g1 = {alpha:'α',beta:'β',gamma:'γ',delta:'δ',epsilon:'ε',zeta:'ζ',eta:'η',theta:'θ',iota:'ι',kappa:'κ',lambda:'λ',mu:'μ',nu:'ν',xi:'ξ',pi:'π',rho:'ρ',sigma:'σ',tau:'τ',upsilon:'υ',phi:'φ',chi:'χ',psi:'ψ',omega:'ω',varepsilon:'ε',vartheta:'ϑ',varphi:'φ',varrho:'ϱ',varsigma:'ς'};
  var g2 = {Gamma:'Γ',Delta:'Δ',Theta:'Θ',Lambda:'Λ',Xi:'Ξ',Pi:'Π',Sigma:'Σ',Upsilon:'Υ',Phi:'Φ',Psi:'Ψ',Omega:'Ω'};
  for (var k in g1) s = s.split('\\'+k).join(g1[k]);
  for (var k in g2) s = s.split('\\'+k).join(g2[k]);

  // === Math operators ===
  var ops = {
    'infty':'∞','pm':'±','mp':'∓','times':'×','div':'÷','cdot':'·','ast':'*','circ':'∘','bullet':'•',
    'oplus':'⊕','otimes':'⊗','odot':'⊙','vee':'∨','wedge':'∧','neg':'¬',
    'leq':'≤','geq':'≥','neq':'≠','equiv':'≡','approx':'≈','simeq':'≃','cong':'≅','propto':'∝',
    'sim':'∼','perp':'⊥','parallel':'∥','ll':'≪','gg':'≫','prec':'≺','succ':'≻',
    'subset':'⊂','supset':'⊃','subseteq':'⊆','supseteq':'⊇','in':'∈','notin':'∉','ni':'∋',
    'cup':'∪','cap':'∩','setminus':'∖','emptyset':'∅','varnothing':'∅',
    'forall':'∀','exists':'∃','partial':'∂','nabla':'∇','aleph':'ℵ','ell':'ℓ',
    'to':'→','rightarrow':'→','leftarrow':'←','uparrow':'↑','downarrow':'↓',
    'leftrightarrow':'↔','Rightarrow':'⇒','Leftarrow':'⇐','Leftrightarrow':'⇔','mapsto':'↦',
    'sum':'Σ','prod':'Π','int':'∫','oint':'∮','coprod':'∐',
    'ldots':'…','cdots':'⋯','vdots':'⋮','ddots':'⋱',
    'langle':'⟨','rangle':'⟩','lceil':'⌈','rceil':'⌉','lfloor':'⌊','rfloor':'⌋',
    'triangle':'△','Diamond':'◇','Box':'□',
    'sin':'sin','cos':'cos','tan':'tan','cot':'cot','sec':'sec','csc':'csc',
    'arcsin':'arcsin','arccos':'arccos','arctan':'arctan',
    'log':'log','ln':'ln','lg':'lg','exp':'exp','lim':'lim','sup':'sup','inf':'inf','max':'max','min':'min',
    'gcd':'gcd','det':'det','deg':'deg','dim':'dim','ker':'ker','hom':'hom','arg':'arg',
    'Re':'ℜ','Im':'ℑ','hbar':'ℏ',
    'bar':'','hat':'','tilde':'','vec':'','dot':'','ddot':'','widehat':'','widetilde':'',
    'overline':'','underline':'','overbrace':'','underbrace':'',
    'big':'','Big':'','bigg':'','Bigg':'','left':'','right':'','middle':'',
    'qquad':'  ','quad':' ','\\ ':' ','\\;':' ','\\,':' ',
    'displaystyle':'','textstyle':'','scriptstyle':'',
  };
  for (var k in ops) s = s.split('\\'+k).join(ops[k]);

  // === Fractions ===
  s = s.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '($1)/($2)');
  s = s.replace(/\\dfrac\{([^{}]+)\}\{([^{}]+)\}/g, '($1)/($2)');
  s = s.replace(/\\binom\{([^{}]+)\}\{([^{}]+)\}/g, 'C($1,$2)');
  // === Square root ===
  s = s.replace(/\\sqrt\[([^\]]+)\]\{([^}]+)\}/g, '($2)^(1/$1)');
  s = s.replace(/\\sqrt\{([^}]+)\}/g, '√($1)');
  // === Superscript/subscript ===
  s = s.replace(/\^\{([^}]+)\}/g, '^($1)');
  s = s.replace(/_\{([^}]+)\}/g, '_$1');
  // === Remove text formatting ===
  s = s.replace(/\\(text|textbf|textit|texttt|textrm|textsf|textsc|emph)\{([^}]+)\}/g, '$2');
  // === Remove array/matrix environments ===
  s = s.replace(/\\(begin|end)\{[^}]*\}/g, '');
  // === Remove braces (LaTeX grouping) ===
  s = s.replace(/\\\{/g,'{').replace(/\\\}/g,'}');
  // === Clean up: remove remaining backslash+letters ===
  s = s.replace(/\\[a-zA-Z]+/g, '');
  // === Clean up: remove any leftover $ signs ===
  s = s.split('$').join('');
  return s;
}

if (typeof PROB_STAT_KNOWLEDGE !== 'undefined') {
  KNOWLEDGE_DATA.push.apply(KNOWLEDGE_DATA, PROB_STAT_KNOWLEDGE);
}
if (typeof PROB_STAT_QUESTIONS !== 'undefined') {
  QUIZ_DATA.push.apply(QUIZ_DATA, PROB_STAT_QUESTIONS);
}

// Split questions by type for easy access
var ALL_CHOICE = QUIZ_DATA.filter(function(q) { return q.subtype === '选择'; });
var ALL_FILL   = QUIZ_DATA.filter(function(q) { return q.subtype === '填空'; });
var ALL_CALC   = QUIZ_DATA.filter(function(q) { return q.subtype === '计算'; });
var ALL_PROOF  = QUIZ_DATA.filter(function(q) { return q.subtype === '证明'; });

var App = {
  currentTab: 'review',
  quizMode: null,     // 'choice' | 'fill' | 'calc' | 'proof' | 'all'
  quizState: null,

  init: function() {
    this.bindTabs();
    this.renderKnowledge();
    this.renderQuizHome();
  },

  bindTabs: function() {
    var self = this;
    document.querySelectorAll('.tab-btn').forEach(function(btn) {
      btn.addEventListener('click', function() { self.switchTab(this.dataset.tab); });
    });
  },

  switchTab: function(tab) {
    this.currentTab = tab;
    document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
    document.querySelector('.tab-btn[data-tab="' + tab + '"]').classList.add('active');
    document.querySelectorAll('.panel').forEach(function(p) { p.classList.remove('active'); });
    document.getElementById('panel-' + tab).classList.add('active');
  },

  // ==================== 知识复习 ====================
  renderKnowledge: function(filterCat, searchTerm) {
    filterCat = filterCat || '全部';
    searchTerm = searchTerm || '';
    var list = document.getElementById('knowledge-list');
    var categories = ['全部'].concat([].slice.call(new Set(KNOWLEDGE_DATA.map(function(k) { return k.category; }))));

    var filterEl = document.getElementById('category-filters');
    filterEl.innerHTML = categories.map(function(cat) {
      return '<span class="cat-chip' + (cat === filterCat ? ' active' : '') + '" data-cat="' + cat + '">' + cat + '</span>';
    }).join('');

    var self = this;
    filterEl.querySelectorAll('.cat-chip').forEach(function(chip) {
      chip.addEventListener('click', function() {
        filterEl.querySelectorAll('.cat-chip').forEach(function(c) { c.classList.remove('active'); });
        this.classList.add('active');
        self.renderKnowledge(this.dataset.cat, searchTerm);
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
      return '<div class="knowledge-card" data-id="' + k.id + '"><div class="card-header"><span class="arrow">▶</span><span class="cat-badge">' + k.category + '</span><span class="title">' + fixMath(k.title) + '</span></div><div class="card-body">' + fixMath(k.content) + '</div></div>';
    }).join('');

    list.querySelectorAll('.card-header').forEach(function(header) {
      header.addEventListener('click', function() { this.parentElement.classList.toggle('open'); });
    });
  },

  // ==================== 刷题 ====================
  renderQuizHome: function() {
    if (this.quizState && this.quizState.phase === 'active') return;
    this.quizState = null;
    document.getElementById('quiz-home').style.display = 'block';
    document.getElementById('quiz-active').style.display = 'none';
    document.getElementById('quiz-progress-fill').style.width = '0%';
    document.getElementById('quiz-progress-text').textContent = '选择一个题目类型开始';

    var cats = [
      { mode: 'choice', icon: '📝', name: '选择题', count: ALL_CHOICE.length, desc: '交互答题，即时判对错' },
      { mode: 'fill',   icon: '✏️', name: '填空题', count: ALL_FILL.length,   desc: '只展示题目，附答案' },
      { mode: 'calc',   icon: '🧮', name: '计算题', count: ALL_CALC.length,   desc: '只展示题目，附答案' },
      { mode: 'proof',  icon: '📐', name: '证明题', count: ALL_PROOF.length,  desc: '只展示题目，附答案' },
      { mode: 'all',    icon: '🔥', name: '全部题目', count: QUIZ_DATA.length, desc: '180题完整列表' }
    ];

    var html = '';
    var self = this;
    cats.forEach(function(c) {
      html += '<div class="quiz-cat-card" data-mode="' + c.mode + '"><div class="cat-icon">' + c.icon + '</div><div class="cat-name">' + c.name + '</div><div class="cat-count">' + c.count + ' 题</div><div style="font-size:.75rem;color:var(--text-secondary);margin-top:2px;">' + c.desc + '</div></div>';
    });

    document.getElementById('quiz-cats').innerHTML = html;
    document.getElementById('quiz-cats').querySelectorAll('.quiz-cat-card').forEach(function(card) {
      card.addEventListener('click', function() {
        var mode = this.dataset.mode;
        if (mode === 'choice') self.startChoice();
        else self.startDisplay(mode);
      });
    });
  },

  // ---- 选择题模式 (交互答题) ----
  startChoice: function() {
    this.quizMode = 'choice';
    this.quizState = {
      phase: 'active',
      questions: ALL_CHOICE.slice(),
      currentIndex: 0,
      answers: {},
      revealed: {}
    };
    document.getElementById('quiz-home').style.display = 'none';
    document.getElementById('quiz-active').style.display = 'block';
    this._renderChoiceQuestion();
  },

  _renderChoiceQuestion: function() {
    var state = this.quizState;
    var total = state.questions.length;
    var idx = state.currentIndex;
    if (idx >= total) { this._showChoiceResult(); return; }

    var q = state.questions[idx];
    var answered = q.id in state.answers;
    var revealed = q.id in state.revealed;
    var answeredCount = Object.keys(state.answers).length;
    var pct = total ? Math.round((answeredCount / total) * 100) : 0;

    document.getElementById('quiz-progress-fill').style.width = pct + '%';
    document.getElementById('quiz-progress-text').textContent = '选择题 ' + (idx+1) + ' / ' + total + '  ·  已答 ' + answeredCount + ' 题';

    // Navigator
    var navHtml = this._buildNav(state, total, idx);

    // Options
    var optHtml = q.options.map(function(opt, i) {
      var cls = '';
      if (revealed) {
        if (i === q.answer) cls = 'correct';
        else if (App._isSelected(q, i)) cls = 'wrong';
      } else if (App._isSelected(q, i)) {
        cls = 'selected';
      }
      return '<div class="option-item ' + cls + '" data-idx="' + i + '"><span class="opt-marker">' + String.fromCharCode(65 + i) + '</span><span>' + fixMath(opt) + '</span></div>';
    }).join('');

    var explHtml = '';
    if (revealed) {
      explHtml = '<div class="explanation-box show ' + (App._isCorrect(q) ? 'correct-answer' : 'wrong-answer') + '"><div class="exp-title">' + (App._isCorrect(q) ? '✅ 回答正确！' : '❌ 回答错误') + '</div><div class="exp-text">' + fixMath(q.explanation) + '</div></div>';
    }

    var btns = '';
    if (!revealed) btns += '<button class="btn btn-primary" id="btn-submit"' + (!answered ? ' disabled' : '') + '>✓ 提交</button>';
    if (idx > 0) btns += '<button class="btn btn-outline" id="btn-prev">◀ 上一题</button>';
    if (idx < total - 1) btns += '<button class="btn btn-primary" id="btn-next">下一题 ▶</button>';
    if (idx === total - 1 && revealed) btns += '<button class="btn btn-success" id="btn-finish">🏁 查看成绩</button>';
    btns += '<button class="btn btn-outline" id="btn-back">↩ 返回首页</button>';

    var container = document.getElementById('quiz-active');
    container.innerHTML = navHtml + '<div class="question-card"><div class="q-header"><span class="q-num">' + (idx+1) + '</span><span class="q-type-badge choice">选择题</span><span style="font-size:.8rem;color:var(--text-secondary);">概率统计</span></div><div class="q-text">' + fixMath(q.question) + '</div><div class="options-list">' + optHtml + '</div>' + explHtml + '<div class="question-actions">' + btns + '</div></div>';

    this._bindChoiceEvents(q);
    this._bindNavEvents(state);
  },

  _bindChoiceEvents: function(q) {
    var container = document.getElementById('quiz-active');
    var state = this.quizState;
    var self = this;

    if (!(q.id in state.revealed)) {
      container.querySelectorAll('.option-item').forEach(function(opt) {
        opt.addEventListener('click', function() {
          state.answers[q.id] = parseInt(this.dataset.idx);
          self._renderChoiceQuestion();
        });
      });
    }

    var sb = container.querySelector('#btn-submit');
    if (sb) sb.addEventListener('click', function() { state.revealed[q.id] = true; self._renderChoiceQuestion(); });
    var pb = container.querySelector('#btn-prev');
    if (pb) pb.addEventListener('click', function() { state.currentIndex--; self._renderChoiceQuestion(); });
    var nb = container.querySelector('#btn-next');
    if (nb) nb.addEventListener('click', function() { state.currentIndex++; self._renderChoiceQuestion(); });
    var fb = container.querySelector('#btn-finish');
    if (fb) fb.addEventListener('click', function() { self._showChoiceResult(); });
    var bb = container.querySelector('#btn-back');
    if (bb) bb.addEventListener('click', function() { self.renderQuizHome(); });
  },

  _showChoiceResult: function() {
    var state = this.quizState;
    var total = state.questions.length;
    var correct = 0, wrong = 0, unanswered = 0;
    var self = this;
    state.questions.forEach(function(q) {
      if (!(q.id in state.answers)) { unanswered++; return; }
      if (self._isCorrect(q)) correct++; else wrong++;
    });
    var score = total ? Math.round((correct / total) * 100) : 0;
    var emoji = score >= 90 ? '\u{1F389}' : score >= 70 ? '\u{1F44D}' : score >= 50 ? '\u{1F4DA}' : '\u{1F4AA}';
    state.phase = 'done';
    document.getElementById('quiz-progress-fill').style.width = '100%';
    document.getElementById('quiz-progress-text').textContent = '选择题完成! 共 ' + total + ' 题';

    var container = document.getElementById('quiz-active');
    container.innerHTML = '<div class="quiz-result"><div class="result-icon">' + emoji + '</div><div class="result-score">' + score + ' 分</div><div class="result-text">' + total + ' 道选择题中答对 ' + correct + ' 道</div><div class="result-detail"><div class="stat-item"><div class="stat-val green">' + correct + '</div><div class="stat-label">✅ 正确</div></div><div class="stat-item"><div class="stat-val red">' + wrong + '</div><div class="stat-label">❌ 错误</div></div><div class="stat-item"><div class="stat-val amber">' + unanswered + '</div><div class="stat-label">⬜ 未答</div></div></div><div class="question-actions" style="justify-content:center;"><button class="btn btn-primary" id="btn-retry">🔄 重新作答</button><button class="btn btn-outline" id="btn-back2">↩ 返回首页</button></div></div>';
    container.querySelector('#btn-retry').addEventListener('click', function() { self.startChoice(); });
    container.querySelector('#btn-back2').addEventListener('click', function() { self.renderQuizHome(); });
  },

  // ---- 填空/计算/证明 — 只展示题目，不需要答题 ----
  startDisplay: function(mode) {
    var questions;
    var title;
    if (mode === 'fill')  { questions = ALL_FILL.slice();  title = '填空题'; }
    if (mode === 'calc')  { questions = ALL_CALC.slice();  title = '计算题'; }
    if (mode === 'proof') { questions = ALL_PROOF.slice(); title = '证明题'; }
    if (mode === 'all')   { questions = QUIZ_DATA.slice(); title = '全部题目'; }

    this.quizMode = mode;
    this.quizState = { phase: 'display', questions: questions, title: title };

    document.getElementById('quiz-home').style.display = 'none';
    document.getElementById('quiz-active').style.display = 'block';
    document.getElementById('quiz-progress-fill').style.width = '0%';
    document.getElementById('quiz-progress-text').textContent = title + ' — 共 ' + questions.length + ' 题';

    this._renderDisplayList();
  },

  _renderDisplayList: function() {
    var state = this.quizState;
    var questions = state.questions;
    var title = state.title;
    var self = this;
    var total = questions.length;
    var isChoice = (this.quizMode === 'all');

    // Build navigation grid
    var navHtml = '<div class="q-nav q-nav-sticky"><div class="q-nav-title">📋 ' + title + ' — 共 ' + total + ' 题，点击跳转</div><div class="q-nav-grid">';
    for (var i = 0; i < total; i++) {
      var q = questions[i];
      var label = (q.subtype ? q.subtype[0] : '选');
      navHtml += '<a href="#q-card-' + i + '" class="q-nav-item" title="第' + (i+1) + '题 - ' + (q.subtype||'选择') + '">' + (i+1) + '<small>' + label + '</small></a>';
    }
    navHtml += '</div></div>';

    var html = '<div style="margin-bottom:16px;"><button class="btn btn-outline" id="btn-disp-back">↩ 返回首页</button></div>' + navHtml;

    html += questions.map(function(q, i) {
      var subtypeBadge = '';
      var typeClass = 'choice';
      if (q.subtype === '填空') { typeClass = 'fill'; subtypeBadge = '填空题'; }
      else if (q.subtype === '计算') { typeClass = 'calc'; subtypeBadge = '计算题'; }
      else if (q.subtype === '证明') { typeClass = 'proof'; subtypeBadge = '证明题'; }
      else { subtypeBadge = '选择题'; }

      var bodyHtml = '';
      if (isChoice || q.subtype === '选择') {
        bodyHtml = '<div class="options-list">' + q.options.map(function(opt, oi) {
          return '<div class="option-item" style="cursor:default;border-color:#e2e8f0;"><span class="opt-marker">' + String.fromCharCode(65 + oi) + '</span><span>' + fixMath(opt) + '</span></div>';
        }).join('') + '</div>';
        if (q.explanation) {
          bodyHtml += '<div class="explanation-box show correct-answer" style="margin-top:12px;"><div class="exp-title">✅ 答案：' + String.fromCharCode(65 + q.answer) + '</div><div class="exp-text">' + fixMath(q.explanation) + '</div></div>';
        }
      } else {
        bodyHtml = '<div style="margin-top:12px; border-bottom:2px dashed #cbd5e1; height:60px;"></div>';
        if (q.explanation) {
          bodyHtml += '<details style="margin-top:8px;"><summary style="cursor:pointer;color:var(--primary);font-size:.85rem;">📖 查看答案/解析</summary><div style="padding:8px;background:#f8fafc;border-radius:6px;margin-top:4px;font-size:.88rem;">' + fixMath(q.explanation) + '</div></details>';
        }
      }

      return '<div class="question-card" style="margin-bottom:16px;" id="q-card-' + i + '"><div class="q-header"><span class="q-num">' + (i+1) + '</span><span class="q-type-badge ' + typeClass + '">' + subtypeBadge + '</span><span style="font-size:.8rem;color:var(--text-secondary);">概率统计</span></div><div class="q-text">' + fixMath(q.question) + '</div>' + bodyHtml + '</div>';
    }).join('');

    document.getElementById('quiz-active').innerHTML = html;
    document.getElementById('btn-disp-back').addEventListener('click', function() { self.renderQuizHome(); });

    if (window.MathJax && MathJax.typesetPromise) {
      MathJax.typesetPromise([document.getElementById('quiz-active')]);
    }
  },

  // ---- 共享工具 ----
  _buildNav: function(state, total, idx) {
    var html = '<div class="q-nav"><div class="q-nav-title">📋 题目导航（点击跳转）</div><div class="q-nav-grid">';
    for (var i = 0; i < total; i++) {
      var q = state.questions[i];
      var cls = 'q-nav-item';
      if (i === idx) cls += ' current';
      else if (q.id in state.revealed) cls += (App._isCorrect(q) ? ' correct' : ' wrong');
      else if (q.id in state.answers) cls += ' answered';
      var label = (q.subtype ? q.subtype[0] : '选');
      html += '<span class="' + cls + '" data-idx="' + i + '" title="第' + (i+1) + '题">' + (i+1) + '</span>';
    }
    html += '</div></div>';
    return html;
  },

  _bindNavEvents: function(state) {
    var self = this;
    document.querySelectorAll('.q-nav-item').forEach(function(item) {
      item.addEventListener('click', function() {
        state.currentIndex = parseInt(this.dataset.idx);
        self._renderChoiceQuestion();
        var card = document.querySelector('.question-card');
        if (card) card.scrollIntoView({ behavior: 'smooth' });
      });
    });
  },

  _isSelected: function(q, optIdx) {
    var ans = this.quizState.answers[q.id];
    return ans !== undefined && ans === optIdx;
  },

  _isCorrect: function(q) {
    var ans = this.quizState.answers[q.id];
    return ans !== undefined && ans === q.answer;
  }
};

// ---- 初始化 ----
document.addEventListener('DOMContentLoaded', function() {
  App.init();
  var si = document.getElementById('search-input');
  si.addEventListener('input', function(e) {
    var ac = document.querySelector('#category-filters .cat-chip.active');
    App.renderKnowledge(ac ? ac.dataset.cat : '全部', e.target.value);
  });
});
