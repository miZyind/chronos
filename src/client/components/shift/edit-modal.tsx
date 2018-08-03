import React, { Component } from 'react';
import { Button, Header, Modal, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Actions } from '@actions/main';
import { IStore } from '../../models';
import * as service from '../../services';
import EditShiftTable from '@components/shift/edit-shift-table';

type EditWorkerShiftProps = {
    className?: string;
    getStationName: string;
    getStationId: string;
};
const formPropos = {
    title: '編輯班表',
};
const backdropStyle = {
    marginTop: '0px !important',
    marginLeft: '10px',
    marginRight: 'auto',
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: '1200px',
    padding: 20
};
type StateProps = IStore;
type DispatchProps = typeof Actions;
type Props = EditWorkerShiftProps & StateProps & DispatchProps;

class EditWorkerShift extends Component<Props> {
    public state = { open: false, dimmer: true, closeondocument: false, closeondimmer: false };

    public show = (dimmer: boolean) => () => {
        this.setState({ dimmer, open: true });
    }
    public close = () => this.setState({ open: false });

    public fetchShift() {
        this.props.fetchBegin();
        const obj: object = {
            'year': this.props.main.getSelectYear,
            'month': this.props.main.getSelectMonth,
            'stationid': this.props.getStationId,
            'stationname': this.props.getStationName,
            'workerid': this.props.main.getSelectWorker.id,
            'workername': this.props.main.getSelectWorker.name,
            'shift': this.props.main.getShift
        };
        service.postShift(obj)
            .then((response: any) => {
                if (response === 'yes') {
                    this.props.fetchSendSuccess();
                    alert('新增成功');
                }
            }, (error) => {
                this.props.fetchFailure(error);
            });
    }
    public add = () => {
        console.log(this.props.main.getSelectYear);
        console.log(this.props.main.getSelectMonth);
        console.log(this.props.getStationId);
        console.log(this.props.getStationName);
        console.log(this.props.main.getSelectWorker);
        console.log(this.props.main.getShift);
        this.setState({ open: false });
        this.fetchShift();
    }

    public render() {
        const { open, dimmer, closeondocument, closeondimmer } = this.state;
        return (
            <Modal
                closeOnDimmerClick={closeondimmer}
                closeOnDocumentClick={closeondocument}
                dimmer={dimmer}
                onClose={this.close}
                open={open}
                className={this.props.className}
                style={backdropStyle}
                trigger={<Button onClick={this.show(true)} icon> <Icon name='compose' /></Button>}
            >
                <Modal.Content image scrolling>
                    <Modal.Description>
                        <Header>{formPropos.title}</Header>
                        <EditShiftTable
                            stationName={this.props.getStationName}
                            stationId={this.props.getStationId}
                        />
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={this.add} >新增</Button>
                    <Button color='black' onClick={this.close}>取消</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default connect<StateProps, DispatchProps>(
    (state: any) => state,
    Actions
)(EditWorkerShift);
