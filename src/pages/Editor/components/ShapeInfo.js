import React, { useEffect, useState } from 'react';
import '../editor.css';

const GRID_SIZE = 20;
const canvasHeight = 600;

const ShapeInfo = ({ shape, onUpdateShape }) => {
    const [editableValues, setEditableValues] = useState({});

    useEffect(() => {
        if (shape) {
            if (shape.type === 'Rectangle') {
                const { width, height } = calculateRectangleParameters(shape.points);
                setEditableValues({ width, height });
            } else if (shape.type === 'Circle') {
                const radius = calculateCircleRadius(shape.points);
                setEditableValues({ radius });
            } else if (shape.type === 'Triangle') {
                const { sideAB, sideBC, sideCA } = calculateTriangleSides(shape.points);
                setEditableValues({ sideAB, sideBC, sideCA });
            }
        }
    }, [shape]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = parseFloat(value * GRID_SIZE);
    
        setEditableValues((prev) => {
            const updatedValues = { ...prev, [name]: newValue };
            updateShape(updatedValues); // Pass the updated values to updateShape
            return updatedValues;
        });
    };

    const updateShape = (updatedEditableValues) => {
        if (shape) {
            let newPoints;

            switch (shape.type) {
                case 'Rectangle':
                    const { width, height } = updatedEditableValues || editableValues;
                    const [p1, , p2, ] = shape.points; //Simplified array destructuring

                    newPoints = [
                        { ...p1, x: p1.x },
                        { ...p1, x: p1.x, y: p1.y + height },
                        { ...p2, x: p1.x + width, y: p1.y + height },
                        { ...p2, x: p1.x + width, y: p1.y }
                    ];
                    break;

                case 'Circle':
                    const radius = updatedEditableValues.radius || editableValues.radius;
                    const [center] = shape.points;
                    newPoints = [
                        center,
                        { x: center.x + radius, y: center.y }
                    ];
                    break;

                case 'Triangle':
                    const { sideAB, sideBC, sideCA } = updatedEditableValues || editableValues; // Use updated values if available, otherwise use the current state
                    const [a, b, c] = shape.points;
                    const { sideAB: calcSideAB, sideBC: calcSideBC, sideCA: calcSideCA } = calculateTriangleSides(shape.points);
                    
                    //Detect which side changed
                    let changedSide = null;
                    if (Math.abs(sideAB - calcSideAB) > 0.1) changedSide = 'AB';
                    else if (Math.abs(sideBC - calcSideBC) > 0.1) changedSide = 'BC';
                    else if (Math.abs(sideCA - calcSideCA) > 0.1) changedSide = 'CA';
    
                    if (changedSide) {
                        console.log(changedSide);
                        newPoints = updateTrianglePoints(a, b, c, sideAB, sideBC, sideCA, changedSide);
                        break;
                    }
                    return;

                default:
                    return;
            }

            onUpdateShape({ ...shape, points: assignUniqueNamesToPoints(newPoints) });
        }
    };

    const assignUniqueNamesToPoints = (points) => {
        const newPoints = [];
        const availableNames = [...Array(26)].map((_, i) => String.fromCharCode(65 + i)); // A-Z

        for (let i = 0; i < points.length; i++) {
            const name = availableNames[i] || null; // Assign name or null if out of names
            newPoints.push({ ...points[i], name });
        }
        return newPoints;
    };

    const calculateRectangleParameters = (points) => {
        const [p1, p2, p3, p4] = points;
        const width = Math.abs(p1.x - p3.x);
        const height = Math.abs(p1.y - p2.y);
        return { width, height };
    };

    const calculateCircleRadius = (points) => {
        const [center, circumference] = points;
        return Math.sqrt(Math.pow(circumference.x - center.x, 2) + Math.pow(circumference.y - center.y, 2));
    };

    const calculateTriangleSides = (points) => {
        const [a, b, c] = points;
        const sideAB = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
        const sideBC = Math.sqrt(Math.pow(c.x - b.x, 2) + Math.pow(c.y - b.y, 2));
        const sideCA = Math.sqrt(Math.pow(a.x - c.x, 2) + Math.pow(a.y - c.y, 2));
        return { sideAB, sideBC, sideCA };
    };

    const calculatePointFromTwoPointsAndDistance = (point1, distance, angle) => {
        return {
            x: point1.x + distance * Math.cos(angle),
            y: point1.y + distance * Math.sin(angle)
        };
    };

    const updateTrianglePoints = (a, b, c, sideAB, sideBC, sideCA, changedSide) => {
        const distance = (p1, p2) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

        // Calculate the current lengths of the sides
        const currentSideAB = distance(a, b);
        const currentSideBC = distance(b, c);
        const currentSideCA = distance(c, a);
        
        let newA = { ...a };
        let newB = { ...b };
        let newC = { ...c };
        
        if (changedSide === 'AB') {
            const scaleAB = sideAB / currentSideAB;

            newB.x = a.x + (b.x - a.x) * scaleAB;
            newB.y = a.y + (b.y - a.y) * scaleAB;
            return [a, newB, c];
        } else if (changedSide === 'BC') {
            const scaleBC = sideBC / currentSideBC;

            newC.x = b.x + (c.x - b.x) * scaleBC;
            newC.y = b.y + (c.y - b.y) * scaleBC;
            return [a, b, newC];
        } else if (changedSide === 'CA') {
            const scaleCA = sideCA / currentSideCA;

            newA.x = c.x + (a.x - c.x) * scaleCA;
            newA.y = c.y + (a.y - c.y) * scaleCA;
            return [newA, b, c];
        } else {
            return [a, b, c]; //No changes
        }
    };

    if (!shape || !shape.points) {
        return (
            <div className='shapeinfo round-border numberstyle'>
                <div style={{ marginLeft: '70px' }}>
                    Select a shape to see its details.
                </div>
            </div>
        );
    }

    return (
        <div className='shapeinfo round-border numberstyle' style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div style={{ marginLeft: '70px', flexShrink: 0 }}>
                <div style={{ overflowX: 'auto' }}>
                    Shape Details<br />
                    Type: {shape.type}<br />
                    {shape.type === 'Rectangle' && (
                        <div>
                            <div>
                                Width: <input type="number" name="width" value={editableValues.width / GRID_SIZE} onChange={handleChange} />
                            </div>
                            <div>
                                Height: <input type="number" name="height" value={editableValues.height / GRID_SIZE} onChange={handleChange} />
                            </div>
                        </div>
                    )}
                    {shape.type === 'Circle' && (
                        <div>
                            <div>
                                Radius: <input type="number" name="radius" value={editableValues.radius / GRID_SIZE} onChange={handleChange} />
                            </div>
                        </div>
                    )}
                    {shape.type === 'Triangle' && (
                        <div>
                            <div>
                                Side AB: <input type="number" name="sideAB" value={editableValues.sideAB / GRID_SIZE} onChange={handleChange} />
                            </div>
                            <div>
                                Side BC: <input type="number" name="sideBC" value={editableValues.sideBC / GRID_SIZE} onChange={handleChange} />
                            </div>
                            <div>
                                Side CA: <input type="number" name="sideCA" value={editableValues.sideCA / GRID_SIZE} onChange={handleChange} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div style={{ marginLeft: '20px', overflow: 'auto', maxWidth: '200px', maxHeight: '100%' }}>
                <table className='numberstyle' style={{ width: '100%', tableLayout: 'fixed' }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>X</th>
                            <th>Y</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shape.points.map((point, index) => {
                            const xDisplay = point.x / GRID_SIZE;
                            const yDisplay = (canvasHeight - point.y) / GRID_SIZE;
                            return (
                                <tr key={index}>
                                    <td>{point.name}</td>
                                    <td>{xDisplay}</td>
                                    <td>{yDisplay}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ShapeInfo;