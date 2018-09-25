import React, { Component } from 'react';

class Icon extends Component {
  render() {
    const icon = this.props.icon;
    let iconVal;
    // console.log(icon);
    // let iconType;

    const iconTypes = [["clear-day", '<i class="fal fa-sun"></i>'], ["clear-night", '<i class="fal fa-moon"></i>'], ["partly-cloudy-day", 'test'], ["partly-cloudy-night", 'test'], ["cloudy", '<i class="fal fa-cloud"></i>'], ["rain", 'test'], ["sleet", 'test'], ["snow", 'test'], ["wind", 'test'], ["fog", 'test']];

    iconTypes.map(iconType => {
      console.log(iconType[0])
      if (iconType[0] === icon) {
        console.log(icon)
      }
    })

    // if (icon === 'clear-day') {
    //   iconType = '<i class="fal fa-sun"></i>';
    // } else if (icon === 'clear-night') {

    // } else if (icon === 'rain') {

    // } else if (icon === 'snow') {

    // } else if (icon === 'sleet') {
      
    // } else if (icon === 'wind') {
      
    // }

    return (
      <div>
        <i className="wi wi-night-sleet"></i>
      </div>
    )
  }
}

export default Icon;
