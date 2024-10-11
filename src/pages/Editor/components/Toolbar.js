import React from 'react';

const Toolbar = ({ setSelectedTool }) => {
    const tools = ['Select', 'Draw', 'Erase'];

    return (
        <div style={{ width: '80px', borderRight: '1px solid black' }}>
            <div style={{ height: '80px', borderBottom: '1px solid black' }}>
            </div>
            <div>
                {tools.map((tool, index) => (
                    <button key={index} onClick={() => setSelectedTool(tool)}>
                        {tool}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Toolbar;