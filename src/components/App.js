import React, { Component } from 'react';
import '../css/App.css';
import Map from './Map';

class App extends Component {
  constructor() {
    super();

    this.state = {
      location: {
        latitude: 'blah',
        longitude: '',
        zoom: 2
      }
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="mapContainer">
          <Map {...this.state.location} />
        </div>
      </div>
    );
  }
}

export default App;
