import React from "react";
import Axios from "axios";
import swal from "sweetalert";
import { Table, Space, Button, Modal, Input, Upload, message, Image, InputNumber, Checkbox } from "antd";
import { DeleteOutlined, EditOutlined, EyeTwoTone, PlusOutlined, EyeInvisibleOutlined, ExclamationCircleOutlined, UploadOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { tuple } from "antd/lib/_util/type";

const { Column } = Table;

const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
        authorization: "authorization-text",
    },
    onChange(info) {
        if (info.file.status !== "uploading") {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === "done") {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

class KelasTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            kelas: [],
            visible: false,
            visibleHapus: false,
            visibleUpdate: false,
            nama: "",
            limit: "",
            aktif: "",
            harga: "",
            foto: null,
            id: 0,
            fileList: [],
            previewVisible: false,
            previewImage: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.limitChange = this.limitChange.bind(this);
        this.hargaChange = this.hargaChange.bind(this);
    }

    onChangeCheckbox = (e) => {
        this.setState({
            aktif: e.target.checked,
        });
        console.log(`checked = ${e.target.checked}`);
    };

    showModal = () => {
        this.setState({
            visible: true,
            nama: "",
            limit: "",
            aktif: "",
            harga: "",
            previewVisible: false,
            fileList: [],
            foto: "",
        });
    };

    showModalHapus = (id) => {
        this.setState({
            visibleHapus: true,
            id: id,
        });
    };

    hapusKelas = () => {
        Axios.put(`http://localhost:6600/admin/kelas/delete/${this.state.id}`).then((res) => {
            this.successMessage("dihapus!");
            this.getAllData();
        });
        this.setState({
            visibleHapus: false,
        });
    };

    showModalUpdate = (id) => {
        this.getOnedata(id);
        this.setState({
            visibleUpdate: true,
            previewVisible: false,
            fileList: [],
            foto: "",
        });
    };

    updateKelas = () => {
        // const data = {
        //     nama: this.state.nama,
        //     limit: this.state.limit,
        //     aktif: this.state.aktif,
        //     harga: this.state.harga,
        //     foto: this.state.foto,
        // };

        const updateClass = new FormData();
        updateClass.append("nama", this.state.nama);
        updateClass.append("limit", this.state.limit);
        updateClass.append("aktif", this.state.aktif);
        updateClass.append("harga", this.state.harga);
        console.log("new class update : ", updateClass);

        if (this.state.fileList.length > 0) {
            updateClass.append("foto", this.state.fileList[0].originFileObj);
        } else {
            updateClass.append("foto", this.state.foto);
        }
        console.log("new class update : ", updateClass);

        Axios.put(`http://localhost:6600/admin/kelas/${this.state.id}`, updateClass).then((res) => {
            console.log(res.data);
            // this.getAlldata();
        });
        this.successMessage("diubah!");
        this.setState({
            visibleUpdate: false,
        });
        this.getAllData();

        console.log("update data : ", updateClass);
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
        const newClass = new FormData();
        newClass.append("nama", this.state.nama);
        newClass.append("limit", this.state.limit);
        newClass.append("aktif", this.state.aktif);
        newClass.append("harga", this.state.harga);
        console.log("new class", newClass);

        if (this.state.fileList.length > 0) {
            newClass.append("foto", this.state.fileList[0].originFileObj);
        } else {
            newClass.append("foto", this.state.foto);
        }
        console.log("new class", newClass);

        // console.log("simpan file foto :", this.state.foto);

        if (kondisi === "simpan") {
            Axios.post("http://localhost:6600/admin/kelas/create", newClass).then((res) => {
                console.log(res.data);
                this.successMessage("ditambahkan!");
                this.getAllData();
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

    limitChange(value) {
        this.setState({
            limit: value,
        });
    }

    hargaChange(value) {
        this.setState({
            harga: value,
        });
    }
    getAllData() {
        Axios.get("http://localhost:6600/admin/kelas").then((res) => {
            const kelas = res.data.response;
            this.setState({ kelas });
            //   console.log(res.data);
        });
    }

    getOnedata(id) {
        console.log("apa di", this.state.id);

        try {
            Axios.get(`http://localhost:6600/admin/kelas/detail/${id}`).then((res) => {
                const data = res.data.response[0];
                this.setState({
                    visibleUpdate: true,
                    id: id,
                    nama: data.nama,
                    limit: data.limit,
                    aktif: data.aktif,
                    harga: data.harga,
                });
                console.log("response", data);
            });
        } catch (error) {
            console.log("error ", error);
        }
    }

    componentDidMount() {
        this.getAllData();
    }

    handlePreview = (file) => {
        this.setState({
            previewImage: file.thumbUrl,
            previewVisible: true,
        });
    };

    handleUpload = ({ fileList }) => {
        //---------------^^^^^----------------
        // this is equivalent to your "const img = event.target.files[0]"
        // here, antd is giving you an array of files, just like event.target.files
        // but the structure is a bit different that the original file
        // the original file is located at the `originFileObj` key of each of this files
        // so `event.target.files[0]` is actually fileList[0].originFileObj
        console.log("fileList", fileList);
        // you store them in state, so that you can make a http req with them later
        this.setState({ fileList });
    };

    render() {
        const uploadButton = (
            <div>
                {/* <Icon type="photo" /> */}
                <PlusOutlined />
                {/* <div className="ant-upload-text">Upload</div> */}
            </div>
        );
        const { fileList } = this.state;

        return (
            <div>
                <Button onClick={this.showModal} type="primary" style={{ marginBottom: 16 }}>
                    <PlusOutlined />
                </Button>
                <Table dataSource={this.state.kelas} pagination={{ pageSize: 10 }} scroll={{ x: 1000, y: 350 }}>
                    <Column title="Nama" width="400" fixed="left" dataIndex="nama" key="nama" />
                    <Column title="Limit" dataIndex="limit" key="limit" />
                    <Column title="Aktif" dataIndex="aktif" key="aktif" />
                    <Column title="Harga" dataIndex="harga" key="harga" />
                    <Column title="Last Update" dataIndex="updated_at" key="updated_at" />
                    <Column
                        title="Foto"
                        dataIndex="foto"
                        key="foto"
                        render={(text, record) => (
                            <Space size="middle">
                                <Image width={60} src={text} />
                            </Space>
                        )}
                    />

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
                <Modal title="Tambah Kelas" visible={this.state.visible} onOk={() => this.hideModal("simpan")} onCancel={() => this.hideModal("batal")} okText="Simpan" cancelText="Batal">
                    <Input style={{ marginBottom: 10 }} name="nama" onChange={this.handleChange} value={this.state.nama} placeholder="Name" />
                    <InputNumber type="number" min={1} max={100} name="limit" placeholder="Limit" style={{ marginBottom: 10, width: 472 }} onChange={this.limitChange} value={this.state.limit} />
                    <InputNumber
                        type="number"
                        min={1}
                        max={1000000000}
                        name="harga"
                        placeholder="Harga"
                        style={{ marginBottom: 10, width: 472 }}
                        onChange={this.hargaChange}
                        value={this.state.harga}
                    />

                    <Upload
                        disabled={this.state.foto === "" ? false : true}
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleUpload}
                        beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
                    >
                        {uploadButton}
                    </Upload>
                    {/* <Input
                        value={this.state.foto}
                        disabled={this.state.fileList.length > 0 ? true : false}
                        type="text"
                        name="img"
                        onChange={this.handleChangeInput}
                        placeholder="Input URL Img"
                        style={{ width: "100%" }}
                    /> */}

                    <Checkbox onChange={this.onChangeCheckbox}>Aktif</Checkbox>
                </Modal>

                <Modal title="Hapus Kelas" visible={this.state.visibleHapus} onOk={this.hapusKelas} onCancel={() => this.hideModal("batal")} okText="Hapus" cancelText="Batal">
                    <h3>Data tidak dapat dikembalikan lagi</h3>
                </Modal>

                <Modal title="Update Kelas" visible={this.state.visibleUpdate} onOk={() => this.updateKelas()} onCancel={() => this.hideModal("batal")} okText="Simpan" cancelText="Batal">
                    <Input style={{ marginBottom: 10 }} name="nama" onChange={this.handleChange} defaultValue={this.state.nama} value={this.state.nama} placeholder="Name" />

                    <InputNumber type="number" min={1} max={100} name="limit" placeholder="Limit" style={{ marginBottom: 10, width: 472 }} onChange={this.limitChange} value={this.state.limit} />

                    <InputNumber
                        type="number"
                        min={1}
                        max={1000000000}
                        name="harga"
                        placeholder="Harga"
                        style={{ marginBottom: 10, width: 472 }}
                        onChange={this.hargaChange}
                        value={this.state.harga}
                    />
                    <Upload
                        disabled={this.state.foto === "" ? false : true}
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleUpload}
                        beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
                    >
                        {uploadButton}
                    </Upload>
                    <Checkbox onChange={this.onChangeCheckbox} checked={this.state.aktif}>
                        Aktif
                    </Checkbox>
                </Modal>
            </div>
        );
    }
}

export default KelasTable;
