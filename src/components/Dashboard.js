import React, { Component } from 'react';
import Icon from './Icon';
import {format} from 'date-fns';
import {Doughnut} from 'react-chartjs-2';
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

    function convertUnixToDate(timestamp) {
      return new Date(timestamp * 1000);
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
            <div className="weatherContent todayDetails">
              <div className="sunrise">
                <p className="label">Sunrise</p>
                <i className="wi wi-sunrise"></i>
                <p>{format(convertUnixToDate(weather.sunriseTime), 'h:mma')}</p>
              </div>

              <div className="sunset">
                <p className="label">Sunset</p>
                <i className="wi wi-sunset"></i>
                <p>{format(convertUnixToDate(weather.sunsetTime), 'h:mma')}</p>
              </div>

              <div className="humidity">
                <p>Humidity</p>
                <p>{parseInt(weather.humidity * 100, 10)}%</p>
                <Doughnut data={
                  {datasets: [{
                    data: [parseInt(weather.humidity * 100, 10), (100 - parseInt(weather.humidity * 100, 10))],
                    backgroundColor: ['red', 'rgba(33, 145, 81, 0.2)']
                  }]}
                }
                options={{
                  tooltips: {
                    enabled: false
                  },
                  hover: {
                    mode: null
                  },
                  elements: {
                    arc: {
                      borderWidth: 0
                    }
                  }
                }}  />
              </div>

              <div className="uvIndex">
                <p>UV</p>
              </div>

              <div className="visibility">
                <p>Visibility</p>
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
