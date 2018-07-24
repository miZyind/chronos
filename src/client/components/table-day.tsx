import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
// import Selector from '@components/selector';
import EditSecurityShift from '@components/edit-security-shift';

type TableDaysProps = {
    days: number[];
    month: number;
    year: number;
    getShift1: any;
};
const tabHeaderCellStyle = {
    fontSize: '10px',
    textAlign: 'center',
    padding: '0px',
    borderLeft: '1px solid rgba(34, 36, 38, .1)',
};
const optionSecurity = [
    { title: '張大名', key: '107' },
    { title: '諸葛張', key: '108' },
];

const weekDayCht = ['日', '一', '二', '三', '四', '五', '六'];

class TableDays extends Component<TableDaysProps> {
    public getWeekDay(day: number) {
        const getYear: string = this.props.year.toString();
        const getMonth: string = this.props.month.toString();
        const getDay: string = day.toString();
        const date: string = getYear + '-' + getMonth + '-' + getDay;
        const getWeekDay: number = new Date(date).getDay();
        return weekDayCht[getWeekDay];
    }
    public community() {
        const rows = [];
        // tslint:disable-next-line:forin
        for (const key in this.props.getShift1) {
            const max = parseInt(this.props.getShift1[key].ss);
            for (let cc = 1; cc <= max; cc++) {
                if (cc === 1) {
                    rows.push(
                        <Table.Row  key={key + '-' + cc}>
                            <Table.Cell style={tabHeaderCellStyle} rowSpan={max}>{this.props.getShift1[key].cc}</Table.Cell>
                            <Table.Cell style={tabHeaderCellStyle} />
                            {this.props.days.map((i) => <Table.Cell style={tabHeaderCellStyle} key={cc + '-' + key + '-' + i} />)}
                            <Table.Cell style={tabHeaderCellStyle}>
                                <EditSecurityShift
                                    year={this.props.year}
                                    month={this.props.month}
                                    days={this.props.days}
                                    getShift={this.props.getShift1}
                                />
                            </Table.Cell >
                        </Table.Row>
                    );
                } else {
                    rows.push(
                        <Table.Row  key={key + '-' + cc}>
                            // tslint:disable-next-line:jsx-self-close
                            <Table.Cell style={tabHeaderCellStyle} />
                            {this.props.days.map((i) => <Table.Cell style={tabHeaderCellStyle} key={cc + '-' + key + '-' + i}/>)}
                            <Table.Cell style={tabHeaderCellStyle}>
                                <EditSecurityShift
                                    year={this.props.year}
                                    month={this.props.month}
                                    days={this.props.days}
                                    getShift={this.props.getShift1}
                                />
                            </Table.Cell >
                        </Table.Row>
                    );
                }
            }
        }
        return rows;
    }
    public secu(max: number, key: string) {
        const rows = [];
        rows.push(
            <Table.Cell style={tabHeaderCellStyle} >GGG</Table.Cell>
        );
        for (let ii = 1; ii <= max; ii++) {
            rows.push(
                this.props.days.map((i, day) =>
                    <Table.Cell style={tabHeaderCellStyle} key={ii + '-' + key + '-' + i}>{day}</Table.Cell>
            ));
        }
        return rows;
    }
    public render() {
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
                    {this.community()}
                </Table.Body>
            </Table>
        );
    }
}
export default TableDays;
