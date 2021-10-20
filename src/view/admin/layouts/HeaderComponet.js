import { Layout } from "antd";
import React from "react";

function HeaderComponet() {
    const { Header } = Layout;

    return (
        <div>
            <Header theme="dark" style={{ padding: 0 }}>
                <div style={{ marginLeft: 10 }} className="logo">
                    <h1 style={{ color: "white" }}>Admin Panel</h1>
                </div>
            </Header>
        </div>
    );
}

export default HeaderComponet;
