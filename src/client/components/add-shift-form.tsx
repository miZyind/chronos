import React, { Component } from 'react';
import { Button, Header, Modal, Form } from 'semantic-ui-react'

type AddShiftFormProps = {
    className?: string;
    addShiftClick?: any;
    getShift: string;
};

const formPropos = {
    title: "新增班表",
    selectCommunity: "選擇社區",
    selectSecurityCounts: "選擇人數",
}

const backdropStyle = {
    marginTop: '0px !important',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 50
};
class AddShift extends Component<AddShiftFormProps> {
    state = { open: false, dimmer:true, closeondocument:false,closeondimmer:false}
    show = (dimmer: boolean) => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open: false })
    add = () => {
        this.setState({ open: false });
        this.props.addShiftClick("aa",1);
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
                trigger={<Button onClick={this.show(true)}>{formPropos.title}</Button>}
            >
                <Modal.Content image scrolling>
                    <Modal.Description>
                        <Header>{formPropos.title}</Header>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Field label={formPropos.selectCommunity} control='select'>
                                    <option value='A'>AA社區</option>
                                    <option value='B'>BB社區</option>
                                </Form.Field>
                                <Form.Field label={formPropos.selectSecurityCounts} control='select'>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5</option>
                                </Form.Field>
                            </Form.Group>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={this.add}>確定新增</Button>  
                    <Button color='black' onClick={this.close}>取消新增</Button>  
                </Modal.Actions>
            </Modal>
        );
    }
}

export default AddShift;

