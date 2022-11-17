import React, { useState, useEffect } from 'react'
import { Table, Typography,Row,Col } from 'antd'
import { firebaseApp } from "firebase";
import { getFirestore, doc, collection, getDocs, } from "firebase/firestore";
import TableToExcel from 'components/TableToExcel/index';



const fields = ['id', 'date', 'day_off', 'justification', 'name', 'number_of_hours', 'station', 'time_of_entry', 'time_of_exit','extra_hours','work_order']
const columns = fields.map(f => ({
    title: f.toUpperCase().replaceAll('_', ' '),
    dataIndex: f,
    key: f,
})).map(e => {
    if (e.dataIndex === 'extra_hours') {
        return {
            ...e,
            render: (text, record) => {
                return (
                    <div>
                        {text === 1 ? 'SI' : 'NO'}
                    </div>
                )
            }
        }
    }
    return e
})



const HourResults = () => {
    const [data, setData] = useState([])
    const firestore = getFirestore(firebaseApp);

    useEffect(() => {
        getAll()
    }, [])

    const getAll = async () => {
        const docuCifrada = await getDocs(collection(firestore, `hours`));
        const documentos = docuCifrada.docs.map((doc) => ({ ...doc.data()})).sort((a, b) => a.added_at > b.added_at ? 1 : -1).map((doc,index) =>{
            
            //generate id by year of added_at
            const id = doc.added_at ? doc.added_at.split('-')[0]+'-00' + (index+1) : ''
            return {
                ...doc,
                id
            }
        });;
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