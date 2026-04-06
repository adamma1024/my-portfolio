import React from 'react';
import { Education } from './sections/Education';
import { Experience } from './sections/Experience';
import { Profile } from './sections/Profile';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import { profile } from './data/profile';
import { experience, ResumeVariant } from './data/experience';

function Resume({ variant }: { variant: ResumeVariant }) {
  const { experiences, skills, projects } = experience;
  return (
    <div className="resume-a4">
      <Profile {...profile} />
      <Education educations={profile.education} />
      <Experience experiences={experiences} variant={variant} />
      <Projects projects={projects} variant={variant} />
      <Skills skills={skills} variant={variant} />
    </div>
  );
}

export default Resume;
