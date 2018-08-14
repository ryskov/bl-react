import React, { Component } from 'react';
import './../styles/TextInput.css';

export default class TextInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            textAlign: 'center',
            multiValue: props.multiValue || false,
            multiValueSeparator: props.multiValueSeparator || ' ',
            values: [],
            currentItemInvalid: false
        };
    }

    static propTypes() {
        return {
            placeholder: React.PropTypes.string
        }
    }

    get value() {
        if (this.state.multiValue) {
            return this.state.values;
        }

        return this.refs.textinput.value;
    }

    set value(val) {
        if (this.state.multiValue) {
            this.setState({
                values: val
            });
        }
        else {
            this.refs.textinput.value = val;
        }
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
        if (this.state.multiValue) {
            this._processMultiValueItems();
        }

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
    
    _onKeyPress(e) {
        let pressedKeyCharacter = String.fromCharCode(e.which);

        this.setState({
            currentItemInvalid: false
        });

        if (this.state.multiValue && this.state.multiValueSeparator == pressedKeyCharacter) {
            e.preventDefault();

            this._processMultiValueItems();
        }
    }

    _processMultiValueItems() {
        if (!this.refs.textinput.value) return;

        let itemValid = true;
        if (this.props.validateItem) itemValid = this.props.validateItem(this.refs.textinput.value);

        if (!itemValid) {
            this.setState({
                currentItemInvalid: true
            });

            return;
        }

        this.setState({
            values: this.state.values.concat(this.refs.textinput.value)
        }, () => {
            this.refs.textinput.value = "";
            this.props.onItemsChange && this.props.onItemsChange(this.state.values);
        });
    }

    blur() {
        return this.refs.textinput.blur();
    }

    focus() {
        return this.refs.textinput.focus();
    }

    componentDidMount() {
        if (this.props.value) {
            // set initial value
            this.value = this.props.value;
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.value) {
            this.value = newProps.value;
        }
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
            disabled,
            type = 'text'
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
            default:
                tClass = 'bl-primary';
                break;
        }

        let _style = style || {};

        if (width) _style.width = width;
        if (height) _style.height = height;

        if (noMargin) _style.margin = '0px';

        _style.textAlign = this.state.textAlign;

        if (this.state.multiValue) {
            if (this.state.currentItemInvalid) { 
                tClass = 'bl-danger'; 
            }

            if (this.state.values.length > 0) {
                _style.borderTopLeftRadius = '0px';
                _style.borderBottomLeftRadius = '0px';
                _style.marginLeft = '2px';
            }

        }

        return (
            <div style={{ width: '100%', borderSpacing: '0px', display: 'table' }}>
                <div style={{ display: 'table-cell'}}>
                    {this.state.multiValue ? this.state.values.map((value, i) => {
                        return (
                            <span key={i} className="bl-text-input-value" onClick={() => {
                                let newValues = [...this.state.values];
                                newValues.splice(i, 1);

                                this.setState({
                                    values: newValues
                                }, () => {
                                    this.props.onItemsChange && this.props.onItemsChange(this.state.values);
                                });
                            }}>
                                {value}
                            </span>
                        );
                    }) : null }
                </div>
                <div style={{ display: 'table-cell', width: '100%' }}>
                    <input 
                        type={type}
                        disabled={disabled}
                        style={_style}
                        ref="textinput"
                        className={`bl-text-input ${tClass}`}
                        onFocus={this._onFocus.bind(this)}
                        onBlur={this._onBlur.bind(this)}
                        placeholder={placeholder ? placeholder : null}
                        onKeyDown={this._onKeyDown.bind(this) }
                        onKeyUp={this._onKeyUp.bind(this) } 
                        onKeyPress={this._onKeyPress.bind(this)}
                    />
                </div>
            </div>
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