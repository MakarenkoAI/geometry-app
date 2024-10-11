import React, { useState } from 'react';
import Toolbar from './components/Toolbar';
import ShapeBar from './components/ShapeBar';
import SheetBar from './components/SheetBar';
import Canvas from './components/Canvas';

const Editor = () => {
    const [selectedTool, setSelectedTool] = useState(null);
    const [selectedShape, setSelectedShape] = useState(null);
    const [selectedSheet, setSelectedSheet] = useState(null);

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Toolbar setSelectedTool={setSelectedTool} />
            <div >
                <div style={{ display: 'flex', height: '11vh' }}>
                    <ShapeBar setSelectedShape={setSelectedShape} />
                    <SheetBar setSelectedSheet={setSelectedSheet} />
                </div>
                <div>
                    <Canvas selectedTool={selectedTool} selectedShape={selectedShape} selectedSheet={selectedSheet}/>
                </div>
            </div>
        </div>
    );
};

export default Editor;