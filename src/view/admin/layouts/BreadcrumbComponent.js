import React from "react";
import { Breadcrumb } from "antd";

function BreadcrumbComponent() {
    return (
        <div>
            <Breadcrumb style={{ marginBottom: 15 }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    );
}

export default BreadcrumbComponent;
