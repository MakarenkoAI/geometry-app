import React from 'react';

const ShapeInfo = ({ shape }) => {
    const GRID_SIZE = 20;
    const canvasHeight = 600;
    if (!shape) {
        return <div>Select a shape to see its details.</div>;
    }

    const convertCoordinatesForDisplay = (point) => {
        return {
            x: point.x / GRID_SIZE,
            y: (canvasHeight - point.y) / GRID_SIZE
        };
    };

    return (
        <div>
            <h3>Shape Details</h3>
            <p><strong>Type:</strong> {shape.type}</p>
            <p><strong>Points:</strong></p>
            <ul>
                {shape.points.map((point, index) => {
                    const { x, y } = convertCoordinatesForDisplay(point);
                    return (
                        <li key={index}>
                            X: {x}, Y: {y}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ShapeInfo;