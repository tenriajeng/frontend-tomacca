import { Avatar, Card, Col, Image, List, Row, Skeleton, Space } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { URLAPI } from "../../../Components/ApiUrl";

function CoursesDetail() {
    const [courses, setCourses] = useState([]);
    const [dataclass, setDataClass] = useState([]);
    let { indetifier } = useParams();
    const { Meta } = Card;

    const getCourses = async () => {
        try {
            let res = await Axios.get(`${URLAPI}/readmore/detail/${indetifier}`);
            setCourses(res.data.response);
        } catch (error) {
            console.log(error.message);
        }
    };

    const getDataClass = async () => {
        try {
            let res = await Axios.get(`${URLAPI}/admin/kelas/detail/${indetifier}`);
            setDataClass(res.data.response);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getCourses();
        getDataClass();
        console.log(URLAPI);
    }, [indetifier]);

    return (
        <div className="site-layout-background" style={{ minHeight: 480, padding: "0.5rem calc((100vw - 1200px) / 2)" }}>
            <Row style={{ margin: "10px 10px 0" }} gutter={[16, 16]}>
                <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }}>
                    {dataclass.map((item) => (
                        <Image preview={false} width="100%" src={item.foto} />
                    ))}
                    {/* <Image preview={false} width="100%" src={response.foto} /> */}
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }}>
                    <List
                        style={{ background: "#fff" }}
                        itemLayout="horizontal"
                        bordered
                        dataSource={courses}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <Link to={`/courses/${item.nama_kelas}/${item.materi_id}`} key="list-loadmore-more">
                                        Read
                                    </Link>,
                                ]}
                            >
                                <List.Item.Meta title={<Link to={`/courses/${item.nama_kelas}/${item.materi_id}`}>{item.nama_materi}</Link>} />
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        </div>
    );
}

export default CoursesDetail;
