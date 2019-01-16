import React, { Component } from 'react';
import { Container, Item, Loader } from 'semantic-ui-react'

import Repo from './repo';
import { dateBeforeOneMonth } from '../../utils/getDates'

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
    this.scrollListener = window.addEventListener('scroll', (e) => {
      this.handleScroll()
    })
  }

  handleScroll = () => {
    const { scrolling, results } = this.state
    
    if(scrolling) return
    if(!results) return
    
    const lastItem = document.querySelector('div.items > div.item:last-child')
    const lastItemOffset = lastItem && lastItem.offsetTop + lastItem.clientHeight
    const pageOffset = window.pageYOffset + window.innerHeight
    const bottomOffset = 50
    
    if (pageOffset > lastItemOffset - bottomOffset) {
      this.loadMoreRepos()
    }
    
  }

  loadRepos = async () => {
    const dateQuery = dateBeforeOneMonth()
    const page = this.state.page

    const response = await fetch(`https://api.github.com/search/repositories?q=created:>${dateQuery}&page=${page}&sort=stars&order=desc`)
    const data = await response.json()
    
    if(data.items && data.items.length > 0) {
      this.setState({
        repos: [...this.state.repos, ...data.items],
        results: true,
        scrolling: false,
        loading: false
      })
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
      </Container>
    );
  }
}
 
export default ReposList;