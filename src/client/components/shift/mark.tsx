import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Actions } from '@actions/main';
import { IMain } from '../../models/main';

type MarkPropos = {
  className: string;
  markName: string;
  getDay: number;
  status: boolean;
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
  }
  public render() {
    const btnStyle = this.state.black ? 'white-mark' : 'black-mark';
    return (
      // tslint:disable-next-line:jsx-no-bind
      <div className={this.props.className}><div className={btnStyle} onClick={this.changeEvent.bind(this)} onMouseEnter={this.enterShiftChange.bind(this)} >{this.props.markName}</div></div>
    );
  }
}
const MarkStyles = styled(Mark) `
    .black-mark{
      height: 40px;
      background-color: black;
      color: white;
      line-height: 40px;
    }
    .white-mark{
      height: 40px;
      background-color: white;
      color: black;
      line-height: 40px;
    }
`;
export default connect<StateProps, DispatchProps>(
  (state: any) => state.main,
  Actions
)(MarkStyles);
