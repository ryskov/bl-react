import React, { Component } from 'react';
import './../styles/CheckBox.css';

export default class CheckBox extends Component {
    get value() {
        return this.refs.checkBox.checked;
    }

    set value(val) {
        this.refs.checkBox.checked = val;
    }

    blur() {
        return this.refs.checkBox.blur();
    }

    focus() {
        return this.refs.checkBox.focus();
    }

    _onChange() {
        this.props.onChange && this.props.onChange(this.refs.checkBox.value);
    }

    _renderCheckBox() {
        const 
        {
            style,
            blStyle,
            width,
            height,
            noMargin,
            value,
            disabled
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
            <input 
                type="checkbox"
                disabled={disabled}
                style={_style}
                ref="checkBox"
                className={`bl-checkbox ${tClass}`}
                checked={value}
                onChange={this._onChange.bind(this)} />
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
                    <div className="bl-checkbox-title">{title}</div>
                    {this._renderCheckBox()}
                </div>
            );
        }

        return this._renderCheckBox();
    }
}