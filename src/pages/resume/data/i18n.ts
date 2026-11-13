import { experience, Experience } from './experience';
import { experienceZh } from './experience.zh';
import { profile, Profile } from './profile';
import { profileZh } from './profile.zh';

export type ResumeLang = 'en' | 'zh';

export type SkillKey =
  | 'programming_languages'
  | 'frontend'
  | 'backend'
  | 'database'
  | 'ai_machine_learning_engineering'
  | 'tools_platforms'
  | 'others';

export type ResumeLabels = {
  education: string,
  experience: string,
  projects: string,
  skills: string,
  email: string,
  phone: string,
  portfolio: string,
  github: string,
  gpa: string,
  degreeIn: (degree: string, major: string) => string,
  /** Joins a bold work title to its description. */
  titleSep: string,
  /** Joins list items, e.g. skills. */
  listSep: string,
  skillNames: Record<SkillKey, string>,
};

const labels: Record<ResumeLang, ResumeLabels> = {
  en: {
    education: 'EDUCATION',
    experience: 'EXPERIENCE',
    projects: 'PROJECTS',
    skills: 'SKILLS',
    email: 'Email: ',
    phone: 'Phone: ',
    portfolio: 'Portfolio: ',
    github: 'Github: ',
    gpa: 'GPA(4.0): ',
    degreeIn: (degree, major) => `${degree} in ${major}`,
    titleSep: ', ',
    listSep: ', ',
    skillNames: {
      programming_languages: 'Programming Languages: ',
      frontend: 'Frontend: ',
      backend: 'Backend: ',
      database: 'Database: ',
      ai_machine_learning_engineering: 'AI & Machine Learning: ',
      tools_platforms: 'Tools & Platforms: ',
      others: 'Others: ',
    },
  },
  zh: {
    education: '教育背景',
    experience: '工作经历',
    projects: '项目经历',
    skills: '专业技能',
    email: '邮箱：',
    phone: '电话：',
    portfolio: '个人主页：',
    github: 'GitHub：',
    gpa: 'GPA(4.0)：',
    degreeIn: (degree, major) => `${major} · ${degree}`,
    titleSep: '：',
    listSep: '、',
    skillNames: {
      programming_languages: '编程语言：',
      frontend: '前端 / 客户端：',
      backend: '后端：',
      database: '数据库：',
      ai_machine_learning_engineering: 'AI 工程：',
      tools_platforms: '工具与平台：',
      others: '其他：',
    },
  },
};

export type ResumeContent = {
  labels: ResumeLabels,
  profile: Profile,
  experience: Experience,
};

const content: Record<ResumeLang, ResumeContent> = {
  en: { labels: labels.en, profile, experience },
  zh: { labels: labels.zh, profile: profileZh, experience: experienceZh },
};

export function getResumeContent(lang: ResumeLang): ResumeContent {
  return content[lang];
}

/** `?lang=zh` selects Chinese; anything else falls back to English. */
export function parseLang(search: string): ResumeLang {
  return new URLSearchParams(search).get('lang') === 'zh' ? 'zh' : 'en';
}

export const htmlLang: Record<ResumeLang, string> = { en: 'en', zh: 'zh-CN' };
