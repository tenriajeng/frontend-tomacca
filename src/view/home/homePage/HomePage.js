import { Card, Col, Row } from "antd";
import React from "react";
import CardComponent from "./CardComponent";
import CarouselComponent from "./CarouselComponent";
import EventComponent from "./EventComponent";

function HomePage(props) {
    const mainStyle = {
        overflow: "hidden",
        display: "block",
        background: "#fafafa",
        minHeight: "100vh",
        position: "relative",
        paddingBottom: "100px",
        height: "100%",
    };

    return (
        <div style={mainStyle}>
            <CarouselComponent />
            <CardComponent />
            <EventComponent />
        </div>
    );
}

export default HomePage;
