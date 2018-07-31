import React, { Component } from 'react';
import { Button, Header, Modal, Icon } from 'semantic-ui-react';

import EditShiftTable from '@components/shift/edit-shift-table';

type EditSecurityShiftProps = {
    className?: string;
    getStationName: string;
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
class EditSecurityShift extends Component<EditSecurityShiftProps> {
    public state = { open: false, dimmer: true, closeondocument: false, closeondimmer: false };
    public getCommunity: string = 'AA';
    public getSecurityCounts: string = '1';
    public show = (dimmer: boolean) => () => this.setState({ dimmer, open: true });
    public close = () => this.setState({ open: false });

    public add = () => {
        this.setState({ open: false });
    }
    public changeCommunity = (event: React.FormEvent<HTMLSelectElement>) => {
        this.getCommunity = event.currentTarget.value;
        console.log(event.currentTarget.value);
    }
    public changeSecurityCounts = (event: React.FormEvent<HTMLSelectElement>) => {
        this.getSecurityCounts = event.currentTarget.value;
        console.log(event.currentTarget.value);
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
                            station={this.props.getStationName}
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

export default EditSecurityShift;
