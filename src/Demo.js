import _ from 'underscore';
import React from 'react';

import BL from './BL';

const DEMO_PANEL_WIDTH = '400px';

const PropTable = ({ propObject }) => {
    return (
        <table cellSpacing="0" cellPadding="2" style={{marginTop: '10px', marginBottom: '10px', width: '100%', color: 'inherit'}}>
            
            <tbody>
                <tr>
                    <th>PropName</th>
                    <th>PropType</th>
                </tr>
                {_.map(propObject, (propType, propName) => {
                    return (
                        <tr key={propName}>
                            <td style={{borderTop: '1px solid #888'}}>{propName}</td>
                            <td style={{borderTop: '1px solid #888'}}>{propType}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

const DemoView = ({ title, propObject, example }) => {
    return (
        <BL.Panel width={DEMO_PANEL_WIDTH} title={title}>
            <BL.Panel title="Properties">
                <PropTable propObject={propObject} />
            </BL.Panel>
            <BL.Panel noMargin title="Example">
                {example}
            </BL.Panel>
        </BL.Panel>
    );
}

const Demo = () => {
    return (
        <div>
            <DemoView 
                title="Panel" 
                propObject={{
                    noMargin: 'bool',
                    width: 'string',
                    height: 'string',
                    style: 'object',
                    title: 'string'
                }} 
                
                example={
                    <BL.Panel width="100%">
                        Panel content
                    </BL.Panel>
                } />
            <DemoView
                title="TextInput"
                propObject={{
                    onSubmit: 'function',
                    placeholder: 'string',
                    width: 'string',
                    height: 'string',
                    style: 'object'
                }}
                example={
                    <BL.TextInput width="100%" placeholder={'Type here\n...'} />
                } />
        </div>
    );
};

export default Demo;