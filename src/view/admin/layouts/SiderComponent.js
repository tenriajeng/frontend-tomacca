import { Menu, Layout } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { UserOutlined, HomeOutlined, BgColorsOutlined, DatabaseOutlined, ContactsOutlined, IdcardOutlined, DollarCircleOutlined, PicLeftOutlined } from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";

const { Sider } = Layout;

function SiderComponent() {
	return (
		<Sider
			className="site-layout-background"
			breakpoint="lg"
			collapsedWidth="0"
			onBreakpoint={(broken) => {
				console.log(broken);
			}}
			onCollapse={(collapsed, type) => {
				console.log(collapsed, type);
			}}
		>
			<Menu theme="light" mode="inline">
				<Menu.Item key="11" icon={<HomeOutlined />}>
					<Link to="/admin">Dashboard</Link>
				</Menu.Item>

				<Menu.Item key="1" icon={<UserOutlined />}>
					<Link to="/admin/users">Users</Link>
				</Menu.Item>
				<Menu.Item key="2" icon={<DatabaseOutlined />}>
					<Link to="/admin/kelas">Kelas</Link>
				</Menu.Item>
				<Menu.Item key="3" icon={<ContactsOutlined />}>
					<Link to="/admin/kelas-user">Kelas Users</Link>
				</Menu.Item>
				<Menu.Item key="8" icon={<IdcardOutlined />}>
					<Link to="/admin/pemateri">Pemateri</Link>
				</Menu.Item>
				<Menu.Item key="9" icon={<DollarCircleOutlined />}>
					<Link to="/admin/pembayaran">Pembayaran</Link>
				</Menu.Item>
				<Menu.Item key="4" icon={<PicLeftOutlined />}>
					<Link to="/admin/materi">Materi</Link>
				</Menu.Item>
				<Menu.Item key="10" icon={<BgColorsOutlined />}>
					<Link to="/admin/tes">Tes</Link>
				</Menu.Item>
				<SubMenu key="sub1" icon={<UserOutlined />} title="User">
					<Menu.Item key="5">Tom</Menu.Item>
					<Menu.Item key="6">Bill</Menu.Item>
					<Menu.Item key="7">Alex</Menu.Item>
				</SubMenu>
			</Menu>
		</Sider>
	);
}

export default SiderComponent;
