import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Row, Tooltip } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { URLAPI } from "../../../Components/ApiUrl";
import CardComponent from "./CardComponent";

function EventComponent() {
	const { Meta } = Card;
	const [data, setData] = useState([]);
	const routeCourses = "/interactive-courses/";

	const getData = async () => {
		try {
			let res = await Axios.get(`${URLAPI}/admin/kelas`);
			setData(res.data.response);
			console.log("ini mi datanya : ", res);
		} catch (error) {
			console.log(error.message);
		}
	};

	const clickCard = (e) => {
		// alert(e);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div style={{ marginTop: 40, padding: "0.5rem calc((100vw - 1200px) / 2)" }}>
			<div style={{ textAlign: "center" }}>
				<Divider orientation="left">
					<h1>Interactive Courses </h1>
				</Divider>
			</div>
			<Row style={{ margin: "24px 16px 0" }} gutter={[16, 16]}>
				{data.map((val) => {
					return (
						<Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
							<Link to={routeCourses + val.id}>
								<Card onClick={() => clickCard(val.nama)} hoverable cover={<img alt="example" src={val.foto} />} actions={[,]}>
									<Meta title={val.nama} description="This is the description" />
									<br />
									<Row justify="space-between">
										<strong>Pendaftar</strong>
										<Link hoverable to={`/courses/beli`}>
											<Tooltip title="Add to cart" color="blue" key="blue">
												<Button block>
													<ShoppingCartOutlined style={{ fontSize: "26px", color: "#08c" }} />
												</Button>
											</Tooltip>
										</Link>
									</Row>
								</Card>
							</Link>
						</Col>
					);
				})}
			</Row>
		</div>
	);
}

export default EventComponent;
