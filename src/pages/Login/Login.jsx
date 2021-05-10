import React, { useCallback, useState } from 'react';
import './Login.css';
import { useHistory } from 'react-router-dom'
import { Layout, Form, Input, Button, Notification } from 'element-react';

const Login = () => {
    const history = useHistory();
    const [formData, updateFormData] = useState({});

    const PostData = useCallback((username, password) => {
        fetch(process.env.REACT_APP_API_PATH + '/auth/login', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    Notification.error({
                        title: 'Error',
                        message: data.message
                    });

                }
                else {
                    if (data.role === 'releaseManager' || 'releaseApprover' || 'requester') {

                        localStorage.setItem("jwt", data.token);
                        localStorage.setItem("user", JSON.stringify(data))

                        Notification({
                            title: 'Success',
                            message: 'SignIn Success',
                            type: 'success'
                        });

                        history.push('/firmware-upload')
                    }
                }
            }).catch(err => {
                Notification.error({
                    title: 'Error',
                    message: 'Something went wrong!'
                });
                console.log(err)
            })
    }, [history]);

    return <div id="login-page" className="page" style={{backgroundImage: "url('./images/loginackground.png')"}}>
        <div className="w-100">
            <Layout.Row align="middle" justify="center" type="flex">
                <Layout.Col xs={24} md={6} >
                    <div>
                        <Form model={formData} rules={{
                            username: [
                                {
                                    required: true,
                                    message: 'Please Enter Username',
                                    trigger: 'blur'
                                }
                            ],
                            password: [
                                {
                                    required: true,
                                    message: 'Please Enter Valid Password',
                                    trigger: 'blur'
                                }
                            ]
                        }}>
                            <Form.Item prop="username">
                                <Input value={formData.username} onChange={(v) => {

                                    updateFormData({ ...formData, username: v })
                                }} placeholder="Username" />
                            </Form.Item>
                            <Form.Item prop="password">
                                <Input value={formData.password} onChange={(v) => {
                                    updateFormData({ ...formData, password: v })
                                }} type="password" placeholder="Password" />
                            </Form.Item>
                            <Button type="primary" onClick={() => {
                                PostData(formData.username, formData.password)
                            }}>Login</Button>
                        </Form>
                    </div>
                </Layout.Col>
            </Layout.Row>
        </div>
    </div>
}
export default Login;