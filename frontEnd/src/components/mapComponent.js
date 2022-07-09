import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';
import '../css/mapDiv.css';
import 'map-icons/dist/css/map-icons.css';

const mapStyles = {
  width: '100%',
  height: '500px',
  position: 'sticky'
};


export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    activeMarker: {},          // Shows the active marker upon click
    selectedPlace: {},          // Shows the InfoWindow to the selected place upon a marker
    dataCity: [],
    data: ''
  };
  componentDidMount(){
  // fetch("http://localhost:5000/")
  //   .then(res => res.json())
  //   .then(data=>{
  //       console.log("data",data)
  //   })
  //   .catch(() => {
  //     alert('failed to fetch');
  //   });
  this.timerID = setInterval(
    () => this.tick(),
    2000
  );
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
  fetch("http://localhost:5000/")
    .then(res => res.json())
    .then(dataRes=>{
      //  console.log("data", dataRes)
        this.setState({
          data: dataRes[1],
          dataCity: dataRes
        });
    })
    .catch(() => {
      alert('failed to fetch');
    });
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  render() {
    return (
      
      <div style={{width: "100%",
        height: "80%", position:"sticky"}} id="outmap">
      <h1 style={{fontSize: "24px", paddingBottom: "20px", paddingTop:"50px"}}>Bản đồ chất lượng không khí Việt Nam</h1>
      <Map
        google={this.props.google}
        zoom={10}
        style={mapStyles}
        initialCenter={
          {
            lat: 21.030653, 
            lng: 105.84713
          }
        }
      >
      { this.state.dataCity.map((data, index)=>{
        return (
          <Marker       
          // icon= {{
          //   path:"M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
          //   fillColor: '#00CCBB',
          //   fillOpacity: 1,
          //   strokeColor: '',
          //   strokeWeight: 0
          // }}
         
          // {{
          //   url: 'https://insulationpads.co.uk/wp-content/uploads/2017/10/Home.png',
          //   scaledSize: new window.google.maps.Size(40, 40),
          // }}
          description= 'Vikash Rathee. <strong> This is test Description</strong> <br/>'
          onClick={this.onMarkerClick}
          // onMouseover={this.onMarkerClick}
          // onMouseout={this.onClose}
          // title={'The marker`s title will appear as a tooltip.'}
          name=
          {<div>
            <div style={{ fontSize:"20px"}}><i className="fa fa-building"style={{paddingRight:"5px", fontSize:"20px", color:"#008000"}}/>{data.name.toUpperCase()}</div>
            <div>Humidity: {data.humidity}</div>
            <div>Temperature: {data.temperature}</div>
            <div>CO2: {data.co2}</div>
            <div>CO: {data.co}</div>
            <div>AQI: {data.AQI}</div>
          </div>
          }
          position={{lat: data.lat, lng: data.lng}} />
        );
      })}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
      {/* <div style={{position: "absolute", bottom: "5px"}} >Bản đồ ô nhiễm không khsi trự tiếp của Việt Nam</div> */}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB0LJdBRv4sn8pXsy0bn9uYlmgkodFDFRA'
})(MapContainer);