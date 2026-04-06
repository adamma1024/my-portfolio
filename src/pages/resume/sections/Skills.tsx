import React from "react";
import { Skills as S, ResumeVariant } from "../data/experience";

export const Skills = (props: { skills: S, variant: ResumeVariant }) => {
  const { skills, variant } = props;
  const {
    programming_languages,
    frontend,
    backend,
    database,
    ai_machine_learning_engineering,
    others
  } = skills;

  const showAI = variant === 'ai';
  const showBackend = variant !== 'frontend';

  return <div className="r-section">
    <div>
      <div className="t1">SKILLS</div>
      <div className="r-block resume-text-xs">
        <span className="r-line">
          <span className="b">Programming Languages: </span>
          <span>{programming_languages.join(", ")}</span>
        </span>
        <span className="r-line">
          <span className="b">Frontend: </span>
          <span>{frontend.join(", ")}</span>
        </span>
        {showBackend && (
          <span className="r-line">
            <span className="b">Backend: </span>
            <span>{backend.join(", ")}</span>
          </span>
        )}
        <span className="r-line">
          <span className="b">Database: </span>
          <span>{database.join(", ")}</span>
        </span>
        {showAI && (
          <span className="r-line">
            <span className="b">AI &amp; Machine Learning: </span>
            <span>{ai_machine_learning_engineering.join(", ")}</span>
          </span>
        )}
        <span className="r-line">
          <span className="b">Others: </span>
          <span>{others.join(", ")}</span>
        </span>
      </div>
    </div>
  </div>
}
