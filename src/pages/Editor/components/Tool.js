import React from 'react';

//const Tool = ({ type, selected, onClick }) => {
  return (
    <button 
      className={`tool ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {/* Icon for the tool */}
      {type}
    </button>
  );
//};

export default Tool;