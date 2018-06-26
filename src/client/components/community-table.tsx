import React, { Component } from 'react';
import AddCommunityMoal from '@components/add-community-modal';
import { Table, Button,Icon } from 'semantic-ui-react'
type CommunityTableProps = {
    className?: string;
}

class CommunityTable extends Component<CommunityTableProps> {
    render() {
        return (
            <div className={this.props.className} >
                <AddCommunityMoal></AddCommunityMoal>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>序號</Table.HeaderCell>
                            <Table.HeaderCell>社區名稱</Table.HeaderCell>
                            <Table.HeaderCell>動作</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>1</Table.Cell>
                            <Table.Cell>AA駐點</Table.Cell>
                            <Table.Cell selectable><Button icon> <Icon name='compose' /></Button></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>2</Table.Cell>
                            <Table.Cell>BB駐點</Table.Cell>
                            <Table.Cell selectable><Button icon> <Icon name='compose' /></Button></Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        );
  }
}
export default CommunityTable
