import React, { Component } from 'react';
import { Container, Item } from 'semantic-ui-react'

import Repo from './repo';
import { dateBeforeOneMonth } from '../../utils/getDates'

class ReposList extends Component {
  state = {
    repos: []
  }

  componentWillMount() {
    this.loadRepos()
  }

  loadRepos = async () => {
    const dateQuery = dateBeforeOneMonth()
    const response = await fetch(`https://api.github.com/search/repositories?q=created:>${dateQuery}&sort=stars&order=desc`)
    const data = await response.json()
    this.setState({
      repos: data.items
    })
  }

  render() {
    const { repos } = this.state 
    return (
      <Container>
        <Item.Group divided>
          {
            repos && repos.map(repo => <Repo key={repo.id} details={repo}/>)
          }
        </Item.Group>
      </Container>
    );
  }
}
 
export default ReposList;