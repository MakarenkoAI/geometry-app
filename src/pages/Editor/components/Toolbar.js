import React from 'react';
import '../editor.css';

const Toolbar = ({ setSelectedTool }) => {
    const tools = ['Select', 'Draw', 'Erase'];
    return (
        <div className='toolbar round-border'>
            <div>
                {tools.map((tool, index) => (
                    <button className='toolButton round-border selectedBtn' role="button" key={index} onClick={() => setSelectedTool(tool)}>
                        {tool}
                    </button>
                ))}
            </div>
        </div>

    );
};

export default Toolbar;
