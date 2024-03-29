import React, { useState, useEffect } from 'react'
import { Table, Typography, Modal, Image,Row,Col } from 'antd'
import { firebaseApp } from "firebase";
import { getFirestore, doc, collection, getDocs, } from "firebase/firestore";
import { FileImageOutlined } from '@ant-design/icons';
import TableToExcel from 'components/TableToExcel/index';

const fields = ['id', 'ac_fleet', 'ac_registration', 'airline', 'arrival', 'costumber_responsible', 'costumer_work_order', 'date', 'depature', 'flight_number', 'job_description', 'service', 'station']

const columns = fields.map(f => ({
    title: f.toUpperCase().replaceAll('_', ' '),
    dataIndex: f,
    key: f,
})).map((el, index) => {
    if (el.dataIndex === 'id') {
        return {
            ...el,
            title : 'WORK ORDER',
        }
    }
    return el
})


const MaintenanceResults = () => {
    const [data, setData] = useState([])
    const firestore = getFirestore(firebaseApp);

    useEffect(() => {
        getAll()
    }, [])

    const padLeft = (number, targetLength) => String(number).padStart(targetLength, '0');

    const getAll = async () => {
        const docuCifrada = await getDocs(collection(firestore, `maintenance`));
        
        const documentos = docuCifrada.docs.map((doc, index) => ({ ...doc.data() })).sort((a, b) => a.added_at > b.added_at ? 1 : -1).map((doc,index) =>{
            
            //generate id by year of added_at
            // const id = doc.added_at ? doc.added_at.split('-')[0]+'-00' + (index+1) : ''
            const id = 'W' + padLeft(index+1,4)
            return {
                ...doc,
                id
            }
        });
        console.log("getAll  -  documentos", documentos);
        setData(documentos)
    }

    const showImages = (images) => {
        const url_images = images.split(',')
        Modal.info({
            title: 'Images uploaded',
            content: (
                <div style={{ display: 'flex', marginTop: '20px' }}>
                    {
                        url_images.map((url, index) => {
                            return url && (
                                <div key={index} style={{ margin: '10px' }}>
                                    <Image
                                        width={100}
                                        height={100}
                                        src={url}

                                    />
                                </div>
                            )
                        })
                    }



                </div>
            ),
            onOk() { },
        });
    };

    const columns_image = [{
        title: 'If Rotable Part',
        dataIndex: 'url_if_rotable_part',
        key: 'url_if_rotable_part',
        render: (text, row) => {
            return (
                text && (
                    <div onClick={() => showImages(text)}>
                        <FileImageOutlined />
                    </div>
                )
            )
        }
    }, {
        title: 'Logbook Scan',
        dataIndex: 'url_logbook_scan',
        key: 'url_logbook_scan',
        render: (text, row) => {
            return (
                text && (
                    <div onClick={() => showImages(text)}>
                        <FileImageOutlined />
                    </div>
                )
            )
        }
    }]

    const indexes = columns.reduce((acc, el) => acc.concat(el.dataIndex), []);

    return (
        <div className="books-page">
            <br />
            <Typography.Title align="center">Maintenance Results</Typography.Title>

            <Row gutter={16}>
                <Col className="gutter-row" span={6} offset={1}>
                    <TableToExcel columns={columns} nombreArchivo={'Maintenance Results'}
                        infoBody={[...(data).map((d) => ({
                            ...indexes.reduce((acc, el) => ({ ...acc, [el]: d[el] }), {})
                        }))]} />
                </Col>
            </Row>
            <Row>
                <Col className="gutter-row" span={22} offset={1}>
                    <Table columns={[...columns, ...columns_image]} dataSource={data} />
                </Col>
            </Row>

        </div>
    )
}

export default MaintenanceResults