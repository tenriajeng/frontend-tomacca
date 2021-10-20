import React from "react";
import { Form, Input, Button, Row, Col } from "antd";
import Axios from "axios";
import { URLAPI } from "../../../Components/ApiUrl";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
        };
        // this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
        // alert("handle : ", e.target.name);
    };

    submitHandler = (e) => {
        alert("lol");
        // e.preventDefault();
        console.log("lol : ", this.state.name);

        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        };
        Axios.post(`${URLAPI}/register`, data)
            .then((response) => {
                console.log("good : ", response);
            })
            .catch((error) => {
                console.log("error : ", error);
            });
    };

    render() {
        const { name, email, password } = this.state;

        return (
            <Row justify="center" style={{ marginLeft: 10, marginRight: 10, height: "565px" }} align="middle">
                <Col xl={5}>
                    <center>
                        <br></br>
                        <h2>REGISTER</h2>
                    </center>
                    <Form name="register">
                        <Form.Item
                            name="name"
                            label="Name"
                            value={name}
                            onChange={this.changeHandler}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Name!",
                                },
                            ]}
                        >
                            <Input size="large" name="name" label="Name" value={name} onChange={this.changeHandler} />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="E-mail"
                            value={email}
                            onChange={this.changeHandler}
                            rules={[
                                {
                                    type: "email",
                                    message: "The input is not valid E-mail!",
                                },
                                {
                                    required: true,
                                    message: "Please input your E-mail!",
                                },
                            ]}
                        >
                            <Input size="large" name="email" label="E-mail" value={email} onChange={this.changeHandler} />
                        </Form.Item>

                        <Form.Item
                            size="large"
                            name="password"
                            label="Password"
                            value={password}
                            onChange={this.changeHandler}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password size="large" name="password" label="Password" value={password} onChange={this.changeHandler} />
                        </Form.Item>

                        <Form.Item>
                            <Button size="large" type="primary" htmlType="submit" className="register-form-button" onClick={() => this.submitHandler()}>
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        );
    }
}
export default Register;
