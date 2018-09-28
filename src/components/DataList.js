import React, { Component } from 'react';
import './../styles/DataList.css';
import {Icon} from 'react-fa';

const SORT_DIRECTION = {
    DESCENDING: 'descending',
    ASCENDING: 'ascending'
};

export default class DataList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortDirection: SORT_DIRECTION.DESCENDING,
            sortField: null
        };
    }

    render() {
        let {
            columns = [],
            data = [],
            style,
            width,
            height,
            title,
            noMargin,
            disableSort = false
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
                            {columns.map(({ title, icon, iconProps, width, headerAlign = 'left', allowSort = false }, idx) => {
                                let _iconProps = iconProps || {};
                                if (icon && !_iconProps.name) _iconProps.name = icon;

                                let textDecoration = 'none';
                                if (this.state.sortField == idx) textDecoration = 'underline';

                                let cursor = 'normal';
                                if (!disableSort && allowSort) cursor = 'pointer';

                                return (
                                    <td 
                                    onClick={() => {
                                        if (disableSort || !allowSort) return;

                                        this.setState({
                                            sortField: idx,
                                            sortDirection: idx === this.state.sortField ? (this.state.sortDirection == SORT_DIRECTION.ASCENDING ? SORT_DIRECTION.DESCENDING : SORT_DIRECTION.ASCENDING) : SORT_DIRECTION.ASCENDING
                                        });
                                    }}
                                    key={idx}
                                    style={{width, textAlign: headerAlign, textDecoration, cursor}} 
                                    className="bl-datalist-title">
                                        {_iconProps.name || icon ? <Icon {..._iconProps}/> : null} {title} {this.state.sortField == idx ? <Icon name={this.state.sortDirection == SORT_DIRECTION.ASCENDING ? 'arrow-up' : 'arrow-down'} /> : null}
                                    </td>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody className="bl-datalist-body">
                        {data.sort((a, b) => {
                            if (this.state.sortField === null) return 0;

                            let dataA = a instanceof Array ? a : (a.data ? a.data : []);
                            let dataB = b instanceof Array ? b : (b.data ? b.data : []);

                            if (dataA[this.state.sortField] == undefined || dataA[this.state.sortField] == null) return 0;
                            if (dataB[this.state.sortField] == undefined || dataB[this.state.sortField] == null) return 0;

                            let { sortAsInteger = false } = columns[this.state.sortField];

                            if (this.state.sortDirection == SORT_DIRECTION.ASCENDING) {
                                if (sortAsInteger) {
                                    return parseInt(dataA[this.state.sortField]) - parseInt(dataB[this.state.sortField]);
                                } else {
                                    return dataA[this.state.sortField].toString().localeCompare(dataB[this.state.sortField].toString())
                                }
                            } else {
                                if (sortAsInteger) {
                                    return parseInt(dataB[this.state.sortField]) - parseInt(dataA[this.state.sortField]);
                                } else {
                                    return dataB[this.state.sortField].toString().localeCompare(dataA[this.state.sortField].toString())
                                }
                            }
                        }).map((rowData, idx) => {
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
                                <tr onClick={onClick.bind(null, rowData)} key={idx} className={`bl-datalist-row ${tClass}`}>
                                    {data.map((columnData, i) => {
                                        let {
                                            contentAlign = columns[i].headerAlign || 'left',
                                            contentStyle = {}
                                        } = columns[i];

                                        return (
                                            <td key={i} style={Object.assign(contentStyle, { textAlign: contentAlign })} className="bl-datalist-column">
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