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
        service.getAllStations()
            .then((response: any) => {
                this.props.fetchGetDataSuccess({ 'type': 'stationAllList', 'data': response });
                service.getShifts(obj)
                    .then((responseSFT: any) => {
                        this.props.fetchGetDataSuccess({ 'type': 'shiftList', 'data': responseSFT });
                    }, (errorSFT) => {
                        this.props.fetchFailure(errorSFT);
                    });
            }, (error) => {
                this.props.fetchFailure(error);
            });
    }

    public printWorker(name: string, stationId: string, workerId: string, index: number) {
        const rows: JSX.Element[] = [];
        if (name.length > 0) {
            rows.push(<Table.Cell key={`day-tb-${stationId}-${workerId}-${index}`}><Label className='lab-cover' as='a' basic >{name}</Label></Table.Cell>);
        } else {
            rows.push(<Table.Cell key={`day-tb-${stationId}-${workerId}-${index}`} />);
        }
        return rows;
    }
    public printShiftType(shift: any, stationId: string, workerId: string, index: number) {
        const { getSelectYear, getSelectMonth, getDays } = this.props.main;
        const rows: JSX.Element[] = [];
        getDays.map((v) => {
            if (shiftLabs.getWeekDay(getSelectYear, getSelectMonth, v.toString()) === '六' || shiftLabs.getWeekDay(getSelectYear, getSelectMonth, v.toString()) === '日') {
                if (shift && shift[v]) {
                    if (shift[v].shiftType === '休') {
                        rows.push(<Table.Cell className='yellow-cell' key={`day-tb-${stationId}-${workerId}-${index}-${v}`} ><Label className='lab-cover1' as='a' basic >{shift[v].cover.name}</Label></Table.Cell>);
                    } else {
                        rows.push(<Table.Cell className='yellow-cell' key={`day-tb-${stationId}-${workerId}-${index}-${v}`} >{shift[v].shiftType}</Table.Cell>);
                    }
                } else {
                    rows.push(<Table.Cell className='yellow-cell' key={`day-tb-${stationId}-${workerId}-${index}-${v}`} />);
                }
            } else {
                if (shift && shift[v]) {
                    if (shift[v].shiftType === '休') {
                        rows.push(<Table.Cell  key={`day-tb-${stationId}-${workerId}-${index}-${v}`} ><Label className='lab-cover1' as='a' basic >{shift[v].cover.name}</Label></Table.Cell>);
                    } else {
                        rows.push(<Table.Cell key={`day-tb-${stationId}-${workerId}-${index}-${v}`} >{shift[v].shiftType}</Table.Cell>);
                    }
                } else {
                    rows.push(<Table.Cell key={`day-tb-${stationId}-${workerId}-${index}-${v}`} />);
                }
            }
        });
        return rows;
    }
    public stations() {
        const { stationShiftItems, stationAllListItems } = this.props.fetch;
        const rows: JSX.Element[] = [];
        Object.keys(stationShiftItems).map((stationId: any) => {
            const getStationId = stationId;
            const getWorker = stationShiftItems[getStationId];
            const max = Object.keys(getWorker).length;
            for (let cc = 0; cc < max; cc++) {
                const workerId = Object.keys(getWorker)[cc];
                if (cc === 0) {
                    rows.push(
                        <Table.Row key={`day-tb-tr-${getStationId}-${workerId}-${cc}`}>
                            <Table.Cell rowSpan={max}>{stationAllListItems[getStationId].name}</Table.Cell>
                            {this.printWorker(getWorker[workerId].workerName, getStationId, workerId, cc)}
                            {this.printShiftType(getWorker[workerId].shift, getStationId, workerId, cc)}
                            <Table.Cell>{getWorker[workerId].totalDays}</Table.Cell >
                            <Table.Cell>{getWorker[workerId].totalDayHours}</Table.Cell >
                            <Table.Cell>{getWorker[workerId].totalNights}</Table.Cell >
                            <Table.Cell>{getWorker[workerId].totalNightHours}</Table.Cell >
                            <Table.Cell>
                                <EditSecurityShift
                                    getStationId={getStationId}
                                    getStationName={stationAllListItems[getStationId].name}
                                    workerId={workerId}
                                />
                            </Table.Cell >
                        </Table.Row>
                    );
                } else {
                    rows.push(
                        <Table.Row key={`day-tb-tr-${getStationId}-${workerId}-${cc}`}>
                            {this.printWorker(getWorker[workerId].workerName, getStationId, workerId, cc)}
                            {this.printShiftType(getWorker[workerId].shift, getStationId, workerId, cc)}
                            <Table.Cell>{getWorker[workerId].totalDays}</Table.Cell >
                            <Table.Cell>{getWorker[workerId].totalDayHours}</Table.Cell >
                            <Table.Cell>{getWorker[workerId].totalNights}</Table.Cell >
                            <Table.Cell>{getWorker[workerId].totalNightHours}</Table.Cell >
                            <Table.Cell>
                                <EditSecurityShift
                                    getStationId={getStationId}
                                    getStationName={stationAllListItems[getStationId].name}
                                    workerId={workerId}
                                />
                            </Table.Cell >
                        </Table.Row>
                    );
                }
            }
        });
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
                            <Table.HeaderCell rowSpan='2'>日天數</Table.HeaderCell>
                            <Table.HeaderCell rowSpan='2'>日時數</Table.HeaderCell>
                            <Table.HeaderCell rowSpan='2'>夜天數</Table.HeaderCell>
                            <Table.HeaderCell rowSpan='2'>夜時數</Table.HeaderCell>
                            <Table.HeaderCell rowSpan='2'>動作</Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>星期</Table.HeaderCell>
                            {getDays.map((day, i) => <Table.HeaderCell  key={'w-' + i}>{shiftLabs.getWeekDay(getSelectYear, getSelectMonth, day.toString())}</Table.HeaderCell>)}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.stations()}
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
