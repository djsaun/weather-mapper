import React, { Component } from 'react';

class Icon extends Component {
  render() {
    const icon = this.props.icon;
    let iconVal;

    // TODO: Add fallback if no icon type present

    // Associate Dark Sky icons (index 0) with weather icons (index 1)
    const iconTypes = [
      ["clear-day", 'day-sunny'],
      ["clear-night", 'night-clear'],
      ["partly-cloudy-day", 'day-cloudy'],
      ["partly-cloudy-night", 'night-alt-cloudy'],
      ["cloudy", 'cloudy'],
      ["rain", 'rain'],
      ["sleet", 'sleet'],
      ["snow", 'snow-wind'],
      ["wind", 'windy'],
      ["fog", 'fog']
    ];

    // Loop through iconTypes and set the iconVal value to the appropriate icon
    iconTypes.map(iconType => {
      if (iconType[0] === icon) {
        iconVal = iconType[1];
      }

      return iconVal;
    })

    return (
      <div>
        <i className={"wi wi-" + iconVal}></i>
      </div>
    )
  }
}

export default Icon;
