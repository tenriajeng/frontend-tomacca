import React from "react";
import { Menu, Grid } from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { useBreakpoint } = Grid;

const RightMenu = () => {
    const { md } = useBreakpoint();
    return (
        <Menu mode={md ? "horizontal" : "inline"}>
            <SubMenu key="sub1" title={<span>Username</span>}>
                <Menu.Item key="setting:1">Option 1</Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>
            </SubMenu>
        </Menu>
    );
};

export default RightMenu;
