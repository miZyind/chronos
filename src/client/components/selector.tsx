import React, { Component } from 'react';
import styled from "styled-components";

type SelectorProps = {
  className?: string;
  onChangeEvent?: any;
  options: Array<{ key: string, title: string }>;
  currentSelected: string;
}

class Selector extends Component<SelectorProps> {
  change = (event: React.FormEvent<HTMLSelectElement>) => {
    this.props.onChangeEvent(event.currentTarget.value);
  }
  render() {
    return (
      <select className={this.props.className} onChange={this.change} value={this.props.currentSelected}>
        {this.props.options.map((row, index) =>
          <option key={index} value={row.key} >{row.title}</option >
        )}
      </select>
    )
  }
}

export default styled(Selector) `
  background: transparent;
  color: palevioletred;
  border: 2px solid palevioletred;
  border-radius: 3px;
  padding: 0.25em 1em;
`;
