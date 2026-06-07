# MediaTracker - 个人媒体记录应用

一款现代化的本地优先单页应用，用于跟踪和管理个人阅读（书籍）和观看（动画）记录。

## 功能特点

### 📚 书籍管理
- 书籍CRUD操作：添加、编辑、删除
- 阅读状态管理：想看、在读、已读、弃读
- 1-10星评分系统
- 阅读笔记编辑
- 阅读日期追踪
- 搜索和筛选：书名、作者、状态、评分
- 自定义分类标签

### 🎬 动画管理
- 动画CRUD操作
- 观看状态管理：想看、在看、已看、弃看
- 1-10星评分系统
- 集数跟踪：已看集数/总集数进度条
- 观看笔记编辑
- 观看日期追踪
- 搜索和筛选：名称、制作公司、状态、评分、年份
- 自定义分类标签

### 🔍 外部数据导入
- **Bangumi API 集成**：搜索动画、导入条目信息、导入用户收藏列表
- **Z-Library 集成**：网页解析搜索和导入书籍信息

### 📊 统计面板
- 书籍/动画总数统计
- 月度阅读/观看统计
- 平均评分统计
- 状态分布饼图
- 最近添加列表

### 💾 数据管理
- 本地SQLite数据库存储
- JSON格式数据导出（全量备份）
- CSV格式数据导出（分书籍/动画）
- JSON文件数据导入（支持备份恢复）

### 🎨 界面特性
- 简洁现代的卡片式UI
- 明暗主题切换（支持跟随系统）
- 完整的响应式设计（手机/平板/桌面）
- 主色调：深蓝 #165DFF，强调色：橙色 #FF7D00

## 技术栈

| 类别 | 技术 |
|------|------|
| 前端框架 | Next.js 14 (App Router) |
| 语言 | TypeScript 5.4 |
| UI框架 | Tailwind CSS 3.4 + Radix UI |
| 图标 | Lucide React |
| 数据库 | SQLite (via Prisma ORM) |
| HTTP客户端 | Axios |
| 日期处理 | date-fns |
| HTML解析 | Cheerio |

## 快速开始

### 环境要求

- Node.js 18+
- npm 9+

### 安装步骤

1. 克隆项目并进入目录：
```bash
cd personal-media-tracker
```

2. 安装依赖：
```bash
npm install
```

3. 初始化数据库：
```bash
npx prisma db push
```

4. 启动开发服务器：
```bash
npm run dev
```

5. 打开浏览器访问 `http://localhost:3000`

### 环境变量

创建 `.env` 文件（已提供 `.env.example` 作为模板）：

```env
DATABASE_URL="file:./prisma/media-tracker.db"
```

## 项目结构

```
personal-media-tracker/
├── app/                      # Next.js App Router 页面和API
│   ├── page.tsx              # 仪表盘首页
│   ├── layout.tsx            # 根布局
│   ├── books/                # 书籍相关页面
│   ├── anime/                # 动画相关页面
│   ├── tags/                 # 标签管理页面
│   └── api/                  # API路由
├── components/               # React组件
│   ├── ui/                   # 基础UI组件
│   ├── layout/               # 布局组件
│   ├── books/                # 书籍组件
│   ├── anime/                # 动画组件
│   ├── shared/               # 共享组件
│   └── stats/                # 统计组件
├── lib/                      # 工具库
│   ├── prisma.ts             # Prisma客户端
│   ├── types.ts              # TypeScript类型
│   ├── constants.ts          # 常量配置
│   ├── bangumi.ts            # Bangumi API客户端
│   └── zlib.ts               # Z-Library解析器
├── hooks/                    # React Hooks
├── prisma/                   # Prisma Schema
└── public/                   # 静态资源
```

## 使用指南

### 添加书籍
1. 点击导航栏"书籍"进入书籍列表
2. 点击右上角"添加书籍"按钮
3. 填写书名和作者（必填），其他信息可选
4. 设置阅读状态、评分、标签
5. 点击"添加书籍"保存

### 从Z-Library导入书籍
1. 点击导航栏"导入书籍"
2. 输入书名、作者或ISBN进行搜索
3. 如果访问失败，尝试切换镜像地址
4. 在搜索结果中点击"导入"

### 从Bangumi导入动画
1. 点击导航栏"导入动画"
2. 搜索动画名称，点击"导入"
3. 或输入Bangumi用户名获取收藏列表，选择导入

### 数据备份
1. 在仪表盘点击"数据管理"按钮
2. 选择"导出JSON"进行全量备份
3. 或将导出的JSON文件通过"导入JSON文件"恢复数据

## 免责声明

- 本应用仅用于个人学习和使用目的
- 数据完全存储在本地，不会上传到任何服务器
- Z-Library集成功能请遵守当地法律法规
- 请尊重版权，仅导入你拥有合法访问权限的内容
- Bangumi数据来自Bangumi官方API，请合理使用

## 开发

```bash
# 启动开发服务器
npm run dev

# 查看数据库
npx prisma studio

# 构建生产版本
npm run build

# 运行Lint检查
npm run lint
```
