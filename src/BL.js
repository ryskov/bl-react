import _ from 'underscore';
import React from 'react';
import ReactDOM from 'react-dom';

import Panel from './components/Panel';
import TextInput from './components/TextInput';
import HTTPHelper from './utils/HTTPHelper';

window._ = _;
window.React = React;

const Demo = () => {
    return (
        <div>
            <Panel width="300px">Hello!</Panel>
        </div>
    );
};

const BL = {
    // utils
    http: HTTPHelper,
    
    Demo,
    // components
    Panel,
    TextInput
};

export default BL;