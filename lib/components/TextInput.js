'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextInput = function (_Component) {
    _inherits(TextInput, _Component);

    function TextInput(props) {
        _classCallCheck(this, TextInput);

        var _this = _possibleConstructorReturn(this, (TextInput.__proto__ || Object.getPrototypeOf(TextInput)).call(this, props));

        _this.state = {
            shiftIsPressed: false
        };
        return _this;
    }

    _createClass(TextInput, [{
        key: '_onFocus',
        value: function _onFocus() {
            if (this.props.placeholder) {
                this.refs.textarea.placeholder = "";
            }
        }
    }, {
        key: '_onBlur',
        value: function _onBlur() {
            if (this.props.placeholder) {
                this.refs.textarea.placeholder = this.props.placeholder;
            }
        }
    }, {
        key: '_onKeyDown',
        value: function _onKeyDown(e) {
            switch (e.keyCode) {
                case 13:
                    // enter
                    if (!this.state.shiftIsPressed) {
                        if (this.props.onSubmit) this.props.onSubmit(this.refs.textarea.value);
                        this.refs.textarea.value = "";
                        this.refs.textarea.blur();

                        e.preventDefault();
                    }
                    break;
                case 16:
                    // shift-key
                    this.setState({
                        shiftIsPressed: true
                    });
                    break;
                default:
                    break;
            }
        }
    }, {
        key: '_onKeyUp',
        value: function _onKeyUp(e) {
            switch (e.keyCode) {
                case 16:
                    // shift-key
                    this.setState({
                        shiftIsPressed: false
                    });
                    break;
                default:
                    break;
            }
        }
    }, {
        key: 'blur',
        value: function blur() {
            return this.refs.textarea.blur();
        }
    }, {
        key: 'focus',
        value: function focus() {
            return this.refs.textarea.focus();
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement('textarea', {
                style: {
                    width: this.props.width,
                    height: this.props.height
                },
                ref: 'textarea',
                className: 'text-input',
                onFocus: this._onFocus.bind(this),
                onBlur: this._onBlur.bind(this),
                placeholder: this.props.placeholder ? this.props.placeholder : null,
                onKeyDown: this._onKeyDown.bind(this),
                onKeyUp: this._onKeyUp.bind(this) });
        }
    }], [{
        key: 'propTypes',
        value: function propTypes() {
            return {
                placeholder: _react2.default.PropTypes.string
            };
        }
    }]);

    return TextInput;
}(_react.Component);

exports.default = TextInput;