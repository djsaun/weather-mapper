import React, { Component } from 'react';
import '../css/App.css';
import Map from './Map';

class App extends Component {
  constructor() {
    super();

    this.state = {
      location: {
        latitude: '',
        longitude: '',
        zoom: 2
      }
    }

    this.getCoordinates = this.getCoordinates.bind(this);
  }

  // Get location coordinates on map click
  getCoordinates(map, e) {
    map.on('click', e => {
      this.setState({
        location: {
          latitude: JSON.stringify(e.lngLat.lat),
          longitude: JSON.stringify(e.lngLat.lng)
        }
      });
    })
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
          <Map {...this.state.location} getCoordinates={this.getCoordinates} />
        </div>
      </div>
    );
  }
}

export default App;
