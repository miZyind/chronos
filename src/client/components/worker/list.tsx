import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddFormMoal from '@components/worker/modal-add';
import EditFormMoal from '@components/worker/modal-edit';
import { Table, Button, Icon} from 'semantic-ui-react';
import Wating from '@components/message-waiting';
import { Actions } from '@actions/main';
import { IFetch } from '../../models/fetch';
import * as service from '../../services';

type ListTableProps = {
    className?: string;
};

type FStateProps = IFetch;
type DispatchProps = typeof Actions;
type Props = ListTableProps & FStateProps & DispatchProps;

class ListTable extends Component<Props> {
    constructor(prop: Props) {
        super(prop);
        this.props.fetchStep('GET', service.getWorkers(), 'workerList');
    }

    public componentWillUpdate(nextProps: Props) {
        if (nextProps.sendfinish) {
            this.props.fetchStep('GET', service.getWorkers(), 'workerList');
        }
    }

    public deleteWorker(getId: any) {
        const r = confirm('確定刪除此保全人員？');
        if (r) {
            const obj: object = { 'id': getId };
            this.props.fetchStep('DELETE', service.deleteWorker(obj));
        }
    }
    public getLists() {
        const { workerListItems } = this.props;
        const rows: JSX.Element[] = [];
        Object.keys(workerListItems).map((id: any) => {
            const getItemName = workerListItems[id].name;
            const getItemMobile = workerListItems[id].mobile;
            rows.push(
                <Table.Row key={`worker-${id}}`}>
                    <Table.Cell>{id}</Table.Cell>
                    <Table.Cell>{getItemName}</Table.Cell>
                    <Table.Cell>{getItemMobile}</Table.Cell>
                    <Table.Cell selectable>
                        <EditFormMoal
                            editId={id}
                            editName={getItemName}
                            editMobile={getItemMobile}
                            fetchStepEvent={this.props.fetchStep}
                        />
                        <Button icon onClick={this.deleteWorker.bind(this, id)}> <Icon name='trash' /></Button>
                    </Table.Cell>
                </Table.Row>);
        });
        return rows;
    }
    public render() {
        const {loading} = this.props;
        if (loading) {
            return (<Wating />);
        }
        return (
            <div className={this.props.className} >
                <AddFormMoal
                    className='addWorker'
                    fetchStepEvent={this.props.fetchStep}
                />
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>保全</Table.HeaderCell>
                            <Table.HeaderCell>手機</Table.HeaderCell>
                            <Table.HeaderCell>動作</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>{this.getLists()}</Table.Body>
                </Table>
            </div>
        );
  }
}

export default connect<FStateProps, DispatchProps>(
    (state: any) => state.fetch,
    Actions
)(ListTable);
