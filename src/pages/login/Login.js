import { messages } from 'constants/messages';
import security from 'assets/img/login/logo.jpeg';
import { Link, Navigate } from 'react-router-dom';
import React, { useState, useRef } from 'react'
import './Login.scss';

import { AppContext } from 'context/app'
import { LocalStorageHandler } from 'utils/LocalStorageHandler'
import { useContext } from 'react'
import { Form, Spin, Button, Input, message } from 'antd'
import { AppRoutes } from 'constants/app.routes';

const Login = () => {
    const btnRef = useRef();

    const { login, user, setRole } = useContext(AppContext)
    
    const form = Form.useForm()[0]


    const handleFormSubmit = (data) => {
        login(data.email, data.password).then((r) => {
            if (typeof r === 'string') return message.error(r)
        })
    }


    const handleKey = evt => {
        if (evt.keyCode === 13 && btnRef.current) {
            btnRef.current.click();
        }
    }

    if (LocalStorageHandler.token) {
        return (
            <Navigate
                to={
                    user.data.role === 'user'
                        ? `/${AppRoutes.user_routes.base}`
                        : `/${AppRoutes.admin_routes.base}`
                }
            />
        )
    }


    return (
        <>
            <span className="login-bg" />
            <div className="login">
                <img src={security} className="logo" />
                <Form
                    className="login-page-form"
                    form={form}
                    onFinish={handleFormSubmit}
                    layout="vertical"
                    // initialValues={{email: 'user@gmail.com',password : 'Inicio123'}}
                    style={{ width: '100%' }}
                >

                    <Spin tip="Loading..." spinning={user.isLoading} >

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email.' }]}
                        >
                            <Input
                                placeholder="Email"
                                type="email"
                                className="login-page-email"
                            />
                        </Form.Item>


                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                { required: true, message: 'Please input your password.' },
                                {
                                    min: 8,
                                    message: 'Your passsword should have 8 chars at least',
                                },
                                {
                                    max: 30,
                                    message: 'Your passsword should not exceeed 30 chars.',
                                },
                            ]}
                        >
                            <Input.Password
                                placeholder="Password"
                                className="login-page-password"
                            />
                        </Form.Item>

                        <div className="login-page-buttons">
                            <Button htmlType="reset">Cancel</Button>
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                        </div>

                    </Spin>

                </Form>

            </div>
        </>
    )
};

export default Login;
