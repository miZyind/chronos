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
        this.getShifts();
    }

    public componentWillUpdate(nextProps: Props) {
        if (nextProps.fetch.sendfinish !== this.props.fetch.sendfinish) {
            this.getShifts();
        }
    }
    public getShifts() {
        const obj: object = {
            'year': this.props.main.getSelectYear,
            'month': this.props.main.getSelectMonth
        };
        this.props.fetchBegin();
        service.getShifts(obj)
            .then((response: any) => {
                this.props.fetchGetDataSuccess({ 'type': 'shiftList', 'data': response });
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
        const { getDays } = this.props.main;
        const rows: JSX.Element[] = [];
        getDays.map((v) => {
            if (shift && shift[v]) {
                if (shift[v].shiftType === '休') {
                    rows.push(<Table.Cell key={`day-tb-${stationId}-${workerId}-${index}-${v}`} ><Label className='lab-cover' as='a' basic >{shift[v].cover.name}</Label></Table.Cell>);
                } else {
                    rows.push(<Table.Cell key={`day-tb-${stationId}-${workerId}-${index}-${v}`} >{shift[v].shiftType}</Table.Cell>);
                }
            } else {
                rows.push(<Table.Cell key={`day-tb-${stationId}-${workerId}-${index}-${v}`} />);
            }
        });
        return rows;
    }
    public stations() {
        const { stationShiftItems } = this.props.fetch;
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
                            <Table.Cell rowSpan={max}>{getWorker[workerId].stationName}</Table.Cell>
                            {this.printWorker(getWorker[workerId].workerName, getStationId, workerId, cc)}
                            {this.printShiftType(getWorker[workerId].shift, getStationId, workerId, cc)}
                            <Table.Cell>
                                <EditSecurityShift
                                    getStationId={getStationId}
                                    getStationName={getWorker[workerId].stationName}
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
                            <Table.Cell>
                                <EditSecurityShift
                                    getStationId={getStationId}
                                    getStationName={getWorker[workerId].stationName}
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
                            {getDays.map((day, i) => <Table.HeaderCell key={'d-' + i}>{day}</Table.HeaderCell>)}
                            <Table.HeaderCell rowSpan='2'>動作</Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>星期</Table.HeaderCell>
                            {getDays.map((day, i) => <Table.HeaderCell key={'w-' + i}>{shiftLabs.getWeekDay(getSelectYear, getSelectMonth, day.toString())}</Table.HeaderCell>)}
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
        width: 2px;
        text-align: center;
        border-right: 1px solid rgba(34,36,38,.1);
        border-left: none;
    }
    .ui.table tbody tr td{
        font-size: 14px;
        height: 20px;
        width: 2px;
        padding: 0px;
        text-align: center;
        border-left: none;
        border-right: 1px solid rgba(34,36,38,.1);
    }
    .lab-cover{
        width: 15px;
        writing-mode: tb-lr;
        padding: 0px;
    }
`;
export default connect<StateProps, DispatchProps>(
    (state: any) => state,
    Actions
)(TableDaysShifts);
