import _ from 'underscore';
import React from 'react';

import Panel from './components/Panel';
import TextInput from './components/TextInput';
import HTTPHelper from './utils/HTTPHelper';

window._ = _;
window.React = React;

const BL = {
    // utils
    http: HTTPHelper,

    // components
    Panel,
    TextInput
};

export default BL;