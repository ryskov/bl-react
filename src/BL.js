import _ from 'underscore';
import React from 'react';
import ReactDOM from 'react-dom';

import HTTPHelper from './utils/HTTPHelper';

import Panel from './components/Panel';
import TextArea from './components/TextArea';
import TextInput from './components/TextInput';
import Dropdown from './components/Dropdown';
import Button from './components/Button';

const BL = {
    // utils
    http: HTTPHelper,
    
    // components
    Panel,
    TextArea,
    TextInput,
    Dropdown,
    Button
};

//window.React = React;
window.BL = BL;

export default BL;