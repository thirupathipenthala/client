import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { forgotPassword } from '../../services/firmware'
import { Notification } from 'element-react'
function ForgotPassword() {
    const [email, setEmail] = useState("")
    const history = useHistory();
    const PostData = useCallback(() => {
        if (email) {
            forgotPassword(email)
                .then(res => {
                    console.log(JSON.stringify(res))
                    if (res.error === true) {
                        Notification.error({
                            title: 'Error',
                            message: res.message
                        });
                    }
                    else {
                        Notification({
                            title: 'Success',
                            message: res.message,
                            type: 'success'
                        });
                        history.push('/Login')
                    }
                }).catch(error => {
                    Notification.error({
                        title: 'Error',
                        message: 'Something went wrong!'
                    });
                    console.log(error)
                })
        }
    }, [email])

    return (
        <div className="">
            <div className="">

                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button className=""
                    onClick={() => PostData()}
                >
                    Forgot-Password
            </button>


            </div>
        </div>
    );
}
export default ForgotPassword;