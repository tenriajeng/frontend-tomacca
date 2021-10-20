import { Layout } from "antd";
import React from "react";
import Router from "../../../router";
import HeaderComponet from "./HeaderComponet";
import SiderComponent from "./SiderComponent";
import BreadcrumbComponent from "./BreadcrumbComponent";
import FooterComponent from "./FooterComponent";
import NavbarComponent from "../../../Components/Navbar";
import AdminNavbarComponent from "./navbar";

const { Content } = Layout;

class Base extends React.Component {
	state = {
		collapsed: false,
	};

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};

	render() {
		return (
			<div>
				<Layout>
					{/* Header */}
					{/* <HeaderComponet /> */}
					<AdminNavbarComponent />

					<Layout>
						{/* sider */}
						<SiderComponent />

						<Content style={{ margin: "24px 16px 0" }}>
							{/* Breadcrumb */}

							<BreadcrumbComponent />
							<div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
								<Router />
							</div>
							{/* footer */}
							<FooterComponent />
						</Content>
					</Layout>
				</Layout>
			</div>
		);
	}
}

export default Base;
