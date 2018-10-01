import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import shiftLabs from '#lib/shift';
import { Table, Grid, Label, Button, Icon } from 'semantic-ui-react';
import SelectWorkerMoal from '@components/shift/modal-select-worker';
import Arrangement from '@components/shift/row-arrangement';
import { Actions } from '@actions/main';
import { IStore } from '../../models';

type EditTableShiftsProps = {
    className: string;
    stationName: string;
    stationId: string;
    workerId?: string;
};
let nomalConstraintId: number[] = [];
const coverConstraintId: number[] = [];
type StateProps = IStore;
type DispatchProps = typeof Actions;
type Props = EditTableShiftsProps & StateProps & DispatchProps;

class EditTableShifts extends Component<Props> {
    public getCover = {};
    public state = {
    open: false,
    selWorkerId: 1,
    selWorkerName: '無',
    selWorkerMobile: '無',
    constraintId: [],
    selWorkerType: 'nomal',
    changeCoverWorkerDay: 0
};
    constructor(prop: Props) {
        super(prop);
        this.getWorkrtOptions();
    }
    public getWorkrtOptions() {
        const { workerEditShiftItems } = this.props.fetch;
        if (this.props.workerId) {
            if (this.props.workerId === '無') {
                this.props.main.getSelectWorker = { 'id': 0, 'name': '無', 'mobile': '' };
            } else {
                coverConstraintId[0] = parseInt(this.props.workerId);
                this.props.main.getSelectWorker = { 'id': this.props.workerId, 'name': workerEditShiftItems[this.props.workerId].name, 'mobile': workerEditShiftItems[this.props.workerId].mobile };
            }
        } else {
            this.props.main.getSelectWorker = { 'id': 0, 'name': '無', 'mobile': ''};
        }
    }

    public dayMark(index: string, type: string) {
        const { getSelectShiftYear, getSelectShiftMonth } = this.props.main;
        const emptyWorld = '';
        const getShift = this.props.main.getShift;
        const rows: JSX.Element[] = [];
        const coverWorkerId: any[] = [];
        this.props.main.getShiftDays.map((i: number) => {
            if (getShift[i - 1]) {
                if (getShift[i - 1].type === '日' || getShift[i - 1].type === '夜' || getShift[i - 1].type === '無') {
                    if (type === 'nomal') {
                        rows.push(
                            <Table.Cell className={(shiftLabs.checkWeekend(getSelectShiftYear, getSelectShiftMonth, i.toString()) ? 'yellow-cell' : '')} key={index + '-' + i} >
                                <Arrangement
                                    className={`ara-${i}`}
                                    selCoverWorverEvent={this.showSelectWorkerModal}
                                    editShiftEvent={this.props.editshift}
                                    value={getShift[i - 1].type}
                                    getDay={i}
                                />
                            </Table.Cell>);
                    } else {
                        rows.push(<Table.Cell className={(shiftLabs.checkWeekend(getSelectShiftYear, getSelectShiftMonth, i.toString()) ? 'yellow-cell' : '')} key={'E-' + i} ><Label className='lab-cover' as='a' basic >{emptyWorld}</Label></Table.Cell>);
                    }
                } else {
                    if (type === 'nomal') {
                        rows.push(
                            <Table.Cell className={(shiftLabs.checkWeekend(getSelectShiftYear, getSelectShiftMonth, i.toString()) ? 'yellow-cell' : '')} key={index + '-' + i} >
                                <Arrangement
                                    className={`ara-${i}`}
                                    selCoverWorverEvent={this.showSelectWorkerModal}
                                    editShiftEvent={this.props.editshift}
                                    value='休'
                                    getDay={i}
                                />
                            </Table.Cell>);
                    } else {
                        if (coverWorkerId.indexOf(parseInt(getShift[i - 1].coverWorkerId)) < 0) {
                            coverWorkerId.push(parseInt(getShift[i - 1].coverWorkerId));
                        }
                        rows.push(<Table.Cell className={(shiftLabs.checkWeekend(getSelectShiftYear, getSelectShiftMonth, i.toString()) ? 'yellow-cell' : '')} key={'E-' + i} ><Label className='lab-cover' as='a' basic onClick={this.showSelectWorkerModal.bind(this, 'cover', i)} >{getShift[i - 1].coverWorkerName}</Label></Table.Cell>);
                    }
                }
            }
        });
        nomalConstraintId = coverWorkerId;
        return rows;
    }
    public showSelectWorkerModal = (type: string, key?: number) => {
        if (type === 'nomal') {
            nomalConstraintId = this.props.main.getOtherNomalWorker.concat(nomalConstraintId);
            this.setState({
                selWorkerId: this.props.main.getSelectWorker.id,
                selWorkerName: this.props.main.getSelectWorker.name,
                selWorkerMobile: this.props.main.getSelectWorker.mobile,
                constraintId: nomalConstraintId,
                selWorkerType: 'nomal',
                open: true
            });
        } else {
            const getShift = this.props.main.getShift;
            if (key) {
                this.setState({
                    selWorkerId: getShift[key - 1].coverWorkerId,
                    selWorkerName: getShift[key - 1].coverWorkerName,
                    selWorkerMobile: getShift[key - 1].coverWorkerMobile,
                    constraintId: coverConstraintId,
                    selWorkerType: 'cover',
                    changeCoverWorkerDay: key,
                    open: true
                });
            }
        }
    }
    public close = () => {
        this.setState({ open: false });
    }
    public changeNomalWorker = (getNewWorkerId: any) => {
        const { workerEditShiftItems } = this.props.fetch;
        if (this.state.selWorkerType === 'nomal') {
            coverConstraintId[0] = getNewWorkerId;
            this.props.main.getSelectWorker = { 'id': getNewWorkerId, 'name': workerEditShiftItems[getNewWorkerId].name, 'mobile': workerEditShiftItems[getNewWorkerId].mobile };
        } else if (this.state.selWorkerType === 'cover') {
            this.getCover = { 'day': this.state.changeCoverWorkerDay, 'shiftType': '休', 'id': getNewWorkerId, 'name': workerEditShiftItems[getNewWorkerId].name };
            this.props.editshift(this.getCover);
        }
    }
    public render() {
        const { getSelectShiftYear, getSelectShiftMonth } = this.props.main;
        const { open} = this.state;
        return (
            <div className={this.props.className}>
            <Grid columns='equal'>
                <Grid.Column>
                    駐點:{this.props.stationName}
                </Grid.Column>
                <Grid.Column width={8}>
                    駐點保全:
                    {this.props.main.getSelectWorker.name}
                    <Button onClick={this.showSelectWorkerModal.bind(this, 'nomal')}><Icon name='compose' /></Button>
                </Grid.Column>
            </Grid>
            <Table celled>
                <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell >日期</Table.HeaderCell>
                            {this.props.main.getShiftDays.map((day, i) => <Table.HeaderCell key={'d-' + i}>{day}</Table.HeaderCell>)}
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell >星期</Table.HeaderCell>
                            {this.props.main.getShiftDays.map((day, i) => <Table.HeaderCell key={'w-' + i}>{shiftLabs.getWeekDay(getSelectShiftYear, getSelectShiftMonth, day.toString())}</Table.HeaderCell>)}
                    </Table.Row>
                </Table.Header>
                    <Table.Body>
                        <Table.Row key='r-1'>
                            <Table.Cell>排班</Table.Cell>
                            {this.dayMark('A', 'nomal')}
                        </Table.Row>
                        <Table.Row key='r-2' >
                            <Table.Cell>代班人員</Table.Cell>
                            {this.dayMark('E', 'cover')}
                        </Table.Row >
                    </Table.Body>
                </Table>
                <SelectWorkerMoal
                    className='selectWorker'
                    oriSelWorkerName={this.state.selWorkerName}
                    oriSelWorkerMobile={this.state.selWorkerMobile}
                    oriSelWorkerId={this.state.selWorkerId}
                    constraintId={this.state.constraintId}
                    open={open}
                    closeEvent={this.close}
                    workerOptions={this.props.fetch.workerOptions}
                    fetch={this.props.fetchGetDataSuccess}
                    getWorker={this.changeNomalWorker}
                />
            </div>
        );
    }
}

const StyledEditTableShifts = styled(EditTableShifts) `
    .ui.table thead th{
        padding: 0px;
        font-size: 10px;
        text-align: center;
         border-right: 1px solid rgba(34,36,38,.1);
        border-left: none;
    }
    .ui.table tbody tr td{
        height: 40px;
        padding: 0px;
        font-size: 10px;
        text-align: center;
        border-left: none;
        border-right: 1px solid rgba(34,36,38,.1);
    }
    .lab-cover{
        width: 15px;
        writing-mode: tb-lr;
        padding: 0px;
    }
    .btn-cover{
        width: 25px;
        padding: 0px;
        writing-mode: tb-lr;
    }
    .yellow-cell{
        background-color: yellow;
    }
`;
export default connect < StateProps, DispatchProps>(
    (state: any) => state,
    Actions
)(StyledEditTableShifts);
