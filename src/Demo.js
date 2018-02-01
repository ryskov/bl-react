import _ from 'underscore';
import React from 'react';

import BL from './BL';

const DEMO_PANEL_WIDTH = '420px';

const PropTable = ({ propObject }) => {
    return (
        <table cellSpacing="0" cellPadding="2" style={{ marginTop: '10px', marginBottom: '10px', width: '100%', color: 'inherit' }}>

            <tbody>
                <tr>
                    <th>Property Name</th>
                    <th>Property Type</th>
                </tr>
                {_.map(propObject, (propType, propName) => {
                    return (
                        <tr key={propName}>
                            <td style={{ borderTop: '1px solid #888' }}>{propName}</td>
                            <td style={{ borderTop: '1px solid #888' }}>{propType}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

const DemoView = ({ title, propObject, example }) => {
    return (
        <BL.Panel width={DEMO_PANEL_WIDTH} title={title} icon="cube">
            <BL.Panel title="Properties" icon="cog">
                <PropTable propObject={propObject} />
            </BL.Panel>
            <BL.Panel title="Example" icon="code">
                {example}
            </BL.Panel>
        </BL.Panel>
    );
}

const Demo = () => {
    return (
        <div>
            <table>
                <tr>
                    <td style={{verticalAlign: 'top'}}>
                        <DemoView
                            title="Panel"
                            propObject={{
                                noMargin: 'bool',
                                width: 'string',
                                height: 'string',
                                style: 'object',
                                title: 'string',
                                icon: "string",
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
                                    <BL.Panel icon="exclamation-circle" width="100%">
                                        Panel with icon
                                    </BL.Panel>
                                    <BL.Panel icon="comments" title="Message" width="100%">
                                        Panel with icon and title
                                    </BL.Panel>
                                </div>
                            } />

                        <DemoView
                            title="TextArea"
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
                                <BL.TextArea width="100%" placeholder={'Type here\n...'} />
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
                                <div>
                                    <BL.TextInput width="100%" title="With title" placeholder={'Type here...'} />
                                    <BL.TextInput width="100%" title="Another disabled one" disabled={true} placeholder={'Type here...'} />
                                    <BL.TextInput width="100%" placeholder={'Type here...'} />
                                </div>
                            } />
                    </td>
                    <td style={{verticalAlign: 'top'}}>
                        <DemoView
                            title="Button"
                            propObject={{
                                blStyle: 'enum \'primary\', \'success\', \'danger\'',
                                disabled: 'bool',
                                onClick: 'function',
                                icon: 'string',
                                iconProps: 'object',
                                label: 'string'
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
                                            <BL.Button icon="save" blStyle="success" />
                                            <BL.Button icon="close" blStyle="danger" />
                                            <BL.Button icon="user" blStyle="primary" />
                                        </div>
                                        <div>
                                            <BL.Button icon="save" disabled blStyle="success" />
                                            <BL.Button icon="close" disabled blStyle="danger" />
                                            <BL.Button icon="user" disabled blStyle="primary" />
                                        </div>
                                    </BL.Panel>
                                    <BL.Panel title="Icon+Text Buttons">
                                        <div>
                                            <BL.Button icon="save" label="Save" blStyle="success" />
                                            <BL.Button icon="close" label="Delete" blStyle="danger" />
                                            <BL.Button icon="user" label="Profile" blStyle="primary" />
                                        </div>
                                        <div>
                                            <BL.Button icon="save" label="Save" disabled blStyle="success" />
                                            <BL.Button icon="close" label="Delete" disabled blStyle="danger" />
                                            <BL.Button icon="user" label="Profile" disabled blStyle="primary" />
                                        </div>
                                    </BL.Panel>
                                </div>
                            } />
                    </td>
                </tr>
            </table>
        </div>
    );
};

export default Demo;