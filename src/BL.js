import _ from 'underscore';
import React from 'react';
import ReactDOM from 'react-dom';

import HTTPHelper from './utils/HTTPHelper';

import Panel from './components/Panel';
import TextInput from './components/TextInput';
import Button from './components/Button';

const BL = {
    // utils
    http: HTTPHelper,
    
    // components
    Panel,
    TextInput,
    Button
};

//window.React = React;
window.BL = BL;

export default BL;