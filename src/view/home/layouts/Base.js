import React, { Component } from "react";
import { Layout } from "antd";
import NavbarComponent from "../../../Components/Navbar";
import HomePage from "../homePage/HomePage";
import LandingUser from "../../../router/LandingUser";
const { Footer } = Layout;

class Base extends Component {
	render() {
		const contentStyle = {
			height: "550px",
			color: "#fff",
			lineHeight: "550px",
			textAlign: "center",
			background: "https://placekitten.com/1500/500",
		};

		return (
			<div>
				<NavbarComponent />
				<LandingUser />
				<Footer style={{ textAlign: "center" }}>Ant Design ©2018 Created by Ant UED</Footer>
			</div>
		);
	}
}

export default Base;
