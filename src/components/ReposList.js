import React, { Component } from 'react';
import { Container, Item, Loader } from 'semantic-ui-react'

import Repo from './Repo';

import fetchRepos from '../services/fetchRepos';
import { dateBeforeOneMonth } from '../utils/getDates'

class ReposList extends Component {
  state = {
    repos: [],
    page: 1,
    results: false,
    scrolling: false,
    loading: true
  }

  componentWillMount() {
    this.loadRepos()
  }

  scrollObserver() {
    const observe = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.intersectionRatio > 0) {
          this.loadMoreRepos()
        }
      })
    })
    observe.observe(document.querySelector('div.end-of-page'))
  }

  loadRepos = async () => {
    const dateQuery = dateBeforeOneMonth()
    const page = this.state.page

    const items = await fetchRepos(dateQuery, page)
    
    if(items && items.length > 0) {
      this.setState({
        repos: [...this.state.repos, ...items],
        results: true,
        scrolling: false,
        loading: false
      })
      this.scrollObserver()
    } else {
      this.setState({
        results: false,
        scrolling: false,
        loading: false
      })
    }
  }

  loadMoreRepos = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      scrolling: true,
      loading: true
    }), this.loadRepos)
  }

  render() {
    const { repos, loading } = this.state 
    return (
      <Container>
        <Item.Group divided>
          {
            repos.map(repo => <Repo key={repo.id} details={repo}/>)
          }
        </Item.Group>
        {
          loading && <Loader active inline='centered' />
        }
        <div className="end-of-page"></div>
      </Container>
    );
  }
}
 
export default ReposList;