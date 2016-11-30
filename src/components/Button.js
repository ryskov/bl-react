import React from 'react';
import './../styles/Button.css';
import {Icon} from 'react-fa';

const Button = ({ style, label, noMargin, blStyle, disabled, icon, iconProps, onClick }) => {
    let bClass = null;
    let noop = () => {};

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
    let _iconProps = iconProps || {};

    if (noMargin) _style.margin = '0px';

    if (icon && !_iconProps.name) _iconProps.name = icon;

    return (
        <div style={_style} className={bClass} onClick={disabled ? noop : onClick}>
            <span className="bl-button-text">{label ? label : null} { iconProps || icon ? <Icon {..._iconProps} /> : null } </span>
        </div>
    );
};

export default Button;