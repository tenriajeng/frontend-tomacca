import React from "react";
import { Menu, Grid } from "antd";
import { Link } from "react-router-dom";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { useBreakpoint } = Grid;

const RightMenu = () => {
    const { md } = useBreakpoint();
    const menuColor = { color: "white" };

    return (
        <Menu mode={md ? "horizontal" : "inline"} style={{ background: "#342ead" }}>
            <Menu.Item key="mail">
                <Link style={menuColor} to="/login">
                    Signin
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link style={menuColor} to="/register">
                    Signup
                </Link>
            </Menu.Item>
            <SubMenu title={<span style={menuColor}>Username</span>}>
                <MenuItemGroup title="Account">
                    <Menu.Item key="1">Profile</Menu.Item>
                    <Menu.Item key="2">Courses</Menu.Item>
                    <Menu.Item key="3">Logout</Menu.Item>
                </MenuItemGroup>
            </SubMenu>
        </Menu>
    );
};

export default RightMenu;
