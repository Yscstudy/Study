# Study App — 学习助手

📚 **知识复习** + ✏️ **刷题练习** — 一站式学习平台

## 功能

- **知识复习**：分类浏览、关键词搜索、折叠卡片，支持 LaTeX 数学公式
- **刷题练习**：单选、多选、判断三种题型，即时反馈 + 详细解析，成绩统计
- **涵盖科目**：前端开发、计算机网络、算法与数据结构、数据库、概率统计

## 使用方式

直接访问 GitHub Pages 地址，或本地打开 `index.html`。

## 添加题目

编辑 `data/questions.js`（编程类）或 `data/prob-stat-questions.js`（数学类），按格式添加即可：

```js
{
  id: 'q100',
  category: '概率统计',
  type: 'single',           // single | multiple | judge
  question: '题目文字，支持 $LaTeX$ 公式',
  options: ['选项A', '选项B', '选项C', '选项D'],
  answer: 0,                // 正确选项索引（0-based）
  explanation: '解析文字'
}
```

## 技术栈

- 纯 HTML/CSS/JS，零依赖（MathJax CDN 用于数学公式渲染）
- 响应式设计，适配手机和桌面
