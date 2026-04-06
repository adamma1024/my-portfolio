import React from "react";

export const EnhancedSpan = ({ text }: { text: string }) => {
  return <span>
    {text.split("`").map((str: string, index: number) => {
      return <span className={`${index % 2 === 0 ? '' : 'code'}`} key={index}> {str}</span>
    })}
  </span>
}
