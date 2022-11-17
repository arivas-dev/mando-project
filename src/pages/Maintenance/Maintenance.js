import React, { useState,useContext, useEffect } from 'react'

import { Form, Input, Col, Row, DatePicker, Select, Radio, TimePicker, Button, message, Upload } from 'antd'
import security from 'assets/img/login/logo.jpeg';
import moment from 'moment'
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { firebaseApp } from "firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { InboxOutlined } from '@ant-design/icons'
import { endpoints } from 'constants/api'
import axios from 'axios';
import { LocalStorageHandler } from 'utils/LocalStorageHandler'
const SEND_EMAIL_URL = `${endpoints.email}/send-email`
const { Option } = Select;

const name = 'Maintenance data'

const Maintenance = () => {
    const firestore = getFirestore(firebaseApp);
    // const storage = firebase.storage();

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const rules = [{ required: true, message: 'Field is required' }];
    const user  = LocalStorageHandler.user
    console.log("Maintenance  -  user", user);
    const {email} = user

    useEffect(() => {
    }, []);


    const save = async (fieldsValue) => {
        setLoading(true)
        const values = {
            ...fieldsValue,
            'date': fieldsValue['date'].format('YYYY-MM-DD'),
            'arrival': fieldsValue['arrival'].format('HH:mm:ss'),
            'depature': fieldsValue['depature'].format('HH:mm:ss'),
            'time_delivered': fieldsValue['time_delivered'].format('HH:mm:ss'),
            'added_at': moment().format('YYYY-MM-DD HH:mm:ss'),
            // 'if_rotable_part': null,
            // 'logbook_scan': null,
        };

        try {


            let promises = []
            if (values.if_rotable_part) {
                values.if_rotable_part.map(file => {
                    const storage = getStorage();
                    const storageRef = ref(storage, 'if_rotable_part/' + file.name);
                    // 'file' comes from the Blob or File API
                    promises.push(uploadBytes(storageRef, file.originFileObj).then((snapshot) => getDownloadURL(storageRef)))
                })
            }

            let url_if_rotable_part = ""
            if (promises.length) {
                await Promise.all(promises).then((urls) => {
                    console.log('Uploaded all blobs or files!', urls);
                    urls.map(url => {
                        url_if_rotable_part += url + ","
                    })
                })
            }

            promises.length = 0

            if (values.logbook_scan) {
                values.logbook_scan.map(file => {
                    const storage = getStorage();
                    const storageRef = ref(storage, 'logbook_scan/' + file.name);
                    // 'file' comes from the Blob or File API
                    promises.push(uploadBytes(storageRef, file.originFileObj).then((snapshot) => getDownloadURL(storageRef)))
                })
            }

            let url_logbook_scan = ""

            if (promises.length) {
                await Promise.all(promises).then((urls) => {
                    console.log('Uploaded all blobs or files!', urls);
                    urls.map(url => {
                        url_logbook_scan += url + ","
                    })
                })
            }
            values.url_if_rotable_part = url_if_rotable_part
            values.url_logbook_scan = url_logbook_scan
            values.if_rotable_part = null
            values.logbook_scan = null
            console.log("save  -  values", values);

            const docRef = await addDoc(collection(firestore, "maintenance"), { ...values });


            const emailContent = buildEmail(values);
            sendEmail({ email, name, message: emailContent })

            form.resetFields()
            message.success('Saved successfully')
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding document: ", error);
            message.error('Error saving')
        }
        setLoading(false)
    }

    const sendEmail = ({ email, name, message }) => {
        try {
            axios.post(SEND_EMAIL_URL, {
                data: {
                    email, name, message
                }
            })


        } catch (error) {
            message.error('Error sending email')
        }
    }

    const buildEmail = (data) => {
        const { date, arrival, depature, time_delivered, if_rotable_part, logbook_scan, url_if_rotable_part, url_logbook_scan } = data
        const now = moment().format('DD/MM/YYYY');
        const time = moment().format('HH:mm');
        const content = `
        <h1>Maintenance</h1>
        Data sent: ${now} - ${time}<br>
        <p>Date: ${date}</p>
        <p>Arrival: ${arrival}</p>
        <p>Depature: ${depature}</p>
        <p>Time Delivered: ${time_delivered}</p>
        <p>If Rotable Part: ${url_if_rotable_part}</p>
        <p>Logbook Scan: ${url_logbook_scan}</p>
        `
        return content
    }

    const normFile = (e) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }

        return e?.fileList;
    };

    const dummyRequest = async ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    }

    const fileProps = {
        name: 'file',
        multiple: true,
        customRequest: dummyRequest,
    };


    return (
        <div className="books-page">
            <Row>
                <Col xs={1} sm={2} md={6} lg={7}></Col>

                <Col xs={22} sm={20} md={12} lg={10} >

                    <Form form={form} onFinish={save} initialValues={{
                        // ac_fleet: "A320",
                        // ac_registration: "dkn",
                        // airline: "AMERICAN AIRLINES",
                        // // arrival: "01:00:00",
                        // costumber_responsible: "sfsf",
                        // costumer_work_order: "kjnkj",
                        // // date: "2022-06-16",
                        // // depature: "21:07:03",
                        // flight_number: "nml",
                        // job_description: "knkjn",
                        // material_part_number: "kkn",
                        // material_used: "Yes",
                        // qty_techs: "lkn",
                        // service: "TRANSIT CHECK",
                        // station: "GUA",
                        // supervisor_duty: "J.Marroquin",
                        // // time_delivered: "21:07:14",
                        // total_man_hours: "knjn"
                    }}>
                        <br />
                        <br />
                        <br />
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <img style={{ objectFit: 'cover', objectPosition: '50% 50%', width: '100%', height: 'auto' }} src={security} />
                        </div>
                        <br />
                        <br />
                        <br />


                        <Form.Item rules={rules} label="Date" name="date">
                            <DatePicker />
                        </Form.Item>

                        <Form.Item rules={rules} label="A/C Registration" name="ac_registration">
                            <Input />
                        </Form.Item>

                        <Form.Item rules={rules} label="A/C Fleet" name="ac_fleet">
                            <Select
                                showSearch
                                placeholder="A/C Fleet"

                            >
                                <Option value="A320">A320</Option>
                                <Option value="B737">B737</Option>
                                <Option value="B757">B757</Option>
                                <Option value="B767">B767</Option>
                                <Option value="Otro">Otro</Option>

                            </Select>
                        </Form.Item>

                        <Form.Item rules={rules} label="Airline" name="airline">
                            <Select
                                showSearch
                                placeholder="Airline"

                            >
                                <Option value="AMERICAN AIRLINES">AMERICAN AIRLINES</Option>
                                <Option value="VOLARIS Y4">VOLARIS Y4</Option>
                                <Option value="VOLARIS Q6">VOLARIS Q6</Option>
                                <Option value="VOLARIS N3">VOLARIS N3</Option>
                                <Option value="UPS">UPS</Option>
                                <Option value="FRONTIER">FRONTIER</Option>
                                <Option value="SPIRIT">SPIRIT</Option>
                                <Option value="SUNWING">SUNWING</Option>
                                <Option value="OTRO">OTRO</Option>

                            </Select>
                        </Form.Item>




                        <Form.Item rules={rules} label="Flight Number" name="flight_number">
                            <Input />
                        </Form.Item>



                        <Form.Item rules={rules} label="STATION" name="station">
                            <Select
                                showSearch
                                placeholder="STATION"
                            >
                                <Option value="SAL">SAL</Option>
                                <Option value="GUA">GUA</Option>
                                <Option value="SAP">SAP</Option>
                                <Option value="BOG">BOG</Option>
                                <Option value="LIM">LIM</Option>

                            </Select>
                        </Form.Item>


                        <Form.Item rules={rules} label="SERVICE" name="service">
                            <Select
                                showSearch
                                placeholder="SERVICE"

                            >
                                <Option value="TRANSIT CHECK">TRANSIT CHECK</Option>
                                <Option value="PILOT REPORT">PILOT REPORT</Option>
                                <Option value="DAILY CHECK">DAILY CHECK</Option>
                                <Option value="WEEKLY CHECK">WEEKLY CHECK</Option>
                                <Option value="A CHECK">A CHECK</Option>
                                <Option value="BREAK RIDER">BREAK RIDER</Option>
                                <Option value="OTHER">OTHER</Option>

                            </Select>
                        </Form.Item>


                        <Form.Item rules={rules} label="Material used?" name="material_used">
                            <Radio.Group  >
                                <Radio value={'Yes'}>YES</Radio>
                                <Radio value={'No'}>NO</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item rules={rules} label="Material Part Number" name="material_part_number">
                            <Input />
                        </Form.Item>



                        <Form.Item label="If Rotable Part. Scan Part Tag" name="if_rotable_part">
                            <Form.Item name="if_rotable_part" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                                <Upload.Dragger name="files" {...fileProps}  >
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                                </Upload.Dragger>
                            </Form.Item>
                        </Form.Item>



                        <Form.Item rules={rules} label="Job Description" name="job_description">
                            <Input />
                        </Form.Item>



                        <Form.Item rules={rules} label="Costumer Work Order" name="costumer_work_order">
                            <Input />
                        </Form.Item>


                        <Form.Item rules={rules} label="Arrival" name="arrival">
                            <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                        </Form.Item>


                        <Form.Item rules={rules} label="Depature" name="depature">
                            <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                        </Form.Item>


                        <Form.Item rules={rules} label="Qty Techs." name="qty_techs">
                            <Input />
                        </Form.Item>


                        <Form.Item rules={rules} label="Total Man/Hours" name="total_man_hours">
                            <Input />
                        </Form.Item>


                        <Form.Item rules={rules} label="Supervisor on duty" name="supervisor_duty">
                            <Select
                                showSearch
                                placeholder="Supervisor on duty"

                            >
                                <Option value="J.Marroquin">J.Marroquin</Option>
                                <Option value="C.Escobar">C.Escobar</Option>

                                <Option value="Other">Other</Option>

                            </Select>
                        </Form.Item>

                        <Form.Item rules={rules} label="Time logbook was delivered" name="time_delivered">
                            <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                        </Form.Item>

                        <Form.Item rules={rules} label="Costumer responsible approving the service " name="costumber_responsible">
                            <Input />
                        </Form.Item>




                        <Form.Item label="Logbook scan" >
                            <Form.Item name="logbook_scan" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                                <Upload.Dragger name="files" {...fileProps}  >
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                                </Upload.Dragger>
                            </Form.Item>
                        </Form.Item>


                        <Button type="primary" block htmlType="submit" loading={loading} disabled={loading}>
                            Submit
                        </Button>
                    </Form>
                </Col>
                <Col xs={1} sm={2} md={6} lg={7}></Col>
            </Row>
            <br />
        </div >
    )
}

export default Maintenance
