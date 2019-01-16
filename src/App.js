import React, { Component } from 'react';
import ReposList from './components/repos-list';

class App extends Component {
  render() {
    return (
      <div className="App" style={{margin: "50px auto"}}>
        <ReposList />
      </div>
    );
  }
}

export default App;
