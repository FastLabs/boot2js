# boot2js
enyo components using twitter bootstrap


import React from 'react';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import {blueGrey600} from 'material-ui/lib/styles/colors';

const styles = {
    objectSeparator: {borderBottom: '1px', borderBottomStyle: 'solid', borderBottomColor: blueGrey600}
};

function getObjectCell(val) {
    if (val) {
        const keys = Object.keys(val);
        return (<div> {keys.map((field, i)=> {
            let style = i < keys.length - 1 ? styles.objectSeparator : undefined;
            return (<div style={style}>{val[field]}</div>)
        })}
        </div>);
    }
}

function getCell(id, value, colConfig) {
    const {type, formatter} = colConfig;
    if (formatter) {
        value = formatter(value);
    }
    const tdStyle = {paddingLeft: '0px', paddingRight: '0px'};
    if (type === 'object') {
        return (<TableRowColumn key={id} style={tdStyle}>{getObjectCell(value)}</TableRowColumn>);
    }
    return (<TableRowColumn key={id} style={tdStyle}>
        <div style={colConfig.style}> {value}</div>
    </TableRowColumn>);

}

function getDataContent(data, config) {
    const rows = [];
    let {columns} = data,
        index = 0,
        stop = false, m = 0;
    while (!stop) {
        const col = [];
        columns.forEach((column, cid)=> {
            const {values} = column,
                colConfig = config[cid];
            if (colConfig && colConfig.visible) {
                col.push(getCell(`${index}-${cid}`, values[index], colConfig));
            }
            m = Math.max(m, values.length);
        });
        rows.push((<TableRow>{col}</TableRow>));
        index += 1;
        if (index >= m) {
            stop = true;
        }

    }
    return rows;
}

function getHeader(configCols) {
    const headSpec = [];
    if (configCols) {
        return (<TableHeader>
            <TableRow>{
                configCols.reduce((h, c)=> {
                    let title = c.title || c.id;
                    if (c.showTitle !== undefined && !c.showTitle) {
                        title = '';
                    }
                    if (c.visible) {
                        h.push((<TableHeaderColumn id={c.id} style={{paddingLeft: '0px', paddingRight:'0px'}}>
                            <div style={c.style}>{title}</div>
                        </TableHeaderColumn>));
                    }
                    return h;
                }, headSpec)
            }
            </TableRow>
        </TableHeader>)
    }
    return (<TableHeader></TableHeader>);
}

function _getDefaultConfig(data) {
    if (data && data.columns) {
        return data.columns.map(col => {
            return {id: col.id, type: col.type, title: col.title, visible: true};
        });
    }
}

class ColumnTable extends React.Component {

    render() {
        const {config, data}  = this.props;
        const columns = (config && config.columns) || _getDefaultConfig(data);
        return (
            <Table seletable={false}>
                {getHeader(columns)}
                <TableBody>
                    {getDataContent(data, columns)}
                </TableBody>
            </Table> );
    }
}

export default ColumnTable;
