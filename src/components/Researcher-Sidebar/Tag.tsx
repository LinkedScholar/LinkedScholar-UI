import React from "react";
import "../../styles/components/tag.scss";
interface TagProps {
  label: string;
}

const Tag: React.FC<TagProps> = ({ label }) => {
  return <span className="tag">{label}</span>;
};

export default Tag;
