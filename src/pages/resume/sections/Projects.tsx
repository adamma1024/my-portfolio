import React from "react";
import { EnhancedSpan } from "../components/EnhancedSpan";
import { ProjectItem, ResumeVariant } from "../data/experience";

export const Projects = (props: { projects: ProjectItem[], variant: ResumeVariant }) => {
  const { projects, variant } = props;

  const filteredProjects = projects.filter((item) => {
    if (variant === 'ai') return true;
    if (variant === 'frontend') return item.type !== 'AI';
    return true; // fullstack shows all
  });

  return <div className="r-section">
    <div>
      <div className="t1">PROJECTS</div>
      <div>
        {
          filteredProjects.map((item, i) => {
            const { name, startDate, endDate, role, details } = item;
            return <div className="r-block" key={i}>
              <div className="r-between b">
                <div>{`${name} | ${role}`}</div>
                <div>{`${startDate}-${endDate}`}</div>
              </div>
              <div>
                {details.map((detail, j) => {
                  return <div className="ex-paragraph" key={j}>
                    <EnhancedSpan text={detail} />
                  </div>
                })}
              </div>
            </div>
          })
        }
      </div>
    </div>
  </div>
}
