import React, { useEffect, useRef } from 'react';

const Canvas = ({ selectedTool, selectedShape, selectedSheet }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw grid
        for (let i = 0; i < canvas.width; i += 20) {
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
        }

        for (let i = 0; i < canvas.height; i += 20) {
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
        }
        ctx.strokeStyle = "#ddd";
        ctx.stroke();
    }, []);

    const handleMouseDown = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (selectedTool === 'Draw' && selectedShape) {
            ctx.beginPath();
            switch (selectedShape) {
                case 'Rectangle':
                    ctx.rect(x - 20, y - 20, 40, 40);
                    break;
                case 'Circle':
                    ctx.arc(x, y, 20, 0, Math.PI * 2);
                    break;
                case 'Triangle':
                    ctx.moveTo(x, y - 20);
                    ctx.lineTo(x - 20, y + 20);
                    ctx.lineTo(x + 20, y + 20);
                    ctx.closePath();
                    break;
                default:
                    break;
            }
            ctx.fillStyle = 'pink';
            ctx.fill();
        }
    };

    return (
        <canvas
            ref={canvasRef}
            width={800}
            height={600}
            style={{ border: '1px solid black' }}
            onMouseDown={handleMouseDown}
        />
    );
};

export default Canvas;