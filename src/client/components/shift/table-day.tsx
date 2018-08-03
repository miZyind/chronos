import React, { Component } from 'react';
import { Table, Message, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import EditSecurityShift from '@components/shift/edit-modal';

import { Actions } from '@actions/main';
import { IFetch } from '../../models/fetch';
import * as service from '../../services';

type TableDaysProps = {
    days: number[];
    month: number;
    year: number;
};
const tabHeaderCellStyle = {
    fontSize: '10px',
    textAlign: 'center',
    padding: '0px',
    borderLeft: '1px solid rgba(34, 36, 38, .1)',
};
const shiftStyle = {
    width: '25px',
    padding: '0px',
};

const weekDayCht = ['日', '一', '二', '三', '四', '五', '六'];

type FStateProps = IFetch;
type DispatchProps = typeof Actions;
type Props = TableDaysProps & FStateProps & DispatchProps;

class TableDays extends Component<Props> {

    constructor(prop: Props) {
        super(prop);
        this.getShifts();
    }

    public componentWillUpdate(nextProps: Props) {
        if (nextProps.sendfinish !== this.props.sendfinish) {
            this.getShifts();
        }
    }
    public getShifts() {
        const obj: object = {
            'year': this.getCommonEra(this.props.year),
            'month': this.props.month
        };
        this.props.fetchBegin();
        service.getShifts(obj)
            .then((response: any) => {
                this.props.fetchGetDataSuccess({ 'type': 'shiftList', 'data': response });
            }, (error) => {
                this.props.fetchFailure(error);
            });
    }
    public getWeekDay(day: number) {
        const getYear: string = this.props.year.toString();
        const getMonth: string = this.props.month.toString();
        const getDay: string = day.toString();
        const date: string = getYear + '-' + getMonth + '-' + getDay;
        const getWeekDay: number = new Date(date).getDay();
        return weekDayCht[getWeekDay];
    }
    public getCommonEra = (year: number) => {
        return year - 1911;
    }
    public printWorker(name: string) {
        const rows: JSX.Element[] = [];
        if (name.length > 0) {
            rows.push(<Table.Cell style={tabHeaderCellStyle} >{name}</Table.Cell>);
        } else {
            rows.push(<Table.Cell style={tabHeaderCellStyle} />);
        }
        return rows;
    }
    public printShiftType(shift: any, stationId: string, workerId: string, index: number) {
        const rows: JSX.Element[] = [];
        this.props.days.map((v) => {
            if (shift && shift[v]) {
                if (shift[v].shiftType === '休') {
                    rows.push(<Table.Cell style={shiftStyle} key={`day-tb-${stationId}-${workerId}-${index}-${v}`} >{`${ shift[v].cover.name}`}</Table.Cell>);
                } else {
                    rows.push(<Table.Cell style={tabHeaderCellStyle} key={`day-tb-${stationId}-${workerId}-${index}-${v}`} >{shift[v].shiftType}</Table.Cell>);
                }
            } else {
                rows.push(<Table.Cell style={tabHeaderCellStyle} key={`day-tb-${stationId}-${workerId}-${index}-${v}`} />);
            }
        });
        return rows;
    }
    public stations() {
        const { stationShiftItems } = this.props;
        const rows: JSX.Element[] = [];
        Object.keys(stationShiftItems).map((stationId: any) => {
            const getStationId = stationId;
            const getWorker = stationShiftItems[getStationId];
            const max = Object.keys(getWorker).length;
            for (let cc = 0; cc < max; cc++) {
                const workerId = Object.keys(getWorker)[cc];
                if (cc === 0) {
                    rows.push(
                        <Table.Row key={`day-tb-${getStationId}-${workerId}-${cc}`}>
                            <Table.Cell style={tabHeaderCellStyle} rowSpan={max}>{getWorker[workerId].stationName}</Table.Cell>
                            {this.printWorker(getWorker[workerId].workerName)}
                            {this.printShiftType(getWorker[workerId].shift, getStationId, workerId, cc)}
                            <Table.Cell style={tabHeaderCellStyle}>
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
                        <Table.Row key={`day-tb-${getStationId}-${workerId}-${cc}`}>
                            {this.printWorker(getWorker[workerId].workerName)}
                            {this.printShiftType(getWorker[workerId].shift, getStationId, workerId, cc)}
                            <Table.Cell style={tabHeaderCellStyle}>
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
        const { loading } = this.props;
        if (loading) {
            return (
                <Message icon>
                    <Icon name='circle notched' loading />
                    <Message.Content>
                        <Message.Header>Loading</Message.Header>
                    </Message.Content>
                </Message>
            );
        }
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell rowSpan='2' style={tabHeaderCellStyle}>駐點</Table.HeaderCell>
                        <Table.HeaderCell style={tabHeaderCellStyle}>日期</Table.HeaderCell>
                        {this.props.days.map((day, i) => <Table.HeaderCell style={tabHeaderCellStyle} key={'d-' + i}>{day}</Table.HeaderCell>)}
                        <Table.HeaderCell style={tabHeaderCellStyle} rowSpan='2'>動作</Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell style={tabHeaderCellStyle}>星期</Table.HeaderCell>
                        {this.props.days.map((day, i) => <Table.HeaderCell style={tabHeaderCellStyle} key={'w-' + i}>{this.getWeekDay(day)}</Table.HeaderCell>)}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.stations()}
                </Table.Body>
            </Table>
        );
    }
}
export default connect<FStateProps, DispatchProps>(
    (state: any) => state.fetch,
    Actions
)(TableDays);
