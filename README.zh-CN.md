# Tauri Kits

[English](./README.md) | **简体中文**

> 基于 Tauri 2 的桌面应用脚手架，集成 React 19、Ant Design 6、TypeScript、Vite 与 SQLite3，并内置 `tkits` CLI 脚手架工具。

## 特性

- **Tauri 2** —— 跨平台桌面运行时（Windows / macOS / Linux）
- **React 19 + TypeScript + Vite 7** —— 现代化前端技术栈
- **Ant Design 6** —— 企业级 UI 组件库
- **SQLite3 (sqlx)** —— 本地持久化存储，使用 Rust 异步驱动
- **ECharts** —— 柱状图 / 折线图 / 饼图示例
- **i18next** —— 内置中英文国际化
- **React Router 7** —— 路由守卫与嵌套布局
- **CRUD 示例** —— 完整的用户管理（登录、列表、新增、编辑、删除）
- **CLI 工具** —— `tkits` 用于基于本模板快速创建新项目

## 技术栈

| 层级   | 技术                                                             |
| ------ | ---------------------------------------------------------------- |
| 运行时 | Tauri 2                                                          |
| 前端   | React 19、TypeScript、Vite 7、Ant Design 6、React Router 7、Sass |
| 图表   | ECharts 5、echarts-for-react                                     |
| 国际化 | i18next、react-i18next                                           |
| 后端   | Rust、sqlx (SQLite)、md-5、chrono                                 |
| 构建   | pnpm、Cargo                                                      |

## 环境要求

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/)
- [Rust](https://www.rust-lang.org/tools/install)（stable 工具链）
- Tauri 2 系统依赖 —— 详见 [Tauri 前置条件](https://v2.tauri.app/start/prerequisites/)

## 快速开始

### 使用 CLI（推荐）

```bash
# 免安装使用
npx tkits init

# 或全局安装
pnpm add -g tauri-kits
tkits init
```

CLI 会依次询问项目名称、描述与作者，然后基于本模板生成新项目。

### 手动安装

```bash
# 1. 克隆仓库
git clone <repo-url> tauri-kits
cd tauri-kits

# 2. 安装依赖
pnpm install

# 3. 开发模式运行
pnpm tauri dev

# 4. 生产构建
pnpm tauri build
```

开发服务器地址：`http://localhost:1420`。

## 默认账号

首次启动时会自动初始化数据库，并创建默认管理员账号：

- **用户名：** `admin`
- **密码：** `admin123`

> 在正式部署中，首次登录后请立即修改默认密码。

## CLI 命令

```bash
tkits <command> [options]
```

| 命令                | 说明                              |
| ------------------- | --------------------------------- |
| `tkits init`        | 交互式创建新的 Tauri 项目          |
| `tkits create`      | 同 `init`                         |
| `tkits -V, --version` | 查看版本号                      |
| `tkits -h, --help`  | 查看帮助信息                      |

## 项目结构

```
tauri-kits/
├── bin/                    # CLI 脚手架工具 (tkits)
│   └── tkits.cjs
├── public/                 # 静态资源
├── src/                     # 前端源码
│   ├── api/                 # 接口请求与 mock 数据
│   ├── assets/              # 静态资源
│   ├── components/          # 布局、图表、用户、登录组件
│   ├── lang/                # 国际化 (en / zh)
│   ├── router/              # 路由配置
│   ├── store/               # 全局状态
│   ├── utils/               # 工具函数
│   ├── App.tsx
│   └── main.tsx
├── src-tauri/              # Rust / Tauri 后端
│   ├── src/
│   │   ├── api.rs           # 用户增删改查与数据库初始化命令
│   │   ├── lib.rs           # Tauri 构建与命令注册
│   │   └── main.rs
│   ├── capabilities/        # Tauri 权限配置
│   ├── icons/               # 应用图标
│   ├── Cargo.toml
│   └── tauri.conf.json      # Tauri 配置文件
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 可用脚本

| 脚本               | 说明                          |
| ------------------ | ----------------------------- |
| `pnpm dev`         | 启动 Vite 开发服务器          |
| `pnpm build`       | 类型检查并构建前端            |
| `pnpm preview`     | 预览生产构建                  |
| `pnpm tauri dev`   | 以开发模式运行 Tauri 应用     |
| `pnpm tauri build` | 构建生产桌面安装包            |

## 推荐 IDE 配置

- [VS Code](https://code.visualstudio.com/)
- [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode)
- [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## 许可证

[Apache-2.0](./LICENSE)

## 作者

**Shing Rui** —— <sunquakes@outlook.com>
