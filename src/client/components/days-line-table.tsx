import React, { Component } from 'react';
import { connect } from 'react-redux';
import Selector from '@components/selector';
import TableDays from '@components/table-day';
import AddShiftForm from '@components/add-shift-form';

import { Actions } from '@actions/main';
import { IWork } from '../models/work';
import * as service from '../services';


const optionYears = [
    { title: '107年', key: '107' },
    { title: '108年', key: '108' },
    { title: '109年', key: '109' },
]
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
]
type DaysLineTableProps = {
    className?: string;
    onChangeYearEvent?: any;
    onChangeMonthEvent?: any;
    selectYear: string;
    selectMonth: string;
    getDayLineHead: Array<number>;
    addShiftClick: any;
    getShift1: any;
}

type WStateProps = IWork;
type DispatchProps = typeof Actions;

class DaysLineTable extends Component<DaysLineTableProps & WStateProps & DispatchProps> {

    componentDidMount() {
        this.fetchProducts()
    }
    fetchProducts() {
        this.props.fetchProductsBegin
        service.register()
            .then(response => {
                this.props.fetchProductsSuccess(response.data);
            }, error => {
                this.props.fetchProductsFailure(error)
            })
    }

    getCommonEra = (year: number) => {
        return year + 1911;
    }

    render() {
        const {
            error, loading, items,
        } = this.props;

        if (error) {
            return <div>Error! {error.message}</div>;
        }

        if (loading) {
            return <div>Loading...</div>;
        }
        return (
            <div className={this.props.className} >
                <Selector options={optionYears} currentSelected={this.props.selectYear} onChangeEvent={this.props.onChangeYearEvent}></Selector>
                <Selector options={optionMonths} currentSelected={this.props.selectMonth} onChangeEvent={this.props.onChangeMonthEvent} ></Selector>
                <AddShiftForm
                    addShiftClick={this.props.addShiftClick}
                    getShift={this.props.getShift1}>
                </AddShiftForm>
                <TableDays
                    year={this.getCommonEra(parseInt(this.props.selectYear))}
                    month={parseInt(this.props.selectMonth)}
                    days={this.props.getDayLineHead}
                    getShift1={this.props.getShift1}>
                </TableDays>
                <ul >
                    {items.map((i: any) =>
                        <li key={i.id}>{i.name}</li>
                    )}
                </ul>
            </div>

        )
    }
}

// export default DaysLineTable
export default connect<WStateProps, DispatchProps >(
    (state: any) => state.work,
    Actions
)(DaysLineTable);
