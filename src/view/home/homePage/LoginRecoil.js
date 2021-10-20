import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { Link, Redirect } from "react-router-dom";
import { useRecoilState } from "recoil";
import { URLAPI } from "../../../Components/ApiUrl";
import { AuthAtom } from "../../../Components/Auth/AuthAtom";
import jwt_decode from "jwt-decode";

function LoginRecoil() {
	const [authUser, setAuthUser] = useRecoilState(AuthAtom);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [login, setLogin] = useState(false);
	const [store, setStore] = useState(null);

	const storeCollector = () => {
		let store = JSON.parse(localStorage.getItem("login"));
		if (store && store.login) {
			setLogin(true);
			setStore(store);
		}
	};

	useEffect(() => {
		let store = JSON.parse(localStorage.getItem("login"));
		if (store && store.login) {
			setLogin(true);
			setAuthUser(true);
			setStore(store);
			<Redirect to="/home" />;
		}

		console.log("store : ", store);
	}, []);

	const responseGoogle = (response) => {
		console.log(response);
	};

	const submitHandler = (e) => {
		console.log("lol : ", email);

		const data = {
			email: email,
			password: password,
		};
		Axios.post(`${URLAPI}/login/`, data)
			.then((response) => {
				console.log("good : ", response.data.token);
				const jwt = jwt_decode(response.data.token);
				setAuthUser({
					login: true,
					token: response.data.token,
					dataUser: jwt,
				});
				localStorage.setItem(
					"login",
					JSON.stringify({
						login: true,
						token: response.data.token,
						dataUser: jwt,
					})
				);
				<Redirect to="/" />;
			})
			.catch((error) => {
				setAuthUser(false);
				console.log("error : ", error);
			});
	};

	return (
		<div>
			<Row justify="center" align="middle" style={{ height: "565px" }}>
				{!login ? (
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
									onChange={(e) => setEmail(e.target.value)}
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
									onChange={(e) => setPassword(e.target.value)}
								/>
							</Form.Item>

							<Form.Item>
								<Button size="large" type="primary" htmlType="submit" className="login-form-button" onClick={() => submitHandler()}>
									Sign In
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
									theme="dark"
									clientId="302960530396-ep7jo95005em4nd6ebberf1cj6le2j96.apps.googleusercontent.com"
									// buttonText="Login"}
									onSuccess={responseGoogle}
									onFailure={responseGoogle}
									cookiePolicy={"single_host_origin"}
									responseType="code,token"
								/>
							</Form.Item>
							<Form.Item>
								Or <Link to="/register">register now!</Link>
							</Form.Item>
						</Form>
					</Col>
				) : (
					<Redirect to="/home" />
				)}
			</Row>
		</div>
	);
}

export default LoginRecoil;
