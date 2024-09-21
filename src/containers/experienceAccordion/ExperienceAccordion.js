import React, { Component } from "react";
import ExperienceCard from "../../components/experienceCard/ExperienceCard.js";
import "./ExperienceAccordion.css";
import { StatelessAccordion, Panel } from "baseui/accordion";

const ExperienceAccordion = (props) => {
  const theme = props?.theme;
  const [expanded, setExpanded] = React.useState(["Work", "Interships"]);
  return (
    <div className="experience-accord">
      <StatelessAccordion
        expanded={expanded}
        onChange={({ key }) => {
          const idx = expanded.findIndex(item => item === key);
          if (idx !== -1) {
            setExpanded(expanded.filter(item => item !== key));
          } else {
            setExpanded([
              ...expanded,
              key
            ]);
          }
        }}
      >
        {props.sections.map((section) => {
          return (
            <Panel
              className="accord-panel"
              title={section["title"]}
              key={section["title"]}
              overrides={{
                Header: {
                  style: () => ({
                    backgroundColor: `${theme.body}`,
                    border: `1px solid`,
                    borderRadius: `5px`,
                    borderColor: `${theme.headerColor}`,
                    marginBottom: `3px`,
                    fontFamily: "Google Sans Regular",
                    color: `${theme.text}`,
                    ":hover": {
                      color: `${theme.secondaryText}`,
                    },
                  }),
                },
                Content: {
                  style: () => ({
                    backgroundColor: `${theme.body}`,
                  }),
                },
              }}
            >
              {section["experiences"].map((experience, index) => {
                return (
                  <ExperienceCard index={index} totalCards={section["experiences"].length} experience={experience} theme={theme} />
                );
              })}
            </Panel>
          );
        })}
      </StatelessAccordion>
    </div>
  );
}

export default ExperienceAccordion;
