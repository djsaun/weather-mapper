import React, { Component } from 'react';
import '../css/App.css';
import Maps from './Map';
import axios from 'axios';

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
    this.getLocationFromCoordinates = this.getLocationFromCoordinates.bind(this);
  }

  // Get location coordinates on map click
  getCoordinates(map, e) {
      this.setState({
        location: {
          latitude: JSON.stringify(e.lngLat.lat),
          longitude: JSON.stringify(e.lngLat.lng)
        }
      });

      // this.getLocationFromCoordinates();
  }

  getLocationFromCoordinates() {
    axios.get(`http://www.mapquestapi.com/geocoding/v1/reverse?key=${process.env.REACT_APP_MAPQUEST_GEOCODE_KEY}&location=${this.state.location.latitude},${this.state.location.longitude}`)
    .then(res => {
      const location = {...res.data.results[0].locations[0]};

      console.log(location);
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
          <Maps {...this.state.location} getCoordinates={this.getCoordinates} />
        </div>
      </div>
    );
  }
}

export default App;
