import React, { Component } from 'react';
import { Button, Header, Modal, Form } from 'semantic-ui-react';
import styled from 'styled-components';

type AddFormProps = {
  className?: string;
  addWorkerModalOpen: boolean;
  addWorkerName: string;
  addWorkerMobile: string;
  addWorkerModalOpenEven: any;
  addWorkerModalFieldChangeEvent: any;
  addWorkerModalSubmitEvent: any;
  addWorkerModalCloseEvent: any;
};
const formPropos = {
  title: '新增保全',
  labName: '保全名稱',
  labMobile: '保全手機',
  tipInputName: '請輸入保全名稱',
  tipInputMobile: '請輸入手機',
  btnSubmit: '新增',
  btnClose: '取消'
};

class AddForm extends Component<AddFormProps> {
  public render() {
    const { addWorkerModalOpen, addWorkerName, addWorkerMobile,
            addWorkerModalFieldChangeEvent, addWorkerModalSubmitEvent,
            addWorkerModalCloseEvent, addWorkerModalOpenEven
    } = this.props;
    const button = <Button onClick={addWorkerModalOpenEven}>{formPropos.title}</Button>;
    return (
      <Modal
        className={this.props.className}
        open={addWorkerModalOpen}
        trigger={button}
      >
        <Modal.Content image scrolling>
          <Modal.Description>
            <Header>{formPropos.title}</Header>
            <Form>
              <Form.Group widths='equal'>
                <Form.Field>
                  <label>{formPropos.labName}</label>
                  <input placeholder={formPropos.tipInputName} name='addWorkerName' value={addWorkerName} onChange={addWorkerModalFieldChangeEvent} />
                </Form.Field>
                <Form.Field>
                  <label>{formPropos.labMobile}</label>
                  <input placeholder={formPropos.tipInputMobile} name='addWorkerMobile' value={addWorkerMobile} onChange={addWorkerModalFieldChangeEvent} />
                </Form.Field>
              </Form.Group>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={addWorkerModalSubmitEvent}>{formPropos.btnSubmit}</Button>
          <Button color='black' onClick={addWorkerModalCloseEvent}>{formPropos.btnClose}</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const StyledAddForm = styled(AddForm) `
  &&&& {
    margin-top: 0px !important;
    margin-left: auto;
    margin-right: auto;
    background-color: rgba(0,0,0,0.3);
    padding: 50px;
  }
`;

export default StyledAddForm;
