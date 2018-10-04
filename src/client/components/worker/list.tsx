import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddWorkerModal from '@components/worker/modal-add';
import EditWorkerModal from '@components/worker/modal-edit';
import Wating from '@components/message-waiting';
import { Table} from 'semantic-ui-react';
import { Actions } from '@actions/main';
import { IFetch } from '../../models/fetch';
import * as service from '../../services';
import Row from './row-list';

type FStateProps = IFetch;
type DispatchProps = typeof Actions;
type Props = FStateProps & DispatchProps;

class ListTable extends Component<Props, any> {
    constructor(prop: Props) {
        super(prop);
        this.props.fetchStep('GET', service.getWorkers(), 'workerList');
        this.state = {
            addWorkerModalOpen: false,
            addWorkerName: '',
            addWorkerMobile: '',
            editWorkerModalOpen: false,
            editWorkerId: 0,
            editWorkerName: '',
            editWorkerMobile: ''
        };
    }
    public componentWillUpdate(nextProps: Props) {
        if (nextProps.sendfinish) {
            this.props.fetchStep('GET', service.getWorkers(), 'workerList');
        }
    }
    public workerModalFieldChange = (event: any) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    public addWorkerModalOpen = () => {
        this.setState({
            addWorkerModalOpen: true,
            addWorkerName: '',
            addWorkerMobile: ''
        });
    }
    public addWorkerModalSubmit = () => {
        const { addWorkerName, addWorkerMobile } = this.state;
        const obj: object = { 'name': addWorkerName, 'mobile': addWorkerMobile };
        this.props.fetchStep('POST', service.postWorker(obj));
        this.addWorkerModalClose();
    }
    public addWorkerModalClose = () => {
        this.setState({
            addWorkerModalOpen: false,
            addWorkerName: '',
            addWorkerMobile: ''
        });
    }
    public editWorkerModalOpen = (getId: any, getName: string, getMobile: string) => {
        this.setState({
            editWorkerModalOpen: true,
            editWorkerId: getId,
            editWorkerName: getName,
            editWorkerMobile: getMobile
        });
    }
    public editWorkerModalSubmit = () => {
        const { editWorkerName, editWorkerMobile, editWorkerId } = this.state;
        const obj: object = { 'name': editWorkerName, 'mobile': editWorkerMobile, 'id': editWorkerId };
        this.props.fetchStep('PUT', service.putWorker(obj));
        this.editWorkerModalClose();
    }
    public editWorkerModalClose = () => {
        this.setState({
            editWorkerModalOpen: false,
            editWorkerId: 0,
            editWorkerName: '',
            editWorkerMobile: ''
        });
    }
    public deleteWorker(getId: any) {
        const r = confirm('確定刪除此保全人員？');
        if (r) {
            const obj: object = { 'id': getId };
            this.props.fetchStep('DELETE', service.deleteWorker(obj));
        }
    }
    // public getLists() {
    //     const { workerListItems } = this.props;
    //     const rows: JSX.Element[] = [];
    //     Object.keys(workerListItems).map((id: any) => {
    //         const getItemName = workerListItems[id].name;
    //         const getItemMobile = workerListItems[id].mobile;
    //         rows.push(
    //             <Table.Row key={`worker-${id}}`}>
    //                 <Table.Cell>{id}</Table.Cell>
    //                 <Table.Cell>{getItemName}</Table.Cell>
    //                 <Table.Cell>{getItemMobile}</Table.Cell>
    //                 <Table.Cell selectable>
    //                     <Button icon onClick={this.editWorkerModalOpen.bind(this, id, getItemName, getItemMobile)}><Icon name='compose' /></Button>
    //                     <Button icon onClick={this.deleteWorker.bind(this, id)}> <Icon name='trash' /></Button>
    //                 </Table.Cell>
    //             </Table.Row>);
    //     });
    //     return rows;
    // }
    public render() {
        const { loading, workerListItems} = this.props;
        const { addWorkerModalOpen, addWorkerName, addWorkerMobile,
                editWorkerModalOpen, editWorkerName, editWorkerMobile
        } = this.state;
        if (loading) {
            return (<Wating />);
        }
        return (
            <div className='listWorker' >
                <AddWorkerModal
                    className='addWorker'
                    addWorkerModalOpen={addWorkerModalOpen}
                    addWorkerName={addWorkerName}
                    addWorkerMobile={addWorkerMobile}
                    addWorkerModalOpenEven={this.addWorkerModalOpen}
                    addWorkerModalFieldChangeEvent={this.workerModalFieldChange}
                    addWorkerModalSubmitEvent={this.addWorkerModalSubmit}
                    addWorkerModalCloseEvent={this.addWorkerModalClose}
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
                    <Table.Body>{!loading && Object.keys(workerListItems).map((id: any, key: number) => <Row key={key} worker={workerListItems[id]} editBtnEvent={this.editWorkerModalOpen.bind(this, id, workerListItems[id].name, workerListItems[id].mobile)} deleteBtnEvent={this.deleteWorker.bind(this, id)} />)}</Table.Body>
                </Table>
                <EditWorkerModal
                    className='editWorker'
                    editWorkerModalOpen={editWorkerModalOpen}
                    editWorkerName={editWorkerName}
                    editWorkerMobile={editWorkerMobile}
                    editWorkerModalFieldChangeEvent={this.workerModalFieldChange}
                    editWorkerModalSubmitEvent={this.editWorkerModalSubmit}
                    editWorkerModalCloseEvent={this.editWorkerModalClose}
                />
            </div>
        );
  }
}

export default connect<FStateProps, DispatchProps>(
    (state: any) => state.fetch,
    Actions
)(ListTable);
