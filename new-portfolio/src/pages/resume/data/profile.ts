export type EducationItem = {
  school: string,
  degree: string,
  major: string,
  location: string,
  GPA?: string,
  startTime: string,
  endTime: string,
}

export type BasicProfile = {
  name: string,
  gender: string,
  birthday: string,
  portfolio: string,
  github: string,
  email: string,
  phone: string,
  education: EducationItem[],
}

export type Profile = BasicProfile & {
  education: EducationItem[],
};

export const profile: Profile = {
  name: 'Lin Ma',
  gender: 'Male',
  birthday: 'March,1995',
  portfolio: 'https://www.adamma.me',
  github: 'https://github.com/adamma1024',
  email: 'adamma2048@gmail.com',
  phone: '+1 3392412130',
  education: [
    {
      school: 'Boston University',
      degree: 'Master of Science',
      major: 'Computer Science',
      location: 'Boston, MA',
      startTime: '2024.09',
      endTime: '2026.01'
    },
    {
      school: 'Dalian Maritime University',
      degree: 'Bachelor',
      major: 'Management Information System',
      location: 'Dalian, China',
      startTime: '2013.09',
      endTime: '2017.06'
    }
  ]
}
