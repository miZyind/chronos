import React, { Component } from 'react';
import Selector from '@components/selector';
import TableDays from '@components/shift/table-days';
import { connect } from 'react-redux';
import { Actions } from '@actions/main';
import { IStore } from '../../models';
import shiftLabs from '#lib/shift';

type ListTableProps = {
    className?: string;
};

type StateProps = IStore;
type DispatchProps = typeof Actions;
type Props = ListTableProps & StateProps & DispatchProps;

class ListTable extends Component<Props, any> {
    constructor(prop: Props) {
        super(prop);
    }
    public render() {
        return (
            <div className={this.props.className} >
                <Selector options={shiftLabs.optionYears} currentSelected={this.props.main.getSelectShiftYear} onChangeEvent={this.props.selectshiftyear} />
                <Selector options={shiftLabs.optionMonths} currentSelected={this.props.main.getSelectShiftMonth} onChangeEvent={this.props.selectshiftmonth} />
                <Selector options={shiftLabs.optionAreas} currentSelected={this.props.main.getSelectShiftArea} onChangeEvent={this.props.selectshiftarea} />
                <TableDays
                    className='table-days'
                />
            </div>
        );
    }
}

export default connect<StateProps, DispatchProps>(
    (state: any) => state,
    Actions
)(ListTable);
