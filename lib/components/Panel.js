'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./../styles/Panel.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Panel = function Panel(_ref) {
    var children = _ref.children;
    var width = _ref.width;
    var height = _ref.height;

    return _react2.default.createElement(
        'div',
        {
            className: 'panel-outer',
            style: {
                width: width,
                height: height
            } },
        children
    );
};

exports.default = Panel;