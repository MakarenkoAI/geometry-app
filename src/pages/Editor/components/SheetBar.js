import React from 'react';
import '../editor.css';

const SheetBar = ({ setSelectedSheet }) => {
    const sheets = [1, 2, 3];

    return (
        <div className='sheetbar round-border'>
            {sheets.map((sheet, index) => (
                <button key={index} className='sheetButton round-border selectedBtn' onClick={() => setSelectedSheet(sheet)}>
                    {sheet}
                </button>
            ))}
        </div>
    );
};

export default SheetBar;
