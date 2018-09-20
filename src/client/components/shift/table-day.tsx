import React, { Component } from 'react';
import { Table, Label } from 'semantic-ui-react';
import Wating from '@components/waiting';
import { connect } from 'react-redux';
import styled from 'styled-components';
import EditSecurityShift from '@components/shift/edit-modal';
import shiftLabs from '#lib/shift';
import { Actions } from '@actions/main';
import { IStore } from '../../models';
import * as service from '../../services';

type TableDaysProps = {
    className: string;
};

type StateProps = IStore;
type DispatchProps = typeof Actions;
type Props = TableDaysProps & StateProps & DispatchProps;

class TableDays extends Component<Props> {

    constructor(prop: Props) {
        super(prop);
        this.getShifts(this.props.main.getSelectYear, this.props.main.getSelectMonth);
    }

    public componentWillUpdate(nextProps: Props) {
        if (nextProps.fetch.sendfinish !== this.props.fetch.sendfinish) {
            this.getShifts(nextProps.main.getSelectYear, nextProps.main.getSelectMonth);
        }
        if (nextProps.main.getSelectYear !== this.props.main.getSelectYear) {
            this.getShifts(nextProps.main.getSelectYear, nextProps.main.getSelectMonth);
        }
        if (nextProps.main.getSelectMonth !== this.props.main.getSelectMonth) {
            this.getShifts(nextProps.main.getSelectYear, nextProps.main.getSelectMonth);
        }
    }
    public getShifts(year: string, month: string) {
        const obj: object = {
            'year': year,
            'month': month
        };
        this.props.fetchBegin();
        service.getShiftsByMonth(obj)
            .then((response: any) => {
                this.props.fetchGetDataSuccess({ 'type': 'stationShiftsListByMonthArea', 'data': response });
            }, (error) => {
                this.props.fetchFailure(error);
            });
    }

    public printWorker(name: string, stationId: string, workerId: string, index: number) {
        const rows: JSX.Element[] = [];
        if (name !== '無') {
            rows.push(<Table.Cell key={`day-tb-${stationId}-${workerId}-${index}`}><Label className='lab-cover' as='a' basic >{name}</Label></Table.Cell>);
        } else {
            rows.push(<Table.Cell key={`day-tb-${stationId}-${workerId}-${index}`} />);
        }
        return rows;
    }
    public printShiftType(shifts: any, stationId: string, workerId: string, index: number) {
        const { getSelectYear, getSelectMonth } = this.props.main;
        const rows: JSX.Element[] = [];
        if (shifts && shifts.length > 0) {
            shifts.map((v: any, key: number) => {
                if (shiftLabs.getWeekDay(getSelectYear, getSelectMonth, (key + 1).toString()) === '六' || shiftLabs.getWeekDay(getSelectYear, getSelectMonth, (key + 1).toString()) === '日') {
                    if (v === '日' || v === '夜' || v === '') {
                        rows.push(<Table.Cell className='yellow-cell' key={`day-tb-${stationId}-${workerId}-${index}-${key}`} >{v}</Table.Cell>);
                    } else {
                        rows.push(<Table.Cell className='yellow-cell' key={`day-tb-${stationId}-${workerId}-${index}-${key}`} ><Label className='lab-cover1' as='a' basic >{v}</Label></Table.Cell>);
                    }
                } else {
                    if (v === '日' || v === '夜' || v === '') {
                        rows.push(<Table.Cell key={`day-tb-${stationId}-${workerId}-${index}-${key}`} >{v}</Table.Cell>);
                    } else {
                        rows.push(<Table.Cell key={`day-tb-${stationId}-${workerId}-${index}-${key}`} ><Label className='lab-cover1' as='a' basic >{v}</Label></Table.Cell>);
                    }
                }
            });
        }
        return rows;
    }
    public stationNameCell(checkIndex: number, max: number, stationName: string, stationId: string) {
        const rows: JSX.Element[] = [];
        if (checkIndex === 0) {
            rows.push(<Table.Cell key={`stname-tb-tr-${stationId}`} rowSpan={max}>{stationName}</Table.Cell>);
        }
        return rows;
    }
    public stationShifts() {
        const { stationShiftsListByMonthArea } = this.props.fetch;
        const rows: JSX.Element[] = [];
        if (stationShiftsListByMonthArea && stationShiftsListByMonthArea.length > 0) {
            stationShiftsListByMonthArea.map((stationShiftRow: any) => {
                const workerShiftRows = stationShiftRow.workerShift;
                const max = workerShiftRows.length;
                workerShiftRows.map((workerShiftRow: any, key: number) => {
                    rows.push(
                        <Table.Row key={`day-tb-tr-${stationShiftRow.stationId}-${workerShiftRow.nomalWorkerId}-${key}`}>
                            {this.stationNameCell(key, max, stationShiftRow.stationName, stationShiftRow.stationId)}
                            {this.printWorker(workerShiftRow.nomalWorkerName, stationShiftRow.stationId, workerShiftRow.nomalWorkerId, key)}
                            {this.printShiftType(workerShiftRow.dayShift, stationShiftRow.stationId, workerShiftRow.nomalWorkerId, key)}
                            <Table.Cell>
                                <EditSecurityShift
                                    getStationId={stationShiftRow.stationId}
                                    getStationName={stationShiftRow.stationName}
                                    workerId={workerShiftRow.nomalWorkerId}
                                />
                            </Table.Cell >
                        </Table.Row>
                    );
                });
            });
        }
        return rows;
    }
    public render() {
        const { loading } = this.props.fetch;
        const { getSelectYear, getSelectMonth, getDays } = this.props.main;
        if (loading) {
            return (<Wating />);
        }
        return (
            <div className={this.props.className}>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell rowSpan='2'>駐點</Table.HeaderCell>
                            <Table.HeaderCell >日期</Table.HeaderCell>
                            {getDays.map((day, i) => <Table.HeaderCell  key={'d-' + i}>{day}</Table.HeaderCell>)}
                            <Table.HeaderCell rowSpan='2'>動作</Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>星期</Table.HeaderCell>
                            {getDays.map((day, i) => <Table.HeaderCell  key={'w-' + i}>{shiftLabs.getWeekDay(getSelectYear, getSelectMonth, day.toString())}</Table.HeaderCell>)}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.stationShifts()}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}
const TableDaysShifts = styled(TableDays) `
    .ui.table thead th{
        padding: 0px;
        font-size: 10px;
        text-align: center;
        border-right: 1px solid rgba(34,36,38,.1);
        border-left: none;
    }
    .ui.table tbody tr td{
        font-size: 14px;
        height: 20px;
        width: 1px;
        padding: 0px;
        text-align: center;
        border-left: none;
        border-right: 1px solid rgba(34,36,38,.1);
    }
    .lab-cover{
        width: 15px;
        padding: 0px;
    }
    .lab-cover1{
        width: 15px;
        padding: 0px;
        color: red !important;
    }
    .yellow-cell{
        background-color: yellow;
    }
`;
export default connect<StateProps, DispatchProps>(
    (state: any) => state,
    Actions
)(TableDaysShifts);
