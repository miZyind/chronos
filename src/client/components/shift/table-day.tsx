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

const weekDayCht = ['日', '一', '二', '三', '四', '五', '六'];

type FStateProps = IFetch;
type DispatchProps = typeof Actions;
type Props = TableDaysProps & FStateProps & DispatchProps;

class TableDays extends Component<Props> {

    constructor(prop: Props) {
        super(prop);
        this.getStations('all');
    }

    public componentWillUpdate(nextProps: Props) {
        if (nextProps.sendfinish !== this.props.sendfinish) {
            this.getStations('all');
        }
    }

    public getStations(area: string) {
        this.props.fetchBegin();
        service.getStations(area)
            .then((response: any) => {
                this.props.fetchGetDataSuccess(response);
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
    public stations() {
        const { items } = this.props;
        const rows: JSX.Element[] = [];
        Object.keys(items).map((area: any) => {
            const getArea = Object.values(items[area]);
            getArea.map((i: any) => {
                const max = parseInt(i.stableNumber);
                for (let cc = 1; cc <= max; cc++) {
                    if (cc === 1) {
                        rows.push(
                            <Table.Row key={`day-tb-${i.id}-${cc}`}>
                                <Table.Cell style={tabHeaderCellStyle} rowSpan={max}>{i.name}</Table.Cell>
                                <Table.Cell style={tabHeaderCellStyle} />
                                {this.props.days.map((v) => <Table.Cell style={tabHeaderCellStyle} key={`day-tb-${cc}-${i.id}-${v}`} />)}
                                <Table.Cell style={tabHeaderCellStyle}>
                                    <EditSecurityShift
                                        getStationName={i.name}
                                    />
                                </Table.Cell >
                            </Table.Row>
                        );
                    } else {
                        rows.push(
                            <Table.Row key={`day-tb-${i.id}-${cc}`}>
                                <Table.Cell style={tabHeaderCellStyle} />
                                {this.props.days.map((v) => <Table.Cell style={tabHeaderCellStyle} key={`day-tb-${cc}-${i.id}-${v}`} />)}
                                <Table.Cell style={tabHeaderCellStyle}>
                                    <EditSecurityShift
                                        getStationName={i.name}
                                    />
                                </Table.Cell >
                            </Table.Row>
                        );
                    }
                }
            });
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
