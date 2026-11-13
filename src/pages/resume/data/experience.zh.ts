import { Experience, experience as experienceEn } from './experience';

// Chinese translation of ./experience.ts. Keep the two in sync when either changes.
export const experienceZh: Experience = {
  skills: {
    ...experienceEn.skills,
    ai_machine_learning_engineering: ['Coding Agent（Claude Code、Codex）', 'Agent Harness 与护栏', 'MCP Server', 'Context Engineering', 'Ollama', 'RAG', 'Embeddings', 'LangChain'],
    others: ['单元测试', 'E2E 测试', 'HTTP/2', 'WebSocket', 'TCP/IP', 'Linux', '设计模式', 'Code Review'],
  },
  experiences: [
    {
      company: 'Sekai',
      department: 'Mobile & Web',
      position: '移动端与 Web 工程负责人',
      startDate: '2026年05月',
      endDate: '至今',
      type: 'fullstack',
      works: [{
        title: '搭建 Guy，让任何员工都能在 Slack 里发布 App / Web 改动',
        content: 'PM 和设计师提需求，Agent 开发，Mac mini 模拟器验证，人工审批；已交付 270+ 个 Task。',
      },
      {
        title: '搭建 Agent 上下文与护栏体系',
        content: '知识索引、Task 生命周期、每个 Task 独立 worktree、fail-closed 检查与 Slack 审批。',
      },
      {
        title: '主导基于 Kotlin Multiplatform 的 Flutter → 原生 iOS / Android 迁移',
        content: '4 个月发布 80+ 个版本；次日留存 Android 提升 23%（30% → 37%），iOS 提升 18%（40% → 47%）。',
      },
      {
        title: '崩溃率降至 0.4%',
        content: '不到 Google Play 1.09% 不良行为阈值的一半；靠真机验证的 CI 门禁和 LLM 崩溃分诊 Agent。',
      },
      {
        title: '推进 sekai.ai Web 应用现代化（Next.js、React 19）',
        content: '39 份 ADR 中主笔 25 份。',
      }]
    },
    {
      company: '微软',
      department: 'Azure Data',
      position: 'SDE II',
      startDate: '2022年01月',
      endDate: '2024年08月',
      type: 'fullstack',
      works: [{
        title: '开发 Microsoft Fabric 核心应用',
        content: 'Notebook、Spark Job 与 Runtime Settings，服务数千家企业客户；并接入 LLM 代码补全。',
      },
      {
        title: '主导 monorepo 迁移（pnpm + Turborepo，50+ 个包）',
        content: '并迁移到 Vite，本地开发启动从 40 秒降到 2 秒。',
      },
      {
        title: '测试覆盖率提升至 80%',
        content: '并搭建实时告警，减少线上事故。',
      },
      {
        title: 'CI/CD 从 2 小时缩短到 20 分钟',
        content: '自研基于 Git diff + TypeScript AST 的影响分析工具，在部门内推广使用。',
      }]
    },
    {
      company: '字节跳动',
      department: '教育',
      position: '全栈工程师',
      startDate: '2020年04月',
      endDate: '2021年12月',
      type: 'fullstack',
      works: [{
        title: '端到端负责公式套件（Formula Kit）',
        content: '编辑器、渲染器与后端；公式折行算法已申请专利。',
      },
      {
        title: '流量激增期间吞吐量提升 50%',
        content: '在自动扩缩容的 FaaS 上引入多线程。',
      }],
    },
    {
      company: 'Join-Cheer软件有限公司',
      department: '大数据',
      position: '全栈工程师',
      startDate: '2017年02月',
      endDate: '2020年04月',
      type: 'early career',
      works: [{
        title: '',
        content: '搭建公司第一个微前端架构，以及供 20+ 个团队使用的 Vue 公共组件库。',
      }],
    }],
  projects: [
    {
      name: '农业 AI 问答机器人（开源）',
      startDate: '2025年05月',
      endDate: '2025年09月',
      type: 'AI',
      role: '技术负责人 & 主要贡献者',
      details: [
        '农业问答 Agent：Ollama + RAG，通过 MCP 实时查询 PostgreSQL，支持图片与语音输入输出。',
        '在 A100 GPU 上私有化部署 deepseek-r1:32b 与 qwen2.5-VL:32b。',
      ]
    },
    {
      name: 'AI 生成代码安全评估平台',
      startDate: '2025年01月',
      endDate: '2025年05月',
      type: 'AI',
      role: '研究助理',
      details: [
        '基于 OWASP / CWE 规则的 RAG（Qdrant + Ollama），检测 AI 生成代码中的漏洞，并构建自定义评测基准。',
      ]
    },
  ],
}
