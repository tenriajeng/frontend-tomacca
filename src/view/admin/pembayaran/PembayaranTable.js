import React, { useState } from "react";
import Axios from "axios";
import swal from "sweetalert";
import { Table, Space, Button, Input, Modal, Select } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

const { Column } = Table;

const { Option } = Select;

function onFocus() {
    console.log("focus");
}

function onSearch(val) {
    console.log("search:", val);
}

class PembayaranTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Pembayaran: [],
            visible: false,
            visibleHapus: false,
            nama: "",
            id: "",
        };
        this.handleChange = this.handleChange.bind(this);
    }

    onChangeUser = (value) => {
        this.setState({
            id: value,
        });
    };

    showModal = () => {
        this.setState({
            visible: true,
            nama: "",
            id: "",
        });
    };

    showModalUpdate = (id) => {
        this.setState({
            id: id,
            visibleUpdate: true,
        });
        this.getOnedata(id);
    };

    updatePembayaran = () => {
        const data = {
            nama: this.state.nama,
        };

        Axios.put(`http://localhost:6600/admin/pembayaran/${this.state.id}`, data).then((res) => console.log(res.data));
        this.successMessage("diubah!");
        this.getDataPembayaran();
        this.setState({
            visibleUpdate: false,
        });
        console.log("update data : ", data);
    };

    showModalHapus = (id) => {
        this.setState({
            visibleHapus: true,
            id: id,
        });
    };

    hapusPembayaran = () => {
        Axios.put(`http://localhost:6600/admin/pembayaran/delete/${this.state.id}`).then((res) => {
            this.successMessage("dihapus!");
            this.getDataPembayaran();
        });
        this.setState({
            visibleHapus: false,
        });
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
            id: this.state.id,
            nama: this.state.nama,
        };

        if (kondisi === "simpan") {
            Axios.post("http://localhost:6600/admin/pembayaran/create", data).then((res) => {
                this.successMessage("ditambahkan!");
                this.getDataPembayaran();
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

    getDataPembayaran() {
        Axios.get("http://localhost:6600/admin/pembayaran").then((res) => {
            const Pembayaran = res.data.response;
            this.setState({ Pembayaran });
        });
    }

    getOnedata(id) {
        console.log("apa di", this.state.id);

        try {
            Axios.get(`http://localhost:6600/admin/pembayaran/detail/${id}`).then((res) => {
                const data = res.data.response[0];
                this.setState({
                    visibleUpdate: true,
                    id: id,
                    nama: data.nama,
                });
                console.log("response", data);
            });
        } catch (error) {
            console.log("error ", error);
        }
    }

    componentDidMount() {
        this.getDataPembayaran();
    }

    render() {
        return (
            <div>
                <Button onClick={this.showModal} type="primary" style={{ marginBottom: 16 }}>
                    <PlusOutlined />
                </Button>
                <Table dataSource={this.state.Pembayaran} pagination={{ pageSize: 10 }} scroll={{ y: 300 }}>
                    <Column title="Nama" dataIndex="nama" key="nama" />
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
                <Modal title="Tambah Pembayaran" visible={this.state.visible} onOk={() => this.hideModal("simpan")} onCancel={() => this.hideModal("batal")} okText="Simpan" cancelText="Batal">
                    <Input name="nama" style={{ marginBottom: 10 }} onChange={this.handleChange} value={this.state.nama} placeholder="Nama" />
                </Modal>

                <Modal title="Hapus Pembayaran" visible={this.state.visibleHapus} onOk={this.hapusPembayaran} onCancel={() => this.hideModal("batal")} okText="Hapus" cancelText="Batal">
                    <h3>Data tidak dapat dikembalikan lagi</h3>
                </Modal>
                <Modal title="Update Pembayaran" visible={this.state.visibleUpdate} onOk={() => this.updatePembayaran()} onCancel={() => this.hideModal("batal")} okText="Simpan" cancelText="Batal">
                    <Input name="nama" style={{ marginBottom: 10 }} onChange={this.handleChange} defaultValue={this.state.nama} value={this.state.nama} />
                </Modal>
            </div>
        );
    }
}

export default PembayaranTable;
