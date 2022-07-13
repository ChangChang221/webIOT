import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import GoogleApiWrapper from "./components/mapComponent.js";
import AboutAQI from "./components/aboutAQI.component.js";
import './css/main.css';
import ChartAQI from "./components/chart.component.js";
function App() {
   
return(
    <div style={{width: "100%"}}>
    <div className="container">
        <div className="menu-container">
            <div className="logo-container">
                <a href="/" className="logo">
                    <img src={require("./assets/logo11.png")} alt="img-icon"/>
                </a>
            </div>
            <div className="menu-list">
                <div className="tooltip">
                    <a href="/" className="tooltip-content" > 
                        <i id="iconMenu" style={{fontSize:"24px"}} className="fa fa-list-ul" ></i>
                        <div className="title-tooltip">Tổng quan</div>
                    </a>
                </div>
                <div className="tooltip">
                    <a href="/chartAQI" className="tooltip-content " >
                        {/* <div className="icon-tooltip cash-icon">
                        </div>           */}
                        <i id="iconMenu" style={{fontSize:"24px"}} className="fa fa-line-chart" ></i>                  
                        <div className="title-tooltip">Biểu đồ AQI</div>
                    </a>
                </div>
                <div className="tooltip">
                    <a href="/about" className="tooltip-content ">
                        <i id="iconMenu" style={{fontSize:"30px"}} className="fa fa-info-circle" ></i>
                        <div className="title-tooltip">Thông tin về AQI</div>
                    </a>
                </div>
            </div>
        </div>
        <div className="area-content">
            <div className="header">
                    <div className="main-company">
                        <img className="mini-logo" src={require("./assets/logo.png")} alt="img-icon"/>
                        <div className="company-name">CHẤT LƯỢNG KHÔNG KHÍ VIỆT NAM</div>
                    </div>
            </div>
            <div className="main-content">
                <div className="header-content">
                    <BrowserRouter>
                            <Routes>
                                <Route path="/mapAQI" element={<div className="title-content">Bản đồ chất lượng không khí Việt Nam</div>} ></Route>
                                <Route path="/about" element={<div className="title-content">Thông tin chất lượng không khí Việt Nam</div>} ></Route>
                                <Route path="/chartAQI" element={<div className="title-content">Chất lượng không khí của các tỉnh Việt Nam</div>} ></Route>
                                <Route path="/" element={<div className="title-content">Bản đồ chất lượng không khí Việt Nam</div>}></Route>
                            </Routes>
                        </BrowserRouter>
                </div>
                <div className="content-table">
                    <div className="main-table">
                         <BrowserRouter>
                            <Routes>
                                <Route path="/mapAQI" element={<GoogleApiWrapper/>} ></Route>
                                <Route path="/about" element={<AboutAQI/>} ></Route>
                                <Route path="/chartAQI" element={<ChartAQI/>} ></Route>
                                <Route path="/" element={<GoogleApiWrapper/>}></Route>
                            </Routes>
                        </BrowserRouter>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
)
}

export default App;