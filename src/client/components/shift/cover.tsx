import React, { Component } from 'react';
import { Button, Header, Modal, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { Actions } from '@actions/main';
import { IStore } from '../../models';

type SelectCoverProps = {
  className?: string;
  getDay: string;
};
const formPropos = {
  title: '選擇代班人員',
  titleBtn: '代班',
  selectCover: '代班人員',
};
const backdropStyle = {
  marginTop: '0px !important',
  margin: 'auto',
  backgroundColor: 'rgba(0,0,0,0.3)',
  padding: 50
};
const buttonStyle = {
  padding: '0px',
  marginRight: '0px'
};
const optionWorks = {
  '107' : { 'name': '張大名'},
  '108': { 'name': '諸葛張葛張'},
};
let getItems: {
  [index: string]: {
    name: string
  }
} = optionWorks;

type StateProps = IStore;
type DispatchProps = typeof Actions;
type Props = SelectCoverProps & StateProps & DispatchProps;

class SelectCover extends Component<Props> {
  public state = { open: false, dimmer: true, closeondocument: false, closeondimmer: false};
  public getCover = {};
  constructor(prop: Props) {
    super(prop);
    this.getWorkrtOptions();
  }
  public getWorkrtOptions() {
    const { workerEditShiftItems } = this.props.fetch;
    getItems = workerEditShiftItems;
    this.getCover = { 'day': this.props.getDay, 'shiftType': '休', 'status': 'on', 'id': Object.keys(getItems)[0], 'name': getItems[Object.keys(getItems)[0]].name };
  }
  public show = (dimmer: boolean) => () => this.setState({ dimmer, open: true });
  public close = () => this.setState({ open: false });
  public add = () => {
    this.setState({ open: false });
    this.props.editshift(this.getCover);
  }
  public changeCover = (event: React.FormEvent<HTMLSelectElement>) => {
    this.getCover = { 'day': this.props.getDay, 'shiftType': '休', 'status': 'on', 'id': event.currentTarget.value, 'name': getItems[event.currentTarget.value].name };
  }

  public render() {
    const { open, dimmer, closeondocument, closeondimmer } = this.state;
    const button = <Button style={buttonStyle} onClick={this.show(true)}>{formPropos.titleBtn}</Button>;
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
                <Form.Field label={formPropos.selectCover} control='select' onChange={this.changeCover} >
                  {Object.keys(getItems).map((id: any) => <option key={id} value={id} > {getItems[id].name}</option >)}
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

export default connect<StateProps, DispatchProps>(
  (state: any) => state,
  Actions
)(SelectCover);
