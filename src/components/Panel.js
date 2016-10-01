import React from 'react';
import './../styles/Panel.css';

const Panel = ({ noMargin, children, width, height, style, title}) => {
    let _style = style || {};

    if (width) _style.width = width;
    if (height) _style.height = height;
    
    if (noMargin) _style.margin = '0px';

    return (
        <div
            className="bl-panel-outer" 
            style={_style} >
            { title ? 
                <div className="bl-panel-title">{title}</div> 
                : null
            }
            {children}
        </div>
    )  
};

export default Panel;