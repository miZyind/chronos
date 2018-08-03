import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from '@actions/main';
import { IMain } from '../../models/main';

type MarkPropos = {
  markName: string,
  getDay: number
  status: boolean;
};

const blackMark = {
  height: '40px',
  backgroundColor: 'black',
  color: 'white',
  lineHeight: '40px'
};

const whiteMark = {
  height: '40px',
  backgroundColor: 'white',
  color: 'black',
  lineHeight: '40px'
};

type StateProps = IMain;
type DispatchProps = typeof Actions;
type Props = MarkPropos & StateProps & DispatchProps;

class Mark extends Component<Props> {
  public state = { black: this.props.status };
  public enterShiftChange(e: any) {
    if (e.shiftKey) {
      this.changeEvent();
    }
  }
  public changeEvent() {
    this.setState({ black: !this.state.black });
    if (this.state.black) {
      this.props.editshift({ 'day': this.props.getDay, 'shiftType': this.props.markName, 'status': 'on' });
    } else {
      this.props.editshift({ 'day': this.props.getDay, 'shiftType': this.props.markName, 'status': 'off' });
    }
    console.log(this.props.getShift);
  }
  public render() {
    const btnStyle = this.state.black ? whiteMark : blackMark;
    return (
      // tslint:disable-next-line:jsx-no-bind
      <div style={btnStyle} onClick={this.changeEvent.bind(this)} onMouseEnter={this.enterShiftChange.bind(this)} >{this.props.markName}</div>
    );
  }
}

export default connect<StateProps, DispatchProps>(
  (state: any) => state.main,
  Actions
)(Mark);
