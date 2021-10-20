import React, { useEffect, useState } from "react";
import { Button, Col, Divider, Drawer, Row, Tooltip } from "antd";
import { useRecoilState } from "recoil";
import { CartAtom, CartCountAtom } from "./CartAtom";
import Axios from "axios";
import { URLAPI } from "../ApiUrl";
import { AuthAtom } from "../Auth/AuthAtom";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";

function DrawerCartComponent(props) {
	const [cartAtom, setCartAtom] = useRecoilState(CartAtom);
	const [cartCountAtom, setCartCountAtom] = useRecoilState(CartCountAtom);
	const [authUser, setAuthUser] = useRecoilState(AuthAtom);
	const [data, setData] = useState([]);
	const [total, setTotal] = useState([]);

	const getData = async () => {
		try {
			const userId = authUser.dataUser.response.id;
			let res = await Axios.get(`${URLAPI}/cart/${userId}`);
			const resData = res.data.response;
			setData(resData);
			setCartCountAtom(resData.length);
			console.log("id user : ", userId);
		} catch (error) {
			console.log(error.message);
		}
	};

	const getTotalPrice = async () => {
		try {
			const userId = authUser.dataUser.response.id;
			let resTotal = await Axios.get(`${URLAPI}/cart/${userId}/total-price`);
			setTotal(resTotal.data.response[0]);
			console.log("id user : ", userId);
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		getData();
		getTotalPrice();
	}, [authUser]);

	return (
		<div>
			<Drawer title="Cart" width={300} closable={false} onClose={() => setCartAtom({ onClose: false })} visible={cartAtom.visible}>
				<Row style={{ marginLeft: 24 }}>
					<Col flex="180px">
						<h4>Courses</h4>
					</Col>
					<Col flex="auto">
						<h4>Price</h4>
					</Col>
				</Row>
				{data.map((val) => {
					return (
						<div>
							<Row style={{ marginLeft: 24, marginTop: 5 }}>
								<Col flex="180px">{val.nama}</Col>
								<Col flex="auto">{val.harga}</Col>
								<Col flex="auto">
									<Tooltip title="Remove">
										<Button size="small" type="danger" icon={<DeleteOutlined />} />
									</Tooltip>
								</Col>
							</Row>
						</div>
					);
				})}
				<Row style={{ marginLeft: 24, marginTop: 5 }}>
					<Col flex="180px">
						<h4>Total</h4>
					</Col>
					<Col flex="auto">
						<h4>{total.totalharga}</h4>
					</Col>
				</Row>
			</Drawer>
		</div>
	);
}

export default DrawerCartComponent;
