import React, { useState } from "react";

const ExpandableCell = ({ content }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="expandable-cell">
        <div className={`content ${expanded ? "expanded" : ""}`}>
        {content}
      </div>
      <i
        className={`ms-3 fa-solid fa-caret-${expanded ? "up" : "down"}`}
        onClick={toggleExpand}>
      </i>
      
    </div>
  );
};

export default ExpandableCell;
