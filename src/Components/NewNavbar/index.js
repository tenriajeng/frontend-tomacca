import { Drawer, Menu, Grid, Button } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from "./NavbarElements";
import Logo from "../../images/logo.svg";
import { AuthAtom } from "../Auth/AuthAtom";
import { useRecoilState } from "recoil";
import { ShoppingCartOutlined } from "@ant-design/icons";
import DrawerCartComponent from "../Cart/DrawerCartComponent";
import { CartAtom, CartCountAtom } from "../Cart/CartAtom";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { useBreakpoint } = Grid;

const NewNavbar = () => {
	const [visible, setVisible] = useState(false);
	const [visibleDrawer, setVisibleDrawer] = useState(false);
	const [visibleDrawerChildern, setVisibleDrawerChildern] = useState(false);
	const [authUser, setAuthUser] = useRecoilState(AuthAtom);
	const [cartAtom, setCartAtom] = useRecoilState(CartAtom);
	const [cartCountAtom, setCountCartAtom] = useRecoilState(CartCountAtom);
	const [store, setStore] = useState(null);

	const storeCollector = () => {
		let store = JSON.parse(localStorage.getItem("login"));
		if (store && store.login) {
			setStore(store);
		}
	};

	useEffect(() => {
		let storage = JSON.parse(localStorage.getItem("login"));
		if (storage && storage.login) {
			setAuthUser(storage);
			setStore(storage);
		}

		console.log("cartAtom navbar : ", cartAtom);
	}, []);

	const showDrawer = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

	const showDrawerUser = () => {
		setVisibleDrawer(true);
	};

	const onCloseDrawer = () => {
		setVisibleDrawer(false);
	};

	const showChildrenDrawer = () => {
		setCartAtom({ visible: true });
		console.log("chile : ", visibleDrawerChildern);
	};

	const { md } = useBreakpoint();
	const menuColor = { color: "000" };

	return (
		<>
			<Nav>
				<NavLink to="/">
					{/* Logo */}
					<img src={Logo} alt="logo" />
				</NavLink>
				<Bars onClick={showDrawer} />
				<NavMenu>
					<NavLink to="/home" activeStyle>
						Home
					</NavLink>
					<NavLink to="/courses" activeStyle>
						Courses
					</NavLink>
					<NavLink to="/interactive-courses" activeStyle>
						Interactive&nbsp;Courses
					</NavLink>
					<NavLink to="/blog" activeStyle>
						Blog
					</NavLink>
					<NavLink to="/team" activeStyle>
						Team
					</NavLink>
					{/* <NavLink to="/register" activeStyle>
                        Sign Up
                    </NavLink>
                    <NavLink to="/login" activeStyle>
                        Sign In
                    </NavLink> */}
					{/* Second Nav */}
					{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
				</NavMenu>
				<NavBtn>
					{authUser.login ? (
						<div>
							<Button type="primary" onClick={showChildrenDrawer} icon={<ShoppingCartOutlined />} size="large">
								&nbsp;{cartCountAtom}
							</Button>
							<Button style={{ marginLeft: 5 }} size="large" type="primary" onClick={showDrawerUser}>
								{authUser.dataUser.response.name}
							</Button>
						</div>
					) : (
						<div>
							<NavBtnLink to="/login">Sign In</NavBtnLink>
							<NavBtnLink to="/register">Sign Up</NavBtnLink>
						</div>
					)}
				</NavBtn>

				{/* mobile */}
				<Drawer drawerStyle={{ color: "#342ead" }} title="Navigation" placement="right" closable={false} onClose={onClose} visible={visible}>
					<DrawerCartComponent />
					<Menu mode={md ? "horizontal" : "inline"} style={{ background: "#fff" }}>
						<Menu.Item>
							<Link style={menuColor} to="/">
								Home
							</Link>
						</Menu.Item>
						<Menu.Item>
							<Link style={menuColor} to="/courses">
								Courses
							</Link>
						</Menu.Item>
						<Menu.Item>
							<Link style={menuColor} to="/team">
								Team
							</Link>
						</Menu.Item>
						{authUser.login ? (
							<SubMenu title={<span style={menuColor}>{authUser.dataUser.response.name}</span>}>
								<MenuItemGroup title="Account">
									<Menu.Item key="1">Profile</Menu.Item>
									<Menu.Item key="2">Courses</Menu.Item>
									<Menu.Item key="3">
										<Link onClick={showChildrenDrawer} to="#" style={menuColor}>
											Cart
										</Link>
									</Menu.Item>
									<Menu.Item key="4">Logout</Menu.Item>
								</MenuItemGroup>
							</SubMenu>
						) : (
							<>
								{/* <MenuItemGroup title="Account"> */}
								<Menu.Item key="1">
									<Link style={menuColor} to="/login">
										Signin
									</Link>
								</Menu.Item>
								<Menu.Item key="2">
									<Link style={menuColor} to="/register">
										Signup
									</Link>
								</Menu.Item>
								{/* </MenuItemGroup> */}
							</>
						)}
					</Menu>
					<Menu mode={md ? "horizontal" : "inline"} style={{ background: "#fff" }}></Menu>
				</Drawer>
				{/* mobile */}

				{/* on login */}
				{authUser.login ? (
					<Drawer drawerStyle={{ color: "#342ead" }} title="Account" placement="right" closable={true} onClose={onCloseDrawer} visible={visibleDrawer}>
						<Menu mode={md ? "vertical" : "inline"} style={{ background: "#fff" }}>
							<Menu.Item key="mail">
								<Link style={menuColor} to="/profile">
									Profile
								</Link>
							</Menu.Item>

							<Menu.Item>
								<Link style={menuColor} to="/courses/">
									Courses
								</Link>
							</Menu.Item>
							<Menu.Item>
								<Link style={menuColor} to="/logout">
									Logout
								</Link>
							</Menu.Item>
						</Menu>
					</Drawer>
				) : (
					<div></div>
				)}
				{/* on login */}

				<DrawerCartComponent />
			</Nav>
		</>
	);
};

export default NewNavbar;
