import React from 'react';

const SheetBar = ({ setSelectedSheet }) => {
    const sheets = [1, 2, 3];

    return (
        <div style={{ width: '200px', borderBottom: '1px solid black' }}>
            {sheets.map((sheet, index) => (
                <button key={index} onClick={() => setSelectedSheet(sheet)}>
                    {sheet}
                </button>
            ))}
        </div>
    );
};

export default SheetBar;