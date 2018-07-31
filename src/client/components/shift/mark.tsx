import React, { Component } from 'react';

type markPropos = {
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

class Mark extends Component<markPropos> {
  public state = { black: this.props.status };
  public changeColor(e: any) {
    if (e.shiftKey) {
      this.setState({ black: !this.state.black });
      if (this.state.black) {
        console.log(this.props.markName + '-' + this.props.getDay + '-on');
      } else {
        console.log(this.props.markName + '-' + this.props.getDay + '-off');
      }
    }
  }
  public render() {
    const btnStyle = this.state.black ? whiteMark : blackMark;
    return (
      // tslint:disable-next-line:jsx-no-bind
      <div style={btnStyle} onMouseEnter={this.changeColor.bind(this)} >{this.props.markName}</div>
    );
  }
}

export default Mark;
