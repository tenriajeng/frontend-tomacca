import { BackTop, Layout } from "antd";
import React from "react";
import { UpSquareOutlined } from "@ant-design/icons";

const { Footer } = Layout;

function FooterUserComponent(props) {
    return (
        <div>
            {/* 342ead */}
            <Footer style={{ textAlign: "center", marginTop: 20, background: "#000", paddingTop: 50 }}>
                <p style={{ color: "white" }}>Copyright &copy; 2020 DIPANEGARA COMPUTER CLUB</p>
                <BackTop>
                    <div className="goTop">
                        {/* 000839 */}
                        <UpSquareOutlined style={{ fontSize: 50, color: "#fff" }} />
                    </div>
                </BackTop>
            </Footer>
        </div>
    );
}

export default FooterUserComponent;
