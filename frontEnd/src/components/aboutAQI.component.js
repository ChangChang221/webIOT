import React from "react";
import iconGreen from '../assets/ic-face-green.svg';
import iconYellow from '../assets/ic-face-yellow.svg';
import iconOrange from '../assets/ic-face-orange.svg';
import iconRed from '../assets/ic-face-red.svg';
import iconPurple from '../assets/ic-face-purple.svg';
import iconMaroon from '../assets/ic-face-maroon.svg';
import '../css/aboutAQI.css';

function AboutAQI(){
    return(
    <div style={{padding: "10px"}}>
    <h1 style={{fontSize: "24px", paddingBottom: "20px", paddingTop:"50px"}}>AQI là gì?</h1>
    <div style={{color:"black", textAlign: "justify"}}> AQI, hoặc là Chỉ số chất lượng không khí, là chỉ số theo 
        dõi mức độ chất lượng không khí cho công chúng. Chỉ số này
        dao động từ 0 đến 500, chỉ số càng cao thể hiện mức độ ô nhiễm
        và tác động tới sức khỏe càng cao. Ví dụ, khi các giá trị AQI cao
        cao trên 300 được coi là nguy hại cho sức khỏe, trong khi các giá trị AQI từ
        0-50 thể hiện chất lượng không khí tốt. AQI được tính toán theo nhiều cách
        khác nhau trên toàn thế giới. Trung Quốc và Mỹ có 2 hệ thống được sử dụng rộng rãi 
        nhất. Cả 2 hệ thống này đều sử dụng cách tính dựa trên 6 chất gây ô nhiễm chính (PM2.5, PM10, cacbon
        , monoxit, sunfua dioxit, nitơ, dioxit và zone tầng mặt đất) trong một công thức phức tạp.
        Kết quả tính AQI từ cả 2 công thứ trên chỉ chênh lệch khoảng 200 trở xuống. Vì thế
         hệ thống chỉ số của Mỹ mang lại điểm số cao hơn cho AQI dưới 200, nên người ta nghĩ rằng nó sẽ kịch liệt hơn. Ví lý do này, chỉ
         số của Mỹ đã trở thành tiêu chuẩn chung trên thế giới.

    </div>
    <div style={{paddingTop: "50px"}}>
        <div  className="card">
                <div className="card-title">
                        <img src={iconGreen} alt="img-icon"style={{backgroundColor:"#7FFF00"}} className="card-img"/>
                </div>
                <div className="card-main">
                <h1 >0-50 Tốt</h1>
                <div  style={{display: "inline-block"}}>Chất lượng không khí tốt ít hoặc không có nguy cơ về sức khỏe. Nên để không khí trong nhà lưu thông
                </div>
                </div>
        </div>
        <div className="card">
                <div className="card-title">
                        <img src={iconYellow} alt="img-icon"style={{ backgroundColor:"#FFFF00"}}  className="card-img"/>
                </div>
                <div className="card-main">
                <h1 style={{display: "inline-block"}}>51-100 Trung bình</h1>
                <div  style={{display: "inline-block"}}>Những người nhạy cảm nên tránh các hoạt động ngoài trời vì có thể mắc các triệu chứng
                về hô hấp
                </div>
                </div>
        </div>
        <div className="card">
                <div className="card-title">
                        <img src={iconOrange} alt="img-icon"style={{ backgroundColor:"#FF8C00"}}  className="card-img"/>
                </div>
                <div  className="card-main">
                <h1 style={{display: "inline-block"}}>101-150 Xấu</h1>
                <div  style={{display: "inline-block"}}>Công chúng nói chung đều có nguy cơ bị kích ứng và
                các vấn đề hô háp
                </div>
                </div>
        </div>
        <div className="card">
                
                <div className="card-title">
                        <img src={iconRed} alt="img-icon"style={{ backgroundColor:"#FF0000"}} className="card-img"/>
                </div>
                <div className="card-main">
                <h1 style={{display: "inline-block"}}>151-200 Kém</h1>
                <div  style={{display: "inline-block"}}>
                        Nhóm nhạy cảm tránh ra ngoài. Những người khác hạn chế ra ngoài
                </div>
                </div>
        </div>
        <div className="card">
                <div className="card-title">
                        <img src={iconPurple} alt="img-icon"style={{ backgroundColor:"#CC0099"}} className="card-img"/>
                </div>
                <div className="card-main">
                <h1 style={{display: "inline-block"}}>201-300 Rất kém</h1>
                <div  style={{display: "inline-block"}}>Cảnh báo sức khỏe khẩn cấp. Ảnh hướng đến tất cả người dân.
                </div>
                </div>
        </div>
        <div className="card">
                <div className="card-title">
                        <img src={iconMaroon} alt="img-icon"style={{ backgroundColor:"#660033"}} className="card-img"/>
                </div>
                <div className="card-main">
                <h1 style={{display: "inline-block"}}>301-500 Nguy hại</h1>
                <div  style={{display: "inline-block"}}>Báo động: Có thể ảnh hưởng nghiêm trọng đến sức khỏe mọi người.
                </div>
                </div>
        </div>
    </div>
    </div>
    );
}
export default AboutAQI;