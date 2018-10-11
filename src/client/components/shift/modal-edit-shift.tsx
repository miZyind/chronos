import React, { Component } from 'react';
import { Button, Header, Modal, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Actions } from '@actions/main';
import { IStore } from '../../models';
import * as service from '../../services';
import ShiftTable from '@components/shift/table-shift';

type EditWorkerShiftProps = {
    className?: string;
    getStationName: string;
    getStationId: string;
    workerId: string;
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
    public state = { open: false, dimmer: true, closeondocument: false, closeondimmer: false};

    public show = (dimmer: boolean) => () => {
        this.props.main.getShift = {};
        this.getShift();
        this.setState({ dimmer, open: true });
    }
    public close = () => {
        this.setState({ open: false });
    }
    public getShift() {
        this.props.modalfetchBegin();
        service.getShift({
            'year': this.props.main.getSelectShiftYear,
            'month': this.props.main.getSelectShiftMonth,
            'stationid': this.props.getStationId,
            'workerid': this.props.workerId,
        }).then((response: any) => {
            console.log(response);
            this.props.modalfetchGetDataSuccess({ 'data': response });
        }, (error) => {
            this.props.modalfetchFailure(error);
        });
    }
    public add = () => {
        if (this.props.main.getSelectWorker.id === 0) {
            alert('請選擇駐點保全');
        } else {
            this.props.fetchBegin();
            const obj: object = {
                'year': this.props.main.getSelectShiftYear,
                'month': this.props.main.getSelectShiftMonth,
                'stationid': this.props.getStationId,
                'stationname': this.props.getStationName,
                'oldworkerid': this.props.workerId,
                'newworkerid': this.props.main.getSelectWorker.id,
                'workername': this.props.main.getSelectWorker.name,
                'shift': this.props.main.getShift
            };
            this.props.fetchStep('POST', service.postShift(obj));
        }
    }

    public render() {
        const { open, dimmer, closeondocument, closeondimmer } = this.state;
        return (
            <Modal
                closeOnDimmerClick={closeondimmer}
                closeOnDocumentClick={closeondocument}
                dimmer={dimmer ? true : undefined}
                onClose={this.close}
                open={open}
                className={this.props.className}
                style={backdropStyle}
                trigger={<Button onClick={this.show(true)} icon> <Icon name='compose' /></Button>}
            >
                <Modal.Content image scrolling>
                    <Modal.Description>
                        <Header>{formPropos.title}</Header>
                        <ShiftTable
                            className='edit'
                            stationName={this.props.getStationName}
                            stationId={this.props.getStationId}
                            workerId={this.props.workerId}
                        />
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={this.add} >儲存</Button>
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
