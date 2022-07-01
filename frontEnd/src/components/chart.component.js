// import React, { useState, useEffect } from "react";
// import { Chart } from "react-google-charts";

// export const options = {
//   chart: {
//     title: "Box Office Earnings in First Two Weeks of Opening",
//     subtitle: "in millions of dollars (USD)",
//   },
// };




// export default function ChartAQI() {
//   const[a,setA]= useState(5);
//   const [dataChart, setData] = useState([
//     [
//       "Day",
//       "AQI",
//     ],
//     [2, 2],
//     [3, 3],
//     [4, 4]
//   ]);
//   let datas=dataChart;

//     useEffect(()=>{
//       // setTimeout();
//       // setInterval(() => {
//       //    setA(a+1);
//       //   fetch("http://localhost:5000/name?name=Hà Nội")
//       //     .then(res => res.json())
//       //     .then(dataRes=>{
//       //         let data_now=[a, 2];
//       //         if(dataChart.length==5){
//       //            datas.push(data_now);
//       //            datas.shift();
//       //            setData(datas);
//       //            console.log(dataChart);
//       //           //  Chart.data=dataChart;
//       //         }
//       //         else{
//       //           datas.push([a, 2]);
//       //           setData(dataChart);
//       //           console.log(dataChart);
//       //         }
//       //     })
//       //     .catch((err) => {
//       //       // alert('failed to fetch');
//       //       console.log(err);
//       //     });
//       //   },1000);
//       setA(a+1);
      // setTimeout(() => {
      //   // fetch("http://localhost:5000/name?name=Hà Nội")
      //   //   .then(res => res.json())
      //   //   .then(dataRes=>{
      //   //       let data_now=[a, 2];
      //   //       if(dataChart.length==5){
      //   //          datas.push(data_now);
      //   //          datas.shift();
      //   //          setData(datas);
      //   //          console.log(dataChart);
      //   //         //  Chart.data=dataChart;
      //   //       }
      //   //       else{
      //   //         datas.push([a, 2]);
      //   //         setData(dataChart);
      //   //         console.log(dataChart);
      //   //       }
      //   //   })
      //   //   .catch((err) => {
      //   //     // alert('failed to fetch');
      //   //     console.log(err);
      //   //   });
//         let data_now=[a, 2];
//               if(dataChart.length==5){
//                  datas.push(data_now);
//                  datas.shift();
//                  setData(datas);
//                  console.log(dataChart);
//                 //  Chart.data=dataChart;
//               }
//               else{
//                 datas.push([a, 2]);
//                 setData(dataChart);
//                 console.log(dataChart);
//               }
//       }, 2000);
//     });
//   return (
//   <>
//     <Chart
//       chartType="Line"
//       width="95%"
//       height="400px"
//       loader={<div>Loading Chart</div>}
//       data={dataChart}
//       options={options}
//     />
//     </>
//   );
// }
//---------------------------------------------------------TEST--------------------

// import React, { Component } from 'react';
// import { Doughnut } from 'react-chartjs-2';

// export default class ChartAQI extends Component {
//   constructor() {
//     super(this.props);
//     this.chartReference = React.createRef();
//     this.state = {
//       name: 'React',      
//       data: {
//         labels: ['Red', 'Green', 'Blue'],
//         datasets: [{
//           data: [5, 7, 6],
//           backgroundColor: ['red', 'green', 'blue']
//         }]       
//       }
//     };

//     setInterval(() => {
//       const chart = this.chartReference.current.chartReference;
//       chart.data.datasets[0].data = [
//         Math.floor(Math.random() * 10) + 1,
//         Math.floor(Math.random() * 10) + 1, 
//         Math.floor(Math.random() * 10) + 1
//       ];
//       this.chartReference.update();
//       chart.update();
//     }, 2000); 
//   }

//   render(){
//     return (
//       <Doughnut ref={this.chartReference} data={this.state.data} redraw=/>
//     )
//   }
// }
//---------------TEST-----------------
import React, { Component} from 'react';
import {Line, Doughnut} from 'react-chartjs-2';
import {Chart} from 'chart.js';
import {registerables } from 'chart.js';
import '../css/chart.css'
// Chart.register(CategoryScale);
// Chart.register(ArcElement);
Chart.register(...registerables);

export const date= new Date;
class ChartAQI extends Component {
  state = {
    datahumidity:{
      labels: [date.getHours()+"h"+date.getMinutes()+"p"+ date.getSeconds()+"s", date.getHours()+"h"+date.getMinutes()+"p"+date.getSeconds()+"s", date.getHours()+"h"+date.getMinutes()+"p"+date.getSeconds()+"s"
      , date.getHours()+"h"+date.getMinutes()+"p"+date.getSeconds()+"s", date.getHours()+"h"+date.getMinutes()+"p"+date.getSeconds()+"s", date.getHours()+"h"+date.getMinutes()+"p"+date.getSeconds()+"s"],
      datasets: [{
          label: "Humidity",
          data: [0, 0, 0, 0, 0, 0],
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)"
        }]
    },
    datatemperature:{
      labels: [date.getHours()+"h"+date.getMinutes()+"p"+ date.getSeconds()+"s", date.getHours()+"h"+date.getMinutes()+"p"+date.getSeconds()+"s", date.getHours()+"h"+date.getMinutes()+"p"+date.getSeconds()+"s"
      , date.getHours()+"h"+date.getMinutes()+"p"+date.getSeconds()+"s", date.getHours()+"h"+date.getMinutes()+"p"+date.getSeconds()+"s", date.getHours()+"h"+date.getMinutes()+"p"+date.getSeconds()+"s"],
      datasets: [{
          data: [0, 0, 0, 0, 0, 0],
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          label: "Temperature"
        }]
    },
    dataAQI:{
      labels: [date.getHours()+"h"+date.getMinutes()+"p"+ date.getSeconds()+"s", date.getHours()+"h"+date.getMinutes()+"p"+date.getSeconds()+"s", date.getHours()+"h"+date.getMinutes()+"p"+date.getSeconds()+"s"
      , date.getHours()+"h"+date.getMinutes()+"p"+date.getSeconds()+"s", date.getHours()+"h"+date.getMinutes()+"p"+date.getSeconds()+"s", date.getHours()+"h"+date.getMinutes()+"p"+date.getSeconds()+"s"],
      datasets: [{
          data: [0, 0, 0, 0, 0, 0],
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          label: "AQI"
        }]
    },
    input: "",
    optionss: {
      title:{
        display: "true",
        text: "tiêu đề"
      }
    }
    // data: {
    //     labels: [
    //         'Red',
    //         'Green',
    //         'Yellow'
    //     ],
    //     datasets: [{
    //         data: [300, 50, 100],
    //         backgroundColor: [
    //         '#FF6384',
    //         '#36A2EB',
    //         '#FFCE56'
    //         ],
    //         hoverBackgroundColor: [
    //         '#FF6384',
    //         '#36A2EB',
    //         '#FFCE56'
    //         ]
    //     }]
    // }
  }

  componentDidMount() {
    // this.timer = setInterval(
    //   // () => this.increment("Hà Nội"),
    //   1000
    // )
    console.log("trang 1");
  }

  // componentWillUnmount() {
  //   clearInterval(this.timer)
  // }

  increment(city) {
    const labelsCopy= this.state.datahumidity.labels.slice(0);

    const datasetsCopy = this.state.datahumidity.datasets.slice(0);
    const dataCopy = datasetsCopy[0].data.slice(0);

    const datasetsCopy2 = this.state.datatemperature.datasets.slice(0);
    const dataCopy2 = datasetsCopy2[0].data.slice(0);

    const datasetsCopy3 = this.state.dataAQI.datasets.slice(0);
    const dataCopy3 = datasetsCopy3[0].data.slice(0);
        fetch("http://localhost:5000/name?name="+city)
          .then(res => res.json())
          .then(dataRes=>{
              let date_now=new Date;
              if(dataCopy.length==6){
                labelsCopy.push(date.getHours()+"h"+date.getMinutes()+"p"+date_now.getSeconds()+"s");

                dataCopy.push(Number(dataRes.humidity));
                dataCopy.shift();

                dataCopy2.push(Number(dataRes.temperature));
                dataCopy2.shift();

                dataCopy3.push(Number(dataRes.AQI));
                dataCopy3.shift();
                labelsCopy.shift();
              }
              else{
                dataCopy.push(Number(dataRes.humidity));
                dataCopy2.push(Number(dataRes.temperature));
                dataCopy3.push(Number(dataRes.AQI));
                labelsCopy.push(date.getHours()+"h"+date.getMinutes()+"p"+date_now.getSeconds()+"s");
              }
          })
          .catch((err) => {
            // alert('failed to fetch');
            console.log(err);
          });
              // if(dataCopy.length==6){
              //   dataCopy.push(7);
              //   dataCopy.shift();
              //   //  Chart.data=dataChart;
              // }
              // else{
              //   dataCopy.push(7);
              // }
 //   dataCopy[0] = dataCopy[0] + 50;
    datasetsCopy[0].data = dataCopy;
    datasetsCopy2[0].data = dataCopy2;
    datasetsCopy3[0].data = dataCopy3;
    this.setState({
      datahumidity: Object.assign({}, this.state.datahumidity, {
            datasets: datasetsCopy,
            labels: labelsCopy
        }),
      datatemperature: Object.assign({}, this.state.datatemperature, {
          datasets: datasetsCopy2,
          labels: labelsCopy
      }),
      dataAQI: Object.assign({}, this.state.dataAQI, {
          datasets: datasetsCopy3,
          labels: labelsCopy
      })
    });
  }

  handleClick = (e) => {
    if(this.state.input=="") return;
    clearInterval(this.timer);
    let inputSearch=this.state.input.toLowerCase();
    console.log(inputSearch);
    this.timer = setInterval(()=>
      {
        console.log(inputSearch);
        this.increment(inputSearch)
      },
      1000
    )
    // setInterval(
    //   () => {
    //     console.log(inputSearch);
    //     this.increment(inputSearch)
    //   },
    //   2000
    // ) 
  }

  handleKeyPress=(event)=> {
    if (event.key === 'Enter') {
      if(event.target.value=="") return;
      clearInterval(this.timer);
      let inputSearch=event.target.value.toLowerCase();
      console.log(inputSearch);
      this.timer = setInterval(()=>
      {
        console.log(inputSearch);
        this.increment(inputSearch)
      },
      1000)
    }
  }

  render(){
    return(
      <>
      <div style={{float:"right",display:"inline-block", marginTop:"50px"}}>
        <div   className="search">
        <i className="fa fa-search" aria-hidden="true"  style={{fontSize:"20px", paddingRight:"5px", color:"#1E90FF", cursor:"pointer"}} onClick={this.handleClick}/>
        <input
          type="text" 
          value={this.state.input}
          onChange={(e) => 
            this.setState({
            input: (e.target.value)}
            )}
          onKeyPress={this.handleKeyPress}
          placeholder={"Nhập tên thành phố"}
          className="input"
      />
      </div>
    
     <button type="submit" onClick={this.handleClick} className="button">Tìm kiếm</button>
      </div>
      <div className="chartLine">
        <div style={{width: "100%", float:"left", margin:"25px 0px", textAlign:"center"}}>
          <i className="fa fa-thermometer-quarter" aria-hidden="true"  style={{fontSize:"30px", paddingRight:"10px", color:"#FF3300"}}/>
          Biểu đồ đường AQI theo thời gian</div>
        <Line data={this.state.dataAQI} key={1}/>      
        {/* <Doughnut data = {this.state.data}/> */}
      </div>
      <div>
      <div className="chartLine">
      <div style={{width: "100%", float:"left", margin:"25px 0px", textAlign:"center"}}>
        <i className="fa fa-tint" aria-hidden="true" style={{fontSize:"30px", paddingRight:"10px", color:"#1E90FF"}}/>
        Biểu đồ đường độ ẩm theo thời gian</div>
      <Line data={this.state.datahumidity} key={2}/>      
      {/* <Doughnut data = {this.state.data}/> */}
      </div>
      <div className="chartLine">
      <div style={{width: "100%", float:"left", margin:"25px 0px", textAlign:"center"}}>
        <i className="fa fa-thermometer-quarter" aria-hidden="true"  style={{fontSize:"30px", paddingRight:"10px", color:"#FF3300"}}/>
        Biểu đồ đường nhiệt độ theo thời gian</div>
      <Line data={this.state.datatemperature} key={3}/>      
      {/* <Doughnut data = {this.state.data}/> */}
      </div>
      </div>

      </>
    
      
    )
  }
}

export default ChartAQI;