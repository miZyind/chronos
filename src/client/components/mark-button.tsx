import React, { Component } from 'react';

type markButtonPropos = {
  buttonName: string
};

const blackButton = {
  height: '40px',
  backgroundColor: 'black',
  color: 'white'
};

const whiteButton = {
  height: '40px',
  backgroundColor: 'white',
  color: 'black'
};

class MarkButton extends Component<markButtonPropos> {
  public state = { black: true };
  public changeColor() {
    this.setState({ black: !this.state.black });
  }
  public render() {
    const btnStyle = this.state.black ?  whiteButton : blackButton;
    return (
      // tslint:disable-next-line:jsx-no-bind
      <button style={btnStyle} onClick={this.changeColor.bind(this)}>{this.props.buttonName}</button>
    );
  }
}

export default MarkButton;
