import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddSecurityMoal from '@components/add-security-modal';
import { Table, Button, Icon } from 'semantic-ui-react';
import { Actions } from '@actions/main';
import { IFetch } from '../models/fetch';
import * as service from '../services';

type SecurityTableProps = {
    className?: string;
};

type FStateProps = IFetch;
type DispatchProps = typeof Actions;
type Props = SecurityTableProps & FStateProps & DispatchProps;

class SecurityTable extends Component<Props> {
    constructor(prop: Props) {
        super(prop);
        this.fetchWorkers();
    }

    public fetchWorkers() {
        this.props.fetchDataBegin();
        service.register()
            .then((response: any) => {
                console.log(response);
                this.props.fetchDataSuccess(response);
            }, (error) => {
                this.props.fetchDataFailure(error);
            });
    }

    public render() {
        return (
            <div className={this.props.className} >
                <AddSecurityMoal />
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

export default SecurityTable;
