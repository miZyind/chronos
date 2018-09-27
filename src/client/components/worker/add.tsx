import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Modal, Form } from 'semantic-ui-react';
import { Actions } from '@actions/main';
import { IFetch } from '../../models/fetch';
import * as service from '../../services';
import styled from 'styled-components';

type AddFormProps = {
  className?: string;
};
const formPropos = {
  title: '新增保全',
};

type FStateProps = IFetch;
type DispatchProps = typeof Actions;
type Props = AddFormProps & FStateProps & DispatchProps;

class AddForm extends Component<Props> {
  public state = {
    open: false,
    dimmer: true,
    closeondocument: false,
    closeondimmer: false,
    sname: '',
    smobile: ''
  };
  public show = (dimmer: boolean) => () => this.setState({ dimmer, open: true });
  public close = () => this.setState({ open: false });

  public fetchWorker() {
    const { sname, smobile } = this.state;
    this.props.fetchBegin();
    const obj: object = { 'name': sname, 'mobile': smobile };
    service.postWorker(obj)
      .then((response: any) => {
        if (response === 'yes') {
          this.props.fetchSendSuccess();
        }
      }, (error) => {
        this.props.fetchFailure(error);
      });
  }
  public add = () => {
    this.setState({ open: false });
    this.fetchWorker();
  }
  public change = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  public render() {
    const { open, dimmer, closeondocument, closeondimmer, sname, smobile } = this.state;
    const button = <Button onClick={this.show(true)}>{formPropos.title}</Button>;
    return (
      <Modal
        closeOnDimmerClick={closeondimmer}
        closeOnDocumentClick={closeondocument}
        dimmer={dimmer}
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
          <Button color='black' onClick={this.add} >新增</Button>
          <Button color='black' onClick={this.close}>取消</Button>
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

export default connect<FStateProps, DispatchProps>(
  (state: any) => state.fetch,
  Actions
)(StyledAddForm);
