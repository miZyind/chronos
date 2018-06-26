import React, { Component } from 'react';
import { Table, Grid } from 'semantic-ui-react';
import Selector from '@components/selector';
import MarkButton from '@components/mark-button';

type EditTableShiftsProps = {
    days: Array<number>;
    month: number;
    year: number;
    communoty: string;
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

class EditTableShifts extends Component<EditTableShiftsProps> {
    getWeekDay(day: number) {
        let getYear: string = this.props.year.toString();
        let getMonth: string = this.props.month.toString();
        let getDay: string = day.toString();
        let date: string = getYear + '-' + getMonth + '-' + getDay;
        let getWeekDay: number = new Date(date).getDay();
        return weekDayCht[getWeekDay];
    }
    getCommonEra = (year: number) => {
        return year + 1911;
    }
    community() {
        let rows:any = [];
        rows.push(
            <Table.Row key="r-1">
            <Table.Cell style={tabHeaderCellStyle} >日班</Table.Cell>
            {this.props.days.map((i) =>
                    <Table.Cell style={tabHeaderCellStyle} key={'A-' + i}><MarkButton buttonName="日"></MarkButton></Table.Cell>
            )}
            </Table.Row>
        )
        rows.push(
            <Table.Row key="r-2">
                <Table.Cell style={tabHeaderCellStyle} >晚班</Table.Cell>
                {this.props.days.map((i) =>
                    <Table.Cell style={tabHeaderCellStyle} key={'B-' + i}><MarkButton buttonName="夜"></MarkButton></Table.Cell>
                )}
            </Table.Row>
        )
        rows.push(
            <Table.Row key="r-3">
                <Table.Cell style={tabHeaderCellStyle} >休假</Table.Cell>
                {this.props.days.map((i) =>
                    <Table.Cell style={tabHeaderCellStyle} key={'C-' + i}>
                         <Selector
                        options={optionSecurity}
                        currentSelected=''>
                    </Selector>
                    </Table.Cell>
                )}
            </Table.Row>
        )
        return rows;
    }
    render() {
        return (
            <div>
            <Grid columns='equal'>
                <Grid.Column>
                   駐點:{this.props.communoty}
                </Grid.Column>
                <Grid.Column width={8}>
                    選擇人員:
                    <Selector
                        options={optionSecurity}
                        currentSelected=''>
                    </Selector>
                </Grid.Column>
            </Grid>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell style={tabHeaderCellStyle}>日期</Table.HeaderCell>
                        {this.props.days.map((day, i) =>
                            <Table.HeaderCell style={tabHeaderCellStyle} key={'d-' +i}>{day}</Table.HeaderCell>
                        )}
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
            </div>
        )
    }
}
export default EditTableShifts
