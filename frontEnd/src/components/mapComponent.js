// import './App.css'
// import React, { useState, useEffect } from "react";

// function App() {
// const [data, setData] = useState("test");

// // useEffect(() => {
// //   async function fetchData() {
// //     const res = await fetch('http://localhost:5000/')
// //     const data = await res.json()
// //     console.log(data)
// // }
// //   fetchData();
// // },[]);



// useEffect(() => {
//   fetch("http://localhost:5000/send")
//     .then(res => res.json())
//     .then(data=>{
//         setData(JSON.stringify(data));
//         console.log("data",data)
//     })
//     .catch(() => {
//       alert('failed to fetch');
//     });
// }, [])
//   return (
//     <form>
//        <label>Hien thi
//         <input type="text" id="mqtt" value={data} onChange={(e) => setData(e.target.value)}/>
//       </label>
//     </form>
    
//   );
// }

// export default App;




// // import './App.css'
// // import React from "react";

// //  import { Connector } from 'mqtt-react-hooks';
// //  import Status from "./Status"

// // function App() {
// // //   var options = {
// // //     host: '97ff5a567fc942d896f17c1f4730142a.s2.eu.hivemq.cloud',
// // //     port: 8883,
// // //     protocol: 'mqtts',
// // //     username: 'trangbg20@gmail.com',
// // //     password: 'Trang2000'
// // // }

// // //initialize the MQTT client
// //   return (

// //      <Connector brokerUrl="tcp://broker.hivemq.com:1883">
// //        <Status />
// //        <div>hihi</div>
// //    </Connector>
// //   );
// // }

// // export default App;


import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';
import '../css/mapDiv.css';
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
          onClick={this.onMarkerClick}
          // onMouseover={this.onMarkerClick}
          // onMouseout={this.onClose}
          // title={'The marker`s title will appear as a tooltip.'}
          name=
          {<div>
            <div style={{ fontSize:"20px"}}><i class="fa fa-building"style={{paddingRight:"5px", fontSize:"20px", color:"#008000"}}/>{data.name}</div>
            <div>Humidity: {data.humidity}</div>
            <div>Temperature: {data.temperature}</div>
            <div>CO2: {data.co2}</div>
            <div>CO: {data.co}</div>
            <div>NO: {data.temperature}</div>
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