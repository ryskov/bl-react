import React from 'react';
import './../styles/Style.css';
import {Icon} from 'react-fa';

const Button = ({ style, width, height, label, noMargin, blStyle, disabled, iconProps }) => {
    let bClass = null;

    switch (blStyle) {
        case 'success':
            bClass = 'bl-success';
            break;
        case 'danger':
            bClass = 'bl-danger';
            break;
        case 'primary':
        default:
            bClass = 'bl-primary';
            break;
    }

    bClass += " bl-button-outer";

    if (disabled) bClass += " bl-disabled";

    let _style = style || {};

    if (noMargin) _style.margin = '0px';
    if (width) _style.width = width;

    if (height) _style.lineHeight = height;
    

    return (
        <div style={_style} className={bClass}>
            <span className="bl-button-text bl-label">{label ? label : null} { iconProps ? <Icon {...iconProps} /> : null } </span>
        </div>
    );
};

export default Button;