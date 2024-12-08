import React from 'react';
import '../editor.css';

const Toolbar = ({ setSelectedTool }) => {
    const tools = ['Select', 'Draw', 'Erase', 'Edit'];

    const toolDescriptions = {
        Select: 'Инструмент для выбора объектов',
        Draw: 'Инструмент для рисования',
        Erase: 'Инструмент для удаления',
        Edit: 'Инструмент для редактирования',
    };
    return (
        <div className='toolbar round-border'>
            <div className='instruments'>
                {tools.map((tool, index) => (
                    <div className="tooltip-container" key={index}>
                    <button className='toolButton round-border selectedBtn' key={index} onClick={() => setSelectedTool(tool)}>
                        {tool}
                    </button>
                    <div className="tooltip">{toolDescriptions[tool]}</div>
                    </div>
                ))}
            </div>
            <div className='back'>
                <i id='fa-buttons' className="fa fa-undo fa-2x cntr" aria-hidden="true"></i>
                <i id='fa-buttons' className="fa fa-undo fa-2x rotate" aria-hidden="true"></i>
            </div>
        </div>

    );
};

export default Toolbar;
