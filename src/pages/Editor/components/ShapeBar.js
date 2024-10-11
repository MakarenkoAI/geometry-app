import React from 'react';

const ShapeBar = ({ setSelectedShape }) => {
    const shapes = ['Rectangle', 'Circle', 'Triangle'];

    return (
        <div style={{ width: '200px', borderBottom: '1px solid black' }}>
            {shapes.map((shape, index) => (
                <button key={index} onClick={() => setSelectedShape(shape)}>
                    {shape}
                </button>
            ))}
        </div>
    );
};

export default ShapeBar;