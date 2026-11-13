import { Profile, profile as profileEn } from './profile';

export const profileZh: Profile = {
  ...profileEn,
  name: '马林',
  gender: '男',
  birthday: '1995年3月',
  education: [
    {
      school: '波士顿大学',
      degree: '硕士',
      major: '计算机科学',
      location: '美国，波士顿',
      startTime: '2024年09月',
      endTime: '2026年01月'
    },
    {
      school: '大连海事大学',
      degree: '本科',
      major: '信息管理与信息系统',
      location: '中国，大连',
      startTime: '2013年09月',
      endTime: '2017年06月'
    }
  ]
}
