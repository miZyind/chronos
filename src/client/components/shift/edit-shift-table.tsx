import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Grid, Label } from 'semantic-ui-react';
import Mark from '@components/shift/mark';
import Cover from '@components/shift/cover';
import { Actions } from '@actions/main';
import { IStore } from '../../models';

type EditTableShiftsProps = {
    stationName: string;
    stationId: string;
};
const tabHeaderCellStyle = {
    fontSize: '10px',
    textAlign: 'center',
    padding: '0px',
    borderLeft: '1px solid rgba(34, 36, 38, .1)',
};
const tabCellSpanStyle = {
    fontSize: '10px',
    textAlign: 'center',
    padding: '0px',
    height: '75px',
    borderLeft: '1px solid rgba(34, 36, 38, .1)'
};
const btnCoverStyle = {
    width: '25px',
    padding: '0px',
    writingMode: 'tb-rl'
};
const labCoverStyle = {
    writingMode: 'tb-rl',
    padding: '0px',
};
const optionWorkers: any = [];

let getItems: {
    [index: string]: {
        name: string,
        mobile: string
    }
};

const weekDayCht = ['日', '一', '二', '三', '四', '五', '六'];
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
        getItems = workerEditShiftItems;
        Object.keys(getItems).map((id: any) => {
            // tslint:disable-next-line:no-string-literal
            const getItemName = getItems[id].name;
            const getItemId = id;
            optionWorkers.push({ title: getItemName, key: getItemId });
        });
        this.props.main.getSelectWorker = { 'id': Object.keys(getItems)[0], 'name': getItems[Object.keys(getItems)[0]].name};
    }
    public getWeekDay(day: number) {
        const getYear: string = this.props.main.getSelectYear.toString();
        const getMonth: string = this.props.main.getSelectMonth.toString();
        const getDay: string = day.toString();
        const date: string = getYear + '-' + getMonth + '-' + getDay;
        const getWeekDay: number = new Date(date).getDay();
        return weekDayCht[getWeekDay];
    }
    public getCommonEra = (year: number) => {
        return year + 1911;
    }
    public deleteCover(day: any) {
        this.props.editshift({ 'day': day, 'shiftType': '休', 'status': 'off' });
    }
    public changeWorker = (event: React.FormEvent<HTMLSelectElement>) => {
        this.props.selectworker({ 'id': event.currentTarget.value, 'name': getItems[event.currentTarget.value].name});
    }
    public cover() {
        const { getShift, getDays } = this.props.main;
        console.log(getShift);
        const rows: JSX.Element[] = [];
        getDays.map((i) => {
            if (getShift && getShift[i] && (getShift[i].shiftType === '休')) {
                // tslint:disable-next-line:jsx-no-bind
                rows.push(<Table.Cell style={tabCellSpanStyle} key={'E-' + i} onClick={this.deleteCover.bind(this, i)}><Label  as='a' basic style={labCoverStyle}>{getShift[i].cover.name}</Label></Table.Cell>);
            } else {
                rows.push(<Table.Cell style={tabCellSpanStyle} key={'E-' + i} />);
            }
        });
        return rows;
    }
    public mark() {
        const { getShift, getDays } = this.props.main;
        console.log(getShift);
        const rows: JSX.Element[] = [];
        getDays.map((i) => {
            if (getShift && getShift[i] && (getShift[i].shiftType === '休')) {
                // tslint:disable-next-line:jsx-no-bind
                rows.push(<Table.Cell style={tabCellSpanStyle} key={'E-' + i} onClick={this.deleteCover.bind(this, i)}><Label as='a' basic style={labCoverStyle}>{getShift[i].cover.name}</Label></Table.Cell>);
            } else {
                rows.push(<Table.Cell style={tabCellSpanStyle} key={'E-' + i} />);
            }
        });
        return rows;
    }
    public dayMark(index: string, condition: string) {
        const rows: JSX.Element[] = [];
        this.props.main.getDays.map((i: number) => {
            if (this.props.main.getShift[i] && this.props.main.getShift[i].shiftType === condition) {
                rows.push(<Table.Cell style={tabHeaderCellStyle} key={index + '-' + i} > <Mark markName={condition} getDay={i} status={false} /></Table.Cell>);
            } else {
                rows.push(<Table.Cell style={tabHeaderCellStyle} key={index + '-' + i} > <Mark markName={condition} getDay={i} status={true} /></Table.Cell>);
            }
        });
        return rows;
    }

    public days() {
        const rows: JSX.Element[] = [];
        rows.push(
            <Table.Row key='r-1'>
                <Table.Cell style={tabHeaderCellStyle} >日班</Table.Cell>
                {this.dayMark('A', '日')}
            </Table.Row>
        );
        rows.push(
            <Table.Row key='r-2'>
                <Table.Cell style={tabHeaderCellStyle} >晚班</Table.Cell>
                {this.dayMark('B', '夜')}
            </Table.Row>
        );
        rows.push(
            <Table.Row key='r-3' >
                <Table.Cell style={tabHeaderCellStyle} rowSpan='2'>休假</Table.Cell>
                {this.props.main.getDays.map((i) => <Table.Cell style={tabCellSpanStyle} key={'C-' + i}><Label style={btnCoverStyle}><Cover getDay={i.toString()}/></Label></Table.Cell>)}
            </Table.Row >
        );
        rows.push(
            <Table.Row key='r-4' >
                {this.cover()}
            </Table.Row >
        );
        return rows;
    }
    public render() {
        console.log(this.props.main.getShift);
        if (this.props.main.modalLoading) {
            return <div>loading</div>;
        }
        return (
            <div>
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
                        <Table.HeaderCell style={tabHeaderCellStyle}>日期</Table.HeaderCell>
                            {this.props.main.getDays.map((day, i) => <Table.HeaderCell style={tabHeaderCellStyle} key={'d-' + i}>{day}</Table.HeaderCell>)}
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell style={tabHeaderCellStyle}>星期</Table.HeaderCell>
                            {this.props.main.getDays.map((day, i) => <Table.HeaderCell style={tabHeaderCellStyle} key={'w-' + i}>{this.getWeekDay(day)}</Table.HeaderCell>)}
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
export default connect < StateProps, DispatchProps>(
    (state: any) => state,
    Actions
)(EditTableShifts);
