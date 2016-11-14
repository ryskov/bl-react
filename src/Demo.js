import _ from 'underscore';
import React from 'react';

import BL from './BL';

const DEMO_PANEL_WIDTH = '420px';

const PropTable = ({ propObject }) => {
    return (
        <table cellSpacing="0" cellPadding="2" style={{marginTop: '10px', marginBottom: '10px', width: '100%', color: 'inherit'}}>
            
            <tbody>
                <tr>
                    <th>Property Name</th>
                    <th>Property Type</th>
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
        <BL.Panel width={DEMO_PANEL_WIDTH} title={title} iconProps={{name: 'cube'}}>
            <BL.Panel title="Properties" iconProps={{name: 'cog'}}>
                <PropTable propObject={propObject} />
            </BL.Panel>
            <BL.Panel title="Example" iconProps={{name: 'code'}}>
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
                    title: 'string',
                    iconProps: 'object'
                }} 
                example={
                    <div>
                        <BL.Panel width="100%">
                            Panel with no title
                        </BL.Panel>
                        <BL.Panel title="Info" width="100%">
                            Panel with title
                        </BL.Panel>
                        <BL.Panel iconProps={{name: 'exclamation-circle'}} width="100%">
                            Panel with icon
                        </BL.Panel>
                        <BL.Panel iconProps={{name: 'comments'}} title="Message" width="100%">
                            Panel with icon and title
                        </BL.Panel>
                    </div>
                } />

            <DemoView
                title="TextInput"
                propObject={{
                    disabled: 'bool',
                    noMargin: 'bool',
                    onSubmit: 'function',
                    placeholder: 'string',
                    width: 'string',
                    height: 'string',
                    style: 'object'
                }}
                example={
                    <BL.TextInput width="100%" placeholder={'Type here\n...'} />
                } />
            <DemoView 
                title="Button"
                propObject={{
                    blStyle: 'enum \'primary\', \'success\', \'danger\'',
                    disabled: 'bool',
                    onClick: 'function',
                    iconProps: 'object'
                }}
                example={
                    <div>
                        <BL.Panel title="Text Buttons">
                            <div>
                                <BL.Button label="Save" blStyle="success" />
                                <BL.Button label="Delete" blStyle="danger" />
                                <BL.Button label="Profile" blStyle="primary" />
                            </div>
                            <div>
                                <BL.Button label="Save" disabled blStyle="success" />
                                <BL.Button label="Delete" disabled blStyle="danger" />
                                <BL.Button label="Profile" disabled blStyle="primary" />
                            </div>
                        </BL.Panel>
                        <BL.Panel title="Icon Buttons">
                            <div>
                                <BL.Button iconProps={{name: 'save'}} blStyle="success" />
                                <BL.Button iconProps={{name: 'close'}} blStyle="danger" />
                                <BL.Button iconProps={{name: 'user'}} blStyle="primary" />
                            </div>
                            <div>
                                <BL.Button iconProps={{name: 'save'}} disabled blStyle="success" />
                                <BL.Button iconProps={{name: 'close'}} disabled blStyle="danger" />
                                <BL.Button iconProps={{name: 'user'}} disabled blStyle="primary" />
                            </div>
                        </BL.Panel>
                        <BL.Panel title="Icon+Text Buttons">
                            <div>
                                <BL.Button label="Save" iconProps={{name: 'save'}} blStyle="success" />
                                <BL.Button label="Delete" iconProps={{name: 'close'}} blStyle="danger" />
                                <BL.Button label="Profile" iconProps={{name: 'user'}} blStyle="primary" />
                            </div>
                            <div>
                                <BL.Button label="Save" iconProps={{name: 'save'}} disabled blStyle="success" />
                                <BL.Button label="Delete" iconProps={{name: 'close'}} disabled blStyle="danger" />
                                <BL.Button label="Profile" iconProps={{name: 'user'}} disabled blStyle="primary" />
                            </div>
                        </BL.Panel>
                    </div>
                } />
            <DemoView 
                title="ComponentGroup"
                propObject={{}}
                example={<div>
                    <BL.ComponentGroup width="100%" direction="vertical">
                        <BL.Panel title="Component Group">
                            Hallo
                        </BL.Panel>
                        <BL.TextInput placeholder={'TextInput attached to a panel!'} />
                        <BL.ComponentGroup height="50px" direction="horizontal">
                            <BL.TextInput width="70%" />
                            <BL.Button width="30%" blStyle="success" label="Save" />
                            <BL.Button width="30%" blStyle="success" label="Save" />
                        </BL.ComponentGroup>
                    </BL.ComponentGroup>
                    
                    </div>
                } />
        </div>
    );
};

export default Demo;