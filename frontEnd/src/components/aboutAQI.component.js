import React from "react";
function AboutAQI(){
    return(
    <div style={{padding: "10px"}}>
    <h1 style={{fontSize: "24px", paddingBottom: "20px", paddingTop:"50px"}}>AQI là gì</h1>
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
    <div>
        <div style={{width: "50%", height: "100px", display: "inline-block", background: "red"}}>
dd
        </div>
        <div style={{width: "50%", height: "100px", display: "inline-block", background: "red"}}>
đ
        </div>
        <div style={{width: "50%", height: "100px", display: "inline-block", background: "red"}}>
dd
        </div>
        <div style={{width: "50%", height: "100px", display: "inline-block", background: "red"}}>
đ
        </div>
        <div style={{width: "50%", height: "100px", display: "inline-block", background: "red"}}>
dd
        </div>
        <div style={{width: "50%", height: "100px", display: "inline-block", background: "red"}}>
đ
        </div>
    </div>
    </div>
    );
}
export default AboutAQI;