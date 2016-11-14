import React, { Component } from 'react';
import './../styles/TextArea.css';

export default class TextArea extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shiftIsPressed: false,
            textAlign: 'center'
        };
    }

    static propTypes() {
        return {
            placeholder: React.PropTypes.string
        }
    }

    get value() {
        return this.refs.textarea.value;
    }

    _onFocus() {
        if (this.props.placeholder) {
            this.refs.textarea.placeholder = "";
        }

        this.setState({
            textAlign: 'left'
        });
    }

    _onBlur() {
        if (this.props.placeholder) {
            this.refs.textarea.placeholder = this.props.placeholder;
        }

        this.setState({
            textAlign: this.refs.textarea.value ? 'left' : 'center'
        });
    }

    _onKeyDown(e) {
        switch (e.keyCode) {
            case 13: // enter
                if (!this.state.shiftIsPressed && this.props.onSubmit) {
                    this.props.onSubmit(this.refs.textarea.value);
                    this.refs.textarea.value = "";
                    this.refs.textarea.blur();
                    
                    e.preventDefault();
                }
                break;
            case 16: // shift-key
                this.setState({
                    shiftIsPressed: true
                });
                break;
            default:
                break;
        }

        if (this.props.onKeyDown) this.props.onKeyDown(e);
    }
    
    _onKeyUp(e) {
        switch (e.keyCode) {
            case 16: // shift-key
                this.setState({
                    shiftIsPressed: false
                });
                break;
            default:
                break;
        }

        if (this.props.onKeyUp) this.props.onKeyUp(e);
    }

    blur() {
        return this.refs.textarea.blur();
    }

    focus() {
        return this.refs.textarea.focus();
    }

    render() {
        const 
        {
            style,
            placeholder,
            width,
            height,
            noMargin,
            disabled
        } = this.props;

        let _style = style || {};

        if (width) _style.width = width;
        if (height) _style.height = height;

        if (noMargin) _style.margin = '0px';

        _style.textAlign = this.state.textAlign;

        return (
            <textarea
                disabled={disabled}
                style={_style}
                ref="textarea"
                className="bl-text-area"
                onFocus={this._onFocus.bind(this)}
                onBlur={this._onBlur.bind(this)}
                placeholder={placeholder ? placeholder : null}
                onKeyDown={this._onKeyDown.bind(this) }
                onKeyUp={this._onKeyUp.bind(this) } />
        );
    }
}