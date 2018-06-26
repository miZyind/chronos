import React, { Component } from 'react';
import { Button, Header, Modal, Form } from 'semantic-ui-react'

type AddShiftFormProps = {
    className?: string;
}
const formPropos = {
    title: "新增保全",
}
const backdropStyle = {
    marginTop: '0px !important',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 50
}
class AddShift extends Component<AddShiftFormProps> {
    state = { open: false, dimmer:true, closeondocument:false,closeondimmer:false}
    show = (dimmer: boolean) => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open: false })

    add = () => {
        this.setState({ open: false });
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
                trigger={<Button onClick={this.show(true)}>{formPropos.title}</Button>}>
                <Modal.Content image scrolling>
                    <Modal.Description>
                        <Header>{formPropos.title}</Header>
                        <Form>
                            <Form.Group widths='equal'>
                              <Form.Field>
                                <label>保全名稱</label>
                                    <input placeholder='請輸入保全名稱' />
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
        )
    }
}

export default AddShift;

