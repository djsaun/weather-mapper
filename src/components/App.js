import React, { Component } from 'react';
import '../css/App.css';
import Maps from './Map';
import Dashboard from './Dashboard';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      location: {
        latitude: '',
        longitude: ''
      },
      address: {
        street: '',
        city: '',
        county: '',
        state: '',
        zip: '' ,
        error: null
      },
      weather: {
        // Feels like temp
        apparentTemp: '',
        // Actual temp
        temp: '',
        // The daytime high temperature
        tempHigh: '',
        // The overnight low temperature
        tempLow: '',
        // Relative humidity
        humidity: '',
        // A machine-readable text summary of this data point, suitable for selecting an icon for display
        icon: '',
        // Probability of precipitation occurring, between 0 and 1
        precipProbability: '',
        // Type of precipitation occuring currently
        precipType: '',
        // A human-readable text summary of this data point
        summary: '',
        // The UNIX time of when the sun will rise during a given day
        sunriseTime: '',
        // The UNIX time of when the sun will set during a given day
        sunsetTime: '',
        // The UNIX time at which this data point begins
        time: '',
        // The wind gust speed in miles per hour
        windGust: '',
        // The wind speed in miles per hour.
        windSpeed: '',
        units: 'imperial',
        error: null
      }
    }

    this.getCoordinates = this.getCoordinates.bind(this);
    this.getWeatherFromCoordinates = this.getWeatherFromCoordinates.bind(this);
    this.getLocationFromCoordinates = this.getLocationFromCoordinates.bind(this);
  }

  // Get location coordinates on map click
  getCoordinates(map, e) {
      this.setState({
        location: {
          ...this.state.location,
          latitude: JSON.stringify(e.lngLat.lat),
          longitude: JSON.stringify(e.lngLat.lng)
        }
      });

      map.flyTo({center: [this.state.location.longitude, this.state.location.latitude]})

      this.getWeatherFromCoordinates();
      this.getLocationFromCoordinates();
  }


  getLocationFromCoordinates() {
    axios.get(`http://www.mapquestapi.com/geocoding/v1/reverse?key=${process.env.REACT_APP_MAPQUEST_GEOCODE_KEY}&location=${this.state.location.latitude},${this.state.location.longitude}`)
    .then(res => {
      const location = {...res.data.results[0].locations[0]};

      this.setState({
        address: {
          ...this.state.address,
          street: location.street,
          city: location.adminArea5,
          county: location.adminArea4,
          state: location.adminArea3,
          zip: location.postalCode
        }
      })
    })
    .catch(error => {
      this.setState({
        address: {
          ...this.state.address,
          error
        }
      })
    })
  }

  getWeatherFromCoordinates() {
    axios.get(`https://api.darksky.net/forecast/${process.env.REACT_APP_DARKSKY_KEY}/${this.state.location.latitude},${this.state.location.longitude}`)
    .then(res => {
      const currentWeather = res.data;

      console.log(currentWeather);

      this.setState({
        weather: {
          ...this.state.weather,
          apparentTemp: currentWeather.currently.apparentTemperature,
          temp: currentWeather.currently.temperature,
          tempHigh: currentWeather.daily.data[0].temperatureHigh,
          tempLow: currentWeather.daily.data[0].temperatureLow,
          humidity: currentWeather.currently.humidity,
          icon: currentWeather.currently.icon,
          precipProbability: currentWeather.currently.precipProbability,
          precipType: currentWeather.currently.precipType,
          summary: currentWeather.currently.summary,
          sunriseTime: currentWeather.daily.data[0].sunriseTime,
          sunsetTime: currentWeather.daily.data[0].sunsetTime,
          time: currentWeather.currently.time,
          windGust: currentWeather.currently.windGust,
          windSpeed: currentWeather.currently.windSpeed,
        }
      })
    })
    .catch(error => {
      this.setState({
        weather: {
          ...this.state.weather,
          error
        }
      })
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Dashboard address={this.state.address} weather={this.state.weather} />
        <div className="mapContainer">
          <Maps {...this.state.location} getCoordinates={this.getCoordinates} />
        </div>
      </div>
    );
  }
}

export default App;
