import React, { Component } from 'react';
import './../styles/Dropdown.css';

export default class Dropdown extends Component {
    get value() {
        return this.refs.dropdown.value;
    }

    set value(val) {
        this.refs.dropdown.value = val;
    }

    blur() {
        return this.refs.dropdown.blur();
    }

    focus() {
        return this.refs.dropdown.focus();
    }

    _onSelect() {
        this.props.onSelect && this.props.onSelect(this.refs.dropdown.value);
    }

    _renderDropdown() {
        const 
        {
            style,
            blStyle,
            width,
            height,
            noMargin,
            value,
            disabled,
            actions = []
        } = this.props;

        let tClass = null;
        switch (blStyle) {
            case 'success':
                tClass = 'bl-success';
                break;
            case 'danger':
                tClass = 'bl-danger';
                break;
            case 'primary':
                tClass = 'bl-primary';
                break;
            default:
                tClass = '';
                break;
        }

        let _style = style || {};

        if (width) _style.width = width;
        if (height) _style.height = height;

        if (noMargin) _style.margin = '0px';

        return (
            <select 
                type="text"
                disabled={disabled}
                style={_style}
                ref="dropdown"
                className={`bl-dropdown ${tClass}`}
                value={value}
                onChange={this._onSelect.bind(this)} >

                {actions.map(({label, value}) => {
                    return <option value={value} key={value}>{label}</option>
                })}
            </select>
        );
    }

    render() {
        const 
        {
            title
        } = this.props;

        if (title) {
            return (
                <div>
                    <div className="bl-dropdown-title">{title}</div>
                    {this._renderDropdown()}
                </div>
            );
        }

        return this._renderDropdown();
    }
}