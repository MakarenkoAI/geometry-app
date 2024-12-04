import React from 'react';
import circle from '../../Chat/images/btn1.svg';
import triangle from '../../Chat/images/btn3.svg';
import rectangle from '../../Chat/images/btn2.svg';
import '../editor.css';

const shapes = [
    {
        Shape: 'Rectangle',
        img: 'fa fa-square fa-2x',
        src: rectangle,
    },
    {
        Shape: 'Triangle',
        img: 'fa fa-sort-asc fa-4x',
        src: triangle,
    },
    {
        Shape: 'Circle',
        img: 'fa fa-circle fa-2x',
        src: circle,
    },

]

const ShapeBar = ({ setSelectedShape }) => {
    return (
        <div className='shapebar round-border'>
            {shapes.map((shape, index) => (
                <span>
                    <i id='shapebuttons' className={shape.img} onClick={() => setSelectedShape(shape.Shape)}></i>
                </span>
            ))
            }
            <div id='BsFillTriangleFill'></div>
        </div>
    );
};

export default ShapeBar;
