import React, { Component } from 'react';
import Icon from './Icon';
import {format} from 'date-fns';
import {Chart, Doughnut} from 'react-chartjs-2';
class Dashboard extends Component {
  render() {

    // Add Chart.js plugin to add text to the center of a doughnut chart
    Chart.pluginService.register({
      beforeDraw: function (chart) {
        if (chart.config.options.elements.center) {
          //Get ctx from string
          var ctx = chart.chart.ctx;

          //Get options from the center object in options
          var centerConfig = chart.config.options.elements.center;
          var fontStyle = centerConfig.fontStyle || 'Arial';
          var txt = centerConfig.text;
          var color = centerConfig.color || '#000';
          var maxFontSize = centerConfig.maxFontSize || 25;
          var sidePadding = centerConfig.sidePadding || 20;
          var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
          //Start with a base font of 30px
          ctx.font = "30px " + fontStyle;

          //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
          var stringWidth = ctx.measureText(txt).width;
          var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

          // Find out how much the font can grow in width.
          var widthRatio = elementWidth / stringWidth;
          var newFontSize = Math.floor(30 * widthRatio);
          var elementHeight = (chart.innerRadius * 2);

          // Pick a new font size so it will not be larger than the height of label.
          var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);

          //Set font settings to draw it correctly.
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
          var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
          ctx.font = fontSizeToUse+"px " + fontStyle;
          ctx.fillStyle = color;

          //Draw text in center
          ctx.fillText(txt, centerX, centerY);
        }
      }
    });

    const {weather} = this.props;
    const windBearing = weather.windBearing;

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
                <Doughnut data={
                  {datasets: [{
                    data: [parseInt(weather.humidity * 100, 10), (100 - parseInt(weather.humidity * 100, 10))],
                    backgroundColor: ['#848FA5', 'rgba(45, 45, 42, 0.2)']
                  }]}
                }
                options={{
                  cutoutPercentage: 80,
                  tooltips: {
                    enabled: false
                  },
                  hover: {
                    mode: null
                  },
                  elements: {
                    arc: {
                      borderWidth: 0
                    },
                    center: {
                      text: parseInt(weather.humidity * 100, 10) + '%',
                      maxFontSize: 12,
                      color: '#2D2D2A', // Default is #000000
                      fontStyle: 'Arial', // Default is Arial
                      sidePadding: 20 // Defualt is 20 (as a percentage)
                    }
                  }
                }}  />
              </div>

              <div className="uvIndex">
                <p>UV</p>
                <Doughnut data={
                  {datasets: [{
                    data: [weather.uvIndex, (10 - weather.uvIndex)],
                    backgroundColor: ['#848FA5', 'rgba(45, 45, 42, 0.2)']
                  }]}
                }
                options={{
                  cutoutPercentage: 80,
                  tooltips: {
                    enabled: false
                  },
                  hover: {
                    mode: null
                  },
                  elements: {
                    arc: {
                      borderWidth: 0
                    },
                    center: {
                      text: weather.uvIndex,
                      maxFontSize: 16,
                      color: '#2D2D2A', // Default is #000000
                      fontStyle: 'Arial', // Default is Arial
                      sidePadding: 20 // Defualt is 20 (as a percentage)
                    }
                  }
                }}  />
              </div>

              <div className="visibility">
                <p>Visibility</p>
                <Doughnut data={
                  {datasets: [{
                    data: [weather.visibility, (10 - weather.visibility)],
                    backgroundColor: ['#848FA5', 'rgba(45, 45, 42, 0.2)']
                  }]}
                }
                options={{
                  cutoutPercentage: 80,
                  tooltips: {
                    enabled: false
                  },
                  hover: {
                    mode: null
                  },
                  elements: {
                    arc: {
                      borderWidth: 0
                    },
                    center: {
                      text: weather.visibility + ' mi',
                      maxFontSize: 16,
                      color: '#2D2D2A', // Default is #000000
                      fontStyle: 'Arial', // Default is Arial
                      sidePadding: 20 // Defualt is 20 (as a percentage)
                    }
                  }
                }}  />
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
