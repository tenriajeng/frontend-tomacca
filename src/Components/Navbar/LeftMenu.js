import React from "react";
import { Menu, Grid } from "antd";
import { Link } from "react-router-dom";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { useBreakpoint } = Grid;

const LeftMenu = () => {
    const { md } = useBreakpoint();
    const menuColor = { color: "white" };
    return (
        <Menu mode={md ? "horizontal" : "inline"} style={{ background: "#342ead" }}>
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
        </Menu>
    );
};

export default LeftMenu;
