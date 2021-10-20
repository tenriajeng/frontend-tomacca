import React from "react";
import { Input, Row, Col, Card } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Meta from "antd/lib/card/Meta";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";

class Tes extends React.Component {
    render() {
        const style = { background: "#0092ff", padding: "8px 0" };
        const cardStyle = { marginRight: 3, marginLeft: 3 };
        const colStyle = { marginTop: 10 };
        return (
            <div>
                <Row justify="right">
                    <Col flex="1 1 240px" style={colStyle}>
                        <Card
                            // className="cardStyle"
                            style={cardStyle}
                            cover={<img alt="example" src="https://placekitten.com/200/200" />}
                            actions={[<SettingOutlined key="setting" />, <EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />]}
                        >
                            <Meta title="Card title" description="This is the description" />
                        </Card>
                    </Col>
                    <Col flex="1 1 240px" style={colStyle}>
                        <Card
                            // className="cardStyle"
                            style={cardStyle}
                            cover={<img alt="example" src="http://placekitten.com/g/200/200" />}
                            actions={[<SettingOutlined key="setting" />, <EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />]}
                        >
                            <Meta title="Card title" description="This is the description" />
                        </Card>
                    </Col>
                    <Col flex="1 1 240px" style={colStyle}>
                        <Card
                            // className="cardStyle"
                            style={cardStyle}
                            cover={<img alt="example" src="http://placekitten.com/200/200" />}
                            actions={[<SettingOutlined key="setting" />, <EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />]}
                        >
                            <Meta title="Card title" description="This is the description" />
                        </Card>
                    </Col>
                    <Col flex="1 1 240px" style={colStyle}>
                        <Card
                            // className="cardStyle"
                            style={cardStyle}
                            cover={<img alt="example" src="http://placekitten.com/g/200/200" />}
                            actions={[<SettingOutlined key="setting" />, <EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />]}
                        >
                            <Meta title="Card title" description="This is the description" />
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Tes;
