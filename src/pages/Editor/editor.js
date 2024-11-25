import React, { useState } from 'react';
import Toolbar from './components/Toolbar';
import ShapeBar from './components/ShapeBar';
import SheetBar from './components/SheetBar';
import Canvas from './components/Canvas';
import ShapeInfo from './components/ShapeInfo';
import ChatComponent from "../Chat/components/ChatComponent";
import './editor.css';

const Editor = () => {
    const [selectedTool, setSelectedTool] = useState(null);
    const [selectedShape, setSelectedShape] = useState(null);
    const [selectedSheet, setSelectedSheet] = useState(null);
    const [selectedFigure, setSelectedFigure] = useState(null);
    const [shapes, setShapes] = useState([]); // State to hold all shapes

    const handleUpdateShape = (updatedShape) => {
        console.log(updatedShape);
        console.log(shapes);
        setShapes((prevShapes) =>
            prevShapes.map((s) => (s.id === updatedShape.id ? updatedShape : s))
        );
        console.log(shapes);
    };

    return (
        <div className='app'>
            <div className='editor'>
                <div className='upper-part inline-block'>
                    <ShapeBar setSelectedShape={setSelectedShape} />
                    <SheetBar setSelectedSheet={setSelectedSheet} />
                </div>
                <div className='lower-part'>
                    <Toolbar setSelectedTool={setSelectedTool} />
                    <div className='canvasFrame round-border'>
                        <Canvas 
                            selectedTool={selectedTool} 
                            selectedShape={selectedShape} 
                            selectedSheet={selectedSheet} 
                            setSelectedFigure={setSelectedFigure}
                            shapes={shapes} // Pass shapes to Canvas
                            setShapes={setShapes} // Pass setShapes to Canvas
                        />
                    </div>
                </div>
            </div>
            <div className='noteditor'>
                <ShapeInfo 
                    shape={selectedFigure} 
                    onUpdateShape={handleUpdateShape} // Pass the update handler
                />
                <div id="parent">
                    <ChatComponent />
                </div>
            </div>
        </div>
    );
};

export default Editor;