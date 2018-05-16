import React, { Component } from 'react';
import Selector from '@components/selector';
import TableDays from '@components/table-day';

type HeadDayLineProps = {
    className?: string;
    onChangeYearEvent?: any;
    onChangeMonthEvent?: any;
    selectYear: string;
    selectMonth: string;
    getDayLineHead: Array<number>;
};
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

class HeadDayLine extends Component<HeadDayLineProps> {
    //getTable: number[] = [];
    // change = (event: React.FormEvent<HTMLSelectElement>) => {
    //     this.getTable = [];
    //     this.props.onChangeMonthEvent(event)
    //     console.log('b:', this.props.selectMonth);
    //     for (var i = 0; i < parseInt(this.props.selectMonth); i++) {
    //         this.getTable.push(i);
    //     }
    //     // console.log(this.getTable);
    // }
    render() {
        return (
            <div>
                <Selector options={optionYears} currentSelected={this.props.selectYear} onChangeEvent={this.props.onChangeYearEvent}></Selector>
                <Selector options={optionMonths} currentSelected={this.props.selectMonth} onChangeEvent={this.props.onChangeMonthEvent} ></Selector>
                <TableDays days={this.props.getDayLineHead}></TableDays>
            </div>        
        );
  }
}

export default HeadDayLine
