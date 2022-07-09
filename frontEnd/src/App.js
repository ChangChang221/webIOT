
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
                    {/* <img src={require("./assets/logo.png")} alt="img-icon"/> */}
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
                <div className="company">
                    <div className="three-stripes"></div>
                    <div className="main-company">
                        <i className="fa fa-reddit" style={{color: "#6CC4A1"}}></i>
                        <div className="company-name">CHẤT LƯỢNG KHÔNG KHÍ VIỆT NAM</div>
                        <div className="down-arrow-icon"></div>
                    </div>

                </div>
                <div className="user">
                    <div className="rell-icon"></div>
                    <div className="user-main">
                        <div className="avatar-user"></div>
                        {/* <!-- <div className="user-name">Nguyễn Văn Mạnh</div>
                        <div className="down-arrow-icon-avatar"></div> --> */}
                    </div>
                </div>
            </div>
            <div className="main-content">
                <div className="header-content">
                    <div className="title-content">CHẤT LƯỢNG KHÔNG KHÍ VIỆT NAM</div>
                    {/* <!-- <div class="button-add">
                        <button id="btnAdd" class="m-button">Thêm mới nhân viên</button>
                    </div> --> */}
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
    {/* <div id="employeeAdd" className="popup" hidden>
        <div className="container-popup">
            <header className="main-header-popup">
                <div clclassNameass="main-popup-title">
                    <div className="title-popup">Thông tin nhân viên</div>
                    <label for="" className="component">
                        <input type="checkbox"/>
                        <span>Là khách hàng </span>
                    </label>

                    <label for="" className="component">
                        <input type="checkbox"/>
                        <span>Là nhà cung cấp</span>
                    </label>

                </div>
                <div className="main-popup-close">
                    <div className="close-popup">
                        <div className="help-popup-icon"></div>
                        <div className="close-popup-icon"></div>
                    </div>
                </div>
            </header>
            <div className="main-popup-content">

                <div className="container-popup-content">
                    <div className="employee-infor-content">
                        <div className="employee-infor">
                            <div className="id-name-emp">
                                <div className="id-emp">
                                    <div className="input-title">
                                        <div>Mã</div>
                                        <div className="required">&nbsp;*</div>
                                    </div>
                                    <div className="input-box-id">
                                        <input id="txtEmployeeCode" required type="text" className="m-input-popup"/>
                                    </div>
                                </div>
                                <div className="name-emp">
                                    <div className="input-title">
                                        <div>Tên</div>
                                        <div className="required">&nbsp;*</div>
                                    </div>
                                    <div className="input-box-name">
                                        <input id="txtEmployeeName" required type="text" className="m-input-popup " required="Tên không được để trống"/>
                                    </div>
                                </div>
                            </div>
                            <div className="unit-emp">
                                <div className="input-title">
                                    <div>Đơn vị</div>
                                    <div className="required">&nbsp;*</div>
                                </div>
                                <div className="input-box-unit">
                                    <input id="txtEmployeeUnit" required type="text" className="m-input-popup"/>
                                </div>
                            </div>
                            <div className="position-emp">
                                <div className="input-title">
                                    <div>Chức danh</div>
                                </div>
                                <div className="input-box-unit">
                                    <input type="text" className="m-input-popup"/>
                                </div>
                            </div>
                        </div>
                        <div className="employee-resume">
                            <div className="dob-sex-emp">
                                <div className="dob-emp">
                                    <div className="input-title">
                                        <div>Ngày sinh</div>
                                    </div>
                                    <div className="input-box-dob">
                                        <input type="date" className="m-input-popup"/>
                                    </div>
                                </div>
                                <div className="sex-emp">
                                    <div className="input-title">
                                        <div>Giới tính</div>
                                    </div>
                                    <div className="check-sex">
                                        <div className="male-div">
                                            <input className="male" name="gender" type="radio" value="Nam" />Nam
                                        </div>
                                        <div>
                                            <input className="female" name="gender" type="radio" value="Nữ" />Nữ
                                        </div>
                                        <div>
                                            <input className="diffrence" name="gender" type="radio" value="Khác" />Khác
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="indentity-emp">
                                <div className="infor-indentity">
                                    <div className="num-indentity">
                                        <div className="input-title">
                                            <div>Số CMND</div>
                                        </div>
                                        <div className="input-box-numindentity">
                                            <input type="text" className="m-input-popup"/>
                                        </div>
                                    </div>
                                    <div className="date-indentity">
                                        <div className="input-title">
                                            <div>Ngày cấp</div>
                                        </div>
                                        <div className="input-box-date">
                                            <input type="date" className="m-input-popup"/>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="palace-indentity">
                                <div class="input-title">
                                    <div>Nơi cấp</div>
                                </div>
                                <div className="input-box-unit">
                                    <input type="text" className="m-input-popup"/>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="employee-contact-content">
                    <div className="address-emp">
                        <div className="input-title">
                            <div>Địa chỉ</div>
                        </div>
                        <div className="input-box-address">
                            <input type="text" class="m-input-popup"/>
                        </div>
                    </div>
                    <div class="phone-emp">
                        <div>
                            <div className="input-title">
                                <div>ĐT di động</div>
                            </div>
                            <div className="input-box-phone">
                                <input type="text" class="m-input-popup"/>
                            </div>
                        </div>
                        <div>
                            <div className="input-title">
                                <div>ĐT cố định</div>
                            </div>
                            <div className="input-box-phone">
                                <input type="text" class="m-input-popup"/>
                            </div>
                        </div>
                        <div>
                            <div className="input-title">
                                <div>Email</div>
                            </div>
                            <div className="input-box-phone">
                                <input type="email" class="m-input-popup"/>
                            </div>
                        </div>
                    </div>
                    <div className="bank-emp">
                        <div>
                            <div className="input-title">
                                <div>Tài khoản ngân hàng</div>
                            </div>
                            <div className="input-box-phone">
                                <input type="text" class="m-input-popup"/>
                            </div>
                        </div>
                        <div>
                            <div className="input-title">
                                <div>Tên ngân hàng</div>
                            </div>
                            <div className="input-box-phone">
                                <input type="text" className="m-input-popup"/>
                            </div>
                        </div>
                        <div>
                            <div className="input-title">
                                <div>Chi nhánh</div>
                            </div>
                            <div className="input-box-phone">
                                <input type="email" className="m-input-popup"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footer-popup-content">
                    <div class="line-footer"></div>
                    <div class="main-popup-footer">
                        <div class="cancel-popup">
                            <button class="white-button">Hủy</button>
                        </div>
                        <div class="save-add-footer">
                            <div class="save">
                                <button class="white-button">Cất</button>
                            </div>
                            <div class="save-and-add">
                                <button id="btnSaveAdd" class="m-button">Cất và thêm</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div> */}
</div>
)
}

export default App;