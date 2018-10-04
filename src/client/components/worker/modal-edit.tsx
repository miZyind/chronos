import React, { Component } from 'react';
import { Button, Header, Modal, Form } from 'semantic-ui-react';
import styled from 'styled-components';

type EditFormProps = {
  className?: string;
  editWorkerModalOpen: boolean;
  editWorkerName: string;
  editWorkerMobile: string;
  editWorkerModalSubmitEvent: any;
  editWorkerModalCloseEvent: any;
  editWorkerModalFieldChangeEvent: any;
};
const formPropos = {
  title: '修改保全資料',
  labName: '保全名稱',
  labMobile: '保全手機',
  tipInputName: '請輸入保全名稱',
  tipInputMobile: '請輸入手機',
  btnSubmit: '修改',
  btnClose: '取消'
};

class EditForm extends Component<EditFormProps> {
  public render() {
    const { editWorkerModalOpen, editWorkerName, editWorkerMobile,
            editWorkerModalFieldChangeEvent, editWorkerModalSubmitEvent,
            editWorkerModalCloseEvent
    } = this.props;
    return (
      <Modal
        className={this.props.className}
        open={editWorkerModalOpen}
      >
        <Modal.Content image scrolling>
          <Modal.Description>
            <Header>{formPropos.title}</Header>
            <Form>
              <Form.Group widths='equal'>
                <Form.Field>
                  <label>{formPropos.labName}</label>
                  <input placeholder={formPropos.tipInputName} name='editWorkerName' value={editWorkerName} onChange={editWorkerModalFieldChangeEvent} />
                </Form.Field>
                <Form.Field>
                  <label>{formPropos.labMobile}</label>
                  <input placeholder={formPropos.tipInputMobile}  name='editWorkerMobile' value={editWorkerMobile} onChange={editWorkerModalFieldChangeEvent} />
                </Form.Field>
              </Form.Group>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={editWorkerModalSubmitEvent} >{formPropos.btnSubmit}</Button>
          <Button color='black' onClick={editWorkerModalCloseEvent}>{formPropos.btnClose}</Button>
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
