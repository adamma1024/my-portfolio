import React from "react";
import { BasicProfile } from '../data/profile';
import { ResumeLabels } from '../data/i18n';

export const Profile = (props: BasicProfile & { labels: ResumeLabels }) => {
  const { name, gender, birthday, portfolio, github, email, phone, labels } = props;
  return <div className='r-section'>
    <div className="r-between">
      <div className="resume-name">{name}</div>
      <div>{`${labels.email}${email}`}</div>
    </div>
    <div className="r-between">
      <div>{`${gender} / ${birthday}`}</div>
      <div>{`${labels.phone}${phone}`}</div>
    </div>
    <div className="r-between">
      <div>{`${labels.portfolio}${portfolio}`}</div>
      <div>{`${labels.github}${github}`}</div>
    </div>
  </div>
}
