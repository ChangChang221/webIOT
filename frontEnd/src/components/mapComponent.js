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
import hanoi from '../assets/hanoi.png'
const mapStyles = {
  width: '100%',
  height: '84vh',
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
      
      <div id="outmap">
      {/* <div className='note-poistion'> */}
        <div className='note-aqi'>
          <div className='green'>Tốt</div>
          <div className='yellow'>Trung bình</div>
          <div className='orange'>Không lành mạnh cho các nhóm nhạy cảm</div>
          <div className='red'>Không lành mạnh</div>
          <div className='purple'>Rất không lành mạnh</div>
          <div className='verypurple'>Nguy hiểm</div>
        </div>
      {/* </div> */}

      
      <Map
        google={this.props.google}
        zoom={10}
        style={{width: "100%",
        height:'calc(100vh - 154px)'}}
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
          {<div className='popup-aqi'>
            {/* <div style={{ fontSize:"20px"}}><i className="fa fa-building"style={{paddingRight:"5px", fontSize:"20px", color:"#008000"}}/>{data.name.toUpperCase()}</div>
             */}
            <div >
             <img className='img-city' src='https://allimages.sgp1.digitaloceanspaces.com/photographercomvn/2020/12/Tong-hop-nhung-hinh-anh-Ha-Noi-dep-nhat.jpg'></img>
            </div>
            <div className='humidity'>
            <i className="fa fa-tint" aria-hidden="true"></i>
              <div>Humidity: {data.humidity}</div>

            </div>
            <div className='temperature'>
             <i className="fa fa-thermometer-quarter" aria-hidden="true"></i>
              <div>Temperature: {data.temperature}</div>

            </div>
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
