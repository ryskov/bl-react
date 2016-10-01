import React from 'react';
import './../styles/Panel.css';

const Panel = ({ children, width, height}) => {
    return (
        <div
            className="panel-outer" 
            style={{
                width,
                height
            }} >
            {children}
        </div>
    )  
};

export default Panel;