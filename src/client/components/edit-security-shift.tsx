import React, { Component } from 'react';
import { Button, Header, Modal, Icon } from 'semantic-ui-react'

import EditShiftTable from '@components/edit-shift-table';

type EditSecurityShiftProps = {
    className?: string;
    days: Array<number>;
    month: number;
    year: number;
    getShift: any;
}
const formPropos = {
    title: "編輯班表",
}
const backdropStyle = {
    marginTop: '0px !important',
    marginLeft: '10px',
    marginRight: 'auto',
    backgroundColor: 'rgba(0,0,0,0.3)',
    width:'1200px',
    padding: 20
}
class EditSecurityShift extends Component<EditSecurityShiftProps> {
    state = { open: false, dimmer:true, closeondocument:false,closeondimmer:false}
    show = (dimmer: boolean) => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open: false })
    getCommunity: string = 'AA';
    getSecurityCounts: string = '1';
    add = () => {
        this.setState({ open: false });
    }
    changeCommunity = (event: React.FormEvent<HTMLSelectElement>) => {
        this.getCommunity = event.currentTarget.value;
        console.log(event.currentTarget.value);
    }
    changeSecurityCounts = (event: React.FormEvent<HTMLSelectElement>) => {
        this.getSecurityCounts = event.currentTarget.value;
        console.log(event.currentTarget.value);
    }

    render() {
        const { open, dimmer,closeondocument,closeondimmer } = this.state
        return (
            <Modal
                closeOnDimmerClick={closeondimmer}
                closeOnDocumentClick={closeondocument}
                dimmer={dimmer}
                onClose={this.close}
                open={open}
                className={this.props.className}
                style={backdropStyle}
                trigger={<Button onClick={this.show(true)} icon> <Icon name='compose' /></Button>}>
              <Modal.Content image scrolling>
                  <Modal.Description>
                        <Header>{formPropos.title}</Header>
                        <EditShiftTable
                            communoty={this.props.getShift[0].cc}
                            year={this.props.year}
                            month={this.props.month}
                            days={this.props.days}>
                        </EditShiftTable>
                  </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                  <Button color='black' onClick={this.add} >新增</Button>
                  <Button color='black' onClick={this.close}>取消</Button>
              </Modal.Actions>
            </Modal>
        )
    }
}

export default EditSecurityShift;

