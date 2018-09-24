import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import DaysLineTable from '@components/shift/days-line-shift';
import StationTable from '@components/station/list';
import WorkerTable from '@components/worker/list';
import CountTable from '@components/count/list';

type MainTabProps = {
    className?: string;
    onChangeYearEvent?: any;
    onChangeMonthEvent?: any;
    selectYear: string;
    selectMonth: string;
    onChangeAreaEvent?: any;
    selectArea: string;
};

const tablTitle = {
    title1: '班表管理',
    title2: '駐點管理',
    title3: '保全管理',
    title4: '保全時數',
};
class MainTab extends Component<MainTabProps> {
    public panes = [
        {
            menuItem: tablTitle.title1, render: () =>
                // tslint:disable-next-line:jsx-wrap-multiline
                <Tab.Pane attached={false}>
                    <DaysLineTable />
                </Tab.Pane>
        },
        {
            menuItem: tablTitle.title2, render: () =>
                // tslint:disable-next-line:jsx-wrap-multiline
                <Tab.Pane attached={false}>
                    <StationTable
                        onChangeAreaEvent={this.props.onChangeAreaEvent}
                        selectArea={this.props.selectArea}
                    />
                </Tab.Pane>
        },
        {
            menuItem: tablTitle.title3, render: () =>
                <Tab.Pane attached={false}><WorkerTable /></Tab.Pane>
        },
        {
            menuItem: tablTitle.title4, render: () =>
                // tslint:disable-next-line:jsx-wrap-multiline
                <Tab.Pane attached={false}>
                    <CountTable/>
                </Tab.Pane>
        },
    ];
    public render() {
        return (
            <Tab className={this.props.className} panes={this.panes} menu={{ pointing: true }} />
        );
    }
}
export default MainTab;
