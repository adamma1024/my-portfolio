import React from "react";
import { BasicProfile } from '../data/profile';

export const Profile = (props: BasicProfile) => {
  const { name, gender, birthday, portfolio, github, email, phone } = props;
  return <div className='r-section'>
    <div className="r-between">
      <div className="resume-name">{name}</div>
      <div>{`Email: ${email}`}</div>
    </div>
    <div className="r-between">
      <div>{`${gender} / ${birthday}`}</div>
      <div>{`Phone: ${phone}`}</div>
    </div>
    <div className="r-between">
      <div>{`Portfolio: ${portfolio}`}</div>
      <div>{`Github: ${github}`}</div>
    </div>
  </div>
}
