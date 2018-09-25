import React, { Component } from 'react';

class Dashboard extends Component {
  render() {
    let {address, weather} = this.props;
    const windBearing = weather.windBearing;
    console.log(windBearing)

    function convertWindBearingToText(num) {
      const val = Math.floor((num / 22.5) + 0.5);
      const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
      return arr[(val % 16)];
    }

    return(
      <div>
        <h3>{address.city ? address.city + ',' : ''} {address.state ? address.state : ''}{address.country ? ', ' + address.country : ''}</h3>
        {weather.display && 
        <div className="weatherContainer">
          <div className="current">
            <h5>Current Conditions</h5>
            <p>{weather.summary}</p>
            <p>{weather.temp}°</p>
            <p>{weather.apparentTemp}°</p>
          </div>

          <div className="wind">
            <h5>Wind</h5>
            <div className="speed">
              <p>Speed</p>
              <p>{weather.windSpeed} mph</p>
            </div>
            <div className="gust">
              <p>Gust</p>
              <p>{weather.windGust} mph</p>
            </div>
            <div className="direction">
              <p>Direction</p>
              <p>{convertWindBearingToText(windBearing)}</p>
            </div>
          </div>
        </div>  
        }

      </div>
    )
  }
}

export default Dashboard;
