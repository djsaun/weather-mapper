import React, { Component } from 'react';
import ReactMapboxGl from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN
});
class Maps extends Component {
  render() {
    let {getCoordinates} = this.props;

    return (
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}
        center={[-104.99, 39.75]}
        zoom={[2]}
        onClick={getCoordinates}
        >
      </Map>
    )
  } 
}

export default Maps;
