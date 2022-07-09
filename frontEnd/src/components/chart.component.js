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
  }

  componentDidMount() {
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
      </div>
      <div>
      <div className="chartLine">
      <div style={{width: "100%", float:"left", margin:"25px 0px", textAlign:"center"}}>
        <i className="fa fa-tint" aria-hidden="true" style={{fontSize:"30px", paddingRight:"10px", color:"#1E90FF"}}/>
        Biểu đồ đường độ ẩm theo thời gian</div>
      <Line data={this.state.datahumidity} key={2}/>      
      </div>
      <div className="chartLine">
      <div style={{width: "100%", float:"left", margin:"25px 0px", textAlign:"center"}}>
        <i className="fa fa-thermometer-quarter" aria-hidden="true"  style={{fontSize:"30px", paddingRight:"10px", color:"#FF3300"}}/>
        Biểu đồ đường nhiệt độ theo thời gian</div>
      <Line data={this.state.datatemperature} key={3}/>      
      </div>
      </div>
      </>
    )
  }
}

export default ChartAQI;