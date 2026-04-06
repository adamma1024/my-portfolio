import React from "react";
import { EnhancedSpan } from "../components/EnhancedSpan";
import { ExperienceItem, ResumeVariant } from "../data/experience";

export const Experience = (props: { experiences: ExperienceItem[], variant: ResumeVariant }) => {
  const { experiences, variant } = props;

  const shouldShowDetails = (type: string) => {
    switch (variant) {
      case 'ai':
        return type !== 'early career';
      case 'fullstack':
        return true;
      case 'frontend':
        return type !== 'AI';
      default:
        return true;
    }
  }

  return <div className="r-section">
    <div>
      <div className="t1">EXPERIENCE</div>
      <div>
        {
          experiences.map((item, i) => {
            const { company, position, startDate, endDate, location, works } = item;
            return <div className="r-block" key={i}>
              <div className="r-between b">
                <div className="company-name">{company + " | " + position + (location ? " | " + location : "")}</div>
                <div>{`${startDate} - ${endDate}`}</div>
              </div>
              {
                shouldShowDetails(item.type) &&
                <div>
                  {works.map((work, j) => {
                    const { title, content } = work;
                    return <div className="ex-paragraph" key={j}>
                      <span className="b">{title && `${title}, `}</span>
                      <EnhancedSpan text={content} />
                    </div>
                  })}
                </div>
              }
            </div>
          })
        }
      </div>
    </div>
  </div>
}
