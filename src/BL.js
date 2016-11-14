import _ from 'underscore';
import React from 'react';
import ReactDOM from 'react-dom';

import HTTPHelper from './utils/HTTPHelper';

import Panel from './components/Panel';
import TextInput from './components/TextInput';
import Button from './components/Button';
import ComponentGroup from './components/ComponentGroup';

const BL = {
    // utils
    http: HTTPHelper,
    
    // components
    Panel,
    TextInput,
    Button,
    ComponentGroup
};

//window.React = React;
window.BL = BL;

export default BL;