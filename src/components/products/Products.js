import { Table, Pagination } from 'antd';
import { deleteProduct, retrieveProducts, saveProduct, updateProduct } from 'store/actions/productActions';
import { ProductModal } from 'components/productModal/ProductModal';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMessenger } from 'hooks/useMessenger';
import { messages } from 'constants/messages';
// import { storage } from '../../firebase'
import { Popconfirm } from '../../../node_modules/antd/lib/index';



import security from 'assets/img/login/logo.jpeg';

import { Form, Input, Col, Row, DatePicker, Select, Radio, TimePicker, Button } from 'antd'

import 'antd/dist/antd.css';

import moment from 'moment';
// import security from '../assets/logo.jpeg';





const { Item } = Form;
const { Option } = Select;



function onChange(time, timeString) {
    console.log(time, timeString);
}


export const Products = () => {
    //Local state
    const [currentPage, setCurrentPage] = useState(1);
    const [selected, setSelected] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState('New');

    //Redux
    const productsNode = useSelector(s => s.product.products);
    const registerNode = useSelector(s => s.product.register);
    const updateNode = useSelector(s => s.product.update);
    const { isLoading, data, firstFetch } = productsNode;
    const dispatch = useDispatch();


    //Messages
    useMessenger(registerNode, messages.products.created);
    useMessenger(updateNode, messages.products.updated);


    const columns = [
        {
            title: ' ',
            align: 'center',
            render: (text, record) => (
                <div className="control">
                    <label class="radio">
                        <input
                            type="radio"
                            name="user"
                            checked={record.id === selected.id}
                            onChange={(e) => setSelected(record)}
                        />
                    </label>
                </div>
            ),
        },
        {
            title: 'SKU',
            dataIndex: 'SKU',
            key: 'SKU',
            align: 'center'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: 'center'
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center'
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            align: 'center'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            align: 'center'
        },
    ];

    useEffect(() => {
        if (firstFetch && !isLoading) {
            dispatch(retrieveProducts(currentPage));
        }
    }, [firstFetch, isLoading, dispatch, currentPage]);

    const handleNew = () => {
        setModalAction('New');
        setModalOpen(true);
    }

    const handleUpdate = () => {
        setModalAction('Update');
        setModalOpen(true);
    }

    const handlePagination = page => {
        if (page !== currentPage) {
            setCurrentPage(page);
            dispatch(retrieveProducts(page));
        }
    }

    const onSave = product => {
        dispatch(saveProduct(product, currentPage));
    }

    const onUpdate = async (product) => {
        await dispatch(updateProduct({ ...product, id: selected.id }));
        setSelected({});
        setModalOpen(false);
    }

    const handleDelete = async () => {
        await dispatch(deleteProduct({ id: selected.id }));
        setSelected({});
    }


    const { per_page: perPage = 15, total: pageTotal = 1 } = data.meta || {}
    const total = perPage * pageTotal;

    return (
        <div className="users">
            {/* <div className="users-actions">
                <button
                    onClick={handleNew}
                    className="button is-dark"
                >
                    New Product
                </button>
                <button
                    onClick={handleUpdate}
                    disabled={!selected.id}
                    className="button is-info"
                >
                    Update Product
                </button>

                <Popconfirm
                    title="Are you sure to delete this product?"
                    onConfirm={handleDelete}
                    onCancel={null}
                    okText="Yes"
                    cancelText="No"
                    disabled={!selected.id}
                >
                    <a
                        href="!#"
                        disabled={!selected.id}
                        className="button is-danger"
                    >
                        Delete Product
                </a>
                </Popconfirm>

            </div>
            <div className="users-data">
                <Table
                    loading={isLoading}
                    dataSource={data.list}
                    columns={columns}
                    pagination={false}
                    scroll={{ x: 1200 }}
                />
                <div className="users-pagination">
                    <Pagination
                        disabled={isLoading}
                        total={total}
                        defaultCurrent={1}
                        pageSize={perPage}
                        onChange={page => handlePagination(page)}
                    />
                </div>
            </div>


            <ProductModal
                action={modalAction}
                setVisible={setModalOpen}
                visible={modalOpen}
                loading={registerNode.isLoading || updateNode.isLoading}
                onSave={onSave}
                onUpdate={onUpdate}
                product={selected}
            /> */}
            <br />
            <br />
            <Row>
                <Col xs={1} sm={2} md={6} lg={7}></Col>

                <Col xs={22} sm={20} md={12} lg={10} >

                    <Form>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <img width="325px" height="150px" src={security} />
                        </div>
                        <br />
                        <br />
                        <br />

                        <Item label="STATION">
                            <Select
                                showSearch
                                placeholder="STATION"

                            >
                                <Option value="SAL">SAL</Option>
                                <Option value="GUA">GUA</Option>
                                <Option value="SAP">SAP</Option>
                            </Select>
                        </Item>



                        <Item label="Nombre">
                            <Input />
                        </Item>



                        <Item label="Fecha">
                            <DatePicker />
                        </Item>
                        <Item label="¿La fecha reportada como laborada, es en su día libre?" >
                            <Radio.Group  >
                                <Radio value={1}>SI</Radio>
                                <Radio value={2}>NO</Radio>

                            </Radio.Group>
                        </Item>
                        <Item label="Hora de Entrada" >
                            <TimePicker onChange={onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                        </Item>

                        <Item label="Hora de Salida" >
                            <TimePicker onChange={onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                        </Item>
                        <Item label="Justificación de horas extra realizadas o día libre laborado">
                            <Input />
                        </Item>
                        <Item label="¿Cuantas horas extra realizo?" >
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
                        </Item>
                    </Form>
                </Col>
                <Col xs={1} sm={2} md={6} lg={7}></Col>
            </Row>

            <Row>
                <Col span={12} offset={6}>
                    <Button type="primary" block>
                        Submit
                    </Button>
                </Col>
            </Row>

            {/* <Row>
                <Col xs={22} sm={20} md={12} lg={10} >
                </Col>
            </Row> */}
        </div>
    );
};
