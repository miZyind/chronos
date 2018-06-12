import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'

type TableDaysProps = {
    days: Array<number>;
};
const tabHeaderCellStyle = {
    fontSize: "8px",
    textAlign: "center"
}
class TableDays extends Component<TableDaysProps> {
    render() {
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>日期</Table.HeaderCell>
                        {this.props.days.map((day, i) =>
                            <Table.HeaderCell style={tabHeaderCellStyle} key={i}>{day}</Table.HeaderCell>
                        )}
                    </Table.Row>
                </Table.Header>
            </Table>
        )
    }    
}    
export default TableDays