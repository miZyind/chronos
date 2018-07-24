import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import DaysLineTable from '@components/days-line-table';
import CommunityTable from '@components/community-table';
import SecurityTable from '@components/security-table';

type MainTabProps = {
    className?: string;
    onChangeYearEvent?: any;
    onChangeMonthEvent?: any;
    addShiftClick?: any;
    getShift1: any;
    selectYear: string;
    selectMonth: string;
    getDayLineHead: number[];
};

const tablTitle = {
    title1: '班表管理',
    title2: '駐點管理',
    title3: '保全管理',
};
class MainTab extends Component<MainTabProps> {
    public panes = [
        {
            menuItem: tablTitle.title1, render: () =>
                // tslint:disable-next-line:jsx-wrap-multiline
                <Tab.Pane attached={false}>
                    <DaysLineTable
                        onChangeYearEvent={this.props.onChangeYearEvent}
                        onChangeMonthEvent={this.props.onChangeMonthEvent}
                        selectYear={this.props.selectYear}
                        selectMonth={this.props.selectMonth}
                        getDayLineHead={this.props.getDayLineHead}
                        addShiftClick={this.props.addShiftClick}
                        getShift1={this.props.getShift1}
                    />
                </Tab.Pane>
        },
        {
            menuItem: tablTitle.title2, render: () =>
                <Tab.Pane attached={false}><CommunityTable /></Tab.Pane>
        },
        {
            menuItem: tablTitle.title3, render: () =>
                <Tab.Pane attached={false}><SecurityTable /></Tab.Pane>
        },
    ];
    public render() {
        return (
            <Tab className={this.props.className} panes={this.panes} menu={{ pointing: true }} />
        );
    }
}
export default MainTab;
