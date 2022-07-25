import React, { useState, useEffect } from 'react'
import { Table, Typography,Row,Col } from 'antd'
import { firebaseApp } from "firebase";
import { getFirestore, doc, collection, getDocs, } from "firebase/firestore";
import TableToExcel from 'components/TableToExcel/index';



const fields = ['id', 'date', 'day_off', 'justification', 'name', 'number_of_hours', 'station', 'time_of_entry', 'time_of_exit']
const columns = fields.map(f => ({
    title: f,
    dataIndex: f,
    key: f,
}))
const HourResults = () => {
    const [data, setData] = useState([])
    const firestore = getFirestore(firebaseApp);

    useEffect(() => {
        getAll()
    }, [])

    const getAll = async () => {
        const docuCifrada = await getDocs(collection(firestore, `hours`));
        const year = new Date().getFullYear()
        const documentos = docuCifrada.docs.map((doc, index) => ({ ...doc.data(), id: `${year}-00${index + 1}` }));
        setData(documentos)

    }

    const indexes = columns.reduce((acc, el) => acc.concat(el.dataIndex), []);

    return (
        <div className="books-page">
            <br />
            <Typography.Title align="center">Hours Results</Typography.Title>
            <Row gutter={16}>
                <Col className="gutter-row" span={6} offset={1}>
                    <TableToExcel columns={columns} nombreArchivo={'Hours Results'}
                        infoBody={[...(data).map((d) => ({
                            ...indexes.reduce((acc, el) => ({ ...acc, [el]: d[el] }), {})
                        }))]} />
                </Col>
            </Row>
            <Row>
                <Col className="gutter-row" span={22} offset={1}>
                    <Table columns={columns} dataSource={data} />
                </Col>
            </Row>


        </div>
    )
}

export default HourResults