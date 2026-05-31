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
  }
];
