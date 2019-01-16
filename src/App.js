import React, { Component } from 'react';
import ReposList from './components/repos-list';

class App extends Component {
  render() {
    return (
      <div className="App" style={{marginTop: 50}}>
        <ReposList />
      </div>
    );
  }
}

export default App;
