import React, { Component } from 'react';
import { Container, Item } from 'semantic-ui-react'

import Repo from './repo';

class ReposList extends Component {
  state = {  }
  render() { 
    return (
      <Container>
        <Item.Group divided>
          <Repo />
          <Repo />
        </Item.Group>
      </Container>
    );
  }
}
 
export default ReposList;