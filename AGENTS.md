# Desktop - AGENTS.md

## Module Overview

- **Platform**: Desktop
- **Scope**: Cross-platform Desktop App
- **Tech Stack**: Tauri 2 / React 19 / TypeScript / Rust

## Directory Structure

```
apps/desktop/
├── AGENTS.md                # This file
├── public/                  # Static resources
├── src/                     # Frontend source code
│   ├── api/                 # API requests (one file per module)
│   ├── components/          # Components (module dirs + shared)
│   │   ├── <module>/        # Module-specific components
│   │   ├── layout/          # Layout components
│   │   └── chart/           # Chart components
│   ├── lang/                # i18n (en.ts, zh.ts)
│   ├── router/              # Router configuration
│   ├── store/               # State management (one file per module)
│   └── utils/               # Utility functions
├── src-tauri/               # Rust backend
│   ├── src/
│   │   ├── api/             # API modules (one file per module)
│   │   ├── lib.rs           # Plugin registration
│   │   └── main.rs          # Entry point
│   └── icons/               # App icons
└── ...                      # Configuration files
```

## Coding Standards

### Naming Conventions

- Frontend module directory: `src/components/<module>/`
- Frontend API file: `src/api/<module>.ts` (lowercase)
- Frontend store file: `src/store/<module>.ts`
- Rust module file: `src-tauri/src/api/<module>.rs`
- Rust commands: `api_<module>_<action>` (snake_case)
- Database table: singular snake_case
- Route path: `/<module>` (kebab-case)

### IPC Response Shape

Every Rust command returns:

```rust
pub struct ApiResponse<T> {
    pub code: i32,        // 200 = success
    pub message: String,
    pub data: Option<T>,
}
```

### Styling

- One SCSS file per page: `<Module>.scss` co-located with the page component
- Use existing class layout: `.page-header`, `.stats-row`, `.search-card`, `.table-card`

### i18n

- All user-visible strings must go through `t('...')` from `react-i18next`
- Add keys to BOTH `src/lang/en.ts` and `src/lang/zh.ts`

## Build Commands

```bash
# Development
pnpm dev --filter=desktop
npm run dev:desktop

# Build
pnpm build --filter=desktop
npm run build:desktop

# Tauri dev
cd apps/desktop && pnpm tauri dev

# Tauri build
cd apps/desktop && pnpm tauri build
```

## Adding a New Module

Follow these steps to add a new business module:

1. Create Rust module file: `src-tauri/src/api/<module>.rs`
2. Add CRUD commands in the module file
3. Register module in `src-tauri/src/api.rs` and `src-tauri/src/lib.rs`
4. Create frontend API file: `src/api/<module>.ts`
5. Create frontend page: `src/components/<module>/index.tsx`
6. Create module store: `src/store/<module>.ts`
7. Register route in `src/router/index.tsx`
8. Add menu entry in `src/components/layout/Menu.tsx`
9. Add i18n keys in `src/lang/en.ts` and `src/lang/zh.ts`
10. Verify with `pnpm tauri dev`