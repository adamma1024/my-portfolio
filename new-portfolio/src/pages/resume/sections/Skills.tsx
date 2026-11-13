import type { Skills as S, ResumeVariant } from "../data/experience";
import type { ResumeLabels, SkillKey } from "../data/i18n";

export const Skills = (props: { skills: S, variant: ResumeVariant, labels: ResumeLabels }) => {
  const { skills, variant, labels } = props;

  const showAI = variant !== 'frontend';
  const showBackend = variant !== 'frontend';

  const rows: SkillKey[] = [
    'programming_languages',
    'frontend',
    ...(showBackend ? ['backend' as const] : []),
    'database',
    ...(showAI ? ['ai_machine_learning_engineering' as const] : []),
    'tools_platforms',
    'others',
  ];

  return <div className="r-section">
    <div>
      <div className="t1">{labels.skills}</div>
      <div className="r-block resume-text-xs">
        {rows.map((key) => (
          <span className="r-line" key={key}>
            <span className="b">{labels.skillNames[key]}</span>
            <span>{skills[key].join(labels.listSep)}</span>
          </span>
        ))}
      </div>
    </div>
  </div>
}
