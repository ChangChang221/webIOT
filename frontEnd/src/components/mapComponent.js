import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';
import '../css/mapDiv.css';
import 'map-icons/dist/css/map-icons.css';
import iconRed from '../assets/red.png';
import iconGreen from '../assets/green.png';
import iconYellow from '../assets/yellow.png';
import iconPurple from '../assets/purple.png';
import iconOrange from '../assets/orange.png';
import iconVerypurle from '../assets/verypurple.png';
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
        height: "100%", position:"sticky"}} id="outmap">
      <h1 style={{fontSize: "24px", paddingBottom: "20px", paddingTop:"50px"}}></h1>
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
        let url='';
        if(data.AQI<51) url=iconGreen
        else if(data.AQI<101) url=iconYellow
        else if(data.AQI<151) url=iconOrange
        else if(data.AQI<201) url=iconRed
        else if(data.AQI<301) url=iconPurple
        else if(data.AQI<501) url=iconVerypurle
        return (
          <Marker                
          icon ={{
            url: url,
            scaledSize: new window.google.maps.Size(40, 40),
          }}
          description= 'Vikash Rathee. <strong> This is test Description</strong> <br/>'
          onClick={this.onMarkerClick}
        name=
          {<div>
            <div style={{ fontSize:"20px"}}><i className="fa fa-building"style={{paddingRight:"5px", fontSize:"20px", color:"#008000"}}/>{data.name.toUpperCase()}</div>
            <div>Humidity: {data.humidity}</div>
            <div>Temperature: {data.temperature}</div>
            <div className="alo">CO2: {data.co2}</div>
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
