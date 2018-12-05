import React, { Component } from 'react';
import './../styles/TextInput.css';
import _ from 'underscore';

class TextInput extends Component {
    constructor(props) {
        super(props);

        this.clearBackspaceStateTimeout = null;
        this._tryFetchSuggestions = _.throttle(this._tryFetchSuggestions, 500);
        
        this.state = {
            textAlign: 'center',
            values: [],
            
            suggestions: [],
            selectedIndex: -1,

            currentItemInvalid: false,
            backspacePressedRecently: null,
            inBackspaceGracePeriod: false,
            pressInEmptyInput: true
        };
    }

    static propTypes() {
        return {
            placeholder: React.PropTypes.string
        }
    }

    get value() {
        if (this.props.multiValue) {
            return this.state.values;
        }

        return this.refs.textinput.value;
    }

    set value(val) {
        if (this.props.multiValue) {
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

        this._tryFetchSuggestions();
    }

    _onBlur() {
        if (this.props.multiValue) {
            this._processMultiValueItems();
        }

        if (this.props.placeholder) {
            this.refs.textinput.placeholder = this.props.placeholder;
        }

        this.setState({
            textAlign: 'center',
            suggestions: [],
            selectedIndex: -1
        });
    }

    _onSubmit(e) {
        let selectionWasUsed = false;
        if (this.props.fetch && this.state.suggestions.length > 0 && this.state.selectedIndex > -1) {
            let selection = this.state.suggestions[this.state.selectedIndex];
            this.refs.textinput.value = selection.value;
            this.setState({ suggestions: [] });
            selectionWasUsed = true;
        }

        if (this.props.onSubmit) {
            this.props.onSubmit(this.refs.textinput.value);
            e.preventDefault();
        }

        if (selectionWasUsed) {
            this.refs.textinput.blur();
        }

        if (this.props.onKeyUp) this.props.onKeyUp(e);
    }

    _onKeyDown(e) {
        this.setState({
            pressInEmptyInput: !this.refs.textinput.value
        });

        switch (e.keyCode) {
            case 13: // enter
                this._onSubmit(e)
                break;
            case 9: // tab
                if (this.props.multiValue && this.props.allowTabSeparator && this.refs.textinput.value) {
                    e.preventDefault();
                    this._processMultiValueItems();
                }
                break;
            case 38: // up arrow
                this.setState({
                    selectedIndex: Math.max(this.state.selectedIndex - 1, this.state.suggestions.length > 0 ? 0 : -1)
                });
                e.preventDefault();
                break;
            case 40: // down arrow
                this.setState({
                    selectedIndex: Math.min(this.state.selectedIndex + 1, this.state.suggestions.length - 1)
                });
                e.preventDefault();
                break;
            default:
                break;
        }
        
        if (this.props.onKeyDown) this.props.onKeyDown(e);
    }

    _resetBackspaceState(enterGracePeriod = true) {
        this.setState({
            backspacePressedRecently: false,
            inBackspaceGracePeriod: enterGracePeriod
        }, () => {
            if (this.clearBackspaceStateTimeout) window.clearTimeout(this.clearBackspaceStateTimeout);
            this.clearBackspaceStateTimeout = null;

            if (enterGracePeriod) {
                setTimeout(() => {
                    this.setState({
                        inBackspaceGracePeriod: false
                    });
                }, 500);
            }
        });
    }
    
    _onKeyUp(e) {
        if (!this.refs.textinput.value) {
            this.setState({
                currentItemInvalid: false
            });
        }
        else {
            this._resetBackspaceState();
        }

        const startClearBackspaceTimeout = () => {
            if (this.clearBackspaceStateTimeout) window.clearTimeout(this.clearBackspaceStateTimeout);
            this.clearBackspaceStateTimeout = setTimeout(this._resetBackspaceState.bind(this), 1000);
        }

        switch (e.keyCode) {
            case 8:
                if (!this.props.multiValue || this.state.inBackspaceGracePeriod || this.state.values.length === 0 || this.refs.textinput.value || !this.state.pressInEmptyInput) break;

                if (this.state.backspacePressedRecently) {
                    this._removeValueFromIndex(this.state.values.length -1);
                    this._resetBackspaceState(false);
                }
                else {
                    this.setState({
                        backspacePressedRecently: true
                    }, startClearBackspaceTimeout);
                }
                break;
            default: 
                break;
        }

        const bannedKeyCodes = [
            13, 9, 38, 39, 40, 45
        ];
        
        if (bannedKeyCodes.indexOf(e.keyCode) === -1) this._tryFetchSuggestions();

        if (this.props.onKeyUp) this.props.onKeyUp(e);
    }

    _tryFetchSuggestions() {
        if (this.props.fetch) {
            let searchQuery = this.refs.textinput.value;
            if (searchQuery) {
                this.props.fetch(searchQuery)
                    .then((results) => {
                        this.setState({ selectedIndex: results.length > this.state.selectedIndex ? this.state.selectedIndex : results.length - 1, suggestions: results });
                    });
            } else {
                this.setState({ suggestions: [] });
            }
        }
    }
    
    _onKeyPress(e) {
        let pressedKeyCharacter = String.fromCharCode(e.which);

        this.setState({
            currentItemInvalid: false
        });

        if (this.props.multiValue && this.props.multiValueSeparator == pressedKeyCharacter) {
            e.preventDefault();

            this._processMultiValueItems();
        }
    }

    _removeValueFromIndex(index) {
        let newValues = [...this.state.values];
        newValues.splice(index, 1);

        this.setState({
            values: newValues,
        }, () => {
            this.props.onItemsChange && this.props.onItemsChange(this.state.values);
        });
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

        if (this.props.multiValue) {
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
            <div>
                <div style={{ width: '100%', borderSpacing: '0px', display: 'table' }}>
                    <div style={{ display: 'table-cell'}}>
                        {this.props.multiValue ? this.state.values.map((value, i) => {
                            return (
                                <span 
                                    key={i} 
                                    className={`bl-text-input-value${ i == this.state.values.length -1 && this.state.backspacePressedRecently ? ' bl-danger' : ''}`}
                                    onClick={this._removeValueFromIndex.bind(this, i)} 
                                >
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
                {this.props.fetch && this.state.suggestions.length > 0 ? 
                    <div style={{ position: 'relative', top: '-10px', display: 'block' }}>
                        <div className="bl-text-input" style={{ backgroundColor: 'white', position: 'absolute' }}>
                            {this.state.suggestions.map((suggestion, idx) => {
                                return (
                                    <span onMouseDown={(e) => { console.log('Clicked'); this._onSubmit(e); e.preventDefault(); }} onMouseOver={() => { this.setState({ selectedIndex: idx }) }} key={idx} className={`bl-text-input-suggestion${this.state.selectedIndex === idx ? ' bl-text-input-selected' : ''}`} style={{display: 'block', height: '20px'}}>
                                        {suggestion.title}
                                    </span>
                                )
                            })}
                        </div>
                    </div> :
                    null
                }
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
TextInput.defaultProps = {
    multiValue: false,
    multiValueSeparator: ' ',
    allowTabSeparator: true
};

export default TextInput;