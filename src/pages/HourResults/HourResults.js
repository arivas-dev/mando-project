import React, { useState, useEffect } from 'react'
import { Table,Typography } from 'antd'
import {firebaseApp} from "firebase";
import { getFirestore, doc, collection,getDocs,} from "firebase/firestore";
const fields = ['date', 'day_off', 'justification', 'name', 'number_of_hours', 'station', 'time_of_entry', 'time_of_exit']

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
      
        const documentos = docuCifrada.docs.map(doc => doc.data());
        setData(documentos)

    }
    return (
        <div className="books-page">
            <br />
            <Typography.Title align="center">Hours Results</Typography.Title>

            <Table columns={columns} dataSource={data}/>
        </div>
    )
}

export default HourResults