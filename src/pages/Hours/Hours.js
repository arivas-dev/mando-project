import { AppContext } from 'context/app'
import { useContext } from 'react'
import { Form, Input, Col, Row, DatePicker, Select, Radio, TimePicker, Button, message } from 'antd'
import security from 'assets/img/login/logo.jpeg';
import moment from 'moment'
import { getFirestore, doc, collection, setDoc, addDoc, db } from "firebase/firestore";
import {firebaseApp} from "firebase";
import { LocalStorageHandler } from 'utils/LocalStorageHandler'

const { Item } = Form;
const { Option } = Select;

const Hours = () => {
  const firestore = getFirestore(firebaseApp);
  const { user } = useContext(AppContext)
  console.log("Hours  -  user", user);
  const [form] = Form.useForm();
  const uid = LocalStorageHandler.user.uid

  const rules = [{ required: true, message: 'Field is required' }];

  const save = async (fieldsValue) => {
    try {
      const values = {
        ...fieldsValue,
        'date': fieldsValue['date'].format('YYYY-MM-DD'),
        'time_of_entry': fieldsValue['time_of_entry'].format('HH:mm:ss'),
        'time_of_exit': fieldsValue['time_of_exit'].format('HH:mm:ss'),
      };
      console.log('Received values of form: ', values);
      // const docuRef = doc(firestore, `hours/${uid}`);
      // setDoc(docuRef, { ...values });

      // Add a new document with a generated id.
      const docRef = await addDoc(collection(firestore, "hours"), { ...values });
      form.resetFields()
      message.success('Saved successfully')
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
      message.error('Error saving')
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
              <img style={{height : '128px',objectFit : 'cover',objectPosition : '50% 50%',width : '730px'}} src={security} />
            </div>
            <br />
            <br />
            <br />

            <Form.Item
              label="Estación"
              name="station"
              rules={rules}
            >
              <Select
                showSearch
                placeholder="STATION"

              >
                <Option value="SAL">SAL</Option>
                <Option value="GUA">GUA</Option>
                <Option value="SAP">SAP</Option>
              </Select>
            </Form.Item>


            <Form.Item
              label="Nombre"
              name="name"
              rules={rules}
            >
              <Input />
            </Form.Item>


            <Form.Item
              label="Fecha"
              name="date"
              rules={rules}
            >
              <DatePicker />
            </Form.Item>


            <Form.Item
              label="¿La fecha reportada como laborada, es en su día libre?"
              name="day_off"
              rules={rules}
            >
              <Radio.Group  >
                <Radio value={1}>SI</Radio>
                <Radio value={2}>NO</Radio>
              </Radio.Group>
            </Form.Item>


            <Form.Item label="Hora de Entrada" name="time_of_entry" rules={rules}>
              <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
            </Form.Item>


            <Form.Item label="Hora de Salida" name="time_of_exit" rules={rules}>
              <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
            </Form.Item>

            <Form.Item label="Justificación de horas extra realizadas o día libre laborado" name="justification" rules={rules}>
              <Input />
            </Form.Item>

            <Form.Item label="¿Cuantas horas extra realizo?" name="number_of_hours" rules={rules}>
              <Radio.Group  >
                <Radio value={1}>1</Radio>
                <Radio value={2}>2</Radio>
                <Radio value={3}>3</Radio>
                <Radio value={4}>4</Radio>
                <Radio value={5}>5</Radio>
                <Radio value={6}>6</Radio>
                <Radio value={7}>7</Radio>
                <Radio value={8}>8</Radio>
                <Radio value={9}>9</Radio>
                <Radio value={10}>10</Radio>
              </Radio.Group>
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

export default Hours
