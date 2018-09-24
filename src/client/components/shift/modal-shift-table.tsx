import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import shiftLabs from '#lib/shift';
import { Table, Grid, Label, Modal, Form, Button, Header } from 'semantic-ui-react';
import Arrangement from '@components/shift/shif-work-arrangement';
import { Actions } from '@actions/main';
import { IStore } from '../../models';

type EditTableShiftsProps = {
    className: string;
    stationName: string;
    stationId: string;
    workerId?: string;
};
const backdropStyle = {
    marginTop: '0px !important',
    margin: 'auto',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 50
};
const formPropos = {
    title: '選擇代班人員',
    titleBtn: '代班',
    selectCover: '代班人員',
};
let optionWorkers: any = [];

type StateProps = IStore;
type DispatchProps = typeof Actions;
type Props = EditTableShiftsProps & StateProps & DispatchProps;

class EditTableShifts extends Component<Props> {
    public state = { value: '', open: false, dimmer: true, closeondocument: false, closeondimmer: false };
    public getCover = {};
    constructor(prop: Props) {
        super(prop);
        this.getWorkrtOptions();
    }
    public getWorkrtOptions() {
        optionWorkers = [];
        const { workerEditShiftItems } = this.props.fetch;
        Object.keys(workerEditShiftItems).map((id: any) => {
            const getItemName = workerEditShiftItems[id].name;
            const getItemId = id;
            optionWorkers.push({ title: getItemName, key: getItemId });
        });
        if (this.props.workerId) {
            (this.props.workerId === '無') ? this.props.main.getSelectWorker = { 'id': Object.keys(workerEditShiftItems)[0], 'name': workerEditShiftItems[Object.keys(workerEditShiftItems)[0]].name } : this.props.main.getSelectWorker = { 'id': this.props.workerId, 'name': workerEditShiftItems[this.props.workerId].name };
        } else {
            this.props.main.getSelectWorker = { 'id': Object.keys(workerEditShiftItems)[0], 'name': workerEditShiftItems[Object.keys(workerEditShiftItems)[0]].name };
        }
    }
    public changeWorker = (event: React.FormEvent<HTMLSelectElement>) => {
        const { workerEditShiftItems } = this.props.fetch;
        this.props.selectworker({ 'id': event.currentTarget.value, 'name': workerEditShiftItems[event.currentTarget.value].name});
    }
    public checkWeekend(day: string) {
        const { getSelectYear, getSelectMonth } = this.props.main;
        let result = false;
        if (shiftLabs.getWeekDay(getSelectYear, getSelectMonth, day) === '六' || shiftLabs.getWeekDay(getSelectYear, getSelectMonth, day) === '日') {
            result = true;
        }
        return result;
    }
    public dayMark(index: string, type: string) {
        const emptyWorld = '';
        const getShift = this.props.main.getShift;
        const rows: JSX.Element[] = [];
        this.props.main.getShiftDays.map((i: number) => {
            if (getShift[i - 1]) {
                if (getShift[i - 1].type === '日' || getShift[i - 1].type === '夜' || getShift[i - 1].type === '無') {
                    if (type === 'nomal') {
                        rows.push(<Table.Cell className={(this.checkWeekend(i.toString()) ? 'yellow-cell' : '')} key={index + '-' + i} > <Arrangement className={`ara-${i}`} value={getShift[i - 1].type} getDay={i} /></Table.Cell>);
                    } else {
                        rows.push(<Table.Cell className={(this.checkWeekend(i.toString()) ? 'yellow-cell' : '')} key={'E-' + i} ><Label className='lab-cover' as='a' basic >{emptyWorld}</Label></Table.Cell>);
                    }
                } else {
                    if (type === 'nomal') {
                        rows.push(<Table.Cell className={(this.checkWeekend(i.toString()) ? 'yellow-cell' : '')} key={index + '-' + i} > <Arrangement className={`ara-${i}`} value='休' getDay={i} /></Table.Cell>);
                    } else {
                        rows.push(<Table.Cell className={(this.checkWeekend(i.toString()) ? 'yellow-cell' : '')} key={'E-' + i} ><Label className='lab-cover' as='a' basic onClick={this.show(true)} >{getShift[i - 1].coverWorkerName}</Label></Table.Cell>);
                    }
                }
            }
        });
        return rows;
    }
    public show = (dimmer: boolean) => () => this.setState({ dimmer, open: true });
    public close = () => {
        this.setState({ open: false });
    }
    public add = () => {
        this.setState({ open: false, value: '休' });
        this.props.editshift(this.getCover);
    }
    public changeCover = (event: React.FormEvent<HTMLSelectElement>) => {
        const { workerEditShiftItems } = this.props.fetch;
        // this.getCover = { 'day': this.props.getDay, 'shiftType': '休', 'id': event.currentTarget.value, 'name': workerEditShiftItems[event.currentTarget.value].name };
    }
    public render() {
        const { getSelectYear, getSelectMonth } = this.props.main;
        const { workerEditShiftItems } = this.props.fetch;
        const { open, dimmer, closeondocument, closeondimmer } = this.state;
        return (
            <div className={this.props.className}>
            <Grid columns='equal'>
                <Grid.Column>
                    駐點:{this.props.stationName}
                </Grid.Column>
                <Grid.Column width={8}>
                    選擇人員:
                    <select onChange={this.changeWorker} value={this.props.main.getSelectWorker.id}>
                        {optionWorkers.map((row: any, index: number) => <option key={index} value={row.key} >{row.title}</option >)}
                    </select>
                </Grid.Column>
            </Grid>
            <Table celled>
                <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell >日期</Table.HeaderCell>
                            {this.props.main.getShiftDays.map((day, i) => <Table.HeaderCell key={'d-' + i}>{day}</Table.HeaderCell>)}
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell >星期</Table.HeaderCell>
                            {this.props.main.getShiftDays.map((day, i) => <Table.HeaderCell key={'w-' + i}>{shiftLabs.getWeekDay(getSelectYear, getSelectMonth, day.toString())}</Table.HeaderCell>)}
                    </Table.Row>
                </Table.Header>
                    <Table.Body>
                        <Table.Row key='r-1'>
                            <Table.Cell>排班</Table.Cell>
                            {this.dayMark('A', 'nomal')}
                        </Table.Row>
                        <Table.Row key='r-2' >
                            <Table.Cell>代班人員</Table.Cell>
                            {this.dayMark('E', 'cover')}
                        </Table.Row >
                    </Table.Body>
                </Table>
                <Modal
                    closeOnDimmerClick={closeondimmer}
                    closeOnDocumentClick={closeondocument}
                    dimmer={dimmer}
                    onClose={this.close}
                    open={open}
                    className={this.props.className}
                    style={backdropStyle}
                >
                    <Modal.Content image scrolling>
                        <Modal.Description>
                            <Header>{formPropos.title}</Header>
                            <Form>
                                <Form.Group widths='equal'>
                                    <Form.Field label={formPropos.selectCover} control='select' onChange={this.changeCover} >
                                        {Object.keys(workerEditShiftItems).map((id: any) => <option key={id} value={id} > {workerEditShiftItems[id].name}</option >)}
                                    </Form.Field>
                                </Form.Group>
                            </Form>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={this.add} >新增</Button>
                        <Button color='black' onClick={this.close}>取消</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

const StyledEditTableShifts = styled(EditTableShifts) `
    .ui.table thead th{
        padding: 0px;
        font-size: 10px;
        text-align: center;
         border-right: 1px solid rgba(34,36,38,.1);
        border-left: none;
    }
    .ui.table tbody tr td{
        height: 40px;
        padding: 0px;
        font-size: 10px;
        text-align: center;
        border-left: none;
        border-right: 1px solid rgba(34,36,38,.1);
    }
    .lab-cover{
        width: 15px;
        writing-mode: tb-lr;
        padding: 0px;
    }
    .btn-cover{
        width: 25px;
        padding: 0px;
        writing-mode: tb-lr;
    }
    .yellow-cell{
        background-color: yellow;
    }
`;
export default connect < StateProps, DispatchProps>(
    (state: any) => state,
    Actions
)(StyledEditTableShifts);
