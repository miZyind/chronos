import React, { Component } from 'react';
import { Message, Icon} from 'semantic-ui-react';
type WaitingProps = {
  className?: string;
};

class Waiting extends Component<WaitingProps> {

  public render() {
    return (
      <Message icon>
        <Icon name='circle notched' loading />
        <Message.Content>
          <Message.Header>Loading</Message.Header>
        </Message.Content>
      </Message>
    );
  }
}

export default Waiting;
