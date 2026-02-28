---
title: Neovim, My Way
date: 2026-02-20
description: A walkthrough of my neovim configuration and how its aligned with my workflow
---

# Neovim ,My Way

---

Neovim is a terminal text editor optimized for a keyboard-driven workflow. The goal is to stop thinking about _how_ to edit and let muscle memory take over. Unlike other editors, the more skilled you become at Neovim, the faster and more efficient your editing gets.

People tend to quit Neovim because of the initial learning curve, but once you get the basics down and build muscle memory, other editors start to feel sluggish. That said, simple editing alone is not enough for a productive development environment. IDEs like IntelliJ IDEA shine here — they are optimized for a richer developer experience out of the box. The good news is that Neovim is fully customizable, and with the right configuration you get the same developer experience without sacrificing editing efficiency. This article walks through how I configured Neovim for that.

## Configuration basics

Neovim is configured using Lua, an underrated scripting language that is surprisingly easy to learn. Neovim exposes editor APIs that you can call directly from Lua.

Neovim reads configuration from `$XDG_CONFIG_HOME/nvim/` (typically `~/.config/nvim/`). The following is the structure of my configuration:

```
.
├── init.lua
└── lua
    ├── config
    │   └── lazy.lua
    ├── core
    │   ├── keymaps.lua
    │   └── settings.lua
    └── plugins
        └── plugins.lua
```

### init.lua

This is the entry point for the entire configuration. It simply loads the other modules in the right order:

```lua
require("core.settings")
require("core.keymaps")
require("config.lazy")
```

It loads settings and keymaps first, then hands off to lazy.nvim to manage plugins.

### settings.lua

This file configures the core editor behaviour using `vim.opt`:

```lua
local opt = vim.opt

-- UI
opt.cursorline = true
opt.number = true
opt.relativenumber = true
opt.termguicolors = true
opt.signcolumn = "yes"
opt.showmode = false

-- Indentation
opt.tabstop = 4
opt.softtabstop = 4
opt.shiftwidth = 4
opt.expandtab = true
opt.smartindent = true

-- File handling
opt.swapfile = false
opt.backup = false
opt.undodir = vim.fn.stdpath("data") .. "/undodir"
opt.undofile = true

-- Search
opt.hlsearch = true
opt.incsearch = true
opt.ignorecase = true
opt.smartcase = true

-- Editor behaviour
opt.wrap = false
opt.scrolloff = 8
opt.sidescrolloff = 8
opt.updatetime = 50

-- Leader key
vim.g.mapleader = " "
vim.g.maplocalleader = " "

-- Cosmetic
vim.opt.fillchars = { eob = " " }

-- Disable netrw (replaced by yazi)
vim.g.loaded_netrw = 1
vim.g.loaded_netrwPlugin = 1
```

A few things worth highlighting here:

- **Relative line numbers** — combined with absolute numbers on the cursor line, this makes vertical motions like `10j` or `5k` intuitive.
- **Persistent undo** — `undofile = true` means you can undo changes even after closing and reopening a file.
- **`scrolloff = 8`** — keeps 8 lines of context above and below the cursor, so you're never editing at the very edge of the screen.
- **Space as the leader key** — the most accessible key on the keyboard for custom bindings.
- **`showmode = false`** — mode is displayed in the status line instead, so the redundant echo at the bottom is removed.
- **netrw disabled** — the built-in file explorer is replaced by yazi, a modern terminal file manager.

### keymaps.lua

Keymaps are defined using `vim.keymap.set`. They are grouped by purpose:

**File and window management:**

```lua
vim.keymap.set("n", "<leader>w", "<cmd>w<CR>",        { desc = "Save file" })
vim.keymap.set("n", "<leader>q", "<cmd>q<CR>",        { desc = "Quit" })
vim.keymap.set("n", "<leader>e", "<cmd>Yazi<CR>",     { desc = "Open file explorer" })
vim.keymap.set("n", "<leader>E", "<cmd>Yazi cwd<CR>", { desc = "Open file manager at cwd" })
```

**Window navigation and resizing:**

```lua
vim.keymap.set("n", "<C-h>", "<C-w>h", { desc = "Move to left window" })
vim.keymap.set("n", "<C-j>", "<C-w>j", { desc = "Move to bottom window" })
vim.keymap.set("n", "<C-k>", "<C-w>k", { desc = "Move to top window" })
vim.keymap.set("n", "<C-l>", "<C-w>l", { desc = "Move to right window" })

-- Keep cursor centred when jumping half pages
vim.keymap.set("n", "<C-d>", "<C-d>zz")
vim.keymap.set("n", "<C-u>", "<C-u>zz")

vim.keymap.set("n", "<C-Up>",    "<cmd>resize -2<CR>")
vim.keymap.set("n", "<C-Down>",  "<cmd>resize +2<CR>")
vim.keymap.set("n", "<C-Left>",  "<cmd>vertical resize -2<CR>")
vim.keymap.set("n", "<C-Right>", "<cmd>vertical resize +2<CR>")
```

**Buffer navigation:**

```lua
vim.keymap.set("n", "<S-l>",     "<cmd>bnext<CR>",    { desc = "Next buffer" })
vim.keymap.set("n", "<S-h>",     "<cmd>bprevious<CR>",{ desc = "Previous buffer" })
vim.keymap.set("n", "<leader>bd","<cmd>bdelete<CR>",  { desc = "Delete buffer" })
```

**Telescope (fuzzy finder):**

```lua
vim.keymap.set("n", "<leader>ff", "<cmd>Telescope find_files<CR>",  { desc = "Find files" })
vim.keymap.set("n", "<leader>fg", "<cmd>Telescope live_grep<CR>",   { desc = "Live grep" })
vim.keymap.set("n", "<leader>fb", "<cmd>Telescope buffers<CR>",     { desc = "Find buffers" })
vim.keymap.set("n", "<leader>fr", "<cmd>Telescope oldfiles<CR>",    { desc = "Recent files" })
vim.keymap.set("n", "<leader>fh", "<cmd>Telescope help_tags<CR>",   { desc = "Help tags" })
```

**LSP:**

```lua
vim.keymap.set("n", "gd",         vim.lsp.buf.definition,    { desc = "Go to definition" })
vim.keymap.set("n", "gD",         vim.lsp.buf.declaration,   { desc = "Go to declaration" })
vim.keymap.set("n", "gi",         vim.lsp.buf.implementation,{ desc = "Go to implementation" })
vim.keymap.set("n", "gr",         vim.lsp.buf.references,    { desc = "References" })
vim.keymap.set("n", "K",          vim.lsp.buf.hover,         { desc = "Hover docs" })
vim.keymap.set("n", "<leader>rn", vim.lsp.buf.rename,        { desc = "Rename" })
vim.keymap.set("n", "<leader>ca", vim.lsp.buf.code_action,   { desc = "Code action" })
vim.keymap.set("n", "[d",         vim.diagnostic.goto_prev,  { desc = "Previous diagnostic" })
vim.keymap.set("n", "]d",         vim.diagnostic.goto_next,  { desc = "Next diagnostic" })
vim.keymap.set("n", "<leader>d",  vim.diagnostic.open_float, { desc = "Show diagnostic" })
vim.keymap.set("n", "<leader>D",  "<cmd>Telescope diagnostics<CR>", { desc = "All diagnostics" })
```

**Formatting and clipboard:**

```lua
vim.keymap.set({ "n", "v" }, "<leader>fm", function()
    require("conform").format()
end, { desc = "Format code" })

vim.keymap.set("v", "<leader>y", '"+y',  { desc = "Copy to system clipboard" })
vim.keymap.set("n", "<leader>Y", '"+yy', { desc = "Copy line to system clipboard" })
vim.keymap.set("n", "<leader>p", '"+p',  { desc = "Paste from system clipboard" })
vim.keymap.set("n", "<leader>P", '"+P',  { desc = "Paste before from system clipboard" })
```

## Plugin management

Plugins are managed by [lazy.nvim](https://github.com/folke/lazy.nvim), the standard plugin manager for modern Neovim setups. The `config/lazy.lua` file bootstraps it on first run — if lazy.nvim is not installed it clones it from GitHub, then sets it up to load everything from the `plugins` module:

```lua
require("lazy").setup({
    spec = { { import = "plugins" } },
    install = { colorscheme = { "oxocarbon" } },
    checker = { enabled = false },
    performance = {
        rtp = {
            disabled_plugins = { "gzip", "tarPlugin", "tohtml", "tutor", "zipPlugin" },
        },
    },
})
```

A handful of built-in plugins that I never use are disabled to keep startup lean.

## Plugins

All plugins live in `lua/plugins/plugins.lua`. Here is a breakdown of what I use and why.

### Colorscheme — oxocarbon

```lua
{
    "nyoom-engineering/oxocarbon.nvim",
    lazy = false,
    priority = 1000,
    config = function()
        vim.cmd([[colorscheme oxocarbon]])
        -- Transparent background
        vim.api.nvim_set_hl(0, "Normal",      { bg = "none" })
        vim.api.nvim_set_hl(0, "NormalFloat", { bg = "none" })
        vim.api.nvim_set_hl(0, "NormalNC",    { bg = "none" })
        vim.api.nvim_set_hl(0, "FloatBorder", { bg = "none" })
    end,
}
```

Oxocarbon is a dark theme inspired by IBM's Carbon design system. The background is set to transparent so the terminal's own background shows through.

### Status line — lualine

```lua
{
    "nvim-lualine/lualine.nvim",
    config = function()
        require("lualine").setup({
            options = {
                theme = "auto",
                component_separators = { left = "", right = "" },
                section_separators  = { left = "", right = "" },
                globalstatus = true,
            },
            sections = {
                lualine_a = { "mode" },
                lualine_b = { "branch", "diff", "diagnostics" },
                lualine_c = { { "filename", path = 1 } },
                lualine_x = { "encoding", "fileformat", "filetype" },
                lualine_y = { "progress" },
                lualine_z = { "location" },
            },
        })
    end,
}
```

Lualine provides a clean, informative status bar. With `globalstatus = true` there is a single status bar at the bottom rather than one per split, which looks much cleaner.

### Indentation guides — indent-blankline

```lua
{
    "lukas-reineke/indent-blankline.nvim",
    main = "ibl",
    opts = {
        indent = { char = "│" },
        scope  = { enabled = true },
    },
}
```

Draws vertical lines at each indentation level and highlights the current scope, making nested code much easier to read.

### File manager — yazi

```lua
{
    "mikavilpas/yazi.nvim",
    event = "VeryLazy",
    opts = {
        open_for_directories    = false,
        floating_window_scaling_factor = 0.8,
        keymaps = { show_help = "<f1>" },
    },
}
```

[Yazi](https://github.com/sxyazi/yazi) is a blazing fast terminal file manager written in Rust. It opens in a floating window via `<leader>e`, which is much more capable and pleasant than netrw.

### Fuzzy finder — Telescope

```lua
{
    "nvim-telescope/telescope.nvim",
    branch = "0.1.x",
    dependencies = {
        "nvim-lua/plenary.nvim",
        { "nvim-telescope/telescope-fzf-native.nvim", build = "make" },
    },
    config = function()
        require("telescope").setup({
            extensions = {
                fzf = {
                    fuzzy                   = true,
                    override_generic_sorter = true,
                    override_file_sorter    = true,
                    case_mode               = "smart_case",
                },
            },
        })
        require("telescope").load_extension("fzf")
    end,
}
```

Telescope is the go-to fuzzy finder for Neovim. The `fzf-native` extension swaps out the default sorter for a compiled C implementation, making it noticeably faster on large codebases.

### Syntax highlighting — Treesitter

```lua
{
    "nvim-treesitter/nvim-treesitter",
    build = ":TSUpdate",
    config = function()
        require("nvim-treesitter.configs").setup({
            ensure_installed = {
                "lua", "vim", "vimdoc",
                "javascript", "typescript", "tsx", "html", "css",
                "rust", "go", "python",
                "json", "yaml", "toml", "markdown", "bash", "sql",
                "dockerfile", "git_config", "gitcommit",
            },
            auto_install = true,
            highlight    = { enable = true },
            indent       = { enable = true },
        })
    end,
}
```

Treesitter parses source code into an AST and uses it for accurate syntax highlighting, indentation, and text object selection — far more reliable than regex-based highlighting.

### LSP — Mason + nvim-lspconfig

The language server setup uses three plugins that work together:

1. **mason.nvim** — installs and manages language servers, linters, and formatters.
2. **mason-lspconfig.nvim** — bridges mason with nvim-lspconfig and auto-installs the servers I need.
3. **nvim-lspconfig** — configures each language server.

Servers configured: `rust_analyzer`, `ts_ls`, `gopls`, `lua_ls`, `pyright`, `html`, `cssls`, `emmet_ls`, `jsonls`.

Each server gets sensible defaults with capabilities wired to nvim-cmp for completion. Diagnostics are displayed with custom icons in the sign column:

```lua
local signs = { Error = "󰅚", Warn = "󰀪", Hint = "󰌶", Info = "" }
for type, icon in pairs(signs) do
    local hl = "DiagnosticSign" .. type
    vim.fn.sign_define(hl, { text = icon, texthl = hl, numhl = hl })
end
```

### Completion — nvim-cmp

```lua
{
    "hrsh7th/nvim-cmp",
    dependencies = { "hrsh7th/cmp-nvim-lsp", "hrsh7th/cmp-buffer", "hrsh7th/cmp-path" },
    config = function()
        local cmp = require("cmp")
        cmp.setup({
            mapping = cmp.mapping.preset.insert({
                ["<C-Space>"] = cmp.mapping.complete(),
                ["<CR>"]      = cmp.mapping.confirm({ select = false }),
            }),
            sources = cmp.config.sources({
                { name = "nvim_lsp" },
                { name = "buffer" },
                { name = "path" },
            }),
        })
    end,
}
```

nvim-cmp provides the completion menu. Sources are prioritised in order: LSP suggestions first, then words from the current buffer, then file paths.

### Formatting — conform.nvim

```lua
{
    "stevearc/conform.nvim",
    event = "BufWritePre",
    opts = {
        formatters_by_ft = {
            lua        = { "stylua" },
            python     = { "ruff" },
            rust       = { "rustfmt" },
            go         = { "gofumpt", "goimports" },
            javascript = { "prettier" },
            typescript = { "prettier" },
            html       = { "prettier" },
            css        = { "prettier" },
            json       = { "prettier" },
            markdown   = { "prettier" },
        },
        format_on_save = { timeout_ms = 500, lsp_fallback = true },
    },
}
```

conform.nvim runs the appropriate formatter on save for each filetype. `lsp_fallback = true` means if no dedicated formatter is configured, it falls back to the LSP's built-in formatting.

### AI — GitHub Copilot

```lua
{
    "github/copilot.vim",
    event = "InsertEnter",
    config = function()
        vim.g.copilot_no_tab_map = true
        vim.keymap.set("i", "<C-J>", 'copilot#Accept("\\<CR>")', {
            expr = true,
            replace_keycodes = false,
        })
    end,
}
```

Copilot is enabled selectively for the languages I actually use. Tab is left free for completion, and `<C-j>` accepts suggestions instead.

### Editing utilities

- **Comment.nvim** — `gcc` to toggle line comments, `gc` in visual mode for block comments.
- **mini.pairs** — auto-closes brackets, quotes, and parentheses.
- **nvim-surround** — add, change, or delete surrounding characters (quotes, brackets, tags).

### Visual helpers

- **which-key.nvim** — pops up a menu showing available keybindings after you press the leader key. Invaluable while building muscle memory.
- **todo-comments.nvim** — highlights `TODO`, `FIXME`, `HACK`, and similar tags in comments with distinct colours and icons.
- **trouble.nvim** — a better diagnostics panel, accessible via `<leader>D`, that shows all LSP errors and warnings in a structured list.

## Closing thoughts

This configuration gives me a fast, keyboard-driven editor with full IDE features — LSP, completion, formatting, fuzzy finding, and AI assistance — without the overhead of a traditional IDE. The key is that everything is explicit: I know exactly what is installed, why it is there, and what key does what. That transparency is what makes Neovim worth the initial investment.

The full config is available at `~/.config/nvim/` on my machine, structured as described above.
