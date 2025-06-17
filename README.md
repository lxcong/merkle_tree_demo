# Merkle Tree Demo

这是一个演示 Merkle Tree 实现的 Web 应用。该项目使用 TypeScript 实现核心功能，并使用 Next.js 构建前端界面。

## 功能特点

- 生成 Merkle Tree
- 查询指定节点的 Merkle 路径
- 验证 Merkle 路径的合法性
- 交互式 Web 界面

## 技术栈

- TypeScript
- Next.js
- Tailwind CSS
- Jest (用于单元测试)

## 演示Demo
https://merkle-tree-demo.vercel.app/

## 本地开发

1. 安装依赖：
```bash
npm install
```

2. 运行开发服务器：
```bash
npm run dev
```

3. 运行测试：
```bash
npm test
```

## 项目结构

```
.
├── src/
│   └── MerkleTree.ts    # Merkle Tree 核心实现
├── tests/
│   └── MerkleTree.test.ts  # 单元测试
├── pages/
│   ├── _app.tsx         # Next.js 应用入口
│   └── index.tsx        # 主页
└── styles/
    └── globals.css      # 全局样式
```

## Merkle Tree 实现说明

Merkle Tree 是一种树形数据结构，用于高效地验证大型数据结构的内容。本项目实现了以下核心功能：

1. 构建 Merkle Tree
   - 使用 SHA-256 哈希函数
   - 自动处理奇数个叶子节点的情况
   - 生成唯一的根哈希

2. 生成 Merkle 证明
   - 为指定叶子节点生成验证路径
   - 包含兄弟节点的哈希值
   - 记录节点在树中的位置

3. 验证 Merkle 证明
   - 使用提供的证明路径重建根哈希
   - 验证重建的根哈希是否匹配
   - 确保数据完整性

## 部署

该项目可以部署到 Vercel：

1. 将代码推送到 GitHub 仓库
2. 在 Vercel 中导入项目
3. 自动部署完成

## 许可证

ISC 