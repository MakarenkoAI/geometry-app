import React, {useEffect } from 'react';

const Shape = ({ type, startX, startY, endX, endY, centerX, centerY, radius, context }) => {
  useEffect(() => {
    if (type === 'line') {
      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(endX, endY);
      context.stroke();
    } else if (type === 'rectangle') {
      context.beginPath();
      context.rect(startX, startY, endX - startX, endY - startY);
      context.stroke();
    } else if (type === 'circle') {
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      context.stroke();
    } else if (type === 'triangle') {
      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(endX, endY);
      context.lineTo(startX, endY + (startY - endY) * 2);
      context.closePath();
      context.stroke();
    }
  }, [type, startX, startY, endX, endY, centerX, centerY, radius, context]);

  return null; // No visual representation needed in this component
};

export default Shape;