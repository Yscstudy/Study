// ============================================================
//  概率统计 — 知识复习数据
//  公式使用 LaTeX 语法，由 MathJax 渲染
//  行内公式: $...$   块级公式: $$...$$
// ============================================================

const PROB_STAT_KNOWLEDGE = [
  {
    id: 'ps1',
    category: '概率统计',
    title: '事件的关系与运算',
    content: `
      <p>设 $A, B, C$ 为三个随机事件，$S$ 为样本空间。</p>
      <h4>基本关系</h4>
      <ul>
        <li><strong>包含：</strong>$A \\subset B$ — A 发生则 B 必发生</li>
        <li><strong>相等：</strong>$A = B$ — $A \\subset B$ 且 $B \\subset A$</li>
        <li><strong>互不相容（互斥）：</strong>$AB = \\varnothing$ — A 与 B 不能同时发生</li>
        <li><strong>对立事件：</strong>$A \\cup B = S$ 且 $AB = \\varnothing$，记 $B = \\bar{A}$</li>
      </ul>
      <h4>基本运算</h4>
      <ul>
        <li><strong>和事件：</strong>$A \\cup B$ — A 与 B 至少有一个发生</li>
        <li><strong>积事件：</strong>$A \\cap B$（或 $AB$）— A 与 B 同时发生</li>
        <li><strong>差事件：</strong>$A - B$ — A 发生而 B 不发生</li>
      </ul>
      <h4>运算律</h4>
      <ul>
        <li>交换律：$A \\cup B = B \\cup A$，$A \\cap B = B \\cap A$</li>
        <li>结合律：$(A \\cup B) \\cup C = A \\cup (B \\cup C)$</li>
        <li>分配律：$A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)$</li>
        <li><strong>De Morgan 律：</strong>$\\overline{A \\cup B} = \\bar{A} \\cap \\bar{B}$，$\\overline{A \\cap B} = \\bar{A} \\cup \\bar{B}$</li>
      </ul>
    `
  },
  {
    id: 'ps2',
    category: '概率统计',
    title: '概率的基本公式',
    content: `
      <h4>加法公式</h4>
      <p>$P(A \\cup B) = P(A) + P(B) - P(AB)$</p>
      <p>若 A、B 互不相容：$P(A \\cup B) = P(A) + P(B)$</p>
      <h4>条件概率</h4>
      <p>$P(B|A) = \\dfrac{P(AB)}{P(A)}$，其中 $P(A) > 0$</p>
      <h4>乘法公式</h4>
      <p>$P(AB) = P(A) \\cdot P(B|A) = P(B) \\cdot P(A|B)$</p>
      <h4>全概率公式</h4>
      <p>若 $B_1, B_2, \\ldots, B_n$ 为样本空间的一个划分，则：</p>
      <p>$$P(A) = \\sum_{i=1}^{n} P(B_i) \\cdot P(A|B_i)$$</p>
      <h4>贝叶斯公式 (Bayes)</h4>
      <p>$$P(B_i|A) = \\frac{P(B_i) \\cdot P(A|B_i)}{\\sum_{j=1}^{n} P(B_j) \\cdot P(A|B_j)}$$</p>
      <p>💡 贝叶斯公式用于"执果索因"——已知结果 A 发生，反推原因 $B_i$ 的概率。</p>
    `
  },
  {
    id: 'ps3',
    category: '概率统计',
    title: '常见离散型分布',
    content: `
      <table>
        <tr><th>分布</th><th>分布律</th><th>期望 $E(X)$</th><th>方差 $D(X)$</th></tr>
        <tr>
          <td>0-1 分布<br>$X \\sim B(1, p)$</td>
          <td>$P(X=k)=p^k(1-p)^{1-k}$, $k=0,1$</td>
          <td>$p$</td>
          <td>$p(1-p)$</td>
        </tr>
        <tr>
          <td>二项分布<br>$X \\sim B(n, p)$</td>
          <td>$P(X=k)=C_n^k p^k (1-p)^{n-k}$</td>
          <td>$np$</td>
          <td>$np(1-p)$</td>
        </tr>
        <tr>
          <td>泊松分布<br>$X \\sim P(\\lambda)$</td>
          <td>$P(X=k)=\\frac{\\lambda^k}{k!}e^{-\\lambda}$</td>
          <td>$\\lambda$</td>
          <td>$\\lambda$</td>
        </tr>
        <tr>
          <td>几何分布</td>
          <td>$P(X=k)=(1-p)^{k-1}p$</td>
          <td>$\\frac{1}{p}$</td>
          <td>$\\frac{1-p}{p^2}$</td>
        </tr>
      </table>
    `
  },
  {
    id: 'ps4',
    category: '概率统计',
    title: '常见连续型分布',
    content: `
      <table>
        <tr><th>分布</th><th>密度函数 $f(x)$</th><th>期望</th><th>方差</th></tr>
        <tr>
          <td>均匀分布<br>$X \\sim U(a, b)$</td>
          <td>$f(x)=\\frac{1}{b-a}, x \\in [a,b]$</td>
          <td>$\\frac{a+b}{2}$</td>
          <td>$\\frac{(b-a)^2}{12}$</td>
        </tr>
        <tr>
          <td>指数分布<br>$X \\sim E(\\lambda)$</td>
          <td>$f(x)=\\lambda e^{-\\lambda x}, x>0$</td>
          <td>$\\frac{1}{\\lambda}$</td>
          <td>$\\frac{1}{\\lambda^2}$</td>
        </tr>
        <tr>
          <td>正态分布<br>$X \\sim N(\\mu, \\sigma^2)$</td>
          <td>$f(x)=\\frac{1}{\\sqrt{2\\pi}\\sigma}e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}$</td>
          <td>$\\mu$</td>
          <td>$\\sigma^2$</td>
        </tr>
      </table>
      <h4>正态分布的重要性质</h4>
      <ul>
        <li>标准化：若 $X \\sim N(\\mu, \\sigma^2)$，则 $Z = \\frac{X-\\mu}{\\sigma} \\sim N(0,1)$</li>
        <li>$P(\\mu-\\sigma < X < \\mu+\\sigma) \\approx 0.6826$</li>
        <li>$P(\\mu-2\\sigma < X < \\mu+2\\sigma) \\approx 0.9544$</li>
        <li>$P(\\mu-3\\sigma < X < \\mu+3\\sigma) \\approx 0.9974$（3σ 准则）</li>
      </ul>
    `
  },
  {
    id: 'ps5',
    category: '概率统计',
    title: '数学期望与方差的性质',
    content: `
      <h4>数学期望的性质</h4>
      <ul>
        <li>$E(C) = C$（C 为常数）</li>
        <li>$E(CX) = C \\cdot E(X)$</li>
        <li>$E(X \\pm Y) = E(X) \\pm E(Y)$</li>
        <li>若 X、Y 独立，则 $E(XY) = E(X) \\cdot E(Y)$</li>
      </ul>
      <h4>方差的性质</h4>
      <ul>
        <li>$D(X) = E(X^2) - [E(X)]^2$</li>
        <li>$D(C) = 0$</li>
        <li>$D(CX) = C^2 \\cdot D(X)$</li>
        <li>$D(X + C) = D(X)$</li>
        <li>若 X、Y 独立，则 $D(X \\pm Y) = D(X) + D(Y)$</li>
      </ul>
      <h4>协方差与相关系数</h4>
      <ul>
        <li>$\\text{Cov}(X,Y) = E(XY) - E(X)E(Y)$</li>
        <li>$\\rho_{XY} = \\frac{\\text{Cov}(X,Y)}{\\sqrt{D(X)}\\sqrt{D(Y)}}$，$|\\rho| \\leq 1$</li>
        <li>$\\rho = 0$ ⇔ X 与 Y 不相关（独立 ⇒ 不相关，反之不成立）</li>
      </ul>
    `
  },
  {
    id: 'ps6',
    category: '概率统计',
    title: '参数估计 — 点估计与区间估计',
    content: `
      <h4>矩估计法</h4>
      <p>用样本矩代替总体矩，建立方程求解参数。</p>
      <p>样本均值 $\\bar{X} = \\frac{1}{n}\\sum X_i$ 估计总体期望 $E(X)$</p>
      <h4>最大似然估计 (MLE)</h4>
      <ol>
        <li>写出似然函数 $L(\\theta) = \\prod_{i=1}^{n} f(x_i; \\theta)$</li>
        <li>取对数 $\\ln L(\\theta)$</li>
        <li>求导 $\\frac{d\\ln L}{d\\theta} = 0$，解得 $\\hat{\\theta}$</li>
      </ol>
      <h4>估计量的评价标准</h4>
      <ul>
        <li><strong>无偏性：</strong>$E(\\hat{\\theta}) = \\theta$</li>
        <li><strong>有效性：</strong>$D(\\hat{\\theta}_1) < D(\\hat{\\theta}_2)$，则 $\\hat{\\theta}_1$ 更有效</li>
        <li><strong>一致性：</strong>$\\hat{\\theta} \\xrightarrow{P} \\theta$（$n \\to \\infty$）</li>
      </ul>
      <h4>正态总体均值的置信区间</h4>
      <ul>
        <li>$\\sigma^2$ 已知：$\\bar{X} \\pm u_{\\alpha/2} \\cdot \\frac{\\sigma}{\\sqrt{n}}$</li>
        <li>$\\sigma^2$ 未知：$\\bar{X} \\pm t_{\\alpha/2}(n-1) \\cdot \\frac{S}{\\sqrt{n}}$</li>
      </ul>
    `
  },
  {
    id: 'ps7',
    category: '概率统计',
    title: '假设检验的基本概念',
    content: `
      <h4>基本步骤</h4>
      <ol>
        <li>建立原假设 $H_0$ 和备择假设 $H_1$</li>
        <li>选择合适的检验统计量</li>
        <li>给定显著性水平 $\\alpha$，确定拒绝域</li>
        <li>计算统计量的值，做出决策</li>
      </ol>
      <h4>两类错误</h4>
      <ul>
        <li><strong>第一类错误（弃真）：</strong>$H_0$ 为真时拒绝 $H_0$，概率为 $\\alpha$</li>
        <li><strong>第二类错误（取伪）：</strong>$H_0$ 为假时接受 $H_0$，概率为 $\\beta$</li>
      </ul>
      <h4>常见检验方法</h4>
      <table>
        <tr><th>检验内容</th><th>统计量</th><th>分布</th></tr>
        <tr><td>均值 $\\mu$（$\\sigma^2$ 已知）</td><td>$U = \\frac{\\bar{X}-\\mu_0}{\\sigma/\\sqrt{n}}$</td><td>$N(0,1)$</td></tr>
        <tr><td>均值 $\\mu$（$\\sigma^2$ 未知）</td><td>$T = \\frac{\\bar{X}-\\mu_0}{S/\\sqrt{n}}$</td><td>$t(n-1)$</td></tr>
        <tr><td>方差 $\\sigma^2$</td><td>$\\chi^2 = \\frac{(n-1)S^2}{\\sigma_0^2}$</td><td>$\\chi^2(n-1)$</td></tr>
      </table>
    `
  }
];
