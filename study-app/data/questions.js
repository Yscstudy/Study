// ============================================================
//  刷题数据 — 在此处添加/修改题目
//  格式: { id, category, type, question, options, answer, explanation }
//  type: 'single' (单选) | 'multiple' (多选) | 'judge' (判断)
//  answer: 单选题填正确选项索引 (0-based)，多选题填索引数组 [0,2]，
//          判断题填 true/false
// ============================================================

const QUIZ_DATA = [
  // ==================== 前端开发 ====================
  {
    id: 'q1',
    category: '前端开发',
    type: 'single',
    question: '以下哪个不是 JavaScript 的基本数据类型？',
    options: ['String', 'Number', 'Array', 'Boolean'],
    answer: 2,
    explanation: 'Array 是引用类型（对象），不是基本数据类型。JS 有 7 种基本类型：String, Number, Boolean, Null, Undefined, Symbol, BigInt。'
  },
  {
    id: 'q2',
    category: '前端开发',
    type: 'single',
    question: '`typeof null` 的结果是什么？',
    options: ['"null"', '"undefined"', '"object"', '"string"'],
    answer: 2,
    explanation: '这是 JS 著名的历史 bug。typeof null 返回 "object"，因为在最初的实现中，值的类型标签存在低位，null 的机器码全为 0，与对象标签一致。'
  },
  {
    id: 'q3',
    category: '前端开发',
    type: 'single',
    question: 'CSS 中，以下哪个选择器的优先级最高？',
    options: ['类选择器 .class', 'ID 选择器 #id', '元素选择器 div', '内联样式 style=""'],
    answer: 3,
    explanation: '优先级从高到低：!important > 内联样式(1000) > ID(100) > 类/伪类/属性(10) > 元素/伪元素(1)。'
  },
  {
    id: 'q4',
    category: '前端开发',
    type: 'judge',
    question: '`let` 声明的变量存在变量提升（hoisting），可以在声明前访问。',
    options: ['正确', '错误'],
    answer: false,
    explanation: 'let 和 const 声明确实存在提升，但它们位于"暂时性死区"（TDZ）中，在声明前访问会抛出 ReferenceError，而不是返回 undefined。'
  },
  {
    id: 'q5',
    category: '前端开发',
    type: 'multiple',
    question: '以下哪些是 React Hook？（多选）',
    options: ['useState', 'useEffect', 'useHistory', 'useReducer'],
    answer: [0, 1, 3],
    explanation: 'useState, useEffect, useReducer 是 React 内置 Hook。useHistory 是 react-router 提供的，不是 React 核心 Hook。'
  },

  // ==================== 计算机网络 ====================
  {
    id: 'q6',
    category: '计算机网络',
    type: 'single',
    question: 'HTTP 状态码 403 表示什么含义？',
    options: ['Not Found（未找到）', 'Forbidden（禁止访问）', 'Internal Server Error（服务器内部错误）', 'Unauthorized（未授权）'],
    answer: 1,
    explanation: '403 Forbidden 表示服务器理解请求但拒绝授权。401 Unauthorized 表示需要身份验证（没登录），403 表示已登录但没有权限。'
  },
  {
    id: 'q7',
    category: '计算机网络',
    type: 'single',
    question: 'DNS 解析中，将域名转换为 IP 地址的过程叫做什么？',
    options: ['反向解析', '正向解析', '递归解析', '迭代解析'],
    answer: 1,
    explanation: '域名 → IP 是正向解析（A 记录），IP → 域名是反向解析（PTR 记录）。递归和迭代是解析方式，不是解析方向。'
  },
  {
    id: 'q8',
    category: '计算机网络',
    type: 'judge',
    question: 'UDP 协议提供可靠的数据传输，保证数据按序到达。',
    options: ['正确', '错误'],
    answer: false,
    explanation: 'UDP 是无连接、不可靠的传输协议。它不保证数据到达、不保证顺序、不处理拥塞。可靠性由 TCP 提供。'
  },

  // ==================== 算法与数据结构 ====================
  {
    id: 'q9',
    category: '算法与数据结构',
    type: 'single',
    question: '二分查找的前提条件是什么？',
    options: ['数据必须是整数', '数据必须有序', '数据存储在链表中', '数据量必须大于 1000'],
    answer: 1,
    explanation: '二分查找要求数据按关键字有序排列，这样才能通过比较中间元素来排除一半的搜索空间。时间复杂度 O(log n)。'
  },
  {
    id: 'q10',
    category: '算法与数据结构',
    type: 'single',
    question: '哈希表（Hash Table）的平均查找时间复杂度是多少？',
    options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
    answer: 2,
    explanation: '理想情况下（好的哈希函数 + 低负载因子），哈希表查找、插入、删除都是 O(1)。最坏情况下（大量冲突）退化为 O(n)。'
  },
  {
    id: 'q11',
    category: '算法与数据结构',
    type: 'judge',
    question: '栈（Stack）是一种先进先出（FIFO）的数据结构。',
    options: ['正确', '错误'],
    answer: false,
    explanation: '栈是后进先出（LIFO）。先进先出（FIFO）的是队列（Queue）。记忆方式：栈像一摞盘子，后放的先拿。'
  },

  // ==================== 数据库 ====================
  {
    id: 'q12',
    category: '数据库',
    type: 'single',
    question: 'SQL 中，以下哪个关键字用于去除重复行？',
    options: ['UNIQUE', 'DISTINCT', 'DIFFERENT', 'FILTER'],
    answer: 1,
    explanation: 'SELECT DISTINCT column FROM table 会去除查询结果中的重复行。UNIQUE 是用于定义列约束的关键字。'
  },
  {
    id: 'q13',
    category: '数据库',
    type: 'single',
    question: '事务的 ACID 特性中，I 代表什么？',
    options: ['Integrity（完整性）', 'Isolation（隔离性）', 'Index（索引）', 'Interactive（交互性）'],
    answer: 1,
    explanation: 'ACID 含义：Atomicity（原子性）、Consistency（一致性）、Isolation（隔离性）、Durability（持久性）。'
  },
  {
    id: 'q14',
    category: '数据库',
    type: 'multiple',
    question: '以下哪些操作会触发索引失效？（多选）',
    options: ['WHERE 中使用函数包裹索引列', '使用 LIKE "%keyword" 前缀模糊查询', '使用等于号精确匹配', 'WHERE 中对索引列进行运算'],
    answer: [0, 1, 3],
    explanation: '对索引列使用函数（如 WHERE YEAR(date)=2024）、前导模糊查询（LIKE "%abc"）、列运算（WHERE id+1=10）都会导致索引失效。等于号精确匹配会正常使用索引。'
  }
];
