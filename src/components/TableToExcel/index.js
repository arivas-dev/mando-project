import React, { useState, useEffect } from 'react'
import { Button } from 'antd';
import moment from 'moment'
import ExportJsonExcel from 'js-export-excel';
import { FileExcelOutlined } from '@ant-design/icons';

function TableToExcel(props) {
    const { columns, infoBody, nombreArchivo } = props
    // 1. COLUMNS, definidas en cuerpo de tabla, sirve para encabezado de celdas
    // 2. INFOBODY, arreglo con la informacion del cuerpo del excel
    // 3. NOMBREARCHIVO, nombre con el cual se descargará por defecto nuestro excel

    const downloadExcel = () => {
        var option = {};
        let headers = columns.map(e => e.title)

        option.fileName = nombreArchivo ? nombreArchivo + '_' + moment(new Date).format('DD-MM-YYYY') : moment(new Date).format('DD-MM-YYYY')
        option.datas = [
            {
                sheetData: infoBody,
                sheetHeader: [...headers],
            }
        ];

        var toExcel = new ExportJsonExcel(option);
        toExcel.saveExcel();
    }

    return (
        infoBody.length > 0 &&
        <div className="row">
            <div className="col-md-12 text-rigth">
                <Button style={{ display: 'flex', alignItems: 'center' }} type="primary" onClick={() => downloadExcel()} icon={<FileExcelOutlined />}>Download Excel</Button>
            </div>
            <br />
            <br />
        </div>
    )
}



export default TableToExcel