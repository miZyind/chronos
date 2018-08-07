import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Actions } from '@actions/main';
import { IStore } from '../../models';
import { Button, Header, Modal, Form } from 'semantic-ui-react';

type ShifWorkArrangementPropos = {
  className: string;
  getDay: number;
  value: string;
};
const backdropStyle = {
  marginTop: '0px !important',
  margin: 'auto',
  backgroundColor: 'rgba(0,0,0,0.3)',
  padding: 50
};
const formPropos = {
  title: '選擇代班人員',
  titleBtn: '代班',
  selectCover: '代班人員',
};

type StateProps = IStore;
type DispatchProps = typeof Actions;
type Props = ShifWorkArrangementPropos & StateProps & DispatchProps;

class ShifWorkArrangement extends Component<Props> {
  public state = { value: this.props.value, open: false, dimmer: true, closeondocument: false, closeondimmer: false };
  public getCover = {};
  constructor(prop: Props) {
    super(prop);
    this.getWorkrtOptions();
  }
  public getWorkrtOptions() {
    const { workerEditShiftItems } = this.props.fetch;
    this.getCover = { 'day': this.props.getDay, 'shiftType': '休', 'status': 'on', 'id': Object.keys(workerEditShiftItems)[0], 'name': workerEditShiftItems[Object.keys(workerEditShiftItems)[0]].name };
  }
  public show = (dimmer: boolean) => () => this.setState({ dimmer, open: true });
  public close = () => {
    this.setState({ open: false });
  }
  public add = () => {
    this.setState({ open: false });
    this.setState({ value: '休' });
    this.props.editshift(this.getCover);
  }
  public changeCover = (event: React.FormEvent<HTMLSelectElement>) => {
    const { workerEditShiftItems } = this.props.fetch;
    this.getCover = { 'day': this.props.getDay, 'shiftType': '休', 'status': 'on', 'id': event.currentTarget.value, 'name': workerEditShiftItems[event.currentTarget.value].name };
  }
  public handleChange = (e: any) => {
    if (e.currentTarget.value === '休') {
      this.setState({ open: true });
    } else {
      this.setState({ value: e.currentTarget.value });
      if (e.currentTarget.value === '無') {
        this.props.editshift({ 'day': this.props.getDay, 'shiftType': e.currentTarget.value, 'status': 'off' });
      } else {
        this.props.editshift({ 'day': this.props.getDay, 'shiftType': e.currentTarget.value, 'status': 'on' });
      }
    }
  }
  public enterShiftChange = (e: any) => {
    if (e.shiftKey && (e.currentTarget.value !== '休')) {
      this.setState({ value: e.currentTarget.value });
      if (e.currentTarget.value === '無') {
        this.props.editshift({ 'day': this.props.getDay, 'shiftType': e.currentTarget.value, 'status': 'off' });
      } else {
        this.props.editshift({ 'day': this.props.getDay, 'shiftType': e.currentTarget.value, 'status': 'on' });
      }
    }
  }
  public render() {
    const { open, dimmer, closeondocument, closeondimmer } = this.state;
    const { workerEditShiftItems } = this.props.fetch;
    return (
      <div className={this.props.className}>
        <table className='table'>
          <tbody>
            <tr><td><input type='radio' value='無' checked={this.state.value === '無'} onChange={this.handleChange} onMouseEnter={this.enterShiftChange} />無</td></tr>
            <tr><td ><input className='day' type='radio' value='日' checked={this.state.value === '日'} onChange={this.handleChange} onMouseEnter={this.enterShiftChange} />日</td></tr>
            <tr><td><input type='radio' value='夜' checked={this.state.value === '夜'} onChange={this.handleChange} onMouseEnter={this.enterShiftChange} />夜</td></tr>
            <tr><td><input type='radio' value='休' checked={this.state.value === '休'} onChange={this.handleChange} onMouseEnter={this.enterShiftChange} />休</td></tr>
          </tbody>
        </table>
        <Modal
          closeOnDimmerClick={closeondimmer}
          closeOnDocumentClick={closeondocument}
          dimmer={dimmer}
          onClose={this.close}
          open={open}
          className={this.props.className}
          style={backdropStyle}
        >
          <Modal.Content image scrolling>
            <Modal.Description>
              <Header>{formPropos.title}</Header>
              <Form>
                <Form.Group widths='equal'>
                  <Form.Field label={formPropos.selectCover} control='select' onChange={this.changeCover} >
                    {Object.keys(workerEditShiftItems).map((id: any) => <option key={id} value={id} > {workerEditShiftItems[id].name}</option >)}
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
      </div>
    );
  }
}
const ShifWorkArrangementStyles = styled(ShifWorkArrangement) `

`;
export default connect<StateProps, DispatchProps>(
  (state: any) => state,
  Actions
)(ShifWorkArrangementStyles);
