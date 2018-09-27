// Node module
import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Image } from 'semantic-ui-react';
// Component
import MainTabs from '@components/main-tabs';
// Action
import { Actions } from '@actions/main';
// Model
import { IStore } from '../models';
import { IMain } from '../models/main';

type StateProps = IMain;
type DispatchProps = typeof Actions;
type OwnProps = {
  name: string;
  version: string;
  className?: string;
};

class App extends React.Component<StateProps & DispatchProps & OwnProps> {

  public render() {
    const {
      // StateProps
      getSelectArea,
      // DispatchProps
      selectarea,
      // OwnProps
      name, version, className
    } = this.props;
    return (
      <Container className={className}>
        <Header as='h1' icon textAlign='center'>
          <Image centered size='large' src='/favicon.ico' />
          <Header.Content>{`${name} v${version}`}</Header.Content>
        </Header>
        <MainTabs
          selectArea={getSelectArea}
          onChangeAreaEvent={selectarea}
        />
      </Container>
    );
  }
}

export default connect<StateProps, DispatchProps, OwnProps, IStore>(
  (state) => state.main,
  Actions
)(App);
