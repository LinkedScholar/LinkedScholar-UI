import React from "react";
import "../../styles/components/tag.scss";

interface TagProps {
  text: string;
  onClick?: () => void;
  onAdd?: () => void;
  isInteractive?: boolean;
}

const Tag: React.FC<TagProps> = ({ 
  text, 
  onClick, 
  onAdd,
  isInteractive = false 
}) => {
  return (
    <div 
      className={`tag ${isInteractive ? 'interactive' : ''}`} 
      onClick={onClick}
    >
      <span className="tag-text">{text}</span>
      {onAdd && (
        <button 
          className="tag-add-button"
          onClick={(e) => {
            e.stopPropagation();
            onAdd();
          }}
        >
          <i className="mdi mdi-plus"></i>
        </button>
      )}
    </div>
  );
};

export default Tag;