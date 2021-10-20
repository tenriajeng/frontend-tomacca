import React from "react";
import { Checkbox, Row, Col, DatePicker, Select, Upload } from "antd";
import moment from "moment";
import { Option } from "antd/lib/mentions";
import Axios from "axios";
import CardComponet from "./cardComponent";
import ImgCrop from "antd-img-crop";

class Tes extends React.Component {
    state = {
        users: [],
        fileList: [],
    };

    componentDidMount() {
        this.getdata();
    }

    getdata() {
        Axios.get("http://localhost:6600/admin/user").then((res) => {
            const users = res.data.response;
            this.setState({ users });
        });
    }

    render() {
        const colStyle = { marginTop: 10 };

        function disabledDate(current) {
            // Can not select days before today and today
            return current && current < moment().endOf("day");
        }

        function onChangeCheckbox(e) {
            console.log(`checked = ${e.target.checked}`);
        }

        function onChange(value) {
            console.log(`selected ${value}`);
        }

        function onBlur() {
            console.log("blur");
        }

        function onFocus() {
            console.log("focus");
        }

        function onSearch(val) {
            console.log("search:", val);
        }

        // imgcrop
        const onChangeImg = ({ fileList: newFileList }) => {
            this.setState({
                fileList: newFileList,
            });
        };

        const onPreview = async (file) => {
            let src = file.url;
            if (!src) {
                src = await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file.originFileObj);
                    reader.onload = () => resolve(reader.result);
                });
            }
            const image = new Image();
            image.src = src;
            const imgWindow = window.open(src);
            imgWindow.document.write(image.outerHTML);
        };
        // imgcrop

        return (
            <div>
                <CardComponet />
                <Row justify="right" style={{ marginTop: 10 }}>
                    <Col flex="1 1 240px" style={colStyle}>
                        <Checkbox onChange={onChangeCheckbox}>Checkbox</Checkbox>
                        <DatePicker format="YYYY-MM-DD HH:mm:ss" disabledDate={disabledDate} showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }} />

                        <Select showSearch style={{ width: 200 }} placeholder="Select a person" optionFilterProp="children" onChange={onChange} onFocus={onFocus} onBlur={onBlur} onSearch={onSearch}>
                            {this.state.users.map((d) => (
                                <Option key={d.id}>{d.name}</Option>
                            ))}
                        </Select>
                    </Col>
                    <Col flex="1 1 240px" style={colStyle}>
                        <ImgCrop rotate>
                            <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" listType="picture-card" fileList={this.state.fileList} onChange={onChangeImg} onPreview={onPreview}>
                                {this.state.fileList.length < 1 && "+ Upload"}
                            </Upload>
                        </ImgCrop>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Tes;
