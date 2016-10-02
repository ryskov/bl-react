import React from 'react';
import './../styles/Button.css';
import {Icon} from 'react-fa';

const Button = ({ style, label, noMargin, blStyle, disabled, iconProps }) => {
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

    return (
        <div style={_style} className={bClass}>
            <span className="bl-button-text">{label ? label : null} { iconProps ? <Icon {...iconProps} /> : null } </span>
        </div>
    );
};

export default Button;