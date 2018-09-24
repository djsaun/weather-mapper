import React, { Component } from 'react';
import ReactMapboxGl, {Layer, Feature} from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN
});
class Maps extends Component {
  render() {
    let {latitude, longitude, getCoordinates} = this.props;

    return (
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}
        zoom={[2]}
        onClick={getCoordinates}
        >
        <Layer
          type="symbol"
          layout={{ "icon-image": "harbor-15" }}>
          <Feature coordinates={[longitude,latitude]}/>
        </Layer>
      </Map>
    )
  } 
}

export default Maps;
