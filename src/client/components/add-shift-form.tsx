import React, { Component } from 'react';
import { Button, Header, Modal, Form } from 'semantic-ui-react';

type AddShiftFormProps = {
    className?: string;
    addShiftClick?: any;
    getShift: any;
};
const formPropos = {
    title: '新增班表',
    selectCommunity: '選擇駐點',
    selectSecurityCounts: '選擇人數',
};
const backdropStyle = {
    marginTop: '0px !important',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 50
};
class AddShift extends Component<AddShiftFormProps> {
    public state = { open: false, dimmer: true, closeondocument: false, closeondimmer: false };
    public getCommunity = 'AA';
    public getSecurityCounts = '1';
    public show = (dimmer: boolean) => () => this.setState({ dimmer, open: true });
    public close = () => this.setState({ open: false });

    public add = () => {
        this.setState({ open: false });
        this.props.addShiftClick(this.getCommunity, this.getSecurityCounts);
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
        const button = <Button onClick={this.show(true)}>{formPropos.title}</Button>;
        return (
            <Modal
                closeOnDimmerClick={closeondimmer}
                closeOnDocumentClick={closeondocument}
                dimmer={dimmer}
                onClose={this.close}
                open={open}
                className={this.props.className}
                style={backdropStyle}
                trigger={button}
            >
                <Modal.Content image scrolling>
                    <Modal.Description>
                        <Header>{formPropos.title}</Header>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Field label={formPropos.selectCommunity} control='select' onChange={this.changeCommunity} >
                                    <option value='AA'>AA</option>
                                    <option value='BB'>BB</option>
                                </Form.Field>
                                <Form.Field label={formPropos.selectSecurityCounts} control='select' onChange={this.changeSecurityCounts}>
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
                    <Button color='black' onClick={this.add} >新增</Button>
                    <Button color='black' onClick={this.close}>取消</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default AddShift;
