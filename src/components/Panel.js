import React from 'react';
import './../styles/Panel.css';
import {Icon} from 'react-fa';

const Panel = ({ noMargin, children, width, height, style, title, iconProps}) => {
    let _style = style || {};

    if (width) _style.width = width;
    if (height) _style.height = height;
    
    if (noMargin) _style.margin = '0px';

    return (
        <div
            className="bl-panel-outer" 
            style={_style} >
            { title || iconProps ? 
                <div className="bl-panel-title">{ iconProps ? <Icon {...iconProps} /> : null} {title}</div> 
                : null
            }
            <div className="bl-panel-content">
                {children}
            </div>
        </div>
    )  
};

export default Panel;