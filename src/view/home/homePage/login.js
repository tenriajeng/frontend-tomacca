import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined, ShoppingCartOutlined, GoogleOutlined } from "@ant-design/icons";
import { Row, Col, Space } from "antd";
import Axios from "axios";
import { Link } from "react-router-dom";
import { URLAPI } from "../../../Components/ApiUrl";
import GoogleLogin from "react-google-login";
// import { AuthAtom } from "../../../Components/Auth/AuthAtom";
// import { useRecoilState } from "recoil";
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            // login: useRecoilState(AuthAtom),
        };
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    componentDidMount() {
        this.storeCollector();
    }

    storeCollector = () => {
        let store = JSON.parse(localStorage.getItem("login"));
        if (store && store.login) {
            this.setState({ login: true, store: store });
        }
    };

    submitHandler = (e) => {
        alert("lol");
        console.log("lol : ", this.state.email);

        const data = {
            email: this.state.email,
            password: this.state.password,
        };
        Axios.post(`${URLAPI}/login/`, data)
            .then((response) => {
                console.log("good : ", response.data.token);
                localStorage.setItem(
                    "login",
                    JSON.stringify({
                        login: true,
                        token: response.data.token,
                    })
                );
            })
            .catch((error) => {
                console.log("error : ", error);
            });
    };

    render() {
        const responseGoogle = (response) => {
            console.log(response);
        };
        const { email, password } = this.state;
        return (
            <div>
                {!this.state.login ? (
                    <Row justify="center" align="middle" style={{ height: "565px" }}>
                        <Col xl={5}>
                            <center>
                                <br></br>
                                <h2>SIGN IN</h2>
                            </center>
                            <Form name="normal_login" className="login-form" initialValues={{ remember: true }}>
                                <Form.Item name="email" rules={[{ required: true, message: "Please input your Email!" }]}>
                                    <Input
                                        size="large"
                                        prefix={<UserOutlined className="site-form-item-icon" />}
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        value={email}
                                        onChange={this.changeHandler}
                                    />
                                </Form.Item>
                                <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
                                    <Input
                                        size="large"
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={password}
                                        onChange={this.changeHandler}
                                    />
                                </Form.Item>
                                {/* <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a>
                        </Form.Item> */}

                                <Form.Item>
                                    <Button size="large" type="primary" htmlType="submit" className="login-form-button" onClick={() => this.submitHandler()}>
                                        Sig in
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    <GoogleLogin
                                        className="login-form-button"
                                        // render={(renderProps) => (
                                        //     <Button size="large" block onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                        //         <GoogleOutlined style={{ fontSize: "26px", color: "#08c" }} />
                                        //     </Button>
                                        // )}
                                        clientId="302960530396-ep7jo95005em4nd6ebberf1cj6le2j96.apps.googleusercontent.com"
                                        // buttonText="Login"}
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={"single_host_origin"}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    Or <Link to="/register">register now!</Link>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                ) : (
                    <label>sudah login</label>
                )}
            </div>
        );
    }
}
export default Login;
