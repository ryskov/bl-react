import _ from 'underscore';
import React from 'react';

import BL from './BL';

const DEMO_PANEL_WIDTH = '420px';

const PropTable = ({ propObject }) => {
    return (
        <BL.DataList 
            columns={[
                { title: 'Property Name', width: '50%', contentStyle: { fontFamily: 'Courier' }, headerAlign: 'left' },
                { title: 'Property Type', allowSort: true, width: '50%', contentStyle: { fontFamily: 'Courier' }, headerAlign: 'left' }
            ]} 
            data={_.map(propObject, (propType, propName) => {
                return [ propName, propType ];
            })}
            />
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
                        
                    </td>
                    <td style={{verticalAlign: 'top'}}>
                        <DemoView
                            title="TextInput"
                            propObject={{
                                disabled: 'bool',
                                noMargin: 'bool',
                                onSubmit: 'function',
                                placeholder: 'string',
                                multiValue: 'bool',
                                onItemsChange: 'function',
                                validateItem: 'function',
                                multiValueSeparator: 'string',
                                allowTabSeparator: 'bool',
                                width: 'string',
                                height: 'string',
                                style: 'object'
                            }}
                            example={
                                <div>
                                    <BL.TextInput width="100%" title="With title" placeholder={'Type here...'} />
                                    <BL.TextInput width="100%" title="Another disabled one" disabled={true} placeholder={'Type here...'} />
                                    <BL.TextInput 
                                        width="100%" 
                                        title="Supports multiple values with validation (IPv4)" 
                                        multiValue 
                                        validateItem={item => /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(\/\d{1,2})?$/.test(item)} 
                                        placeholder={'Type here...'} 
                                    />
                                </div>
                            } />
                            <DemoView 
                                title="Dropdown"
                                propObject={{}}
                                example={
                                    <BL.Dropdown 
                                        title="Test" 
                                        actions={[{ label: 'Option 1', value: '1'}, { label: 'Option 2', value: '2' }]} width="100%" />
                                }
                            />
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
                        <td style={{verticalAlign: 'top'}}>
                            <DemoView 
                                title="DataList"
                                propObject={{
                                    width: 'string',
                                    columns: 'array[object]',
                                    data: 'array[array[]]'
                                }}
                                example={
                                    <BL.DataList 
                                        width="100%" 
                                        columns={[
                                            {
                                                title: 'User',
                                                icon: 'user',
                                                width: '30%',
                                                contentStyle: {
                                                }
                                            },
                                            {
                                                title: 'Status',
                                                headerAlign: 'right'
                                            },
                                            {
                                                width: '90px',
                                                title: 'Actions',
                                                headerAlign: 'right'
                                            }
                                        ]}
                                        data={[
                                            [
                                                'John Doe', 
                                                <BL.TextInput width="100%" noMargin value="Single" />, 
                                                <span>
                                                    <BL.Button style={{margin: '0px 2px'}} onClick={() => { alert('Saving John Doe status!'); }}  blStyle="success" icon="save" />
                                                    <BL.Button onClick={() => { alert('Deleting John Doe!'); }} noMargin blStyle="danger" icon="trash" />
                                                </span>
                                            ],
                                            [
                                                'Mr. Poopy', 
                                                <BL.TextInput width="100%" noMargin placeholder="Enter status.." />, 
                                                <span>
                                                    <BL.Button style={{margin: '0px 2px'}} onClick={() => { alert('Saving Mr. Poopy status!'); }}  blStyle="success" icon="save" />
                                                    <BL.Button onClick={() => { alert('Deleting Mr. Poopy!'); }} noMargin blStyle="danger" icon="trash" />
                                                </span>
                                            ]
                                        ]}
                                        />
                                }
                            />
                    </td>
                </tr>
            </table>
        </div>
    );
};

export default Demo;