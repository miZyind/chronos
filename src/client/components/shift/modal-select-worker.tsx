import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import shiftLabs from '#lib/shift';
import { Table, Grid, Label, Modal, Form, Button, Header } from 'semantic-ui-react';
import Arrangement from '@components/shift/shif-work-arrangement';
import { Actions } from '@actions/main';
import { IStore } from '../../models';

type SelectWorkerProps = {
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
type Props = SelectWorkerProps & StateProps & DispatchProps;

class SelectWorker extends Component<Props> {
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
    public show = (dimmer: boolean) => () => this.setState({ dimmer, open: true });
    public close = () => {
        this.setState({ open: false });
    }
    public add = () => {
        this.setState({ open: false });
        // this.props.editshift(this.getCover);
    }
    public changeCover = (event: React.FormEvent<HTMLSelectElement>) => {
        const { workerEditShiftItems } = this.props.fetch;
        // this.getCover = { 'day': this.props.getDay, 'shiftType': '休', 'id': event.currentTarget.value, 'name': workerEditShiftItems[event.currentTarget.value].name };
    }
    public render() {
        const { workerEditShiftItems } = this.props.fetch;
        const { open, dimmer, closeondocument, closeondimmer } = this.state;
        return (
            <div className={this.props.className}>
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

const StyledSelectWorker = styled(SelectWorker) `
`;
export default connect < StateProps, DispatchProps>(
    (state: any) => state,
    Actions
)(StyledSelectWorker);
