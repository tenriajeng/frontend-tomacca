import { Card, Col, Row, Image, Avatar, Button, Tooltip } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined, EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { URLAPI } from "../../../Components/ApiUrl";

function CoursesCardComponent() {
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
		<div style={{ padding: "0.5rem calc((100vw - 1200px) / 2)", background: "#fafafa" }}>
			<Row style={{ margin: "10px 10px 0" }} gutter={[16, 16]}>
				{data.map((val) => {
					return (
						<Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
							<Link to={`/courses/${val.id}`}>
								<Card onClick={() => clickCard(val.nama)} hoverable cover={<img alt="example" src={val.foto} />} actions={[,]}>
									<Meta title={val.nama} description={val.deskripsi} />
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

export default CoursesCardComponent;
