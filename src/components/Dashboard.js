import React, { Component } from 'react';
import Icon from './Icon';

class Dashboard extends Component {
  render() {
    const {address, weather} = this.props;
    const windBearing = weather.windBearing;
    const icon = weather.icon;


    function convertWindBearingToText(num) {
      const val = Math.floor((num / 22.5) + 0.5);
      const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
      return arr[(val % 16)];
    }

    return(
      <div className="dashboard container">
        {/* <h1>{address.city ? address.city + ',' : ''} {address.state ? address.state : ''}{address.country ? ', ' + address.country : ''}</h1> */}
        {weather.display && 
        <div className="weatherContainer">
          <div className="current">
            <h5>Current Conditions</h5>
            <div className="weatherContent">
              <Icon className="icon" icon={weather.icon} />
              <p className="summary">{weather.summary}</p>
              <p className="currentTemp">{weather.temp}°</p>
              <p className="apparentTemp">Feels like {weather.apparentTemp}°</p>
            </div>
          </div> 

          <div className="today">
            <h5>Today</h5>
            <div className="weatherContent">
              <div className="sunrise">
              
              </div>

              <div className="sunset">
              
              </div>

              <div className="humidity">
              
              </div>

              <div className="uvIndex">
              
              </div>

              <div className="visibility">
              
              </div>
            </div>
          </div>

          <div className="wind">
            <h5>Wind</h5>
            <div className="weatherContent windContent">
              <div className="speed">
                <i className="wi wi-cloudy-windy"></i>
                <p>Speed</p>
                <p>{weather.windSpeed} mph</p>
              </div>
              <div className="gust">
                <i className="wi wi-cloudy-gusts"></i>
                <p>Gust</p>
                <p>{weather.windGust} mph</p>
              </div>
              <div className="direction">
                <i className={"wi wi-wind wi-from-" + convertWindBearingToText(windBearing).toLowerCase()}></i>
                <p>Direction</p>
                <p>{convertWindBearingToText(windBearing)}</p>
              </div>
            </div>
          </div>
        </div>  
        }

      </div>
    )
  }
}

export default Dashboard;
