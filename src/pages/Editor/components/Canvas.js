import React, { useEffect, useRef, useState } from 'react';
import '../editor.css';
import { v4 as uuidv4 } from 'uuid'; // Import UUID for unique IDs

const GRID_SIZE = 20;

const Canvas = ({ selectedTool, selectedShape, setSelectedFigure, shapes, setShapes }) => {
    const canvasRef = useRef(null);
    const [points, setPoints] = useState([]);
    const [selectedShapePoints, setSelectedShapePoints] = useState(null);
    const [hoveredShapePoints, setHoveredShapePoints] = useState(null);
    const [availableNames, setAvailableNames] = useState([...Array(26)].map((_, i) => String.fromCharCode(65 + i))); // A-Z
    const [draggingPoint, setDraggingPoint] = useState(null);
    const [draggedShape, setDraggedShape] = useState(null);

    const shapeColors = {
        Rectangle: 'rgba(255, 0, 0, 0.3)',
        Circle: 'rgba(0, 255, 0, 0.3)',
        Triangle: 'rgba(0, 0, 255, 0.3)'
    };

    const outlineColors = {
        Rectangle: 'red',
        Circle: 'green',
        Triangle: 'blue'
    };

    const handleResize = () => {
        const canvas = canvasRef.current;
        const { clientWidth, clientHeight } = canvas.parentElement;
        canvas.width = clientWidth;
        canvas.height = clientHeight;
        redrawCanvas();
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [shapes, points, selectedShapePoints, hoveredShapePoints]);

    useEffect(() => {
        redrawCanvas();
    }, [shapes, points, selectedShapePoints, hoveredShapePoints]);

    const redrawCanvas = () => {
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

        // Draw all shapes
        shapes.forEach(shape => {
            ctx.beginPath();
            ctx.fillStyle = shapeColors[shape.type];
            ctx.globalAlpha = 0.5;
            switch (shape.type) {
                case 'Rectangle':
                    const [p1, a, p2, b] = shape.points;
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

        // Draw points of the selected shape
        if (selectedShapePoints) {
            ctx.globalAlpha = 1;
            selectedShapePoints.forEach(point => {
                ctx.beginPath();
                ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
                ctx.fillStyle = 'black';
                ctx.fill();
                // Draw point name
                if (point.name) {
                    ctx.fillStyle = 'black';
                    ctx.fillText(point.name, point.x + 8, point.y); // Offset for better visibility
                }
            });
        }

        // Draw hovered points
        if (hoveredShapePoints) {
            ctx.globalAlpha = 1;
            hoveredShapePoints.forEach(point => {
                ctx.beginPath();
                ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = 'red';
                ctx.fill();
            });
        }

        // Draw regular points
        ctx.globalAlpha = 1;
        points.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = 'black';
            ctx.fill();
        });
    };

    useEffect(() => {
        setPoints([]);
        setSelectedShapePoints(null);
        setHoveredShapePoints(null);
    }, [selectedTool]);

    const handleMouseDown = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const snappedX = Math.round(x / GRID_SIZE) * GRID_SIZE;
        const snappedY = Math.round(y / GRID_SIZE) * GRID_SIZE;

        if (selectedTool === 'Edit') {
            // Check if clicking on any point
            const clickedPoint = shapes.flatMap(shape => shape.points).find(point => {
                return Math.abs(point.x - snappedX) < 20 && Math.abs(point.y - snappedY) < 20;
            });

            if (clickedPoint) {
                setDraggingPoint(clickedPoint);
                // Find the shape that this point belongs to
                const shape = shapes.find(s => s.points.includes(clickedPoint));
                setDraggedShape(shape);
            }
        } else {
            setPoints(prevPoints => [...prevPoints, { x: snappedX, y: snappedY, name: null }]);
        }
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
            setHoveredShapePoints(null);
        }        
        
        if (draggingPoint && draggedShape) {
            // Update the dragging point's position
            draggingPoint.x = snappedX;
            draggingPoint.y = snappedY;
            if (draggedShape.type === 'Rectangle') {
                const [corner1, corner2, corner3, corner4] = draggedShape.points; // Correct order

                //Find the index of the dragged point
                const pointIndex = draggedShape.points.indexOf(draggingPoint);

                // Recalculate the other corners based on the dragged point
                let updatedPoints;
                if (pointIndex === 0) { //corner1 dragged
                    updatedPoints = [draggingPoint, { x: draggingPoint.x, y: corner2.y, name: corner2.name }, corner3, { x: corner3.x, y: draggingPoint.y, name: corner4.name }];
                } else if (pointIndex === 1) { //corner2 dragged
                    updatedPoints = [{ x: draggingPoint.x, y: corner1.y, name: corner1.name}, draggingPoint, { x: corner3.x, y: draggingPoint.y, name: corner3.name}, corner4];
                } else if (pointIndex === 2) { //corner3 dragged
                    updatedPoints = [corner1, { x: corner2.x, y: draggingPoint.y, name: corner2.name }, draggingPoint, { x: draggingPoint.x, y: corner4.y, name: corner4.name }];
                } else { //corner4 dragged
                    updatedPoints = [{ x: corner1.x, y: draggingPoint.y, name: corner1.name }, corner2, { x: draggingPoint.x, y: corner3.y, name: corner3.name }, draggingPoint];
                }
                handleUpdateShape({ ...draggedShape, points: updatedPoints });
            } else {
                handleUpdateShape({ ...draggedShape });
            }
        }
    };

    const handleMouseUp = () => {
        if (selectedTool === 'Select') {
            setPoints([]);
    
            const lastPoint = points[points.length - 1];
            const selectedShape = shapes.find(shape => isPointInShape(lastPoint, shape));
            if (selectedShape) {
                setSelectedFigure(selectedShape);
                setSelectedShapePoints(selectedShape.points);
            } else {
                setSelectedShapePoints(null);
            }
        } else if (selectedTool === 'Erase') {
            const lastPoint = points[points.length - 1];
            const shapeIndex = shapes.findIndex(shape => isPointInShape(lastPoint, shape));
            if (shapeIndex !== -1) {
                const removedShape = shapes[shapeIndex];
                setShapes(prevShapes => {
                    const newShapes = [...prevShapes];
                    newShapes.splice(shapeIndex, 1);
                    return newShapes;
                });
                // Make point names of the removed shape available again
                setAvailableNames(prev => [...prev, ...removedShape.points.map(point => point.name)]);
                setSelectedShapePoints(null);
            }
        } else if (selectedTool === 'Draw' && selectedShape) {
            if (points.length >= getRequiredPoints(selectedShape)) {
                let shape;
    
                if (selectedShape === 'Rectangle') {
                    const [p1, p2] = points;
    
                    // Create additional points
                    const additionalPoints = [
                        { x: p1.x, y: p2.y, name: null }, // newPoint1 (Bottom-left)
                        { x: p2.x, y: p1.y, name: null }  // newPoint2 (Top-right)
                    ];
    
                    // Combine points in the desired order
                    var orderedPoints = [p1, additionalPoints[0], p2, additionalPoints[1]];
                    orderedPoints = assignUniqueNamesToPoints(orderedPoints)

                    // Assign unique names to all points in the specified order
                    shape = {
                        id: uuidv4(),
                        type: selectedShape,
                        points: assignUniqueNamesToPoints(orderedPoints),
                    };
                } else {
                    shape = {
                        id: uuidv4(),
                        type: selectedShape,
                        points: assignUniqueNamesToPoints(points),
                    };
                }
    
                setShapes(prevShapes => [...prevShapes, shape]);
                setPoints([]);
                setSelectedShapePoints(null);
            }
        }

        if (draggingPoint) {
            setDraggingPoint(null); // Stop dragging
            setDraggedShape(null);
        }
    };

    const assignUniqueNamesToPoints = (points) => {
        const newPoints = [];
        let currentAvailableNames = [...availableNames]; // Create a copy of the available names
    
        for (let i = 0; i < points.length; i++) {
            if (currentAvailableNames.length > 0) {
                const name = currentAvailableNames[0]; // Get the first available name
                newPoints.push({ ...points[i], name });
                currentAvailableNames = currentAvailableNames.slice(1); // Remove it from the available names
            } else {
                newPoints.push({ ...points[i], name: null }); // No more available names
            }
        }
        
        setAvailableNames(currentAvailableNames); // Update the available names state
        return newPoints;
    };

    const getNextAvailableName = () => {
        setAvailableNames(prev => {
            if (prev.length > 0) {
                const name = prev[0]; // Get the first available name
                
                // Return the new state (slice the first element)
                return prev.slice(1);
            }
            return []; // If all names are used, return an empty array
        });
    };

    const isPointInShape = (point, shape) => {
        switch (shape.type) {
            case 'Rectangle':
                const [p1, d, p2, g] = shape.points;
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

    const handleUpdateShape = (updatedShape) => {
        setShapes((prevShapes) =>
            prevShapes.map((s) => (s.id === updatedShape.id ? updatedShape : s))
        );
        setSelectedShapePoints(updatedShape.points)
        setSelectedFigure(updatedShape);
    };

    return (
        <canvas
            ref={canvasRef}
            border={'none'}
            style={{ width: '100%', height: '100%' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        />
    );
};

export default Canvas;