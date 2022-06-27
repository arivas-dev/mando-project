import React, { useState, useEffect } from 'react'
import { Table, Typography, Modal, Image } from 'antd'
import { firebaseApp } from "firebase";
import { getFirestore, doc, collection, getDocs, } from "firebase/firestore";
import { FileImageOutlined } from '@ant-design/icons';
const fields = ['id', 'ac_fleet', 'ac_registration', 'airline', 'arrival', 'costumber_responsible', 'costumer_work_order', 'date', 'depature', 'flight_number', 'job_description', 'service', 'station']



const columns = fields.map(f => ({
    title: f,
    dataIndex: f,
    key: f,
}))
const MaintenanceResults = () => {
    const [data, setData] = useState([])
    const firestore = getFirestore(firebaseApp);

    useEffect(() => {
        getAll()
    }, [])

    const getAll = async () => {
        const docuCifrada = await getDocs(collection(firestore, `maintenance`));
        const year = new Date().getFullYear()
        const documentos = docuCifrada.docs.map((doc, index) => ({ ...doc.data(), id: `${year}-00${index + 1}` }));
        setData(documentos)
    }

    const showImages = (images) => {
        const url_images = images.split(',')
        Modal.info({
            title: 'Images uploaded',
            content: (
                <div style={{display : 'flex',marginTop : '20px'}}>
                    {
                        url_images.map((url, index) => {
                            return url && (
                                <div key={index} style={{margin : '10px'}}>
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

    return (
        <div className="books-page">
            <br />
            <Typography.Title align="center">Maintenance Results</Typography.Title>

            <Table columns={[...columns, ...columns_image]} dataSource={data} />
        </div>
    )
}

export default MaintenanceResults