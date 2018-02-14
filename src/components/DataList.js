import React, { Component } from 'react';
import './../styles/DataList.css';
import {Icon} from 'react-fa';

export default class DataList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {
            columns = [],
            data = [],
            style,
            width,
            height,
            title,
            noMargin
        } = this.props;

        let _style = style || {};

        if (width) _style.width = width;
        if (height) _style.height = height;
        
        if (noMargin) _style.margin = '0px';
        
        return (
            <div style={_style} className="bl-datalist-outer">
                <table className="bl-datalist-table" width="100%" cellSpacing="0" cellPadding="0">
                    <thead>
                        <tr>
                            {columns.map(({ title, icon, iconProps, width, headerAlign = 'left' }) => {
                                let _iconProps = iconProps || {};
                                if (icon && !_iconProps.name) _iconProps.name = icon;

                                return (
                                    <td style={{width, textAlign: headerAlign}} className="bl-datalist-title">
                                        {_iconProps || icon ? <Icon {..._iconProps}/> : null} {title}
                                    </td>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody className="bl-datalist-body">
                        {data.map((rowData) => {
                            let isArray = rowData instanceof Array;

                            let blStyle = 'primary';
                            let data = rowData;
                            let onClick = () => {};

                            if (!isArray && rowData.data) {
                                blStyle = rowData.blStyle;
                                data = rowData.data;
                                onClick = rowData.onClick || onClick;
                            }

                            let tClass = null;
                            switch (blStyle) {
                                case 'success':
                                    tClass = 'bl-success';
                                    break;
                                case 'danger':
                                    tClass = 'bl-danger';
                                    break;
                                case 'primary':
                                default:
                                    tClass = 'bl-primary';
                                    break;
                            }
                            
                            return (
                                <tr onClick={onClick.bind(null, rowData)} className={`bl-datalist-row ${tClass}`}>
                                    {data.map((columnData, i) => {
                                        let {
                                            contentAlign = columns[i].headerAlign || 'left',
                                            contentStyle = {}
                                        } = columns[i];

                                        return (
                                            <td style={Object.assign(contentStyle, { textAlign: contentAlign })} className="bl-datalist-column">
                                                {columnData}
                                            </td>
                                        );
                                    })}
                                </tr>   
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}