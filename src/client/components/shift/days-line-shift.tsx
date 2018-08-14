import React, { Component } from 'react';
import Selector from '@components/selector';
import TableDays from '@components/shift/table-day';
import shiftLabs from '#lib/shift';

type DaysLineTableProps = {
    className?: string;
    onChangeYearEvent?: any;
    onChangeMonthEvent?: any;
    selectYear: string;
    selectMonth: string;
};

class DaysLineTable extends Component<DaysLineTableProps> {
    public render() {
        return (
            <div className={this.props.className} >
                <Selector options={shiftLabs.optionYears} currentSelected={this.props.selectYear} onChangeEvent={this.props.onChangeYearEvent} />
                <Selector options={shiftLabs.optionMonths} currentSelected={this.props.selectMonth} onChangeEvent={this.props.onChangeMonthEvent} />
                <TableDays
                    className='table-days'
                />
            </div>
        );
    }
}

export default DaysLineTable;
