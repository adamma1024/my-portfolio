/* Change this file to get your personal Porfolio */

// Website related settings
const settings = {
  isSplash: false, // Change this to false if you don't want Splash screen.
};

//SEO Related settings
const seo = {
  title: "Adam's Portfolio",
  description:
    "A passionate individual who always thrives to utilize technologies to address realistic issues, such as Education, Personal Growth, Music and etc.",
  og: {
    title: "Adam Ma Portfolio",
    type: "website",
    url: "https://www.adamma.me/",
  },
};

//Home Page
const greeting = {
  title: "Adam Ma",
  logo_name: "AdamMa",
  nickname: "",
  subTitle:
    "A passionate individual who always thrives to utilize technologies to address realistic issues, such as Education, Personal Growth, Music and etc.",
  resumeLink: "https://drive.google.com/file/d/1BjEbCLKuNwVlfU_x7Pg7vep4diYRSdHF/view?usp=sharing",
  resumeLink_cn: "https://drive.google.com/file/d/1HwXSzKDAk-joW1hKRTibKEbs5RbC025s/view?usp=drive_link",
  portfolio_repository: "https://github.com/adamma1024/myPortfolio",
  githubProfile: "https://github.com/adamma1024",
};

const socialMediaLinks = [
  {
    name: "Github",
    link: "https://github.com/adamma1024",
    fontAwesomeIcon: "fa-github", // Reference https://fontawesome.com/icons/github?style=brands
    backgroundColor: "#181717", // Reference https://simpleicons.org/?q=github
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/adamma1024/",
    fontAwesomeIcon: "fa-linkedin-in", // Reference https://fontawesome.com/icons/linkedin-in?style=brands
    backgroundColor: "#0077B5", // Reference https://simpleicons.org/?q=linkedin
  },
  {
    name: "YouTube",
    link: "https://www.youtube.com/channel/UCnzdXfyt6bKvUBgWyUMPTxQ",
    fontAwesomeIcon: "fa-youtube", // Reference https://fontawesome.com/icons/youtube?style=brands
    backgroundColor: "#FF0000", // Reference https://simpleicons.org/?q=youtube
  },
  {
    name: "Gmail",
    link: "mailto:adamma2048@gmail.com",
    fontAwesomeIcon: "fa-google", // Reference https://fontawesome.com/icons/google?style=brands
    backgroundColor: "#D14836", // Reference https://simpleicons.org/?q=gmail
  },
  {
    name: "X-Twitter",
    link: "https://twitter.com/adamma1024",
    fontAwesomeIcon: "fa-x-twitter", // Reference https://fontawesome.com/icons/x-twitter?f=brands&s=solid
    backgroundColor: "#000000", // Reference https://simpleicons.org/?q=x
  },
  {
    name: "Facebook",
    link: "https://www.facebook.com/adam.ma.79230305",
    fontAwesomeIcon: "fa-facebook-f", // Reference https://fontawesome.com/icons/facebook-f?style=brands
    backgroundColor: "#1877F2", // Reference https://simpleicons.org/?q=facebook
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/adamma1024/",
    fontAwesomeIcon: "fa-instagram", // Reference https://fontawesome.com/icons/instagram?style=brands
    backgroundColor: "#E4405F", // Reference https://simpleicons.org/?q=instagram
  },
];

const skills = {
  data: [
    // {
    //   title: "Data Science & AI",
    //   fileName: "DataScienceImg",
    //   skills: [
    //     "⚡ Developing highly scalable production ready models for various deeplearning and statistical use cases",
    //     "⚡ Experience of working with Computer Vision and NLP projects",
    //     "⚡ Complex quantitative modelling for dynamic forecasting and time series analysis",
    //   ],
    //   softwareSkills: [
    //     {
    //       skillName: "Tensorflow",
    //       fontAwesomeClassname: "logos-tensorflow",
    //       style: {
    //         backgroundColor: "transparent",
    //       },
    //     },
    //     {
    //       skillName: "Keras",
    //       fontAwesomeClassname: "simple-icons:keras",
    //       style: {
    //         backgroundColor: "white",
    //         color: "#D00000",
    //       },
    //     },
    //     {
    //       skillName: "PyTorch",
    //       fontAwesomeClassname: "logos-pytorch",
    //       style: {
    //         backgroundColor: "transparent",
    //       },
    //     },
    //     {
    //       skillName: "Python",
    //       fontAwesomeClassname: "ion-logo-python",
    //       style: {
    //         backgroundColor: "transparent",
    //         color: "#3776AB",
    //       },
    //     },
    //     {
    //       skillName: "Deeplearning",
    //       imageSrc: "deeplearning_ai_logo.png",
    //     },
    //   ],
    // },
    {
      title: "FullStack Development",
      fileName: "FullStackImg",
      skills: [
        "⚡ Building responsive website front end using React/Vue/...",
        "⚡ Creating and maintaining a Monorepo using PNPM/NPM/Yarn, Turbo, Vite/Webpack to reuse code across projects",
        "⚡ Developing mobile applications using Flutter, React Native and solo apps using Kotlin/Swift",
        "⚡ Creating application backend in Node, Java, Python and etc.",
        // "⚡ Developing the crypto currency exchange platform using Rust",
      ],
      softwareSkills: [
        {
          skillName: "HTML5",
          fontAwesomeClassname: "simple-icons:html5",
          style: {
            color: "#E34F26",
          },
        },
        {
          skillName: "CSS3",
          fontAwesomeClassname: "fa-css3",
          style: {
            color: "#1572B6",
          },
        },
        {
          skillName: "JavaScript",
          fontAwesomeClassname: "simple-icons:javascript",
          style: {
            backgroundColor: "#000000",
            color: "#F7DF1E",
          },
        },
        {
          skillName: "ReactJS",
          fontAwesomeClassname: "simple-icons:react",
          style: {
            color: "#61DAFB",
          },
        },
        {
          skillName: "Vue",
          fontAwesomeClassname: "logos:vue",
          style: {
            color: "#61DAFB",
          },
        },
        {
          skillName: "NodeJS",
          fontAwesomeClassname: "logos:nodejs",
          style: {
            color: "#339933",
          },
        },
        {
          skillName: "PNPM",
          fontAwesomeClassname: "simple-icons:pnpm",
          style: {
            color: "#CB3837",
          },
        },
        {
          skillName: "Turbo",
          fontAwesomeClassname: "vscode-icons:file-type-light-turbo",
          style: {
            color: "#CB3837",
          },
        },
        {
          skillName: "Vite",
          fontAwesomeClassname: "simple-icons:vite",
          style: {
            color: "#2C8EBB",
          },
        },
        {
          skillName: "Webpack",
          fontAwesomeClassname: "logos:webpack",
          style: {
            color: "#02569B",
          },
        },
        {
          skillName: "RxJS",
          fontAwesomeClassname: "devicon:rxjs",
          style: {
            color: "#02569B",
          },
        },
        {
          skillName: "Java",
          fontAwesomeClassname: "logos:java",
          style: {
            color: "#02569B",
          },
        },
        {
          skillName: "C/C++",
          fontAwesomeClassname: "simple-icons:c",
          style: {
            color: "#02569B",
          },
        },
        {
          skillName: "Python",
          fontAwesomeClassname: "simple-icons:python",
          style: {
            color: "#02569B",
          },
        },
        {
          skillName: "Rust",
          fontAwesomeClassname: "simple-icons:rust",
          style: {
            color: "#02569B",
          },
        },
        {
          skillName: "Go",
          fontAwesomeClassname: "logos:gopher",
          style: {
            color: "#02569B",
          },
        },
        {
          skillName: "Redis",
          fontAwesomeClassname: "logos:redis",
          style: {
            color: "#02569B",
          },
        },
      ],
    },
    {
      title: "Cloud Infra-Architecture",
      fileName: "CloudInfraImg",
      skills: [
        "⚡ Experience working on multiple cloud platforms",
        "⚡ Hosting and maintaining websites on virtual machine instances along with integration of databases",
        // "⚡ Deploying deep learning models on cloud to use on mobile devices",
        "⚡ Setting up streaming jobs from DB to Server or vice-versa on GCP and AWS",
      ],
      softwareSkills: [
        {
          skillName: "GCP",
          fontAwesomeClassname: "simple-icons:googlecloud",
          style: {
            color: "#4285F4",
          },
        },
        {
          skillName: "AWS",
          fontAwesomeClassname: "simple-icons:amazonaws",
          style: {
            color: "#FF9900",
          },
        },
        {
          skillName: "Azure",
          fontAwesomeClassname: "simple-icons:microsoftazure",
          style: {
            color: "#0089D6",
          },
        },
        {
          skillName: "Firebase",
          fontAwesomeClassname: "simple-icons:firebase",
          style: {
            color: "#FFCA28",
          },
        },
        {
          skillName: "PostgreSQL",
          fontAwesomeClassname: "simple-icons:postgresql",
          style: {
            color: "#336791",
          },
        },
        {
          skillName: "MongoDB",
          fontAwesomeClassname: "simple-icons:mongodb",
          style: {
            color: "#47A248",
          },
        },
        {
          skillName: "Docker",
          fontAwesomeClassname: "simple-icons:docker",
          style: {
            color: "#1488C6",
          },
        },
        {
          skillName: "Kubernetes",
          fontAwesomeClassname: "simple-icons:kubernetes",
          style: {
            color: "#326CE5",
          },
        },
      ],
    },
  ],
};

// Education Page
const competitiveSites = {
  competitiveSites: [
    {
      siteName: "LeetCode",
      iconifyClassname: "simple-icons:leetcode",
      style: {
        color: "#F79F1B",
      },
      profileLink: "https://leetcode.com/qq240814476/",
    },
    {
      siteName: "HackerRank",
      iconifyClassname: "simple-icons:hackerrank",
      style: {
        color: "#2EC866",
      },
      profileLink: "https://www.hackerrank.com/profile/AdamMa",
    },
    {
      siteName: "Codechef",
      iconifyClassname: "simple-icons:codechef",
      style: {
        color: "#5B4638",
      },
      profileLink: "https://www.codechef.com/users/kriswu",
    },
    {
      siteName: "Codeforces",
      iconifyClassname: "simple-icons:codeforces",
      style: {
        color: "#1F8ACB",
      },
      profileLink: "https://codeforces.com/profile/KrisWu",
    },
    {
      siteName: "Kaggle",
      iconifyClassname: "simple-icons:kaggle",
      style: {
        color: "#20BEFF",
      },
      profileLink: "https://www.kaggle.com/kriswuskr",
    },
  ],
};

const degrees = {
  degrees: [
    {
      title: "Boston University",
      subtitle: "Master of Science in Computer Science",
      logo_path: "bu.png",
      alt_name: "BU",
      duration: "2024.09 - 2026.01",
      descriptions: [
        // "No concentration, ",
        // "⚡ Apart from this, I have done courses on Deep Learning, Data Science, Cloud Computing and Full Stack Development.",
        // "⚡ I was selected for Merit cum Means Scholarship which is given to top 10% of students in college. I have received award from respected director for consistently best performance in academics.",
      ],
      website_link: "https://www.bu.edu/",
    },
    {
      title: "Dalian Maritime University",
      subtitle: "Bachelor in Management Information System",
      logo_path: "dlmu.png",
      alt_name: "DLMU",
      duration: "2013 - 2017",
      descriptions: [
        // "⚡ I have studied basic software engineering subjects like DS, Algorithms, DBMS, OS, CA, AI etc.",
        // "⚡ Apart from this, I have done courses on Deep Learning, Data Science, Cloud Computing and Full Stack Development.",
        // "⚡ I was selected for Merit cum Means Scholarship which is given to top 10% of students in college. I have received award from respected director for consistently best performance in academics.",
      ],
      website_link: "https://www.dlmu.edu.cn/",
    },
  ],
};

const certifications = {
  certifications: [
    // {
    //   title: "Machine Learning",
    //   subtitle: "- Andrew Ng",
    //   logo_path: "stanford_logo.png",
    //   certificate_link:
    //     "https://www.coursera.org/account/accomplishments/verify/22MTSSC5WDTM",
    //   alt_name: "Stanford University",
    //   color_code: "#8C151599",
    // },
    // {
    //   title: "Deep Learning",
    //   subtitle: "- Andrew Ng",
    //   logo_path: "deeplearning_ai_logo.png",
    //   certificate_link:
    //     "https://www.coursera.org/account/accomplishments/specialization/H8CPSFXAJD2G",
    //   alt_name: "deeplearning.ai",
    //   color_code: "#00000099",
    // },
    // {
    //   title: "ML on GCP",
    //   subtitle: "- GCP Training",
    //   logo_path: "google_logo.png",
    //   certificate_link:
    //     "https://www.coursera.org/account/accomplishments/specialization/EB4VJARK8647",
    //   alt_name: "Google",
    //   color_code: "#0C9D5899",
    // },
    // {
    //   title: "Data Science",
    //   subtitle: "- Alex Aklson",
    //   logo_path: "ibm_logo.png",
    //   certificate_link:
    //     "https://www.coursera.org/account/accomplishments/specialization/PLEAPCSJBZT5",
    //   alt_name: "IBM",
    //   color_code: "#1F70C199",
    // },
    // {
    //   title: "Big Data",
    //   subtitle: "- Kim Akers",
    //   logo_path: "microsoft_logo.png",
    //   certificate_link:
    //     "https://drive.google.com/file/d/164zKCFOsI4vGqokc-Qj-e_D00kLDHIrG/view",
    //   alt_name: "Microsoft",
    //   color_code: "#D83B0199",
    // },
    // {
    //   title: "Advanced Data Science",
    //   subtitle: "- Romeo Kienzler",
    //   logo_path: "ibm_logo.png",
    //   certificate_link:
    //     "https://www.coursera.org/account/accomplishments/verify/BH2T9BRU87BH",
    //   alt_name: "IBM",
    //   color_code: "#1F70C199",
    // },
    // {
    //   title: "Advanced ML on GCP",
    //   subtitle: "- GCP Training",
    //   logo_path: "google_logo.png",
    //   certificate_link:
    //     "https://www.coursera.org/account/accomplishments/verify/5JZZM7TNQ2AV",
    //   alt_name: "Google",
    //   color_code: "#0C9D5899",
    // },
    // {
    //   title: "DL on Tensorflow",
    //   subtitle: "- Laurence Moroney",
    //   logo_path: "deeplearning_ai_logo.png",
    //   certificate_link:
    //     "https://www.coursera.org/account/accomplishments/verify/6T4DCUGNK8J8",
    //   alt_name: "deeplearning.ai",
    //   color_code: "#00000099",
    // },
    // {
    //   title: "Fullstack Development",
    //   subtitle: "- Jogesh Muppala",
    //   logo_path: "coursera_logo.png",
    //   certificate_link:
    //     "https://www.coursera.org/account/accomplishments/certificate/NRANJA66Y2YA",
    //   alt_name: "Coursera",
    //   color_code: "#2A73CC",
    // },
    {
      title: "Google Cloud Essientials",
      subtitle: "- Qwiklabs",
      logo_path: "gcp_logo.png",
      certificate_link:
        "https://www.cloudskillsboost.google/public_profiles/e7f7487b-cf9f-4fe5-a52d-8b4ae4afaf31/badges/11869471",
      alt_name: "GCP",
      color_code: "#4285F499",
    },
    {
      title: "Kuberenetes in GCP",
      subtitle: "- Qwiklabs",
      logo_path: "kubernetes.png",
      certificate_link:
        "https://www.cloudskillsboost.google/public_profiles/e7f7487b-cf9f-4fe5-a52d-8b4ae4afaf31/badges/11869072",
      alt_name: "GCP",
      color_code: "#4285F499",
    },
    {
      title: "Devops Workflows in GCP",
      subtitle: "- Qwiklabs",
      logo_path: "gcp_logo.png",
      certificate_link:
        "https://www.cloudskillsboost.google/public_profiles/e7f7487b-cf9f-4fe5-a52d-8b4ae4afaf31/badges/11883322",
      alt_name: "GCP",
      color_code: "#4285F499",
    },
    // {
    //   title: "Cryptography",
    //   subtitle: "- Saurabh Mukhopadhyay",
    //   logo_path: "nptel_logo.png",
    //   certificate_link:
    //     "https://drive.google.com/open?id=1z5ExD_QJVdU0slLkp8CBqSF3-C3g-ro_",
    //   alt_name: "NPTEL",
    //   color_code: "#FFBB0099",
    // },
    {
      title: "Cloud Architecture: Design, Implement, and Manage",
      subtitle: "- Qwiklabs",
      logo_path: "gcp_logo.png",
      certificate_link:
        "https://www.cloudskillsboost.google/public_profiles/e7f7487b-cf9f-4fe5-a52d-8b4ae4afaf31/badges/11867264",
      alt_name: "GCP",
      color_code: "#4285F499",
    },
  ],
};

// Experience Page
const experience = {
  title: "Experience",
  subtitle: "Work, Internship",
  description:
    "I have work experience in different fields as a software engineer, including traditional software, internet educational platforms, Cloud+AI platforms, and more. I am proficient at developing user-friendly websites and leveraging fashion tech to improve the development experience.",
  header_image_path: "experience.svg",
  sections: [
    {
      title: "Work",
      work: true,
      experiences: [
        {
          title: "Research Assistant",
          company: "Boston University",
          company_url: "https://www.bu.edu/",
          logo_path: "bu.png",
          duration: "Jan 2025 - May 2025",
          location: "Boston, MA",
          description:
            "Pioneered a multi-model LLM orchestration platform locally using Ollama, enabling robust testing and comparison across different model architectures. Designed and integrated a high-performance Retrieval-Augmented Generation (RAG) system, leveraging Qdrant as the vector database for efficient semantic search. Curated a specialized knowledge base by ingesting a comprehensive corpus of security benchmarks—including code samples in C, Python, and JS—and authoritative security rules from OWASP and CWE. Established a quantitative evaluation framework with custom benchmarks to measure the pipeline's effectiveness in identifying vulnerabilities and improving final code quality.",
          color: "#0879bf",
        },
        {
          title: "SDE II",
          company: "Microsoft",
          company_url: "https://aka.ms/Fabric",
          fontAwesomeClassname: "logos:microsoft-icon",
          duration: "Jan 2021 - Aug 2024",
          location: "Beijing, China",
          description:
            "Developed core applications for Microsoft Fabric, an AI-powered data analytics platform. Led the development of a Monorepo model using Pnpm and Turborepo, enabling independent app installation, build, and debugging processes. Integrated Vite to reduce app startup time to 2 seconds. Streamlined E2E pipeline by using Git Diff and TypeScript AST to target only affected files, improving test reliability. Reduced pipeline execution time from 1.8 hours to about 0.5 hours. KQL is similar with the SQL and created by the MS. PM will reach out to the customers to ask if they faced some problems in these scenarios and try to improve it.",
          color: "#0879bf",
        },
        {
          title: "FullStack Engineer",
          company: "ByteDance",
          company_url: "https://www.bytedance.com/",
          fontAwesomeClassname: "simple-icons:bytedance",
          duration: "Apr 2020 - Dec 2021",
          location: "Shanghai, China",
          description:
            "Led the development of the Formula roadmap and delivered key components, including a Formula Rendering Component and an Online Editor, both optimized for mobile devices. Developed a splitting algorithm for formula line-break rendering and applied for a patent. Our backend was using the RPC, with the Thrift framework developed by the Facebook. I deployed it into a FaaS platform to leverage the 'Pay as you use' and auto-scale features.",
          color: "#9b1578",
        },
        {
          title: "Software Engineer",
          company: "Beijing Join-Cheer Software Co., Ltd.",
          company_url: "https://www.jiuqi.com.cn/",
          logo_path: "join-cheer-logo.png",
          duration: "July 2017 - Mar 2020",
          location: "Beijing, China",
          description:
            "Developed nvwa, a Micro-Frontend framework inspired by Amazon’s Micro-Frontend architecture, to integrate multiple SPAs, enhancing delivery speed for reporting systems. Created iviewex, a component library based on the iview project, which includes reusable business components for other teams.",
          color: "#fc1f20",
        },
      ],
    },
    {
      title: "Internships",
      experiences: [
        {
          title: "JAVA Software Engineer Intern",
          company: "Beijing Join-Cheer Software Co., Ltd.",
          company_url: "https://www.jiuqi.com.cn/",
          logo_path: "join-cheer-logo.png",
          duration: "Feb 2020 - June 2020",
          location: "Beijing, China",
          description:
            "Participating in the Chinese airport flight alerting system. Following the Chinese airport standard to develop a 3D domestication to showcase which airport has potential issues. I utilized WebGL lib like three.js and mathematic formula to execute it.",
          backgroundColor: '#111111',
        },
      ],
    },
  ],
};

// // Projects Page
const projectsHeader = {
  //   title: "Projects",
  //   description:
  //     "My projects make use of a vast variety of the latest technology tools. My best experience is in developing web applications and deploying them using cloud infrastructure.",
  //   avatar_image_path: "projects_image.svg",
};

const publicationsHeader = {
  //   title: "Publications",
  //   description:
  //     "I have worked on and published a few research papers and publications of my own.",
  //   avatar_image_path: "projects_image.svg",
};

const publications = {
  data: [
    // {
    //   id: "MDEwOlJlcG9zaXRvcnkyNDU0NjcyNzQ=",
    //   name: "Artificial Intelligence Paper",
    //   createdAt: "2020-03-06T16:26:54Z",
    //   description: "Paper Written on Artificial Intelligence published in xyz ",
    //   url:
    //     "https://www.andrewng.org/publications/building-high-level-features-using-large-scale-unsupervised-learning/",
    // },
  ],
};

// Contact Page
const contactPageData = {
  contactSection: {
    title: "Contact Me",
    profile_image_path: "NorwegianBlueOwl.jpg",
    style: {
      width: '500px',
      height: '500px',
    },
    alt: "Adam Ma",
    description:
      "I am available on almost every social media. You can message me, I will reply within 48 hours. I can help you with software and website development.",
  },
  blogSection: {
    title: "Blogs",
    subtitle:
      "For empowering other individuals and recording my life, I like to write articles about learning, Music, Philosophic thoughts.",
    link: "",// TODO: add blog link
    avatar_image_path: "blogs_image.svg",
  },
  phoneSection: {
    title: "",
    subtitle: "",
  },
};

export {
  settings,
  seo,
  greeting,
  socialMediaLinks,
  skills,
  competitiveSites,
  degrees,
  certifications,
  experience,
  projectsHeader,
  publicationsHeader,
  publications,
  contactPageData,
};
