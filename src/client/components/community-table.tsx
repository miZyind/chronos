import React, { Component } from 'react';
import FormMoal from '@components/form-modal';
import { Table } from 'semantic-ui-react'
type CommunityTableProps = {
    className?: string;
};
const modalTitle = {
    title1: "新增社區",
}

class CommunityTable extends Component<CommunityTableProps> {
    render() {
        return (
            <div className={this.props.className} >
                <FormMoal titleName={modalTitle.title1}></FormMoal>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>Notes</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>John</Table.Cell>
                            <Table.Cell>No Action</Table.Cell>
                            <Table.Cell selectable>
                                <a href='#'>Edit</a>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Jamie</Table.Cell>
                            <Table.Cell>Approved</Table.Cell>
                            <Table.Cell selectable>
                                <a href='#'>Edit</a>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Jill</Table.Cell>
                            <Table.Cell>Denied</Table.Cell>
                            <Table.Cell selectable>
                                <a href='#'>Edit</a>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row warning>
                            <Table.Cell>John</Table.Cell>
                            <Table.Cell>No Action</Table.Cell>
                            <Table.Cell selectable warning>
                                <a href='#'>Requires change</a>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Jamie</Table.Cell>
                            <Table.Cell positive>Approved</Table.Cell>
                            <Table.Cell selectable positive>
                                <a href='#'>Approve</a>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Jill</Table.Cell>
                            <Table.Cell negative>Denied</Table.Cell>
                            <Table.Cell selectable negative>
                                <a href='#'>Remove</a>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        );
  }
}

export default CommunityTable
