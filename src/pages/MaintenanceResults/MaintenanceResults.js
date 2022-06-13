import React, { useState, useEffect } from 'react'
import { Table,Typography } from 'antd'
import {firebaseApp} from "firebase";
import { getFirestore, doc, collection,getDocs,} from "firebase/firestore";
const fields = ['id','ac_fleet','ac_registration','airline','arrival','costumber_responsible','costumer_work_order','date','depature','flight_number','job_description','service','station']



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
        const documentos = docuCifrada.docs.reverse().map((doc,index) => ({...doc.data(),id: `${year}-00${index+1}`})).reverse();
        setData(documentos)
    }
    return (
        <div className="books-page">
            <br />
            <Typography.Title align="center">Maintenance Results</Typography.Title>

            <Table columns={columns} dataSource={data}/>
        </div>
    )
}

export default MaintenanceResults