import React, { Component } from 'react';
import AddSecurityMoal from '@components/add-security-modal';
import { Table ,Button, Icon} from 'semantic-ui-react'
type SecurityTableProps = {
    className?: string;
}

class SecurityTable extends Component<SecurityTableProps> {
    render() {
        return (
            <div className={this.props.className} >
                <AddSecurityMoal></AddSecurityMoal>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>序號</Table.HeaderCell>
                            <Table.HeaderCell>保全</Table.HeaderCell>
                            <Table.HeaderCell>動作</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>1</Table.Cell>
                            <Table.Cell>張大名</Table.Cell>
                            <Table.Cell selectable><Button icon> <Icon name='compose' /></Button></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>2</Table.Cell>
                            <Table.Cell>諸葛張</Table.Cell>
                            <Table.Cell selectable><Button icon> <Icon name='compose' /></Button></Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        );
  }
}

export default SecurityTable
