import React, { Component } from "react";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { Drawer, Button } from "antd";
import { Link } from "react-router-dom";
class NavbarComponent extends Component {
    state = {
        current: "mail",
        visible: false,
    };
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <nav className="menuBar" style={{ background: "#342ead", marginBottom: -1 }}>
                <div className="logo">
                    <Link to="/" style={{ color: "white" }}>
                        ONCOURSES
                    </Link>
                </div>
                <div className="menuCon">
                    <div className="leftMenu">
                        <LeftMenu />
                    </div>
                    <div className="rightMenu">
                        <RightMenu />
                    </div>
                    <Button className="barsMenu" type="dashed" onClick={this.showDrawer}>
                        <span className="barsBtn"></span>
                    </Button>
                    <Drawer title="Multi-level drawer" drawerStyle={{ color: "#342ead" }} placement="right" closable={false} onClose={this.onClose} visible={this.state.visible}>
                        <LeftMenu />
                        <RightMenu />
                    </Drawer>
                </div>
            </nav>
        );
    }
}

export default NavbarComponent;
