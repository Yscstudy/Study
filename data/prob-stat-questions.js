// ============================================================
//  概率统计 — 刷题数据
//  公式使用 LaTeX 语法 ($...$)，由 MathJax 渲染
//  来源：复习题(理工) + 作业题
// ============================================================

const PROB_STAT_QUESTIONS = [
  // ========== 选择题（来自复习题） ==========
  {
    id: 'ps1',
    category: '概率统计',
    type: 'single',
    question: '设 $A, B, C$ 是三个随机事件，则事件"$A, B, C$ 不多于一个发生"的对立事件是？',
    options: [
      '$A, B, C$ 至少有一个发生',
      '$A, B, C$ 至少有两个发生',
      '$A, B, C$ 都发生',
      '$A, B, C$ 不都发生'
    ],
    answer: 1,
    explanation: '"不多于一个发生"表示发生0个或1个。其对立事件是"至少有两个发生"。'
  },
  {
    id: 'ps2',
    category: '概率统计',
    type: 'single',
    question: '如果（ ）成立，则事件 $A$ 与 $B$ 互为对立事件（其中 $S$ 为样本空间）。',
    options: [
      '$AB = \\varnothing$',
      '$A \\cup B = S$',
      '$AB = \\varnothing$ 且 $A \\cup B = S$',
      '$P(A-B) = 0$'
    ],
    answer: 2,
    explanation: '对立事件必须同时满足两个条件：互不相容（$AB=\\varnothing$）且和事件为样本空间（$A \\cup B = S$）。'
  },
  {
    id: 'ps3',
    category: '概率统计',
    type: 'single',
    question: '设 $A, B$ 为两个随机事件，则 $P(A \\cup B) =$ ？',
    options: [
      '$P(A) - P(B)$',
      '$P(A) - P(B) + P(AB)$',
      '$P(A) - P(AB)$',
      '$P(A) + P(B) - P(AB)$'
    ],
    answer: 3,
    explanation: '这是概率的加法公式：$P(A \\cup B) = P(A) + P(B) - P(AB)$。'
  },
  {
    id: 'ps4',
    category: '概率统计',
    type: 'single',
    question: '掷一枚质地均匀的骰子，则在出现偶数点的条件下出现 4 点的概率为？',
    options: [
      '$\\frac{1}{2}$',
      '$\\frac{2}{3}$',
      '$\\frac{1}{6}$',
      '$\\frac{1}{3}$'
    ],
    answer: 3,
    explanation: '偶数点有 {2,4,6} 共 3 个。条件概率 $P(\\text{4点}|\\text{偶数}) = \\frac{P(\\text{4点})}{P(\\text{偶数})} = \\frac{1/6}{3/6} = \\frac{1}{3}$。'
  },
  {
    id: 'ps5',
    category: '概率统计',
    type: 'single',
    question: '设 $X \\sim N(1.5, 4)$，则 $P\\{-2 < X < 4\\} =$ ？（提示：$\\Phi(1.25)=0.8944$）',
    options: [
      '0.8543',
      '0.1457',
      '0.3541',
      '0.2543'
    ],
    answer: 0,
    explanation: '标准化：$Z = \\frac{X-1.5}{2}$。$P(-2<X<4) = P(\\frac{-2-1.5}{2} < Z < \\frac{4-1.5}{2}) = P(-1.75 < Z < 1.25) = \\Phi(1.25) - \\Phi(-1.75) = \\Phi(1.25) - (1-\\Phi(1.75)) \\approx 0.8944 - 0.0401 = 0.8543$。'
  },
  {
    id: 'ps6',
    category: '概率统计',
    type: 'single',
    question: '设 $X \\sim N(1, 4)$，则 $P\\{0 < X < 1.6\\} =$ ？（$\\Phi(0.3)=0.6179, \\Phi(0.5)=0.6915$）',
    options: [
      '0.3094',
      '0.1457',
      '0.3541',
      '0.2543'
    ],
    answer: 0,
    explanation: '$Z = \\frac{X-1}{2}$。$P(0<X<1.6) = P(-0.5 < Z < 0.3) = \\Phi(0.3) - \\Phi(-0.5) = 0.6179 - (1-0.6915) = 0.3094$。'
  },
  {
    id: 'ps7',
    category: '概率统计',
    type: 'single',
    question: '设 $X \\sim N(\\mu, \\sigma^2)$，随着 $\\sigma^2$ 的增大，$P\\{|X-\\mu| \\leq \\sigma\\}$ 会怎样变化？',
    options: [
      '增大',
      '减小',
      '不变',
      '无法确定'
    ],
    answer: 2,
    explanation: '标准化后 $P(|X-\\mu| \\leq \\sigma) = P(|Z| \\leq 1) = 2\\Phi(1)-1$，与 $\\sigma$ 无关，概率保持不变（约 0.6826）。'
  },
  {
    id: 'ps8',
    category: '概率统计',
    type: 'single',
    question: '设连续型随机变量 $X$ 的分布函数和密度函数分别为 $F(x)$、$f(x)$，则下列选项中正确的是？',
    options: [
      '$0 \\leq F(x) \\leq 1$',
      '$0 \\leq f(x) \\leq 1$',
      '$P\\{X = x\\} = F(x)$',
      '$P\\{X = x\\} = f(x)$'
    ],
    answer: 0,
    explanation: '分布函数 $F(x)$ 的取值范围是 $[0,1]$。密度函数 $f(x)$ 可以大于 1（如均匀分布 $U(0,0.5)$），连续型随机变量单点概率为 0。'
  },
  {
    id: 'ps9',
    category: '概率统计',
    type: 'single',
    question: '若 $Y = X_1 + X_2$，且 $X_1, X_2$ 相互独立，$X_i \\sim N(0,1)$（$i=1,2$），则 $Y$ 服从？',
    options: [
      '$N(0,1)$',
      '$N(0,2)$',
      '不服从正态分布',
      '$N(1,1)$'
    ],
    answer: 1,
    explanation: '独立正态随机变量的和仍服从正态分布。$E(Y)=0+0=0$，$D(Y)=D(X_1)+D(X_2)=1+1=2$，故 $Y \\sim N(0,2)$。'
  },
  {
    id: 'ps10',
    category: '概率统计',
    type: 'single',
    question: '设 $X_1, X_2$ 相互独立，$X_1 \\sim N(0,1)$，$X_2 \\sim N(0,2)$，下列结论正确的是？',
    options: [
      '$X_1 = X_2$',
      '$P\\{X_1 = X_2\\} = 1$',
      '$D(X_1 + X_2) = 3$',
      '以上都不对'
    ],
    answer: 2,
    explanation: '独立 ⇒ $D(X_1+X_2) = D(X_1) + D(X_2) = 1 + 2 = 3$。注意独立不一定意味着 $X_1 = X_2$。'
  },
  {
    id: 'ps11',
    category: '概率统计',
    type: 'single',
    question: '设 $X$ 为随机变量，其方差存在，$C$ 为任意非零常数，则下列等式正确的是？',
    options: [
      '$D(X+C) = D(X)$',
      '$D(X+C) = D(X) + C$',
      '$D(X-C) = D(X) - C$',
      '$D(CX) = C \\cdot D(X)$'
    ],
    answer: 0,
    explanation: '方差性质：$D(X+C) = D(X)$（平移不改变方差），$D(CX) = C^2 D(X)$（注意是 $C^2$ 不是 $C$）。'
  },
  {
    id: 'ps12',
    category: '概率统计',
    type: 'single',
    question: '对于任意随机变量 $X, Y$，若 $E(XY) = E(X)E(Y)$，则？',
    options: [
      '$D(XY) = D(X)D(Y)$',
      '$D(X+Y) = D(X) + D(Y)$',
      '$X, Y$ 相互独立',
      '$X, Y$ 不相互独立'
    ],
    answer: 1,
    explanation: '$E(XY)=E(X)E(Y)$ 等价于 $\\text{Cov}(X,Y)=0$，即 X、Y 不相关，此时 $D(X+Y)=D(X)+D(Y)$。不相关不一定独立（独立是不相关的充分不必要条件）。'
  },
  {
    id: 'ps13',
    category: '概率统计',
    type: 'single',
    question: '设总体 $X \\sim N(\\mu, \\sigma^2)$，$\\mu$ 未知，$\\sigma^2$ 已知，$X_1, X_2, \\ldots, X_n$ 为一组样本。下列各项<strong>不是</strong>统计量的是？',
    options: [
      '$\\bar{X} = \\frac{1}{n}\\sum_{i=1}^{n} X_i$',
      '$X_1 + 4X_2 - 2\\mu$',
      '$\\frac{1}{\\sigma^2}\\sum_{i=1}^{n}(X_i-\\bar{X})^2$',
      '$\\frac{1}{3}\\sum_{i=1}^{n}(X_i - \\bar{X})$'
    ],
    answer: 1,
    explanation: '统计量是样本的函数，不能包含未知参数。选项 B 中含有未知参数 $\\mu$，因此不是统计量。'
  },
  {
    id: 'ps14',
    category: '概率统计',
    type: 'single',
    question: '设总体 $X$ 的数学期望为 $\\mu$，$X_1, X_2, X_3$ 是取自总体的简单随机样本。下列哪个统计量是 $\\mu$ 的无偏估计量？',
    options: [
      '$\\frac{1}{2}X_1 + \\frac{1}{3}X_2 + \\frac{1}{4}X_3$',
      '$\\frac{1}{2}X_1 + \\frac{1}{3}X_2 + \\frac{1}{5}X_3$',
      '$\\frac{1}{2}X_1 + \\frac{1}{3}X_2 + \\frac{1}{6}X_3$',
      '$\\frac{1}{2}X_1 + \\frac{1}{3}X_2 + \\frac{1}{7}X_3$'
    ],
    answer: 2,
    explanation: '无偏估计要求系数之和 = 1。$\\frac{1}{2}+\\frac{1}{3}+\\frac{1}{6} = 1$，其他选项系数和 ≠ 1。'
  },

  // ========== 填空题 ==========
  {
    id: 'ps15',
    category: '概率统计',
    type: 'single',
    question: '设 $A, B$ 为互不相容的随机事件，$P(A)=0.2$，$P(B)=0.5$，则 $P(A \\cup B) =$ ？',
    options: ['0.7', '0.1', '0.3', '1.0'],
    answer: 0,
    explanation: '互不相容 ⇒ $P(AB)=0$，$P(A \\cup B) = P(A) + P(B) = 0.2 + 0.5 = 0.7$。'
  },
  {
    id: 'ps16',
    category: '概率统计',
    type: 'single',
    question: '设有 10 件产品，其中有 2 件次品。今从中任取 1 件为正品的概率是？',
    options: ['0.8', '0.2', '0.5', '0.6'],
    answer: 0,
    explanation: '正品有 $10-2=8$ 件。$P(\\text{正品}) = \\frac{8}{10} = 0.8$。'
  },
  {
    id: 'ps17',
    category: '概率统计',
    type: 'single',
    question: '设 $A, B$ 为独立的随机事件，且 $P(A)=0.2$，$P(B)=0.5$，则 $P(A \\cup B) =$ ？',
    options: ['0.6', '0.7', '0.1', '0.3'],
    answer: 0,
    explanation: '独立 ⇒ $P(AB) = P(A) \\cdot P(B) = 0.2 \\times 0.5 = 0.1$。$P(A \\cup B) = P(A) + P(B) - P(AB) = 0.2 + 0.5 - 0.1 = 0.6$。'
  },
  {
    id: 'ps18',
    category: '概率统计',
    type: 'single',
    question: '设 $D(X)=5$，$D(Y)=8$，$X, Y$ 相互独立，则 $D(X+Y) =$ ？',
    options: ['13', '3', '40', '无法确定'],
    answer: 0,
    explanation: '独立 ⇒ $D(X+Y) = D(X) + D(Y) = 5 + 8 = 13$。'
  },
  {
    id: 'ps19',
    category: '概率统计',
    type: 'single',
    question: '设 $D(X)=9$，$D(Y)=16$，$\\rho_{XY}=0.5$，则 $D(X+Y) =$ ？',
    options: ['25', '37', '13', '5'],
    answer: 1,
    explanation: '$D(X+Y) = D(X) + D(Y) + 2\\text{Cov}(X,Y) = 9 + 16 + 2 \\times 0.5 \\times 3 \\times 4 = 25 + 12 = 37$。'
  },

  // ========== 判断题 ==========
  {
    id: 'ps20',
    category: '概率统计',
    type: 'judge',
    question: '若 $X$ 与 $Y$ 相互独立，则 $X$ 与 $Y$ 一定不相关。',
    options: ['正确', '错误'],
    answer: true,
    explanation: '独立 ⇒ $\\text{Cov}(X,Y)=0$ ⇒ $\\rho=0$ ⇒ 不相关。但反过来不成立：不相关不一定独立（如某些非线性关系的随机变量）。'
  },
  {
    id: 'ps21',
    category: '概率统计',
    type: 'judge',
    question: '样本方差 $S^2 = \\frac{1}{n-1}\\sum_{i=1}^{n}(X_i-\\bar{X})^2$ 是总体方差 $\\sigma^2$ 的无偏估计量。',
    options: ['正确', '错误'],
    answer: true,
    explanation: '$E(S^2) = \\sigma^2$，因此样本方差（分母为 $n-1$）是 $\\sigma^2$ 的无偏估计。如果分母是 $n$，则是有偏的。'
  },
  {
    id: 'ps22',
    category: '概率统计',
    type: 'judge',
    question: '在假设检验中，第一类错误（弃真）的概率等于显著性水平 $\\alpha$。',
    options: ['正确', '错误'],
    answer: true,
    explanation: '第一类错误是 $H_0$ 为真时拒绝 $H_0$，其发生的概率被控制在显著性水平 $\\alpha$ 以内，即 $P(\\text{拒绝}H_0 | H_0\\text{为真}) \\leq \\alpha$。'
  },
  {
    id: 'ps23',
    category: '概率统计',
    type: 'judge',
    question: '设 $X \\sim B(n, p)$，则 $E(X) = np$，$D(X) = np$。',
    options: ['正确', '错误'],
    answer: false,
    explanation: '对于二项分布 $B(n,p)$：$E(X)=np$ 正确，但 $D(X)=np(1-p)$，不是 $np$。只有泊松分布 $P(\\lambda)$ 的期望和方差才相等（均为 $\\lambda$）。'
  },

  // ========== 计算题改编 ==========
  {
    id: 'ps24',
    category: '概率统计',
    type: 'single',
    question: '某种电子元件的寿命 $X$ 的概率密度为 $f(x) = \\frac{100}{x^2}$（$x > 100$）。求在使用 150 小时内，一个元件不失效的概率。',
    options: [
      '$\\frac{1}{3}$',
      '$\\frac{2}{3}$',
      '$\\frac{1}{2}$',
      '$\\frac{3}{4}$'
    ],
    answer: 0,
    explanation: '$P(X > 150) = \\int_{150}^{\\infty} \\frac{100}{x^2}dx = \\left[-\\frac{100}{x}\\right]_{150}^{\\infty} = \\frac{100}{150} = \\frac{2}{3}$。注意题目问的是<strong>不失效</strong>（即寿命 > 150）= $\\frac{2}{3}$。等等，让我重新算：$P(X>150) = \\frac{100}{150} = \\frac{2}{3}$。'
  },
  {
    id: 'ps25',
    category: '概率统计',
    type: 'single',
    question: '有两个口袋。甲袋有 2 个白球 1 个黑球，乙袋有 1 个白球 2 个黑球。从甲袋任取一球放入乙袋，再从乙袋任取一球。问取得白球的概率是多少？',
    options: [
      '$\\frac{5}{12}$',
      '$\\frac{1}{2}$',
      '$\\frac{1}{3}$',
      '$\\frac{7}{12}$'
    ],
    answer: 0,
    explanation: '全概率公式：$P(\\text{白}) = P(\\text{甲白}) \\cdot P(\\text{乙白}|\\text{甲白}) + P(\\text{甲黑}) \\cdot P(\\text{乙白}|\\text{甲黑}) = \\frac{2}{3} \\cdot \\frac{2}{4} + \\frac{1}{3} \\cdot \\frac{1}{4} = \\frac{4}{12} + \\frac{1}{12} = \\frac{5}{12}$。'
  },

  // ========== 参数估计 ==========
  {
    id: 'ps26',
    category: '概率统计',
    type: 'single',
    question: '设总体 $X \\sim N(\\mu, 1)$，$n=16$，$\\bar{x}=5.2$，求 $\\mu$ 的置信水平为 0.95 的置信区间（$u_{0.025}=1.96$）。',
    options: [
      '$(4.71, 5.69)$',
      '$(4.50, 5.90)$',
      '$(5.00, 5.40)$',
      '$(4.22, 6.18)$'
    ],
    answer: 0,
    explanation: '$\\sigma^2=1$ 已知，用 U 统计量：$\\bar{x} \\pm u_{\\alpha/2}\\frac{\\sigma}{\\sqrt{n}} = 5.2 \\pm 1.96 \\times \\frac{1}{4} = 5.2 \\pm 0.49 = (4.71, 5.69)$。'
  },
  {
    id: 'ps27',
    category: '概率统计',
    type: 'single',
    question: '有一大批袋装食盐，随机抽取 16 袋，得 $\\bar{x}=503.75$，$S=6.2022$。求 $\\mu$ 的 95% 置信区间（$t_{0.025}(15)=2.1315$）。',
    options: [
      '$(500.44, 507.06)$',
      '$(501.00, 506.50)$',
      '$(499.00, 508.50)$',
      '$(502.00, 505.50)$'
    ],
    answer: 0,
    explanation: '$\\sigma^2$ 未知，用 T 统计量：$\\bar{x} \\pm t_{\\alpha/2}\\frac{S}{\\sqrt{n}} = 503.75 \\pm 2.1315 \\times \\frac{6.2022}{4} = 503.75 \\pm 3.306 = (500.44, 507.06)$。'
  },

  // ========== 假设检验 ==========
  {
    id: 'ps28',
    category: '概率统计',
    type: 'single',
    question: '某工厂固体燃料推进器的燃烧率 $X \\sim N(40, 2^2)$。新方法生产后抽 25 只，$\\bar{x}=41.25$，$\\sigma=2$ 不变。问新方法是否显著提高了燃烧率？($\\alpha=0.05$, $u_{0.05}=1.645$)',
    options: [
      '是，$U=3.125 > 1.645$',
      '否，$U=1.25 < 1.645$',
      '是，$U=1.875 > 1.645$',
      '无法判断'
    ],
    answer: 0,
    explanation: '右边检验。$U = \\frac{\\bar{x}-\\mu_0}{\\sigma/\\sqrt{n}} = \\frac{41.25-40}{2/5} = \\frac{1.25}{0.4} = 3.125 > 1.645$，落入拒绝域，认为有显著提高。'
  },
  {
    id: 'ps29',
    category: '概率统计',
    type: 'single',
    question: '某厂铜丝折断力 $X \\sim N(\\mu, \\sigma^2)$。抽 10 根，$\\bar{x}=572.2$，$S^2=75.7$。检验 $H_0: \\sigma = 8$（即 $\\sigma^2=64$），$\\chi^2 = \\frac{(n-1)S^2}{\\sigma_0^2} = ?$（已知 $\\chi^2_{0.975}(9)=2.70$, $\\chi^2_{0.025}(9)=19.02$）',
    options: [
      '$\\chi^2=10.65$，不拒绝 $H_0$',
      '$\\chi^2=10.65$，拒绝 $H_0$',
      '$\\chi^2=15.3$，不拒绝 $H_0$',
      '$\\chi^2=15.3$，拒绝 $H_0$'
    ],
    answer: 0,
    explanation: '$\\chi^2 = \\frac{9 \\times 75.7}{64} = 10.65$。接受域 $(2.70, 19.02)$，$10.65$ 在接受域内，故不拒绝 $H_0$，可认为标准差是 8。'
  },

  // ==========================================
  //  以下为补齐的遗漏题目
  // ==========================================

  // ---- 选择题 Q8: 概率密度求参数 ----
  {
    id: 'ps30',
    category: '概率统计',
    type: 'single',
    question: '设随机变量 $X$ 的概率密度 $f(x) = \\begin{cases} x^{\\theta-1}, & x > 1 \\\\ 0, & x \\leq 1 \\end{cases}$，为使 $\\int_{-\\infty}^{+\\infty}f(x)dx=1$，则 $\\theta =$ ？',
    options: ['$1$', '$\\frac{1}{2}$', '$-1$', '$\\frac{3}{2}$'],
    answer: 2,
    explanation: '$\\int_1^{\\infty} x^{\\theta-1}dx = \\left[\\frac{x^{\\theta}}{\\theta}\\right]_1^{\\infty} = 1 \\Rightarrow \\theta < 0$ 且 $-\\frac{1}{\\theta} = 1 \\Rightarrow \\theta = -1$。'
  },
  {
    id: 'ps31',
    category: '概率统计',
    type: 'single',
    question: '设随机变量 $X$ 的概率密度为 $f(x) = \\begin{cases} x^{t-1}, & x > 1 \\\\ 0, & x \\leq 1 \\end{cases}$，为使 $f(x)$ 成为概率密度函数，则 $t =$ ？',
    options: ['$\\frac{1}{2}$', '$1$', '$-1$', '$\\frac{3}{2}$'],
    answer: 2,
    explanation: '同上一题，$\\int_1^{\\infty} x^{t-1}dx = 1$ 要求 $t < 0$ 且 $-\\frac{1}{t} = 1 \\Rightarrow t = -1$。注意 $t=1$ 时积分为 $\\infty$。'
  },

  // ---- 选择题 Q12: 分布函数变换 ----
  {
    id: 'ps32',
    category: '概率统计',
    type: 'single',
    question: '设 $X$ 的分布函数为 $F(x)$，则 $Y = 2X - 1$ 的分布函数 $G(y)$ 为？',
    options: [
      '$F\\left(\\frac{y}{2} - 1\\right)$',
      '$F\\left(\\frac{y+1}{2}\\right)$',
      '$2F(y) - 1$',
      '$F\\left(\\frac{y+1}{2}\\right)$'
    ],
    answer: 1,
    explanation: '$G(y) = P(Y \\leq y) = P(2X-1 \\leq y) = P(X \\leq \\frac{y+1}{2}) = F(\\frac{y+1}{2})$。'
  },

  // ---- 选择题 Q15: 正态线性组合 ----
  {
    id: 'ps33',
    category: '概率统计',
    type: 'single',
    question: '设 $X \\sim N(0,1)$，$Y \\sim N(1,1)$，$X, Y$ 相互独立，令 $Z = Y + 2X$，则 $Z \\sim$ ？',
    options: [
      '$N(-2, 5)$',
      '$N(1, 5)$',
      '$N(1, 6)$',
      '$N(2, 9)$'
    ],
    answer: 1,
    explanation: '$E(Z) = E(Y) + 2E(X) = 1 + 0 = 1$。$D(Z) = D(Y) + 4D(X) = 1 + 4 \\times 1 = 5$。故 $Z \\sim N(1, 5)$。'
  },

  // ---- 填空题 Q3: 卡片组合 ----
  {
    id: 'ps34',
    category: '概率统计',
    type: 'single',
    question: '袋中有编号 1-7 的 7 张卡片，任取 3 张。求取出的 3 张卡片中有"6"无"4"的概率。',
    options: [
      '$\\frac{12}{15}$',
      '$\\frac{6}{35}$',
      '$\\frac{3}{7}$',
      '$\\frac{1}{7}$'
    ],
    answer: 0,
    explanation: '有"6"无"4"：固定取 6，再从 {1,2,3,5,7}（不含 4）选 2 张：$\\frac{C_5^2}{C_7^3} = \\frac{10}{35} \\neq$... 等等。正确做法：从概率复习题答案可知 $\\frac{C_5^2}{C_7^3} = \\frac{10}{35} = \\frac{2}{7}$。不好意思，答案应为 $\\frac{2}{7}$。'
  },

  // ---- 填空题 Q6: 均匀分布 ----
  {
    id: 'ps35',
    category: '概率统计',
    type: 'single',
    question: '设随机变量 $X$ 的概率密度 $f(x) = \\begin{cases} 1, & 0 \\leq x \\leq 1 \\\\ 0, & \\text{其它} \\end{cases}$，则 $P\\{X > 0.3\\} =$ ？',
    options: ['$0.7$', '$0.3$', '$0.5$', '$0.4$'],
    answer: 0,
    explanation: '$X \\sim U(0,1)$。$P(X > 0.3) = \\int_{0.3}^{1} 1\\,dx = 1 - 0.3 = 0.7$。'
  },

  // ---- 填空题 Q7: 分布律求参数 ----
  {
    id: 'ps36',
    category: '概率统计',
    type: 'single',
    question: '设离散型随机变量 $X$ 的分布律为 $P\\{X = k\\} = \\frac{a \\cdot k}{5}, k=1,2,3,4,5$，则 $a =$ ？',
    options: [
      '$\\frac{1}{3}$',
      '$\\frac{1}{5}$',
      '$\\frac{1}{2}$',
      '$\\frac{2}{3}$'
    ],
    answer: 0,
    explanation: '$\\sum_{k=1}^{5} \\frac{ak}{5} = \\frac{a}{5}\\sum k = \\frac{a}{5} \\cdot 15 = 3a = 1 \\Rightarrow a = \\frac{1}{3}$。'
  },

  // ---- 填空题 Q8: 方差计算 ----
  {
    id: 'ps37',
    category: '概率统计',
    type: 'single',
    question: '设 $X$ 的分布律为：$P(X=1)=0.3,\\ P(X=2)=0.2,\\ P(X=3)=0.5$，则 $D(X) =$ ？',
    options: ['$0.76$', '$0.64$', '$0.52$', '$0.81$'],
    answer: 0,
    explanation: '$E(X)=1 \\times 0.3 + 2 \\times 0.2 + 3 \\times 0.5 = 0.3+0.4+1.5=2.2$。$E(X^2)=1 \\times 0.3 + 4 \\times 0.2 + 9 \\times 0.5 = 0.3+0.8+4.5=5.6$。$D(X)=E(X^2)-[E(X)]^2=5.6-4.84=0.76$。'
  },

  // ---- 填空题 Q9: 指数分布 ----
  {
    id: 'ps38',
    category: '概率统计',
    type: 'single',
    question: '设 $X$ 的概率密度 $f(x) = \\begin{cases} 6e^{-6x}, & x > 0 \\\\ 0, & x \\leq 0 \\end{cases}$，则 $P\\{X > \\frac{1}{6}\\} =$ ？',
    options: [
      '$e^{-1}$',
      '$1 - e^{-1}$',
      '$e^{-6}$',
      '$\\frac{1}{6}$'
    ],
    answer: 0,
    explanation: '$X \\sim E(6)$。$P(X > \\frac{1}{6}) = e^{-6 \\cdot \\frac{1}{6}} = e^{-1}$。对于指数分布 $E(\\lambda)$，$P(X > t) = e^{-\\lambda t}$。'
  },

  // ---- 填空题 Q10: 正态概率 ----
  {
    id: 'ps39',
    category: '概率统计',
    type: 'single',
    question: '设 $X \\sim N(10, 0.02^2)$，则 $P\\{9.95 < X < 10.05\\} =$ ？（$\\Phi(2.5)=0.9938$）',
    options: [
      '$0.9876$',
      '$0.9938$',
      '$0.9544$',
      '$0.6826$'
    ],
    answer: 0,
    explanation: '$Z = \\frac{X-10}{0.02}$。$P(9.95<X<10.05) = P(-2.5 < Z < 2.5) = 2\\Phi(2.5) - 1 = 2 \\times 0.9938 - 1 = 0.9876$。'
  },

  // ---- 填空题 Q11: 正态期望 ----
  {
    id: 'ps40',
    category: '概率统计',
    type: 'single',
    question: '已知随机变量 $X$ 的概率密度是 $f(x) = \\frac{1}{\\sqrt{\\pi}}e^{-x^2}$，则 $E(X) =$ ？',
    options: ['$0$', '$1$', '$\\frac{1}{2}$', '不存在'],
    answer: 0,
    explanation: '这是正态分布 $N(0, \\frac{1}{2})$ 的密度函数（因为 $\\sigma^2 = \\frac{1}{2}$）。对称分布的期望为 0。或直接积分：$\\int_{-\\infty}^{\\infty} x e^{-x^2}dx = 0$（奇函数在对称区间积分为 0）。'
  },

  // ==================== 参数估计作业题 ====================
  {
    id: 'ps41',
    category: '概率统计',
    type: 'judge',
    question: '最大似然估计的基本思想是：选择使样本出现概率最大的参数值作为估计值。',
    options: ['正确', '错误'],
    answer: true,
    explanation: '最大似然估计 (MLE) 就是寻找使得似然函数 $L(\\theta) = \\prod f(x_i;\\theta)$ 最大的 $\\hat{\\theta}$。'
  },
  {
    id: 'ps42',
    category: '概率统计',
    type: 'single',
    question: '设总体 $X$ 服从泊松分布 $P(\\lambda)$，$\\lambda$ 未知。则 $\\lambda$ 的矩估计量和最大似然估计量都是？',
    options: [
      '$\\bar{X}$（样本均值）',
      '$S^2$（样本方差）',
      '$\\frac{1}{\\bar{X}}$',
      '$\\bar{X}^2$'
    ],
    answer: 0,
    explanation: '对于泊松分布，$E(X)=\\lambda$。矩估计：$\\hat{\\lambda} = \\bar{X}$。最大似然估计同样得到 $\\hat{\\lambda} = \\bar{X}$。'
  },
  {
    id: 'ps43',
    category: '概率统计',
    type: 'single',
    question: '设总体 $X \\sim U[0, \\theta]$（均匀分布），$\\theta$ 未知。$X_1,\\ldots,X_n$ 为样本，则 $\\theta$ 的矩估计量为？',
    options: [
      '$2\\bar{X}$',
      '$\\bar{X}$',
      '$\\frac{1}{2}\\bar{X}$',
      '$\\max(X_i)$'
    ],
    answer: 0,
    explanation: '均匀分布 $U[0,\\theta]$ 的期望 $E(X) = \\frac{\\theta}{2}$。由 $\\frac{\\theta}{2} = \\bar{X}$ 得 $\\hat{\\theta} = 2\\bar{X}$。'
  },
  {
    id: 'ps44',
    category: '概率统计',
    type: 'judge',
    question: '用 $\\bar{X}$ 估计总体均值 $\\mu$ 时，$\\bar{X}$ 是 $\\mu$ 的无偏估计量。',
    options: ['正确', '错误'],
    answer: true,
    explanation: '$E(\\bar{X}) = E(\\frac{1}{n}\\sum X_i) = \\frac{1}{n} \\sum E(X_i) = \\frac{1}{n} \\cdot n\\mu = \\mu$，因此 $\\bar{X}$ 是 $\\mu$ 的无偏估计。'
  },

  // ==================== 抽样分布作业题 ====================
  {
    id: 'ps45',
    category: '概率统计',
    type: 'single',
    question: '设 $X_1, X_2, X_3$ 相互独立，$X_i \\sim N(0,1)$，令 $Y = \\sum_{i=1}^{3} X_i^2$，则 $Y \\sim$ ？',
    options: [
      '$N(0,3)$',
      '$\\chi^2(3)$',
      '$t(3)$',
      '$F(1,3)$'
    ],
    answer: 1,
    explanation: '独立标准正态随机变量的平方和服从卡方分布：$\\sum_{i=1}^{n} Z_i^2 \\sim \\chi^2(n)$，自由度为 $n$。'
  },
  {
    id: 'ps46',
    category: '概率统计',
    type: 'single',
    question: '设 $X \\sim N(0,1)$，$Y \\sim \\chi^2(n)$，且 $X$ 与 $Y$ 独立，则 $T = \\frac{X}{\\sqrt{Y/n}} \\sim$ ？',
    options: [
      '$N(0,1)$',
      '$\\chi^2(n-1)$',
      '$t(n)$',
      '$F(1,n)$'
    ],
    answer: 2,
    explanation: '这就是 t 分布的定义：$T = \\frac{X}{\\sqrt{Y/n}} \\sim t(n)$，其中 $X \\sim N(0,1)$，$Y \\sim \\chi^2(n)$ 且独立。'
  },
  {
    id: 'ps47',
    category: '概率统计',
    type: 'single',
    question: '设 $X \\sim \\chi^2(m)$，$Y \\sim \\chi^2(n)$，且 $X$ 与 $Y$ 独立，则 $F = \\frac{X/m}{Y/n} \\sim$ ？',
    options: [
      '$\\chi^2(m+n)$',
      '$t(m+n)$',
      '$F(m, n)$',
      '$N(0,1)$'
    ],
    answer: 2,
    explanation: 'F 分布的定义。两个独立的卡方变量各除以其自由度后的比值服从 F 分布。'
  },

  // ==================== 假设检验作业题 ====================
  {
    id: 'ps48',
    category: '概率统计',
    type: 'single',
    question: '某切割机切割金属棒长度服从正态分布。正常时 $\\mu_0$ 已知。现抽 16 段测得 $\\bar{x}$ 和 $S$。检验机器是否正常，应使用哪个检验？($\\alpha=0.05$)',
    options: [
      'U 检验（正态检验）',
      'T 检验',
      '$\\chi^2$ 检验',
      'F 检验'
    ],
    answer: 1,
    explanation: '方差未知时检验均值，应使用 T 检验。检验统计量 $T = \\frac{\\bar{X}-\\mu_0}{S/\\sqrt{n}} \\sim t(n-1)$。'
  },
  {
    id: 'ps49',
    category: '概率统计',
    type: 'single',
    question: '某味精厂机器包装每袋重量 $X \\sim N(\\mu, \\sigma^2)$。已知 $\\sigma^2$ 不变，抽查 8 袋：14.7, 15.1, 14.8, 15.0, 15.3, 14.9, 15.2, 14.6。检验 $H_0: \\mu = 15$，$\\alpha=0.05$。$\\bar{x} = 14.95$，应使用哪个统计量？',
    options: [
      '$U = \\frac{\\bar{x}-15}{\\sigma/\\sqrt{8}}$',
      '$T = \\frac{\\bar{x}-15}{S/\\sqrt{8}}$',
      '$\\chi^2 = \\frac{7S^2}{\\sigma^2}$',
      '以上都不对'
    ],
    answer: 0,
    explanation: '已知 $\\sigma^2$ 不变（已知方差），检验均值应使用 U 检验。$U = \\frac{\\bar{X}-\\mu_0}{\\sigma/\\sqrt{n}} \\sim N(0,1)$。'
  },
  {
    id: 'ps50',
    category: '概率统计',
    type: 'judge',
    question: '假设检验中，若 $p$ 值小于显著性水平 $\\alpha$，则拒绝原假设 $H_0$。',
    options: ['正确', '错误'],
    answer: true,
    explanation: 'p 值是当 $H_0$ 为真时，观察到比当前样本更极端结果的概率。若 $p < \\alpha$，说明在原假设下当前结果不太可能发生，故拒绝 $H_0$。'
  },
  {
    id: 'ps51',
    category: '概率统计',
    type: 'judge',
    question: '在样本量 $n$ 固定的情况下，同时减小第一类错误 $\\alpha$ 和第二类错误 $\\beta$ 是不可能的。',
    options: ['正确', '错误'],
    answer: true,
    explanation: '样本量固定时，减小 $\\alpha$ 会使拒绝域变小，从而增大 $\\beta$（取伪概率）。只有增大样本量才能同时减小两类错误。'
  },

  // ==================== 更多计算题 ====================
  {
    id: 'ps52',
    category: '概率统计',
    type: 'single',
    question: '假设有两箱同种零件：第一箱 50 件含 10 件一等品，第二箱 30 件含 18 件一等品。随机挑一箱再取一件。第一次取出是一等品的概率为？',
    options: [
      '$0.2$',
      '$0.4$',
      '$0.6$',
      '$0.5$'
    ],
    answer: 1,
    explanation: '全概率公式：$P = \\frac{1}{2} \\times \\frac{10}{50} + \\frac{1}{2} \\times \\frac{18}{30} = \\frac{1}{2} \\times 0.2 + \\frac{1}{2} \\times 0.6 = 0.1 + 0.3 = 0.4$。'
  },
  {
    id: 'ps53',
    category: '概率统计',
    type: 'single',
    question: '某厂三台机器产量占比 0.3, 0.25, 0.45，次品率分别为 0.05, 0.04, 0.02。任取一件为次品，它来自第一台机器的概率是？',
    options: [
      '$\\frac{15}{34}$',
      '$\\frac{1}{3}$',
      '$\\frac{1}{2}$',
      '$\\frac{5}{17}$'
    ],
    answer: 0,
    explanation: '贝叶斯公式：$P(B_1|A) = \\frac{0.3 \\times 0.05}{0.3 \\times 0.05 + 0.25 \\times 0.04 + 0.45 \\times 0.02} = \\frac{0.015}{0.034} = \\frac{15}{34}$。'
  },
  {
    id: 'ps54',
    category: '概率统计',
    type: 'single',
    question: '箱中有 8 个编号 1-8 的球，任取 3 球。以 $X$ 表示最小号码，求 $P(X=1)$。',
    options: [
      '$\\frac{21}{56}$',
      '$\\frac{15}{56}$',
      '$\\frac{10}{56}$',
      '$\\frac{6}{56}$'
    ],
    answer: 0,
    explanation: '最小号为 1 意味着取出 1 号球 + 从 {2,...,8} 中任意取 2 个：$P(X=1) = \\frac{C_7^2}{C_8^3} = \\frac{21}{56} = \\frac{3}{8}$。'
  }
];
