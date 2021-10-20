import { ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Col, Row, Image, Tooltip, Button } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { URLAPI } from "../../../Components/ApiUrl";

function InteractiveCoursesCardComponent() {
	const { Meta } = Card;
	const [data, setData] = useState([]);
	const routeCourses = "/courses/";

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
		<div style={{ background: "#fafafa", padding: "0.5rem calc((100vw - 1200px) / 2)" }}>
			<Row style={{ margin: "10px 10px 0" }} gutter={[16, 16]}>
				{data.map((val) => {
					return (
						<Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
							<Link to={`/interactive-courses/${val.id}`}>
								<Card onClick={() => clickCard(val.nama)} hoverable cover={<img src={val.foto} />}>
									<Meta title={val.nama} />
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

export default InteractiveCoursesCardComponent;
