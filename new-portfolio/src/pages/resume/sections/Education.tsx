import type { EducationItem } from "../data/profile";
import type { ResumeLabels } from "../data/i18n";

export const Education = (props: { educations: EducationItem[], labels: ResumeLabels }) => {
  const { educations, labels } = props;
  return <div className="r-section">
    <div>
      <div className="t1">{labels.education}</div>
      <div>
        {
          educations.map((item, i) => {
            const { school, GPA, degree, major, location, startTime, endTime } = item;
            return <div className="r-block" key={i}>
              <div className="r-between b">
                <div>{school + (GPA ? ` | ${labels.gpa}${GPA}` : "")}</div>
                <div>{location}</div>
              </div>
              <div className="r-between italic-light">
                <div>{labels.degreeIn(degree, major)}</div>
                <div>{`${startTime} - ${endTime}`}</div>
              </div>
            </div>
          })
        }
      </div>
    </div>
  </div>
}
