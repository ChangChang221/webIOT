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
import faceGreen from '../assets/ic-face-green.svg';
import faceYellow from '../assets/ic-face-yellow.svg';
import faceOrage from '../assets/ic-face-orange.svg';
import faceRed from '../assets/ic-face-red.svg';
import facePurple from '../assets/ic-face-purple.svg';
import faceMaroon from '../assets/ic-face-maroon.svg';

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
    // this.tick()
  this.timerID = setInterval(
    () => this.tick(),
    1000
  );
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
  fetch("http://localhost:5000/api/") //http://localhost:5000/api/
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
        let face='';
        let background='';
        let miniBackground='';
        let aboutTypeAQI='';
        let colorText='';
        if(data.AQI<51) {
          url=iconGreen;
          face= faceGreen;
          background="#A8E05F";
          miniBackground="#87C13C"
          aboutTypeAQI='Tốt'
          colorText='#607631'
        }
        else if(data.AQI<101) {
          url=iconYellow;
          face=faceYellow
          background="#FDD64B"
          miniBackground="#EFBE1D"
          aboutTypeAQI='Trung bình'
          colorText='#8c6c1d'
        }
        else if(data.AQI<151) {
          url=iconOrange;
          face=faceOrage;
          miniBackground="#F27B2F"
          background="#FF9B57"
          aboutTypeAQI='Không lành mạnh cho các nhóm nhạy cảm'
          colorText='#974A20;'
        }
        else if(data.AQI<201) {
          url=iconRed;
          face=faceRed;
          background="#FE6A69"
          miniBackground="#E84B50"
          aboutTypeAQI='Không lành mạnh'
          colorText='#942431'
        }
        else if(data.AQI<301) {
          url=iconPurple;
          face=facePurple;
          background="#A97ABC"
          miniBackground="#8A5D9D"
          aboutTypeAQI='Rất không lành mạnh'
          colorText='#543b63'
        }
        else if(data.AQI>300) {
          url=iconVerypurle;
          face=faceMaroon;
          background="#a070b6"
          miniBackground="#69103d"
          aboutTypeAQI='Nguy hiểm'
          colorText='#69103d'
        }
        <Marker
          value={
          <div style={{background:'red',height:'30px',width:'30px'}}>alo</div>
        }
        position={{lat: data.lat, lng: data.lng}}
        />
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
            <div className="popup-header" style={{background}}>
              <div className='main-header-aqi' >
                <div className='value-aqi'style={{background:miniBackground}}>
                  <div style={{fontSize:'12px',paddingBottom:'20px'}}>US AQI</div>
                  <div>{data.AQI}</div>
                </div>
                <div style={{color:colorText}} className='place-aqi'>
                  <div>CHỈ SỐ AQI TRỰC TIẾP:</div>
                  <div style={{fontSize:'24px'}}>{aboutTypeAQI}</div>
              </div>
              </div>
              <div className='face-type'>
                <img src={face}></img>
              </div>
            </div>
            <div className='popup-main'>
              <div className='overview-aqi'>
                <div style={{fontWeight:'700',color:'#449FBC',fontSize:'15px'}}>Tổng quan</div>
                <div style={{fontSize:'14px'}}>Chất lượng không khí hiện tại gần {data.name} như thế nào?</div>
              </div>
              <div className='main-aqi'>
                <table>
                  <thead>
                    <tr>
                      <th>Mức ô nhiễm không khí</th>
                      <th>Chỉ số chất lượng không khí</th>
                      <th>Chất gây ô nhiễm chính</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{aboutTypeAQI}</td>
                      <td>{data.AQI} US AQI</td>
                      <td>PM2.5: {data.pm25}µg/m³</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='detail-aqi'>
                <div style={{fontWeight:'700',color:'#449FBC',fontSize:'15px'}}>Chất lượng không khí:</div>
                <div className='detail'>
                  <div>
                    <div><i className="fa fa-thermometer-quarter" aria-hidden="true"  style={{fontSize:"14px", paddingRight:"6px", color:"#FF3300"}}/>Nhiệt độ: {data.temperature}<sup>o</sup>C</div>
                    <div><i className="fa fa-tint" aria-hidden="true" style={{fontSize:"14px", paddingRight:"6px", color:"#1E90FF"}}/>Độ ẩm: {data.humidity}%</div>
                  </div>
                  <div>
                    <div><i class="fa fa-cloud" aria-hidden="true" style={{fontSize:"14px", paddingRight:"6px", color:"#FF3300"}}></i>CO2: {data.co2} µg/m³</div>
                    <div><i class="fa fa-cloud" aria-hidden="true" style={{fontSize:"14px", paddingRight:"6px", color:"#FF3300"}}></i>CO: {data.co} µg/m³</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          }
          position={{lat: data.lat, lng: data.lng}} 
          />
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
