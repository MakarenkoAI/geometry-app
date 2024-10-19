import React from 'react';
import circle from '../../Chat/images/btn1.svg';
import triangle from '../../Chat/images/btn3.svg';
import rectangle from '../../Chat/images/btn2.svg';
import '../editor.css';

const shapes = [
    {
        Shape: 'Triangle',
        img: 'fa fa-paper-plane-o fa-2x',
        src: triangle,
    },
    {
        Shape: 'Circle',
        img: 'fa fa-paper-plane-o fa-2x',
        src: circle,
    },
    {
        Shape: 'Rectangle',
        img: 'fa fa-paper-plane-o fa-2x',
        src: rectangle,
    },
]

const ShapeBar = ({ setSelectedShape }) => {
    return (
        <div className='shapebar round-border'>
            {shapes.map((shape, index) => (
                <span>
                    <img id='shapebuttons' className='selectedBtn' src={shape.src} onClick={() => setSelectedShape(shape.Shape)} />
                </span>
            ))
            }

        </div>
    );
};

export default ShapeBar;
