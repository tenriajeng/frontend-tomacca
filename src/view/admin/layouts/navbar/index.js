import React, { Component } from "react";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { Carousel, Drawer, Button } from "antd";

class AdminNavbarComponent extends Component {
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
			<nav className="menuBar" style={{ background: "white" }}>
				<div className="logo">
					<a href="">ONCOURSES</a>
				</div>
				<div className="menuCon">
					<div className="leftMenu">
						<LeftMenu />
					</div>
					<div className="rightMenu">
						<RightMenu />
					</div>
					<Button className="barsMenu" type="primary" onClick={this.showDrawer}>
						<span className="barsBtn"></span>
					</Button>
					<Drawer title="Menu" placement="right" closable={false} onClose={this.onClose} visible={this.state.visible}>
						<LeftMenu />
						<RightMenu />
					</Drawer>
				</div>
			</nav>
		);
	}
}

export default AdminNavbarComponent;
