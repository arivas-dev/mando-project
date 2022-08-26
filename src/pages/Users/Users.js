import { AppContext } from 'context/app'
import { useContext } from 'react'
import { Form, Input, Col, Row, DatePicker, Select, Radio, TimePicker, Button, message } from 'antd'
import security from 'assets/img/login/logo.jpeg';
import moment from 'moment'
import { getFirestore, doc, collection, setDoc, addDoc, db } from "firebase/firestore";
import { firebaseApp } from "firebase";
import { LocalStorageHandler } from 'utils/LocalStorageHandler'
import { getFunctions, httpsCallable } from "firebase/functions";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const { Item } = Form;
const { Option } = Select;
const name = 'Hourly survey data'


const Users = () => {
    const firestore = getFirestore(firebaseApp);
    const auth = getAuth(firebaseApp);
    const functions = getFunctions();

    const { user } = useContext(AppContext)
    const {email} = user
    const [form] = Form.useForm();
    const rules = [{ required: true, message: 'Field is required' }];

    const sendEmail = httpsCallable(functions, 'sendEmail');

    //function to build the email content with the data from the form
    const buildEmail = (data) => {
        const { name, email, number_of_hours, justification, station, time_of_entry, time_of_exit, day_off } = data;
        const date = moment().format('DD/MM/YYYY');
        const time = moment().format('HH:mm');
        const content = `Data sent: ${date} - ${time}<br>
    Name: ${name}<br>
    Email: ${email}<br>
    Number of hours: ${number_of_hours}<br>
    Justification: ${justification}<br>
    Station: ${station}<br>
    Time of entry: ${time_of_entry}<br>
    Time of exit: ${time_of_exit}<br>
    Day off: ${day_off}<br>`;
        return content;
    }

    const save = async ({ email, password, rol }) => {
        try {

            const infoUsuario = await createUserWithEmailAndPassword(auth, email, password).then(usuarioFirebase => {
                return usuarioFirebase
            })
            console.log("infoUsuario  -  infoUsuario", infoUsuario);

            const docuRef = doc(firestore, `users/${infoUsuario.user.uid}`);

            setDoc(docuRef, { email, role: rol })
            form.resetFields()
            message.success('Saved successfully')
        } catch (error) {
            message.error(getErrorMessage(error))
            console.error("Error adding document: ", error);

        }
    }

    const getErrorMessage = (error) => {
        switch (error.code) {
            case 'auth/email-already-in-use':
                return 'The email is already in use';
            case 'auth/invalid-email':
                return 'The email is invalid';
            case 'auth/operation-not-allowed':
                return 'The operation is not allowed';
            case 'auth/weak-password':
                return 'The password is too weak';
            default:
                return 'Unknown error';
        }

    }


    return (
        <div className="books-page">
            <Row>
                <Col xs={1} sm={2} md={6} lg={7}></Col>

                <Col xs={22} sm={20} md={12} lg={10} >

                    <Form form={form} onFinish={save}>
                        <br />
                        <br />
                        <br />
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <img style={{ objectFit: 'cover', objectPosition: '50% 50%', width: '100%', height: 'auto' }} src={security} />
                        </div>
                        <br />
                        <br />
                        <br />

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={rules}
                        >
                            <Input />
                        </Form.Item>


                        <Form.Item
                            label="Password"
                            name="password"
                            rules={rules}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Role"
                            name="rol"
                            rules={rules}
                        >
                            <Select
                                showSearch
                                placeholder="ROLE"

                            >
                                <Option value="admin">ADMIN</Option>
                                <Option value="user">USER</Option>
                            </Select>
                        </Form.Item>






                        <Button type="primary" block htmlType="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
                <Col xs={1} sm={2} md={6} lg={7}></Col>
            </Row>

        </div>
    )
}

export default Users
