# Tauri Kits

**English** | [简体中文](./README.zh-CN.md)

> A Tauri 2 desktop application starter kit, combined with React 19, Ant Design 6, TypeScript, Vite and SQLite3. Ships with a built-in CLI scaffolding tool (`tkits`).

## Features

- **Tauri 2** — cross-platform desktop runtime (Windows / macOS / Linux)
- **React 19 + TypeScript + Vite 7** — modern frontend stack
- **Ant Design 6** — enterprise-grade UI components
- **SQLite3 (sqlx)** — local persistent storage with async Rust driver
- **ECharts** — Bar / Line / Pie chart examples
- **i18next** — built-in English & Chinese internationalization
- **React Router 7** — route guards and nested layout
- **CRUD example** — full user management (login, list, create, update, delete)
- **CLI tool** — `tkits` for scaffolding new projects from this template

## Tech Stack

| Layer    | Technology                                                       |
| -------- | ---------------------------------------------------------------- |
| Runtime  | Tauri 2                                                          |
| Frontend | React 19, TypeScript, Vite 7, Ant Design 6, React Router 7, Sass |
| Charts   | ECharts 5, echarts-for-react                                     |
| i18n     | i18next, react-i18next                                           |
| Backend  | Rust, sqlx (SQLite), md-5, chrono                                |
| Build    | pnpm, Cargo                                                      |

## Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/)
- [Rust](https://www.rust-lang.org/tools/install) (stable toolchain)
- Tauri 2 system dependencies — see [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/)

## Getting Started

### Use the CLI (recommended)

```bash
# Use without installing
npx tkits init

# Or install globally
pnpm add -g tauri-kits
tkits init
```

The CLI will prompt for project name, description and author, then scaffold a new project from this template.

### Manual setup

```bash
# 1. Clone
git clone <repo-url> tauri-kits
cd tauri-kits

# 2. Install dependencies
pnpm install

# 3. Run in development
pnpm tauri dev

# 4. Build for production
pnpm tauri build
```

The dev server runs on `http://localhost:1420`.

## Default Account

The database is initialized on first launch with a default admin account:

- **Username:** `admin`
- **Password:** `admin123`

> Please change the password immediately after first login in a real deployment.

## CLI Commands

```bash
tkits <command> [options]
```

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `tkits init`        | Create a new Tauri project (interactive) |
| `tkits create`      | Same as `init`                       |
| `tkits -V, --version` | Show version                       |
| `tkits -h, --help`  | Show help                            |

## Project Structure

```
tauri-kits/
├── bin/                    # CLI scaffolding tool (tkits)
│   └── tkits.cjs
├── public/                 # Static assets
├── src/                     # Frontend source
│   ├── api/                 # API requests & mock data
│   ├── assets/              # Static assets
│   ├── components/           # Layout, charts, user, login
│   ├── lang/                # i18n (en / zh)
│   ├── router/              # Route configuration
│   ├── store/               # Global state
│   ├── utils/               # Utilities
│   ├── App.tsx
│   └── main.tsx
├── src-tauri/              # Rust / Tauri backend
│   ├── src/
│   │   ├── api.rs           # User CRUD & DB init commands
│   │   ├── lib.rs           # Tauri builder & handler registration
│   │   └── main.rs
│   ├── capabilities/        # Tauri permissions
│   ├── icons/               # App icons
│   ├── Cargo.toml
│   └── tauri.conf.json      # Tauri configuration
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Available Scripts

| Script             | Description                          |
| ------------------ | ------------------------------------ |
| `pnpm dev`         | Start Vite dev server                |
| `pnpm build`       | Type-check and build the frontend    |
| `pnpm preview`     | Preview the production build         |
| `pnpm tauri dev`   | Run the full Tauri app in dev mode   |
| `pnpm tauri build` | Build the production desktop binary  |

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/)
- [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode)
- [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## License

[Apache-2.0](./LICENSE)

## Author

**Shing Rui** — <sunquakes@outlook.com>
