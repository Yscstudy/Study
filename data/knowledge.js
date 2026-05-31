// ============================================================
//  知识复习数据 — 在此处添加/修改知识点
//  格式: { id, category, title, content (HTML 支持) }
// ============================================================

const KNOWLEDGE_DATA = [
  // ---------- 前端 ----------
  {
    id: 'k1',
    category: '前端开发',
    title: 'JavaScript 闭包 (Closure)',
    content: `
      <p><strong>定义：</strong>闭包是指函数能够访问其外部作用域中变量的能力，即使外部函数已经执行完毕。</p>
      <h4>核心要点</h4>
      <ul>
        <li>函数嵌套函数时，内部函数保留对外部函数变量的引用</li>
        <li>闭包让变量的生命周期得以延长</li>
        <li>常用于：数据封装、回调函数、模块模式</li>
      </ul>
      <pre><code>function outer() {
  let count = 0;
  return function inner() {
    count++;
    return count;
  };
}
const counter = outer();
counter(); // 1
counter(); // 2</code></pre>
    `
  },
  {
    id: 'k2',
    category: '前端开发',
    title: 'CSS Flexbox 布局',
    content: `
      <p><strong>定义：</strong>Flexbox 是一种一维布局模型，用于在容器中高效地排列、对齐和分配空间。</p>
      <h4>容器属性</h4>
      <ul>
        <li><code>display: flex</code> — 开启弹性布局</li>
        <li><code>justify-content</code> — 主轴对齐 (center, space-between, space-around)</li>
        <li><code>align-items</code> — 交叉轴对齐 (center, stretch, flex-start)</li>
        <li><code>flex-direction</code> — 主轴方向 (row | column)</li>
        <li><code>flex-wrap</code> — 是否换行</li>
      </ul>
      <h4>子项属性</h4>
      <ul>
        <li><code>flex: 1</code> — 等分剩余空间</li>
        <li><code>align-self</code> — 单独控制某个子项的对齐</li>
      </ul>
    `
  },
  {
    id: 'k3',
    category: '前端开发',
    title: 'Promise 与异步编程',
    content: `
      <p><strong>定义：</strong>Promise 是表示异步操作最终完成或失败的对象。</p>
      <h4>三种状态</h4>
      <ul>
        <li><strong>Pending</strong> — 初始状态</li>
        <li><strong>Fulfilled</strong> — 操作成功</li>
        <li><strong>Rejected</strong> — 操作失败</li>
      </ul>
      <pre><code>fetch('/api/data')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

// async/await 语法糖
async function getData() {
  try {
    const res = await fetch('/api/data');
    return await res.json();
  } catch (err) {
    console.error(err);
  }
}</code></pre>
    `
  },

  // ---------- 计算机网络 ----------
  {
    id: 'k4',
    category: '计算机网络',
    title: 'HTTP 与 HTTPS 的区别',
    content: `
      <p><strong>HTTP</strong>（超文本传输协议）是应用层协议，<strong>HTTPS</strong> 是 HTTP + SSL/TLS 加密。</p>
      <h4>主要区别</h4>
      <table>
        <tr><th>特性</th><th>HTTP</th><th>HTTPS</th></tr>
        <tr><td>加密</td><td>无</td><td>SSL/TLS 加密</td></tr>
        <tr><td>端口</td><td>80</td><td>443</td></tr>
        <tr><td>证书</td><td>不需要</td><td>需要 CA 证书</td></tr>
        <tr><td>SEO</td><td>较低</td><td>Google 优先收录</td></tr>
      </table>
      <h4>TLS 握手流程（简化）</h4>
      <ol>
        <li>客户端发送支持的加密套件</li>
        <li>服务器返回证书 + 选择的加密套件</li>
        <li>客户端验证证书，生成对称密钥</li>
        <li>双方使用对称密钥加密通信</li>
      </ol>
    `
  },
  {
    id: 'k5',
    category: '计算机网络',
    title: 'TCP 三次握手与四次挥手',
    content: `
      <p><strong>三次握手</strong>建立连接，<strong>四次挥手</strong>释放连接。</p>
      <h4>三次握手</h4>
      <ol>
        <li><strong>SYN</strong>：客户端 → 服务器（我要连接）</li>
        <li><strong>SYN+ACK</strong>：服务器 → 客户端（收到了，可以连）</li>
        <li><strong>ACK</strong>：客户端 → 服务器（好的，连接建立）</li>
      </ol>
      <h4>四次挥手</h4>
      <ol>
        <li><strong>FIN</strong>：主动方 → 被动方（我没数据了）</li>
        <li><strong>ACK</strong>：被动方 → 主动方（知道了）</li>
        <li><strong>FIN</strong>：被动方 → 主动方（我也没数据了）</li>
        <li><strong>ACK</strong>：主动方 → 被动方（好的，断开）</li>
      </ol>
      <p>💡 挥手比握手多一次是因为 TCP 是全双工的，双方需要独立关闭。</p>
    `
  },

  // ---------- 算法 ----------
  {
    id: 'k6',
    category: '算法与数据结构',
    title: '常见排序算法对比',
    content: `
      <table>
        <tr><th>算法</th><th>平均时间</th><th>最坏时间</th><th>空间</th><th>稳定</th></tr>
        <tr><td>冒泡排序</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>✅</td></tr>
        <tr><td>快速排序</td><td>O(n log n)</td><td>O(n²)</td><td>O(log n)</td><td>❌</td></tr>
        <tr><td>归并排序</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n)</td><td>✅</td></tr>
        <tr><td>堆排序</td><td>O(n log n)</td><td>O(n log n)</td><td>O(1)</td><td>❌</td></tr>
      </table>
      <p><strong>选择建议：</strong>数据量小用插入排序，需要稳定用归并，追求平均性能用快排。</p>
    `
  },
  {
    id: 'k7',
    category: '算法与数据结构',
    title: '动态规划 (DP) 核心思想',
    content: `
      <p><strong>核心：</strong>将大问题分解为重叠子问题，通过存储子问题的解避免重复计算。</p>
      <h4>适用条件</h4>
      <ul>
        <li><strong>最优子结构</strong> — 问题的最优解包含子问题的最优解</li>
        <li><strong>重叠子问题</strong> — 子问题被重复计算（区别于分治）</li>
        <li><strong>无后效性</strong> — 状态一旦确定就不受后续决策影响</li>
      </ul>
      <h4>解题步骤</h4>
      <ol>
        <li>定义状态（dp[i] 表示什么）</li>
        <li>找出状态转移方程</li>
        <li>确定初始条件和边界</li>
        <li>确定遍历顺序</li>
      </ol>
    `
  },

  // ---------- 数据库 ----------
  {
    id: 'k8',
    category: '数据库',
    title: 'MySQL 索引原理 (B+Tree)',
    content: `
      <p><strong>定义：</strong>索引是一种用于快速查找记录的数据结构，MySQL InnoDB 使用 B+Tree。</p>
      <h4>B+Tree 特点</h4>
      <ul>
        <li>所有数据存储在叶子节点</li>
        <li>非叶子节点只存索引键，能容纳更多键 → 树更矮</li>
        <li>叶子节点通过双向链表连接，适合范围查询</li>
      </ul>
      <h4>索引类型</h4>
      <ul>
        <li><strong>聚簇索引</strong> — 主键索引，叶子存整行数据</li>
        <li><strong>二级索引</strong> — 非主键索引，叶子存主键值（需要回表）</li>
        <li><strong>覆盖索引</strong> — 查询列都在索引中，无需回表</li>
      </ul>
      <p>⚠️ 索引不是越多越好 — 每次写入都要维护索引，会降低写性能。</p>
    `
  }
];
