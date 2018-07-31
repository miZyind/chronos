import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Grid, Label } from 'semantic-ui-react';
import Selector from '@components/selector';
import Mark from '@components/shift/mark';
import Cover from '@components/shift/cover';
import { Actions } from '@actions/main';
import { IMain } from '../../models/main';

type EditTableShiftsProps = {
    station: string;
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
const optionSecurity = [
    { title: '張大名', key: '107' },
    { title: '諸葛張', key: '108' },
];

const weekDayCht = ['日', '一', '二', '三', '四', '五', '六'];
type StateProps = IMain;
type DispatchProps = typeof Actions;
type Props = EditTableShiftsProps & StateProps & DispatchProps;

class EditTableShifts extends Component<Props> {
    constructor(prop: Props) {
        super(prop);
    }
    public getWeekDay(day: number) {
        const getYear: string = this.props.getSelectYear.toString();
        const getMonth: string = this.props.getSelectMonth.toString();
        const getDay: string = day.toString();
        const date: string = getYear + '-' + getMonth + '-' + getDay;
        const getWeekDay: number = new Date(date).getDay();
        return weekDayCht[getWeekDay];
    }
    public getCommonEra = (year: number) => {
        return year + 1911;
    }
    public cover() {
        const rows: JSX.Element[] = [];
        this.props.getDays.map((i) => {
            if (this.props.getCovers && this.props.getCovers[i]) {
                rows.push(<Table.Cell style={tabCellSpanStyle} key={'E-' + i}><Label as='a' basic  style={labCoverStyle}>{this.props.getCovers[i].name}</Label></Table.Cell>);
            } else {
                rows.push(<Table.Cell style={tabCellSpanStyle} key={'E-' + i} />);
            }
        });
        return rows;
    }
    public community() {
        const rows: JSX.Element[] = [];
        rows.push(
            <Table.Row key='r-1'>
                <Table.Cell style={tabHeaderCellStyle} >日班</Table.Cell>
                {this.props.getDays.map((i: number) => <Table.Cell style={tabHeaderCellStyle} key={'A-' + i} ><Mark markName='日' getDay={i} status={true} /></Table.Cell>)}
            </Table.Row>
        );
        rows.push(
            <Table.Row key='r-2'>
                <Table.Cell style={tabHeaderCellStyle} >晚班</Table.Cell>
                {this.props.getDays.map((i) => <Table.Cell style={tabHeaderCellStyle} key={'B-' + i}><Mark markName='夜' getDay={i} status={true} /></Table.Cell>)}
            </Table.Row>
        );
        rows.push(
            <Table.Row key='r-3' >
                <Table.Cell style={tabHeaderCellStyle} rowSpan='2'>休假</Table.Cell>
                {this.props.getDays.map((i) => <Table.Cell style={tabCellSpanStyle} key={'C-' + i}><Label style={btnCoverStyle}><Cover getDay={i.toString()}/></Label></Table.Cell>)}
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
        return (
            <div>
            <Grid columns='equal'>
                <Grid.Column>
                   駐點:{this.props.station}
                </Grid.Column>
                <Grid.Column width={8}>
                    選擇人員:
                    <Selector
                        options={optionSecurity}
                        currentSelected=''
                    />
                </Grid.Column>
            </Grid>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell style={tabHeaderCellStyle}>日期</Table.HeaderCell>
                            {this.props.getDays.map((day, i) => <Table.HeaderCell style={tabHeaderCellStyle} key={'d-' + i}>{day}</Table.HeaderCell>)}
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell style={tabHeaderCellStyle}>星期</Table.HeaderCell>
                            {this.props.getDays.map((day, i) => <Table.HeaderCell style={tabHeaderCellStyle} key={'w-' + i}>{this.getWeekDay(day)}</Table.HeaderCell>)}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.community()}
                </Table.Body>
                </Table>
            </div>
        );
    }
}
export default connect<StateProps, DispatchProps>(
    (state: any) => state.main,
    Actions
)(EditTableShifts);
