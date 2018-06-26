import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import Selector from '@components/selector';
import EditSecurityShift from '@components/edit-security-shift';

type TableDaysProps = {
    days: Array<number>;
    month: number;
    year: number;
    getShift1: any;
}
const tabHeaderCellStyle = {
    fontSize: "10px",
    textAlign: "center",
    padding: "0px",
    borderLeft: "1px solid rgba(34, 36, 38, .1)",
}
const optionSecurity = [
    { title: '張大名', key: '107' },
    { title: '諸葛張', key: '108' },
]

const weekDayCht = ['日', '一', '二', '三', '四', '五', '六'];

class TableDays extends Component<TableDaysProps> {
    getWeekDay(day: number) {
        let getYear: string = this.props.year.toString();
        let getMonth: string = this.props.month.toString();
        let getDay: string = day.toString();
        let date: string = getYear + '-' + getMonth + '-' + getDay;
        let getWeekDay: number = new Date(date).getDay();
        return weekDayCht[getWeekDay];
    }
    community() {
        let rows = [];
        for (let key in this.props.getShift1) {
            let max = parseInt(this.props.getShift1[key].ss);
            for (let cc = 1; cc <= max; cc++) {
                if (cc == 1) {
                    rows.push(
                        <Table.Row  key={key + '-' + cc}>
                            <Table.Cell style={tabHeaderCellStyle} rowSpan={max}>{this.props.getShift1[key].cc}</Table.Cell>
                            <Table.Cell style={tabHeaderCellStyle} >
                            </Table.Cell>
                            {this.props.days.map((i) =>
                                <Table.Cell style={tabHeaderCellStyle} key={cc + '-' + key + '-' + i}></Table.Cell>
                            )}
                            <Table.Cell style={tabHeaderCellStyle}>
                                <EditSecurityShift
                                    year={this.props.year}
                                    month={this.props.month}
                                    days={this.props.days}
                                    getShift={this.props.getShift1}>
                                </EditSecurityShift>
                            </Table.Cell >
                        </Table.Row>
                    )
                } else {
                    rows.push(
                        <Table.Row  key={key + '-' + cc}>
                            <Table.Cell style={tabHeaderCellStyle} >
                            </Table.Cell>
                            {this.props.days.map((i) =>
                                <Table.Cell style={tabHeaderCellStyle} key={cc + '-' + key + '-' + i}></Table.Cell>
                            )}
                            <Table.Cell style={tabHeaderCellStyle}>
                                <EditSecurityShift
                                    year={this.props.year}
                                    month={this.props.month}
                                    days={this.props.days}
                                    getShift={this.props.getShift1}>
                                </EditSecurityShift>
                            </Table.Cell >
                        </Table.Row>
                    )
                }
            }
        }
        return rows;
    }
    secu(max:number,key:string) {
        let rows = [];
        rows.push(
            <Table.Cell style={tabHeaderCellStyle} >GGG</Table.Cell>
        )
        for (let ii = 1; ii <= max; ii++) {
            rows.push(
            this.props.days.map((i, day) =>
                <Table.Cell style={tabHeaderCellStyle} key={ii + '-' + key + '-' + i}>{day}</Table.Cell>
            ))
        }
        return rows;
    }
    render() {
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell rowSpan='2' style={tabHeaderCellStyle}>駐點</Table.HeaderCell>
                        <Table.HeaderCell style={tabHeaderCellStyle}>日期</Table.HeaderCell>
                        {this.props.days.map((day, i) =>
                            <Table.HeaderCell style={tabHeaderCellStyle} key={'d-' +i}>{day}</Table.HeaderCell>
                        )}
                        <Table.HeaderCell style={tabHeaderCellStyle} rowSpan='2'>動作</Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell style={tabHeaderCellStyle}>星期</Table.HeaderCell>
                        {this.props.days.map((day, i) =>
                            <Table.HeaderCell style={tabHeaderCellStyle} key={'w-'+i}>{this.getWeekDay(day)}</Table.HeaderCell>
                        )}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.community()}
                </Table.Body>
            </Table>
        )
    }
}
export default TableDays
