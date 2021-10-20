import React from "react";
import Axios from "axios";
import swal from "sweetalert";
import { Table, Space, Button, Modal, Input, Row, Col } from "antd";
import { DeleteOutlined, EditOutlined, EyeTwoTone, PlusOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const { Column } = Table;

class MateriTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			materi: [],
			visible: false,
			visibleHapus: false,
			visibleUpdate: false,
			kelas_id: "",
			nama: "",
			aktif: "",
			jadwal: "",
		};
		this.handleChange = this.handleChange.bind(this);
	}

	showModal = () => {
		this.setState({
			visible: true,
			kelas_id: "",
			nama: "",
			aktif: "",
			jadwal: "",
		});
	};

	showModalHapus = (id) => {
		this.setState({
			visibleHapus: true,
			kelas_id: id,
		});
	};

	hapusUser = () => {
		Axios.put(`http://localhost:6600/admin/materi/delete/${this.state.kelas_id}`).then((res) => {
			this.successMessage("dihapus!");
			this.getdata();
		});
		this.setState({
			visibleHapus: false,
		});
	};

	showModalUpdate = (id) => {
		this.getOnedata(id);
		this.setState({
			visibleUpdate: true,
		});
	};

	updateData = () => {
		const data = {
			kelas_id: this.state.kelas_id,
			nama: this.state.nama,
			aktif: this.state.aktif,
			jadwal: this.state.jadwal,
		};
		Axios.put(`http://localhost:6600/admin/materi/${this.state.kelas_id}`, data).then((res) => console.log(res.data));
		this.successMessage("suksek diubah");
		this.getOnedata();
		this.setState({
			visibleUpdate: false,
		});
		console.log("update data : ", data);
	};

	successMessage(message) {
		swal({
			title: "Selamat",
			text: "Berhasil ",
			icon: "success",
			button: "Tutup",
		});
	}

	hideModal = (kondisi) => {
		const data = {
			kelas_id: this.state.kelas_id,
			nama: this.state.nama,
			aktif: this.state.aktif,
			jadwal: this.state.jadwal,
		};

		if (kondisi === "simpan") {
			Axios.post("http://localhost:6600/admin/materi/create", data).then((res) => {
				this.successMessage("ditambahkan!");
				this.getdata();
			});
		}

		this.setState({
			visible: false,
			visibleHapus: false,
		});
	};

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	getdata() {
		Axios.get("http://localhost:6600/admin/materi").then((res) => {
			const materi = res.data.response;
			this.setState({ materi });
		});
	}

	getOnedata(id) {
		console.log("apa di", this.state.kelas_id);
		try {
			Axios.get(`http://localhost:6600/admin/materi/detail/${id}`).then((res) => {
				const data = res.data.response[0];

				this.setState({
					visibleUpdate: true,
					kelas_id: id,
					nama: data.nama,
					aktif: data.aktif,
					jadwal: data.jadwal,
				});
				console.log(res.data.response);
			});
		} catch (error) {
			console.log("error", error);
		}
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
						<Table bordered dataSource={this.state.materi} pagination={{ pageSize: 10, position: ["bottomCenter"] }} scroll={{ y: 300 }}>
							<Column title="kelas_id" dataIndex="kelas_id" key="kelas_id" />
							<Column title="Nama" dataIndex="nama" key="nama" />
							<Column title="Aktif" dataIndex="aktif" key="aktif" />
							<Column title="Jadwal" dataIndex="jadwal" key="jadwal" />
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

				<Modal
					title="Tambah User"
					visible={this.state.visible}
					onOk={() => this.hideModal("simpan")}
					onCancel={() => this.hideModal("batal")}
					okText="Simpan"
					cancelText="Batal"
				>
					<Input name="kelas_id" style={{ marginBottom: 10 }} onChange={this.handleChange} value={this.state.kelas_id} placeholder="kelas_id" />
					<Input name="nama" style={{ marginBottom: 10 }} onChange={this.handleChange} value={this.state.nama} placeholder="Nama" />
					<Input name="aktif" style={{ marginBottom: 10 }} onChange={this.handleChange} value={this.state.aktif} placeholder="Aktif" />
					<Input name="jadwal" style={{ marginBottom: 10 }} onChange={this.handleChange} value={this.state.jadwal} placeholder="Jadwal" />
				</Modal>

				<Modal
					title="Edit Materi"
					visible={this.state.visibleUpdate}
					onOk={() => this.updateData("simpan")}
					onCancel={() => this.hideModal("batal")}
					okText="Simpan"
					cancelText="Batal"
				>
					<Input name="kelas_id" style={{ marginBottom: 10 }} onChange={this.handleChange} value={this.state.kelas_id} placeholder="kelas_id" />
					<Input name="nama" style={{ marginBottom: 10 }} onChange={this.handleChange} value={this.state.nama} placeholder="Nama" />
					<Input name="aktif" style={{ marginBottom: 10 }} onChange={this.handleChange} value={this.state.aktif} placeholder="Aktif" />
					<Input name="jadwal" style={{ marginBottom: 10 }} onChange={this.handleChange} value={this.state.jadwal} placeholder="Jadwal" />
				</Modal>
			</div>
		);
	}
}

export default MateriTable;
