# boot2js
enyo components using twitter bootstrap
mport React from 'react';
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

const SIMPLE_TYPES = new Set(['boolean', 'string', 'number', 'date']);

function getObjectCell1(val, typeConfig, formatter) {
    if (val && typeConfig) {
        const typeFields = Object.keys(typeConfig),
            attributes = [];

        typeFields.forEach((field, i) => {
            const fieldTypeConfig = typeConfig[field];
            if (isVisible(fieldTypeConfig)) {
                let style = i < typeFields.length - 1 ? styles.objectSeparator : {},
                    value = val[field];
                if (formatter) {
                    value = formatter(value);
                }
                if (value === undefined) {
                    value = "-";
                    style.textAlign = 'center';
                }
                attributes.push((<div key={`atr-${i}`} style={style}>{value}</div>));
            }
        });
        return attributes;
    }
}

function getObjectAttributeNamesCell(typeConfig) {
    if (typeConfig) {
        const typeFields = Object.keys(typeConfig),
            attributes = [];
        typeFields.forEach((field, i) => {
            const fieldTypeConfig = typeConfig[field];
            if (isVisible(fieldTypeConfig)) {
                let style = i < typeFields.length - 1 ? styles.objectSeparator : undefined,
                    value = fieldTypeConfig.title;
                attributes.push((<div key={`atr-${i}`} style={style}>{value}</div>));
            }
        });
        return attributes;
    }
}

function getSimpleCell(value, formatter, colConfig) {
    if (formatter) {
        value = formatter(value);
    }
    return (<div style={colConfig.style}> {value}</div>)
}
function getCell(id, value, colConfig, types) {
    const {type, formatter} = colConfig;

    const tdStyle = {paddingLeft: '0px', paddingRight: '0px'};
    if (type && SIMPLE_TYPES.has(type.toLowerCase())) {
        return [(
            <TableRowColumn key={id} style={tdStyle}>{getSimpleCell(value, formatter, colConfig)} </TableRowColumn>)];
    }
    let typeConfig = types[type];
    return [(<TableRowColumn key={id} style={tdStyle}>{getObjectCell1(value, typeConfig, formatter)}</TableRowColumn>),
        (<TableRowColumn key={`val${id}`}
                         style={tdStyle}>{getObjectAttributeNamesCell(typeConfig)}</TableRowColumn>)
    ];
}

function isVisible(visibleObject) {
    return visibleObject && visibleObject.visible;
}

function getDataContent(data, colConfigs, types) {
    const rows = [];
    let {columns} = data,
        index = 0,
        stop = false, m = 0;
    while (!stop) {
        const col = [], prefixCols = [];
        columns.forEach((column, cid)=> {
            const {values} = column,
                colConfig = colConfigs[column.id];
            if (isVisible(colConfig)) {
                let cellSpec = getCell(`${index}-${cid}`, values[index], colConfig, types);
                col[colConfig.index] = cellSpec[0];
                if (cellSpec.length > 0 && prefixCols.length === 0) {
                    prefixCols.push(cellSpec[1]);
                }
            }
            m = Math.max(m, values.length);
        });
        rows.push((<TableRow>{col.concat(prefixCols)}</TableRow>));
        index += 1;
        if (index >= m) {
            stop = true;
        }

    }
    return rows;
}

function getHeader(configCols) {
    const headSpec = [],
        configColName = Object.keys(configCols);
    if (configCols) {
        return (<TableHeader>
            <TableRow>{
                configColName.reduce((h, cName)=> {
                    let c = configCols[cName],
                        title = c.title || c.id;
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
/**
 * Prepares a table configuration
 * @param data - table data in format {columns:[{id: 'c1', values: [1, 2, 3]}]}
 * @param config configuration data in format {columns: [{id: 'c1', type: string, visible:true}]}
 * @returns {*|{}} containing a hashed by column id configuration
 * @private
 */
function _getDefaultConfig(data, config) {
    if (config && config.columns) { //if a config is provided hash-it and return it
        return config.columns.reduce((m, c, index)=> {
            c.index = index;
            m[c.id] = c;
            return m;
        }, {});
    }
    if (data && data.columns) {// otherwise extract the config from table definition
        return data.columns.reduce((m, col, index) => {
            m[col.id] = {id: col.id, type: col.type, title: col.title, visible: true, index};
            return m;
        }, {});
    }
}

class ColumnTable extends React.Component {

    render() {
        const {config, data}  = this.props;
        const columns = _getDefaultConfig(data, config);
        return (
            <Table selectable={false} fixedHeader={true} height="600px">
                {getHeader(columns)}
                <TableBody>
                    {getDataContent(data, columns, (config && config.types) || {})}
                </TableBody>
            </Table> );
    }
}

export default ColumnTable;
 
