import React, { Component } from 'react';
import Selector from '@components/selector';
import TableDays from '@components/shift/table-day';

const optionYears = [
    { title: '107年', key: '107' },
    { title: '108年', key: '108' },
    { title: '109年', key: '109' },
];
const optionMonths = [
    { title: '1月', key: '1' },
    { title: '2月', key: '2' },
    { title: '3月', key: '3' },
    { title: '4月', key: '4' },
    { title: '5月', key: '5' },
    { title: '6月', key: '6' },
    { title: '7月', key: '7' },
    { title: '8月', key: '8' },
    { title: '9月', key: '9' },
    { title: '10月', key: '10' },
    { title: '11月', key: '11' },
    { title: '12月', key: '12' },
];
type DaysLineTableProps = {
    className?: string;
    onChangeYearEvent?: any;
    onChangeMonthEvent?: any;
    selectYear: string;
    selectMonth: string;
    getDayLineHead: number[];
};

class DaysLineTable extends Component<DaysLineTableProps> {

    public getCommonEra = (year: number) => {
        return year + 1911;
    }

    public render() {
        return (
            <div className={this.props.className} >
                <Selector options={optionYears} currentSelected={this.props.selectYear} onChangeEvent={this.props.onChangeYearEvent} />
                <Selector options={optionMonths} currentSelected={this.props.selectMonth} onChangeEvent={this.props.onChangeMonthEvent} />
                <TableDays
                    year={this.getCommonEra(parseInt(this.props.selectYear))}
                    month={parseInt(this.props.selectMonth)}
                    days={this.props.getDayLineHead}
                />
            </div>
        );
    }
}

export default DaysLineTable;
