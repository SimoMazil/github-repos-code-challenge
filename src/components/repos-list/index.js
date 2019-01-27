import React, { Component } from 'react';
import { Container, Item, Loader } from 'semantic-ui-react'

import Repo from './repo';

import fetchRepos from '../../services/fetchRepos';
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
    const bottomOffset = 100
    
    if (pageOffset > lastItemOffset - bottomOffset) {
      this.loadMoreRepos()
    }
    
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