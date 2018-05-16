import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'
import styled from "styled-components";

type TableDaysProps = {
    className?: string;
    days: Array<number>;
};
class TableDays extends Component<TableDaysProps> {
    render() {
        return (
            <div>
                <Table celled className = { this.props.className }>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>日期</Table.HeaderCell>
                            {this.props.days.map((day, i) =>
                                <Table.HeaderCell key={i}>{day}</Table.HeaderCell>
                            )}
                        </Table.Row>
                    </Table.Header>
                </Table>
            </div>
        )
    }    
}    
export default styled(TableDays) `
  background: transparent;
  color: red;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;