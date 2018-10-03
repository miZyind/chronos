import React, { Component } from 'react';
import { Button, Header, Modal, Form, Icon } from 'semantic-ui-react';
import * as service from '../../services';
import styled from 'styled-components';

type EditFormProps = {
  className?: string;
  editId: string;
  editName: string;
  editMobile: string;
  fetchBeginEvent: any;
  fetchSendSuccessEvent: any;
  fetchFailureEvent: any;
};
const formPropos = {
  title: '修改保全資料',
};

class EditForm extends Component<EditFormProps> {
  public state = {
    open: false,
    dimmer: true,
    closeondocument: false,
    closeondimmer: false,
    sname: this.props.editName,
    smobile: this.props.editMobile,
    sid: this.props.editId,
  };
  public show = (dimmer: boolean) => () => this.setState({ dimmer, open: true });
  public close = () => this.setState({ open: false });

  public fetchWorker() {
    const { sname, smobile, sid } = this.state;
    this.props.fetchBeginEvent();
    const obj: object = { 'name': sname, 'mobile': smobile, 'id': sid };
    service.putWorker(obj)
      .then((response: any) => {
        if (response === 'yes') {
          this.props.fetchSendSuccessEvent();
        }
      }, (error) => {
        this.props.fetchFailureEvent(error);
      });
  }
  public edit = () => {
    this.setState({ open: false });
    this.fetchWorker();
  }
  public change = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  public render() {
    const { open, dimmer, closeondocument, closeondimmer, sname, smobile } = this.state;
    const button = <Button onClick={this.show(true)} icon><Icon name='compose' /></Button>;
    return (
      <Modal
        closeOnDimmerClick={closeondimmer}
        closeOnDocumentClick={closeondocument}
        dimmer={dimmer ? true : undefined}
        onClose={this.close}
        open={open}
        className={this.props.className}
        trigger={button}
      >
        <Modal.Content image scrolling>
          <Modal.Description>
            <Header>{formPropos.title}</Header>
            <Form>
              <Form.Group widths='equal'>
                <Form.Field>
                  <label>保全名稱</label>
                  <input placeholder='請輸入保全名稱' name='sname' value={sname} onChange={this.change} />
                </Form.Field>
                <Form.Field>
                  <label>保全手機</label>
                  <input placeholder='請輸入手機' name='smobile' value={smobile} onChange={this.change} />
                </Form.Field>
              </Form.Group>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={this.edit} >修改</Button>
          <Button color='black' onClick={this.close}>取消</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const StyledEditForm = styled(EditForm) `
  &&&& {
    margin-top: 0px !important;
    margin-left: auto;
    margin-right: auto;
    background-color: rgba(0,0,0,0.3);
    padding: 50px;
  }
`;

export default StyledEditForm;
