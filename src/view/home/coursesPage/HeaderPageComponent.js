import { Button, PageHeader } from "antd";
import React from "react";

function HeaderPageComponent(props) {
    return (
        <div style={{ padding: "0.5rem calc((100vw - 1200px) / 2)", background: "#f5f5f5" }}>
            <PageHeader
                className="site-page-header"
                title="Title"
                subTitle="This is a subtitle"
                extra={[
                    <Button key="3">Operation</Button>,
                    <Button key="2">Operation</Button>,
                    <Button key="1" type="primary">
                        Primary
                    </Button>,
                ]}
            />
        </div>
    );
}

export default HeaderPageComponent;
