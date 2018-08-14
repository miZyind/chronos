import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import shiftLabs from '#lib/shift';
import { Table, Grid, Label } from 'semantic-ui-react';
import Arrangement from '@components/shift/shif-work-arrangement';
import { Actions } from '@actions/main';
import { IStore } from '../../models';

type EditTableShiftsProps = {
    className: string;
    stationName: string;
    stationId: string;
    workerId?: string;
};

const optionWorkers: any = [];

type StateProps = IStore;
type DispatchProps = typeof Actions;
type Props = EditTableShiftsProps & StateProps & DispatchProps;

class EditTableShifts extends Component<Props> {
    constructor(prop: Props) {
        super(prop);
        this.getWorkrtOptions();
    }
    public getWorkrtOptions() {
        const { workerEditShiftItems } = this.props.fetch;
        Object.keys(workerEditShiftItems).map((id: any) => {
            const getItemName = workerEditShiftItems[id].name;
            const getItemId = id;
            optionWorkers.push({ title: getItemName, key: getItemId });
        });
        // tslint:disable-next-line:prefer-conditional-expression
        if (this.props.workerId) {
            (this.props.workerId.split('-')[0] === 'empty') ? this.props.main.getSelectWorker = { 'id': Object.keys(workerEditShiftItems)[0], 'name': workerEditShiftItems[Object.keys(workerEditShiftItems)[0]].name } : this.props.main.getSelectWorker = { 'id': this.props.workerId, 'name': workerEditShiftItems[this.props.workerId].name };
        } else {
            this.props.main.getSelectWorker = { 'id': Object.keys(workerEditShiftItems)[0], 'name': workerEditShiftItems[Object.keys(workerEditShiftItems)[0]].name };
        }
    }
    public changeWorker = (event: React.FormEvent<HTMLSelectElement>) => {
        const { workerEditShiftItems } = this.props.fetch;
        this.props.selectworker({ 'id': event.currentTarget.value, 'name': workerEditShiftItems[event.currentTarget.value].name});
    }
    public cover() {
        const { getShift, getDays } = this.props.main;
        const rows: JSX.Element[] = [];
        getDays.map((i) => {
            if (getShift && getShift[i] && (getShift[i].shiftType === '休')) {
                rows.push(<Table.Cell key={'E-' + i} ><Label className='lab-cover'  as='a' basic >{getShift[i].cover.name}</Label></Table.Cell>);
            } else {
                rows.push(<Table.Cell className='tt'  key={'E-' + i} />);
            }
        });
        return rows;
    }

    public dayMark(index: string) {
        const { getShift } = this.props.main;
        const rows: JSX.Element[] = [];
        console.log(getShift);
        this.props.main.getDays.map((i: number) => {
            if (getShift[i] && getShift[i].shiftType) {
                rows.push(<Table.Cell key={index + '-' + i} > <Arrangement className={`ara-${i}`} value={getShift[i].shiftType} getDay={i} /></Table.Cell>);
            } else {
                rows.push(<Table.Cell key={index + '-' + i} > <Arrangement className={`ara-${i}`} value='無' getDay={i} /></Table.Cell>);
            }
        });
        return rows;
    }

    public days() {
        const rows: JSX.Element[] = [];
        rows.push(
            <Table.Row key='r-1'>
                <Table.Cell>排班</Table.Cell>
                {this.dayMark('A')}
            </Table.Row>
        );
        rows.push(
            <Table.Row key='r-2' >
                <Table.Cell>代班人員</Table.Cell>
                {this.cover()}
            </Table.Row >
        );
        return rows;
    }
    public render() {
        const { getSelectYear, getSelectMonth, modalLoading} = this.props.main;
        if (modalLoading) {
            return <div>loading</div>;
        }
        return (
            <div className={this.props.className}>
            <Grid columns='equal'>
                <Grid.Column>
                    駐點:{this.props.stationName}
                </Grid.Column>
                <Grid.Column width={8}>
                    選擇人員:
                    <select onChange={this.changeWorker} value={this.props.main.getSelectWorker.id}>
                        {optionWorkers.map((row: any, index: number) => <option key={index} value={row.key} >{row.title}</option >)}
                    </select>
                </Grid.Column>
            </Grid>
            <Table celled>
                <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell >日期</Table.HeaderCell>
                            {this.props.main.getDays.map((day, i) => <Table.HeaderCell key={'d-' + i}>{day}</Table.HeaderCell>)}
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell >星期</Table.HeaderCell>
                            {this.props.main.getDays.map((day, i) => <Table.HeaderCell key={'w-' + i}>{shiftLabs.getWeekDay(getSelectYear, getSelectMonth, day.toString())}</Table.HeaderCell>)}
                    </Table.Row>
                </Table.Header>
                    <Table.Body>
                        {this.days()}
                    </Table.Body>
                </Table>
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
`;
export default connect < StateProps, DispatchProps>(
    (state: any) => state,
    Actions
)(StyledEditTableShifts);
