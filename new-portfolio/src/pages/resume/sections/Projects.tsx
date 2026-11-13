import { EnhancedSpan } from "../components/EnhancedSpan";
import type { ProjectItem, ResumeVariant } from "../data/experience";
import type { ResumeLabels } from "../data/i18n";

export const Projects = (props: { projects: ProjectItem[], variant: ResumeVariant, labels: ResumeLabels }) => {
  const { projects, variant, labels } = props;

  const filteredProjects = projects.filter((item) => {
    if (variant === 'ai') return true;
    if (variant === 'frontend') return item.type !== 'AI';
    return true; // fullstack shows all
  });

  return <div className="r-section">
    <div>
      <div className="t1">{labels.projects}</div>
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
