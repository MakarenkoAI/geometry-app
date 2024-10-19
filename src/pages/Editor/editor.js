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
    const [selectedFigure, setSelectedFigure] = useState(null); // State for selected figure

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
                        <Canvas selectedTool={selectedTool} selectedShape={selectedShape} selectedSheet={selectedSheet} setSelectedFigure={setSelectedFigure} />
                    </div>
                </div>
            </div>
            <div className='noteditor'>
                <ShapeInfo shape={selectedFigure} />
                <div id="parent">
                    <ChatComponent />
                </div>
            </div>
        </div>
    );
};

export default Editor;
