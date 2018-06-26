import React, { Component } from 'react';

type markButtonPropos = {
  buttonName: string
}

const blackButton = {
  height: "40px",
  backgroundColor: "black",
  color: "white"
}

const whiteButton = {
  height: "40px",
  backgroundColor: "white",
  color: "black"
}

class MarkButton extends Component<markButtonPropos>{
  state = { black: true }
  changeColor(){
      this.setState({black: !this.state.black})
  }
  render(){
    let btnStyle = this.state.black ?  whiteButton : blackButton;
      return (
        <button style={btnStyle} onClick={this.changeColor.bind(this)}>{this.props.buttonName}</button>
      )
  }
}

export default MarkButton;
