import React, { Component } from 'react';
import { Table, Label, Pagination} from 'semantic-ui-react';
import Wating from '@components/waiting';
import { connect } from 'react-redux';
import styled from 'styled-components';
import EditWorkerShift from '@components/shift/edit-worker-shift-modal';
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
        this.getShifts(this.props.main.getSelectShiftYear, this.props.main.getSelectShiftMonth, this.props.main.getSelectShiftArea, '1');
    }
    public componentWillUpdate(nextProps: Props) {
        if (nextProps.fetch.sendfinish !== this.props.fetch.sendfinish) {
            this.getShifts(nextProps.main.getSelectShiftYear, nextProps.main.getSelectShiftMonth, nextProps.main.getSelectShiftArea, '1');
        }
        if (nextProps.main.getSelectShiftYear !== this.props.main.getSelectShiftYear) {
            this.getShifts(nextProps.main.getSelectShiftYear, nextProps.main.getSelectShiftMonth, nextProps.main.getSelectShiftArea, '1');
        }
        if (nextProps.main.getSelectShiftMonth !== this.props.main.getSelectShiftMonth) {
            this.getShifts(nextProps.main.getSelectShiftYear, nextProps.main.getSelectShiftMonth, nextProps.main.getSelectShiftArea, '1');
        }
        if (nextProps.main.getSelectShiftArea !== this.props.main.getSelectShiftArea) {
            this.getShifts(nextProps.main.getSelectShiftYear, nextProps.main.getSelectShiftMonth, nextProps.main.getSelectShiftArea, '1');
        }
        if (nextProps.main.getShiftPage !== this.props.main.getShiftPage) {
            this.getShifts(nextProps.main.getSelectShiftYear, nextProps.main.getSelectShiftMonth, nextProps.main.getSelectShiftArea, nextProps.main.getShiftPage);
        }
    }
    public getShifts(year: string, month: string, area: string, page: string) {
        const obj: object = {
            'year': year,
            'month': month,
            'area': area,
            'page': page,
            'count': shiftLabs.shiftPageListCounts
        };
        this.props.fetchBegin();
        service.getShiftsByMonth(obj)
            .then((response: any) => {
                this.props.fetchGetDataSuccess({ 'type': 'stationShiftsListByMonthArea', 'data': response });
            }, (error) => {
                this.props.fetchFailure(error);
            });
    }
    public handlePageChange = (e: any, { activePage }: any) => {
        console.log(e);
        this.props.shiftpagination(activePage);
    }
    public printWorker(name: string, stationId: string, workerId: string, index: number) {
        const rows: JSX.Element[] = [];
        let printName = '';
        if (name !== '無') {
            printName = name;
        }
        rows.push(<Table.Cell className='orange-cell' key={`day-tb-${stationId}-${workerId}-${index}`}><Label className='lab-cover' as='a' basic >{printName}</Label></Table.Cell>);
        return rows;
    }
    public checkWeekend(day: string) {
        const { getSelectYear, getSelectMonth } = this.props.main;
        let result = false;
        if (shiftLabs.getWeekDay(getSelectYear, getSelectMonth, day) === '六' || shiftLabs.getWeekDay(getSelectYear, getSelectMonth, day) === '日') {
            result = true;
        }
        return result;
    }
    public printShiftType(shifts: any, stationId: string, workerId: string, index: number) {
        const emptyWorld = '';
        const rows: JSX.Element[] = [];
        if (shifts && shifts.length > 0) {
            shifts.map((v: any, key: number) => {
                if (v.type === '日' || v.type === '夜' || v.type === '無') {
                    if (v.type === '無') {
                        rows.push(<Table.Cell className={(this.checkWeekend((key + 1).toString()) ? 'yellow-cell' : '')} key={`day-tb-${stationId}-${workerId}-${index}-${key}`} ><Label className='lab-cover1' as='a' basic >{emptyWorld}</Label></Table.Cell >);
                    } else {
                        rows.push(<Table.Cell className={(this.checkWeekend((key + 1).toString()) ? 'yellow-cell' : '')} key={`day-tb-${stationId}-${workerId}-${index}-${key}`} >{v.type}</Table.Cell>);
                    }
                } else {
                    rows.push(<Table.Cell className='red-cell' key={`day-tb-${stationId}-${workerId}-${index}-${key}`} ><Label className='lab-cover1' as='a' basic >{v.coverWorkerName}</Label></Table.Cell>);
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
                                <EditWorkerShift
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
        const { loading, totalStationByMonthArea } = this.props.fetch;
        const { getSelectYear, getSelectMonth, getShiftDays } = this.props.main;
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
                            {getShiftDays.map((day, i) => <Table.HeaderCell  key={'d-' + i}>{day}</Table.HeaderCell>)}
                            <Table.HeaderCell rowSpan='2'>動作</Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>星期</Table.HeaderCell>
                            {getShiftDays.map((day, i) => <Table.HeaderCell  key={'w-' + i}>{shiftLabs.getWeekDay(getSelectYear, getSelectMonth, day.toString())}</Table.HeaderCell>)}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.stationShifts()}
                    </Table.Body>
                </Table>
                <Pagination
                    totalPages={Math.ceil(totalStationByMonthArea / 5)}
                    onPageChange={this.handlePageChange}
                    activePage={this.props.main.getShiftPage}
                />
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
    }
    .yellow-cell{
        background-color: yellow;
    }
    .red-cell{
        background-color: red;
    }
    .orange-cell{
        background-color: orange;
    }
`;
export default connect<StateProps, DispatchProps>(
    (state: any) => state,
    Actions
)(TableDaysShifts);
