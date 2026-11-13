import { Education } from './sections/Education';
import { Experience } from './sections/Experience';
import { Profile } from './sections/Profile';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import type { ResumeVariant } from './data/experience';
import { getResumeContent, type ResumeLang } from './data/i18n';

function Resume({ variant, lang }: { variant: ResumeVariant, lang: ResumeLang }) {
  const { labels, profile, experience } = getResumeContent(lang);
  const { experiences, skills, projects } = experience;
  return (
    <div className="resume-a4">
      <Profile {...profile} labels={labels} />
      <Education educations={profile.education} labels={labels} />
      <Experience experiences={experiences} variant={variant} labels={labels} />
      <Projects projects={projects} variant={variant} labels={labels} />
      <Skills skills={skills} variant={variant} labels={labels} />
    </div>
  );
}

export default Resume;
