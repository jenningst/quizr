import React, { Component } from 'react';
import './App.css';
// import Dashboard from './components/Dashboard';
// import EditQuestion from './components/EditQuestion';
import Quiz from './components/Quiz';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Quiz />
      </div>
    );
  }
}

export default App;
