import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
class Map extends Component {

  componentDidMount() {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      zoom: this.props.zoom
    });
  }

  render() {
    let {latitude, longitude, getCoordinates} = this.props;
    // console.log(getCoordinates());
    return (
      <div className="map" ref={el => this.mapContainer = el} onClick={() => getCoordinates(this.map)}></div>
    )
  } 
}

export default Map;
