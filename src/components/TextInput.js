import React, { Component } from 'react';
import './../styles/TextInput.css';

export default class TextInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            textAlign: 'center'
        };
    }

    static propTypes() {
        return {
            placeholder: React.PropTypes.string
        }
    }

    get value() {
        return this.refs.textinput.value;
    }

    set value(val) {
        this.refs.textinput.value = val;
    }

    _onFocus() {
        if (this.props.placeholder) {
            this.refs.textinput.placeholder = "";
        }

        this.setState({
            textAlign: 'left'
        });
    }

    _onBlur() {
        if (this.props.placeholder) {
            this.refs.textinput.placeholder = this.props.placeholder;
        }

        this.setState({
            textAlign: 'center'
        });
    }

    _onKeyDown(e) {
        switch (e.keyCode) {
            case 13: // enter
                if (this.props.onSubmit) {
                    this.props.onSubmit(this.refs.textinput.value);
                    e.preventDefault();
                }
                break;
            default:
                break;
        }

        if (this.props.onKeyDown) this.props.onKeyDown(e);
    }
    
    _onKeyUp(e) {
        if (this.props.onKeyUp) this.props.onKeyUp(e);
    }

    blur() {
        return this.refs.textinput.blur();
    }

    focus() {
        return this.refs.textinput.focus();
    }

    _renderInput() {
        const 
        {
            style,
            blStyle,
            placeholder,
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

        _style.textAlign = this.state.textAlign;

        return (
            <input 
                type="text"
                disabled={disabled}
                style={_style}
                ref="textinput"
                className={`bl-text-input ${tClass}`}
                onFocus={this._onFocus.bind(this)}
                value={value}
                onBlur={this._onBlur.bind(this)}
                placeholder={placeholder ? placeholder : null}
                onKeyDown={this._onKeyDown.bind(this) }
                onKeyUp={this._onKeyUp.bind(this) } />
        );
    }

    render() {
        const 
        {
            style,
            placeholder,
            width,
            height,
            noMargin,
            disabled,
            title
        } = this.props;

        let _style = style || {};

        if (width) _style.width = width;
        if (height) _style.height = height;

        if (noMargin) _style.margin = '0px';

        _style.textAlign = this.state.textAlign;

        if (title) {
            return (
                <div>
                    <div className="bl-text-input-title">{title}</div>
                    {this._renderInput()}
                </div>
            );
        }

        return this._renderInput();
    }
}