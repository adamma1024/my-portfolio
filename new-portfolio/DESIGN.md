# Lin Ma · Portfolio 设计规范

> 状态：**已锁定（2026-11-13）并已实现**。偏离需先改本文；实现中的偏离记在第 13 节。
> 交互原型：<https://claude.ai/artifact/7ve7ThCyEaoaYGnLHKBvaC>（v4，私有链接）
> 主题实现：[`src/styles/theme.css`](src/styles/theme.css)（已用 Tailwind 4.3 + `@catppuccin/tailwindcss@1.0.0` 编译，并在无头 Chrome 里验证过 Latte / Mocha / 强调色切换）

## 1. 目标

让人一眼看出：**重交互、有设计品味的工程师**，同时是 **Sekai 客户端工程负责人** 和 **DreamRealized 创始人**。

设计原则：

1. **简约而不简单**。页面整洁、对齐到一张网格、只用一种强调色；"不简单"体现在交互和只有懂行的人才看得出的细节（Vim、⌘K、源码视图、时间轴）。
2. **全部是真实数据**。不写占位文案，不编数字；每个数字和链接都能追溯到简历、新闻或线上产品。
3. **键盘和鼠标同等完整**。所有操作都能用鼠标完成，也都能用 Vim 键完成。
4. **静止帧可读**。进场动画只做位移，不从透明度 0 开始；截图、缩略图、开启"减少动态效果"时都完整可见。

## 2. 需要锁定的决定

| # | 决定 | 推荐 | 理由 |
|---|---|---|---|
| D1 | 代码放哪 | `new-portfolio`（Vite 8 + React 19 + TS + Tailwind 4）做新站；`myPortfolio` 的 `/resume` 迁过来，`/blog` 继续用现有 Astro 静态产物（放 `public/blog`） | 新站技术栈已经是最新的；简历组件和中英数据可直接复用；博客不用重建 |
| D2 | `new-portfolio` 现有未提交改动 | 先原样提交为一个快照 commit，再从它切 `ml/redesign` 分支 | 不丢你之前的工作，也不把它混进新设计 |
| D3 | 调色板 | 官方 `@catppuccin/tailwindcss`，Latte / Mocha | 官方维护，带 `ctp-*` 工具类和色阶，不手抄色值 |
| D4 | 深浅色机制 | `<html class="latte|mocha">`（插件自带的 flavour class），首帧前由 `index.html` 内联脚本设置；切换按钮照搬 Docusaurus 的两态太阳/月亮 | **不能**用 `[data-theme]` 属性：插件的 `@variant dark { :root {…} }` 会编译成永远不匹配的选择器（已实测） |
| D5 | 路由 | `react-router` v7：`/`、`/experience`、`/skills`、`/source`、`/resume` | 真实路径利于分享和 SEO；原型里的 `#hash` 只是 Artifact 的限制 |
| D6 | ⌘K | `cmdk`（shadcn Command 用的同一个库） | 行业标准，自带模糊搜索和无障碍 |
| D7 | Vim 键 | 一个 20 行的纯函数 `resolveKey`（`src/lib/keys.ts`，有单元测试）+ 页面作用域注册 | 见 13.1：页内优先、前缀等待、失败回退这三条规则 `tinykeys` 表达不了 |
| D8 | 弹层 | 已有的 `@base-ui/react`：Popover（强调色）、Dialog（快捷键帮助） | 焦点管理和 Esc 关闭开箱即用 |
| D9 | 中英文 | URL `?lang=zh` 为准 + localStorage 记忆；类型化字典 | 与简历页现有做法一致（`src/pages/resume/data/i18n.ts`），链接可分享 |
| D10 | 内容来源 | 单一来源 `src/content/*.ts`，简历和作品集共用 | 改一处，两边同步 |
| D11 | 移除 | `framer-motion`、`react-icons`、技能百分比进度条、旧 Hero/Nav | 动效全用 CSS；图标只需要太阳/月亮/搜索几个内联 SVG |

## 3. 信息架构

```
/               首页 Home        身份、数字、DreamRealized、最新博客、Guy、技术栈键帽、shell
/experience     经历 Experience  时间轴：工作 / 创业 / 教育 / 项目 四条轨道 + 播放头
/skills         技能 Skills      经历 ↔ 技能连线图（节点编辑器）
/source         源码 Source      把作品集当仓库浏览：TS / JSON / YAML / Markdown + 预览
/resume         简历             从 myPortfolio 迁入，保留中英切换和打印
/blog ↗         博客             现有 Astro 站，外链
```

顶栏从左到右：头像 + Lin Ma ｜ 1 首页 · 2 经历 · 3 技能 · 4 源码 · 博客 ↗ ｜ EN/中 ｜ 强调色 ▾ ｜ ☀/☾ ｜ 🔍 ⌘K。
左下角常驻 Vim 状态条（NORMAL / INSERT + 刚按的键），点击打开快捷键帮助。

## 4. 视觉语言

### 4.1 颜色

只用 Catppuccin。组件只引用语义 token，不写色值，不写某个 flavour 专属的值。

| Token（Tailwind 类） | Latte | Mocha | 用途 |
|---|---|---|---|
| `page` | mantle `#e6e9ef` | mantle `#181825` | 页面底色 |
| `card` | base `#eff1f5` | base `#1e1e2e` | 卡片、tile、窗口 |
| `raised` | base | surface0 `#313244` | 弹层、⌘K、toast |
| `line` / `line-strong` | surface0 / surface1 | surface0 / surface1 | 边框 |
| `fg` → `fg-soft` → `fg-muted` → `fg-faint` → `fg-ghost` | text → subtext1 → subtext0 → overlay1 → overlay0 | 同左 | 文字层级 |
| `accent` / `on-accent` | 默认 blue `#1e66f5` / base | 默认 blue `#89b4fa` / base | 唯一强调色，可换成 14 种之一 |
| `ok` `warn` `bad` | green / yellow / red | 同左 | 状态，不和强调色混用 |
| `syn-*` | 官方语法高亮映射 | 同左 | 源码页 |

**组织色**（数据色，通过 `--c` 传给元素，用于圆点、时间轴片段、连线、封面）：

| 主体 | 颜色 | | 主体 | 颜色 |
|---|---|---|---|---|
| Sekai | mauve | | DreamRealized | lavender |
| 微软 | blue | | 字节跳动 | peach |
| 久其软件 | teal | | 波士顿大学 | pink |
| 大连海事大学 | yellow | | AI 生成代码安全评估 | sapphire |

强调色和组织色互不依赖：换强调色只改 UI 状态（按钮、焦点、选中、播放头），不改数据色。

### 4.2 字体

| 角色 | 字体 | 规格 |
|---|---|---|
| 正文 / UI | Geist Variable（中文回落 PingFang SC / 雅黑） | 15px / 1.55 |
| 代码 / 标签 / 数字 | JetBrains Mono Variable | 12–13px；数字用 `tabular-nums` |
| `text-display` | Geist 700 | clamp(40px, 6vw, 62px)，字距 -0.035em（首页姓名） |
| `text-title` | Geist 700 | 32px，字距 -0.03em（页标题，后缀一个强调色句点） |
| `text-stat` | Geist 700 | 34px（首页数字） |
| `text-label` | JetBrains Mono | 12px，overlay1 色（tile 标签，如 `$ uptime`） |

### 4.3 形状、间距、层级

- 圆角：tile 16、卡片 12、控件 8、chip 全圆。
- 间距：栅格间距 12；tile 内边距 18（hero 24）；页面最大宽 1180，左右留白 ≥16 并让开安全区。
- 阴影只用在浮起的东西上：`shadow-pop`（弹层）、`shadow-window`（编辑器窗口）、`shadow-lift`（卡片悬停）。普通 tile 只有 1px 边框。
- 首页 12 列栅格；≤920px 变单列，数字卡变 2 列；≤480px 全单列。

### 4.4 动效

| 名称 | 时长 | 用在 |
|---|---|---|
| `page-in` | 280ms，位移 6px | 切页 |
| `pop` | 140ms，缩放 0.97 | 强调色面板、⌘K、帮助 |
| `spin-in` | 450ms | 太阳/月亮切换 |
| 光斑 `spotlight` | 跟随指针 | 首页 tile 边框 |
| Guy 流水线 | 4s 循环 | 首页 |
| 播放 | 7s 从 2013 到现在 | 经历页 |

全部遵守 `prefers-reduced-motion`：关闭循环动画，播放直接跳到"现在"。

## 5. 组件清单

| 组件 | 要点 | 状态 |
|---|---|---|
| `TopBar` | 毛玻璃粘顶，`aria-current` 标当前页 | 默认 / 当前页 |
| `ThemeToggle` | Docusaurus 两态：显示当前模式的图标（浅色=太阳，深色=月亮）；首次点击前跟随系统；`aria-label` = "Switch between dark and light mode (currently …)" | 浅 / 深 |
| `AccentMenu` | 收起时是一个色点 + ▾；展开 7×2 色板，悬停显示色名；hjkl/方向键移动，Esc 关闭 | 收起 / 展开 / 当前色 |
| `LangSwitch` | EN / 中 分段按钮 | — |
| `CommandPalette` | 页面、博客文章、文件、追踪、时间轴跳转、主题、语言、强调色、链接、复制邮箱 | 空结果文案 |
| `VimStatus` + `KeyHelp` | 见第 7 节 | NORMAL / INSERT |
| `Tile` | 可带 `spotlight`；可点击的 tile 是 `<button>` | 悬停上浮 2px |
| `MetricTile` | 大数字，或 diff 样式（红删除线 → 绿） | 点击跳到经历页对应时间 |
| `PostCard` | 代码字形封面（`:wq`、`451`…）+ 日期 + 标题 2 行截断 + 摘要 2 行截断 | 悬停封面字形右移 |
| `ProductCard` | DreamRealized 产品：名称、一句话、状态胶囊、平台、链接 | Live / Building / Open source |
| `LinkChip` | 组织色圆点 + 文案 + 域名 + ↗ | 悬停染色 |
| `Keycap` | 底边 3px，按下变 1px 并下沉 | 按下 = 选中 |
| `Shell` | 历史 ↑↓、Tab 补全；命令：`help whoami neofetch uptime ls experience skills links theme accent lang clear` | — |
| `Timeline` | 轨道、刻度尺、片段、播放头（`role="slider"`） | 片段激活 |
| `StackGraph` | 两列节点 + SVG 贝塞尔连线；悬停追踪、点击固定 | 激活 / 暗淡 / 固定 |
| `Editor` | 文件树、标签页、面包屑、行号、当前行、预览、状态栏（强调色底） | 无打开文件时的空状态 |

每个列表都有空状态，每个异步动作（复制）都有成功和失败反馈。

## 6. 页面

### 6.1 首页

```
┌ hero (8) ─────────────────────────────┐┌ uptime (4) ─────────┐
│ 头像  ● 正在 Sekai 交付 ↗              ││ 9y 9m 12d 02:52:36  │
│ Lin Ma.                               ││ load average: …     │
│ 客户端工程负责人 · Sekai               │└─────────────────────┘
│ DreamRealized 创始人                  │
│ [简历] [博客] [GitHub] [邮箱 复制·yy]  │
└───────────────────────────────────────┘
┌ 270+ ┐┌ 0.4% ┐┌ 40s→2s ┐┌ 2h→20min ┐     4 × MetricTile（各 3 列）
┌ DreamRealized · founder (12) ───────────────────────────────────┐
│ Gradpazz [Live]  Amber [macOS]  Wooto [Building]  Agri [OSS]    │
└─────────────────────────────────────────────────────────────────┘
┌ ~/blog · 最新文章 (8) ── 2×2 PostCard ┐┌ Guy 流水线 (4) ────┐
┌ 技术栈键帽 (7) ───────────────────────┐┌ ~/shell (5) ───────┐
```

### 6.2 经历

页头（标题 + 一句话 + 本页按键）→ 时间码（`2026.11`，`T+13y 02m` 距第一条轨道）+ 播放 / 现在 → 四条轨道：**工作、创业、教育、项目** → 检查器：播放头所在月份的所有片段卡片（职位、组织、时间、要点、链接）。窄片段的标签放到片段外侧。

### 6.3 技能

左列：经历、创业、项目；右列：客户端 / AI / 基础设施分组的技能。连线取经历的组织色。右侧详情：经历节点显示要点 + 链接 + 技能 chip；技能节点显示"用于 N 处"并可跳转。默认固定 Sekai。

### 6.4 源码

```
README.md
experience/  sekai.ts  microsoft.ts  bytedance.ts  join-cheer.ts
ventures/    dreamrealized.ts
projects/    secure-gen.md
education.yaml  skills.json  links.toml
```

内容随语言切换（中文模式下 TS 字符串是中文）；`links` 里的网址可点击。

## 7. 键盘（Vim）

输入框获得焦点即 INSERT 模式，Esc 回到 NORMAL。⌘K / Ctrl+K 任何时候都可用。

| 范围 | 键 | 作用 |
|---|---|---|
| 全局 | `j` `k` / `d` `u` / `gg` `G` | 滚动 / 半屏 / 顶部底部 |
| 全局 | `1`–`4`、`gt` `gT` | 切页 |
| 全局 | `/` `:` | 命令面板 |
| 全局 | `t` / `c` / `L` / `yy` / `?` | 主题 / 强调色 / 中英 / 复制邮箱 / 帮助 |
| 首页 | `i` | 聚焦 shell |
| 经历 | `h` `l` / `w` `b` / `0` `$` / 空格 | 按月 / 按年 / 开头与现在 / 播放 |
| 技能 | `j` `k` / `h` `l` / `↵` / Esc | 移动 / 切换左右列 / 固定 / 取消 |
| 源码 | `j` `k` / `gg` `G` / `[` `]` / `p` / `x` | 移动行 / 首末行 / 切标签 / 预览 / 关闭标签 |

页内按键优先于全局按键（例如源码页的 `gg` 跳首行，而不是滚到页面顶部）。

## 8. 内容模型

```ts
type L10n = { en: string; zh: string };
type Link = { label: L10n; href: string };
type Entry = {
  id: string;
  kind: "job" | "venture" | "project" | "edu";
  color: CtpAccent;            // 组织色
  from: `${number}.${string}`; // "2026.05"
  to: string | "present";
  short: L10n; org: L10n; title: L10n; team: L10n;
  points: { en: string[]; zh: string[] };
  uses: SkillId[];
  links: Link[];
  products?: Product[];        // 仅 venture
};
type Product = { id: string; name: string; status: "live" | "building" | "oss"; platform: L10n; blurb: L10n; links: Link[] };
```

### 8.1 DreamRealized（创始人）

| 字段 | 内容 |
|---|---|
| 组织 | DreamRealized Tech LLC · 创始人 |
| 时间 | **2025 – 至今（开始月份待你确认）** |
| 一句话 | 用 AI 把想法做成产品 |
| 链接 | [dreamrealized.net](https://dreamrealized.net) · [GitHub](https://github.com/DreamRealized) |

| 产品 | 状态 | 一句话 | 链接 |
|---|---|---|---|
| Gradpazz | Live · iOS | 面向留学生的校园与城市资源平台（二手、租房、附近），中英双语；Expo / React Native / Supabase / PostGIS；App Store 发布者为 DreamRealized Tech LLC，当前 v1.6.4 | [App Store](https://apps.apple.com/us/app/gradpazz/id6761963554) · [gradpass.site](https://gradpass.site) |
| Amber | macOS / iOS | 直接读写 Obsidian vault 的计划 app：每日 Highlight、项目保质期、每周小赌注；GitHub Contents API 同步，无服务器；签名公证发布 + Homebrew tap | [Releases](https://github.com/DreamRealized/amber-releases) |
| Wooto · 乌托 | Building | AI 创作工作室与社区（游戏、故事、图像、音乐、视频），本地 Mac 优先 | 私有，暂不放链接 |
| Agriculture Chatbot | Open source | 农业问答 Agent：RAG + 图片 / 语音输入，普通话语音输出 | [GitHub](https://github.com/DreamRealized/agriculture-chatbot) |

原来单列的"农业 AI 问答机器人"并入 DreamRealized 的产品，不再重复出现在项目轨道。

### 8.2 各段经历的链接

| 经历 | 链接 |
|---|---|
| Sekai | [sekai.ai](https://sekai.ai) · [Sekai MCP](https://sekai.ai/mcp) · [Axios：Khosla 与 Connect 联合领投 2000 万美元 A 轮](https://www.axios.com/2026/06/01/sekai-mini-app-startup-funding) |
| 微软 | [Microsoft Fabric](https://www.microsoft.com/en-us/microsoft-fabric) · [Fabric Notebook](https://learn.microsoft.com/en-us/fabric/data-engineering/how-to-use-notebook) · [Spark Job Definition](https://learn.microsoft.com/en-us/fabric/data-engineering/spark-job-definition) |
| 字节跳动 | [bytedance.com](https://www.bytedance.com) |
| 久其软件 | [jiuqi.com.cn](https://www.jiuqi.com.cn) |
| 波士顿大学 | [BU Computer Science](https://www.bu.edu/cs/) |
| 大连海事大学 | [dlmu.edu.cn](https://www.dlmu.edu.cn/) |
| 安全评估项目 | 仓库是私有的，暂不放 |

## 9. 无障碍

- 对比度：正文 ≥ 4.5:1（Latte text/base、Mocha text/base 都满足）；强调色作底时文字用 `on-accent`。
- 所有交互元素可 Tab 到达，焦点环用强调色。
- 时间轴播放头是 `role="slider"`，带 `aria-valuetext`（如 `2024.11`）。
- `<html lang>` 随语言切换（`en` / `zh-CN`）。
- 外链 `target="_blank" rel="noopener"`，图标 `aria-hidden`。

## 10. 性能预算

- 首屏 JS（gzip）目标 ≤ 120KB，实际约 147KB（见 13.2）；字体只加载 Geist + JetBrains Mono 的可变字体子集。
- 无布局抖动：主题和强调色在首帧前由内联脚本写到 `<html>`。
- 头像 320×320 JPEG ≤ 20KB；博客封面纯 CSS，不加载图片。

## 11. 测试（先写测试）

| 层 | 工具 | 覆盖 |
|---|---|---|
| 单元 | Vitest | 键序解析与作用域优先级；`?lang` 解析；内容完整性（每条都有 en/zh、日期合法、链接是 https）；时间轴月份计算 |
| 端到端 | Playwright | 四个页面渲染；主题切换且刷新后保持、首帧无闪；中英切换且 URL 同步；Vim：`2` 进经历页、`b` 回退一年、`?` 打开帮助；⌘K 打开文件；所有外链属性正确 |

## 12. 待你确认

1. DreamRealized 开始的月份（目前写 2025）。
2. 首页"最新文章"最新一篇是 2021 年 5 月，是否保留这个标题，还是改成"精选文章"。
3. 字节跳动的公式折行专利：有专利号就加链接。
4. Wooto 要不要现在就展示（只放名称和"Building"，不放链接）。

## 13. 实现中的偏离

1. **Vim 键没有用 `tinykeys`。** 需要三条规则：页内绑定优先于全局绑定；按下 `g` 时如果还有更长的序列（`gg`、`gt`）就等待；序列走不通时把最后一个键当作单键重试。`tinykeys` 没有作用域和回退的概念，所以写成一个纯函数并用 6 个单元测试覆盖。
2. **首屏 JS 约 147KB（gzip），超出 120KB 的目标。** 主包 122KB（React DOM、react-router、base-ui Popover）+ 共享块 25KB。命令面板和快捷键帮助已拆成懒加载并在空闲时预热。要再降需要换掉 react-router 或 base-ui，暂不做。
3. **`[data-theme]` 改为 flavour class**（已在 D4 说明）。
4. **部署**：线上是 GitHub Pages（`gh-pages` 分支），不是 Vercel。`npm run deploy` 会构建、把 `../public/blog` 拷进 `dist/blog`、带上 `CNAME`、生成 `404.html`（SPA 深链回退），再推到 `gh-pages`。
5. **测试结果**：Vitest 30 个、Playwright 21 个，全部通过；Playwright 跑的是生产构建。
