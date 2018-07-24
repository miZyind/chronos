import React, { Component } from 'react';
import { Button, Header, Modal, Form } from 'semantic-ui-react';
import myImg from '../assets/images/paragraph.png';

type ModalFormProps = {
    className?: string;
    titleName?: string;
};
const backdropStyle = {
    marginTop: '0px !important',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 50
};
class ModalForm extends Component<ModalFormProps> {
    public state = { open: false, dimmer: true, closeondocument: false, closeondimmer: false };
    public show = (dimmer: boolean) => () => this.setState({ dimmer, open: true });
    public close = () => this.setState({ open: false });
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
                trigger={<Button onClick={this.show(true)}>{this.props.titleName}</Button>}
            >
                <Modal.Content image scrolling>
                    <Modal.Description>
                        <Header>{this.props.titleName}</Header>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Field label='An HTML <input>' control='input' />
                                <Form.Field label='An HTML <select>' control='select'>
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                </Form.Field>
                            </Form.Group>
                            <Form.Group grouped>
                                <label>HTML radios</label>
                                <Form.Field label='This one' control='input' type='radio' name='htmlRadios' />
                                <Form.Field label='That one' control='input' type='radio' name='htmlRadios' />
                            </Form.Group>
                            <Form.Group grouped>
                                <label>HTML checkboxes</label>
                                <Form.Field label='This one' control='input' type='checkbox' />
                                <Form.Field label='That one' control='input' type='checkbox' />
                            </Form.Group>
                            <Form.Field label='An HTML <textarea>' control='textarea' rows='3' />
                            <Form.Field label='An HTML <button>' control='button'>
                                HTML Button
                            </Form.Field>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={this.close}>取消新增</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default ModalForm;
