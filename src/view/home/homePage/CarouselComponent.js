import { Carousel } from "antd";
import React from "react";

function CarouselComponent(props) {
    const contentStyle = {
        height: "600px",
        color: "#fff",
        // lineHeight: "300px",
        // textAlign: "center",
        // alignContent: "center",
        padding: "0.5rem calc((100vw - 1200px) / 2)",
        background: "#000",
    };

    // margin: 0 auto;
    // max-width: 1200px;
    // padding: 0 15px;

    return (
        // <Carousel dotPosition={"left"} autoplay>
        <div style={contentStyle}>
            <h1 style={{ color: "white", marginLeft: 10, marginRight: 10, marginTop: 100 }}>Ipsum elit ut sint minim.</h1>
            <h4 style={{ color: "white", marginLeft: 10, marginRight: 10, marginTop: 10 }}>
                Tempor et cupidatat aliquip Lorem ex cupidatat. Aliqua Lorem culpa adipisicing aute velit tempor nulla commodo deserunt. Irure id cillum et ea cupidatat Lorem occaecat pariatur Lorem
                commodo. Consequat fugiat non ipsum elit ut sint minim.
            </h4>
        </div>
        // <div>
        //     <h3 style={contentStyle}>2</h3>
        // </div>
        // <div>
        //     <h3 style={contentStyle}>3</h3>
        // </div>
        // {/* </Carousel> */}
    );
}

export default CarouselComponent;
