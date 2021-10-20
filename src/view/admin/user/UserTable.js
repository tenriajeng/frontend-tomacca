import React from "react";
import Axios from "axios";
import swal from "sweetalert";
import { Table, Space, Button, Modal, Input, Row, Col, Select } from "antd";
import { DeleteOutlined, EditOutlined, EyeTwoTone, PlusOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const { Column } = Table;
const { Option } = Select;

class UserTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            visible: false,
            visibleHapus: false,
            visibleUpdate: false,
            name: "",
            email: "",
            password: "",
            userId: 0,
            level: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.levelChange = this.levelChange.bind(this);
    }

    showModal = () => {
        this.setState({
            visible: true,
            name: "",
            email: "",
            password: "",
            level: "",
        });
    };

    showModalUpdate = (id) => {
        // console.log('show modal update id = ',id);
        this.getOnedata(id);
        this.setState({
            visibleUpdate: true,
        });
    };

    showModalHapus = (id) => {
        this.setState({
            visibleHapus: true,
            userId: id,
        });
    };

    hapusUser = () => {
        Axios.put(`http://localhost:6600/admin/user/delete/${this.state.userId}`).then((res) => {
            this.successMessage("dihapus!");
            this.getdata();
        });
        this.setState({
            visibleHapus: false,
        });
    };

    updateUser = () => {
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            level: this.state.level,
        };

        Axios.put(`http://localhost:6600/admin/user/${this.state.userId}`, data).then((res) => console.log(res.data));
        this.successMessage("diubah!");
        this.getdata();
        this.setState({
            visibleUpdate: false,
        });
        console.log("update data : ", data);
    };

    successMessage(message) {
        swal({
            title: "Selamat",
            text: "Berhasil " + message,
            icon: "success",
            button: "Tutup",
        });
    }

    hideModal = (kondisi) => {
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            level: this.state.level,
        };

        if (kondisi === "simpan") {
            Axios.post("http://localhost:6600/admin/user/create", data).then((res) => {
                this.successMessage("ditambahkan!");
                this.getdata();
            });
        }

        this.setState({
            visible: false,
            visibleHapus: false,
            visibleUpdate: false,
        });
    };

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    levelChange(e) {
        this.setState({
            level: e,
        });
    }

    getdata() {
        Axios.get("http://localhost:6600/admin/user").then((res) => {
            const users = res.data.response;
            this.setState({ users });
            console.log(res.data);
        });
    }

    getOnedata(id) {
        console.log("apa di", this.state.userId);

        try {
            Axios.get(`http://localhost:6600/admin/user/detail/${id}`).then((res) => {
                const data = res.data.response[0];
                console.log("response", data);

                this.setState({
                    visibleUpdate: true,
                    userId: id,
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    level: data.level,
                });
                console.log("response", data);
            });
        } catch (error) {
            console.log("error ", error);
        }

        // alert(this.state.userId);
        // alert('get one data',id);
    }

    componentDidMount() {
        this.getdata();
    }

    render() {
        return (
            <div>
                <Row justify="space-between" gutter={[8, 8]}>
                    <Col span={12}>
                        <Button onClick={this.showModal} type="primary" style={{ marginBottom: 10 }}>
                            <PlusOutlined />
                        </Button>
                    </Col>
                    <Col span={8}>
                        <Input style={{ marginBottom: 10 }} placeholder="Name" />
                    </Col>
                </Row>
                <Row justify="space-between">
                    <Col span={24}>
                        <Table bordered dataSource={this.state.users} pagination={{ pageSize: 10, position: ["bottomCenter"] }} scroll={{ x: 1000, y: 300 }}>
                            <Column title="Name" dataIndex="name" fixed="left" key="name" />
                            <Column title="Email" dataIndex="email" key="email" />
                            <Column title="Level" dataIndex="level" key="level" />
                            <Column title="Last Update" dataIndex="updated_at" key="updated_at" />

                            <Column
                                title="Action"
                                key="action"
                                render={(text, record) => (
                                    <Space size="middle">
                                        <Button type="danger" onClick={() => this.showModalHapus(record.id)}>
                                            <DeleteOutlined />
                                        </Button>
                                        <Button type="primary" onClick={() => this.showModalUpdate(record.id)}>
                                            <EditOutlined />
                                        </Button>
                                    </Space>
                                )}
                            />
                        </Table>
                    </Col>
                </Row>

                <Modal title="Hapus User" visible={this.state.visibleHapus} onOk={this.hapusUser} onCancel={() => this.hideModal("batal")} okText="Hapus" cancelText="Batal">
                    <h3>Data tidak dapat dikembalikan lagi</h3>
                </Modal>

                <Modal title="Tambah User" visible={this.state.visible} onOk={() => this.hideModal("simpan")} onCancel={() => this.hideModal("batal")} okText="Simpan" cancelText="Batal">
                    <Input name="name" style={{ marginBottom: 10 }} onChange={this.handleChange} value={this.state.name} placeholder="Name" />
                    <Input name="email" style={{ marginBottom: 10 }} onChange={this.handleChange} value={this.state.email} placeholder="Email" />
                    <Input.Password
                        name="password"
                        style={{ marginBottom: 10 }}
                        placeholder="Password"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        onChange={this.handleChange}
                        value={this.state.password}
                    />
                    <Select name="level" defaultValue="0" style={{ width: 472 }} onChange={this.levelChange}>
                        <Option value="0">User</Option>
                        <Option value="1">Admin</Option>
                    </Select>
                </Modal>

                <Modal title="Update User" visible={this.state.visibleUpdate} onOk={() => this.updateUser()} onCancel={() => this.hideModal("batal")} okText="Simpan" cancelText="Batal">
                    <Input name="name" style={{ marginBottom: 10 }} onChange={this.handleChange} defaultValue={this.state.name} value={this.state.name} />
                    <Input name="email" style={{ marginBottom: 10 }} onChange={this.handleChange} value={this.state.email} />
                    <Input.Password name="password" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} onChange={this.handleChange} value={this.state.password} />
                    <Select name="level" defaultValue="0" style={{ width: 472 }} onChange={this.levelChange}>
                        <Option value="0">User</Option>
                        <Option value="1">Admin</Option>
                    </Select>
                </Modal>
            </div>
        );
    }
}

export default UserTable;
