import React, { useEffect, useRef, useState } from 'react';
import '../editor.css';

const GRID_SIZE = 20;

const Canvas = ({ selectedTool, selectedShape, setSelectedFigure }) => {
    const canvasRef = useRef(null);
    const [points, setPoints] = useState([]);
    const [shapes, setShapes] = useState([]);
    const [selectedShapePoints, setSelectedShapePoints] = useState(null); // Track selected shape points
    const [hoveredShapePoints, setHoveredShapePoints] = useState(null); // Track hovered shape points

    const shapeColors = {
        Rectangle: 'rgba(255, 0, 0, 0.3)', // Red with transparency
        Circle: 'rgba(0, 255, 0, 0.3)',     // Green with transparency
        Triangle: 'rgba(0, 0, 255, 0.3)'     // Blue with transparency
    };

    const outlineColors = {
        Rectangle: 'red',
        Circle: 'green',
        Triangle: 'blue'
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw grid
        for (let i = 0; i < canvas.width; i += GRID_SIZE) {
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
        }

        for (let i = 0; i < canvas.height; i += GRID_SIZE) {
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
        }
        ctx.strokeStyle = "#ddd";
        ctx.stroke();

        // Draw all shapes with transparency and thick outlines
        shapes.forEach(shape => {
            ctx.beginPath();
            ctx.fillStyle = shapeColors[shape.type];
            ctx.globalAlpha = 0.5;
            switch (shape.type) {
                case 'Rectangle':
                    const [p1, p2] = shape.points;
                    const x = Math.min(p1.x, p2.x);
                    const y = Math.min(p1.y, p2.y);
                    const width = Math.abs(p1.x - p2.x);
                    const height = Math.abs(p1.y - p2.y);
                    ctx.rect(x, y, width, height);
                    break;
                case 'Circle':
                    const [center, circumference] = shape.points;
                    const radius = Math.sqrt(Math.pow(circumference.x - center.x, 2) + Math.pow(circumference.y - center.y, 2));
                    ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
                    break;
                case 'Triangle':
                    ctx.moveTo(shape.points[0].x, shape.points[0].y);
                    ctx.lineTo(shape.points[1].x, shape.points[1].y);
                    ctx.lineTo(shape.points[2].x, shape.points[2].y);
                    ctx.closePath();
                    break;
                default:
                    break;
            }
            ctx.fill();

            // Set outline color and thickness
            ctx.globalAlpha = 1;
            ctx.strokeStyle = outlineColors[shape.type];
            ctx.lineWidth = 3;
            ctx.stroke();
        });

        // Draw points of the selected shape, if any
        if (selectedShapePoints) {
            ctx.globalAlpha = 1; // Reset alpha for selected points
            selectedShapePoints.forEach(point => {
                ctx.beginPath();
                ctx.arc(point.x, point.y, 5, 0, Math.PI * 2); // Draw larger circles for visibility
                ctx.fillStyle = 'black'; // Color for the selected points
                ctx.fill();
            });
        }

        // Draw hovered points with a different color and size
        if (hoveredShapePoints) {
            ctx.globalAlpha = 1; // Reset alpha for hovered points
            hoveredShapePoints.forEach(point => {
                ctx.beginPath();
                ctx.arc(point.x, point.y, 3, 0, Math.PI * 2); // Smaller circles for hovered points
                ctx.fillStyle = 'red'; // Color for hovered points
                ctx.fill();
            });
        }

        // Draw regular points
        ctx.globalAlpha = 1;
        points.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 3, 0, Math.PI * 2); // Draw a small circle for the point
            ctx.fillStyle = 'black'; // Color for the points
            ctx.fill();
        });
    }, [shapes, points, selectedShapePoints, hoveredShapePoints]); // Redraw shapes and points whenever they change

    useEffect(() => {
        // Clear points whenever the selected tool changes
        setPoints([]);
        setSelectedShapePoints(null); // Clear selected shape points on tool change
        setHoveredShapePoints(null); // Clear hovered shape points on tool change
    }, [selectedTool]);

    const handleMouseDown = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Snap to grid
        const snappedX = Math.round(x / GRID_SIZE) * GRID_SIZE;
        const snappedY = Math.round(y / GRID_SIZE) * GRID_SIZE;

        setPoints(prevPoints => [...prevPoints, { x: snappedX, y: snappedY }]);
    };

    const handleMouseMove = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Snap to grid
        const snappedX = Math.round(x / GRID_SIZE) * GRID_SIZE;
        const snappedY = Math.round(y / GRID_SIZE) * GRID_SIZE;

        const hoveredPoint = { x: snappedX, y: snappedY };

        // Check if the mouse is over any shape
        const hoveredShape = shapes.find(shape => isPointInShape(hoveredPoint, shape));
        if (hoveredShape) {
            setHoveredShapePoints(hoveredShape.points);
        } else {
            setHoveredShapePoints(null); // Clear if no shape is hovered
        }
    };

    const handleMouseUp = () => {
        if (selectedTool === 'Select') {
            // Clear old points when switching to select tool
            setPoints([]);

            const lastPoint = points[points.length - 1];
            const selectedShape = shapes.find(shape => isPointInShape(lastPoint, shape));
            if (selectedShape) {
                setSelectedFigure(selectedShape);
                setSelectedShapePoints(selectedShape.points); // Set points of the selected shape
            } else {
                setSelectedShapePoints(null); // Clear if no shape is selected
            }
        } else if (selectedTool === 'Erase') {
            const lastPoint = points[points.length - 1];
            const shapeIndex = shapes.findIndex(shape => isPointInShape(lastPoint, shape));
            if (shapeIndex !== -1) {
                setShapes(prevShapes => {
                    const newShapes = [...prevShapes];
                    newShapes.splice(shapeIndex, 1);
                    return newShapes;
                });
                setSelectedShapePoints(null); // Clear if a shape is erased
            }
        } else if (selectedTool === 'Draw' && selectedShape) {
            if (points.length >= getRequiredPoints(selectedShape)) {
                const shape = {
                    type: selectedShape,
                    points: points
                };
                setShapes(prevShapes => [...prevShapes, shape]);
                setPoints([]);
                setSelectedShapePoints(null); // Clear selected points after drawing
            }
        }
    };

    const isPointInShape = (point, shape) => {
        switch (shape.type) {
            case 'Rectangle':
                const [p1, p2] = shape.points;
                const xMin = Math.min(p1.x, p2.x);
                const xMax = Math.max(p1.x, p2.x);
                const yMin = Math.min(p1.y, p2.y);
                const yMax = Math.max(p1.y, p2.y);
                return point.x >= xMin && point.x <= xMax && point.y >= yMin && point.y <= yMax;
            case 'Circle':
                const [center, circumference] = shape.points;
                const radius = Math.sqrt(Math.pow(circumference.x - center.x, 2) + Math.pow(circumference.y - center.y, 2));
                const distance = Math.sqrt(Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2));
                return distance <= radius;
            case 'Triangle':
                const [a, b, c] = shape.points;
                return isPointInTriangle(point, a, b, c);
            default:
                return false;
        }
    };

    const isPointInTriangle = (pt, v1, v2, v3) => {
        const d1 = sign(pt, v1, v2);
        const d2 = sign(pt, v2, v3);
        const d3 = sign(pt, v3, v1);

        const hasNeg = (d1 < 0) || (d2 < 0) || (d3 < 0);
        const hasPos = (d1 > 0) || (d2 > 0) || (d3 > 0);

        return !(hasNeg && hasPos);
    };

    const sign = (p1, p2, p3) => {
        return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
    };

    const getRequiredPoints = (shape) => {
        switch (shape) {
            case 'Rectangle':
                return 2;
            case 'Circle':
                return 2;
            case 'Triangle':
                return 3;
            default:
                return 0;
        }
    };

    return (
        <canvas
            ref={canvasRef}
            width={800}
            border={'none'}
            height={600}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        />
    );
};

export default Canvas;
