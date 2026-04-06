import React from "react";
import { EducationItem } from "../data/profile";

export const Education = (props: { educations: EducationItem[] }) => {
  const { educations } = props;
  return <div className="r-section">
    <div>
      <div className="t1">EDUCATION</div>
      <div>
        {
          educations.map((item, i) => {
            const { school, GPA, degree, major, location, startTime, endTime } = item;
            return <div className="r-block" key={i}>
              <div className="r-between b">
                <div>{school + (GPA ? ` | GPA(4.0): ${GPA}` : "")}</div>
                <div>{location}</div>
              </div>
              <div className="r-between italic-light">
                <div>{`${degree} in ${major}`}</div>
                <div>{`${startTime} - ${endTime}`}</div>
              </div>
            </div>
          })
        }
      </div>
    </div>
  </div>
}
