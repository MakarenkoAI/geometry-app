import React from 'react';
import '../editor.css';

const ShapeInfo = ({ shape }) => {
    const GRID_SIZE = 20;
    const canvasHeight = 600;
    if (!shape) {
        return <div className='shapeinfo round-border'>
            <div style={{ marginLeft: '70px' }}>
                Select a shape to see its details.
            </div>
        </div>;
    }

    const convertCoordinatesForDisplay = (point) => {
        return {
            x: point.x / GRID_SIZE,
            y: (canvasHeight - point.y) / GRID_SIZE
        };
    };

    return (
        <div className='shapeinfo round-border'>
            <div style={{ marginLeft: '70px' }}>
                Shape Details<br></br>
                Type: {shape.type}
                <div style={{ overflowX: 'auto' }}>
                    <table>
                        <th>
                            <tr>X</tr>
                            <tr>Y</tr>
                        </th>
                        {shape.points.map((point, index) => {
                            const { x, y } = convertCoordinatesForDisplay(point);
                            return (
                                <th>
                                    <tr>{x}</tr>
                                    <tr>{y}</tr>
                                </th>
                            );
                        })}
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ShapeInfo;
