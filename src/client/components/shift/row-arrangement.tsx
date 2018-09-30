import React, { Component } from 'react';

type RowArrangementPropos = {
  className: string;
  getDay: number;
  value: string;
  selCoverWorverEvent: any;
  editShiftEvent: any;
};

class RowArrangement extends Component<RowArrangementPropos> {
  public state = { value: this.props.value};
  constructor(prop: RowArrangementPropos) {
    super(prop);
  }
  public handleChange = (e: any) => {
    const { selCoverWorverEvent, editShiftEvent, getDay} = this.props;
    if (e.currentTarget.value === '休') {
      selCoverWorverEvent('cover', getDay);
    } else {
      editShiftEvent({ 'day': getDay, 'shiftType': e.currentTarget.value });
    }
    this.setState({ value: e.currentTarget.value });
  }
  public enterShiftChange = (e: any) => {
    const { editShiftEvent, getDay } = this.props;
    if (e.shiftKey && (e.currentTarget.value !== '休')) {
      this.setState({ value: e.currentTarget.value });
      editShiftEvent({ 'day': getDay, 'shiftType': e.currentTarget.value });
    }
  }
  public render() {
    return (
      <div className={this.props.className}>
        <table>
          <tbody>
            <tr><td><input type='radio' value='無' checked={this.state.value === '無'} onChange={this.handleChange} onMouseEnter={this.enterShiftChange} />無</td></tr>
            <tr><td><input type='radio' value='日' checked={this.state.value === '日'} onChange={this.handleChange} onMouseEnter={this.enterShiftChange} />日</td></tr>
            <tr><td><input type='radio' value='夜' checked={this.state.value === '夜'} onChange={this.handleChange} onMouseEnter={this.enterShiftChange} />夜</td></tr>
            <tr><td><input type='radio' value='休' checked={this.state.value === '休'} onChange={this.handleChange} onMouseEnter={this.enterShiftChange} />休</td></tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default RowArrangement;
