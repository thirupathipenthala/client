import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
import '../../App.css';
const SignIn = () => {
    const history = useHistory()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const PostData = () => {
        fetch('http://localhost:5000/auth/login', {
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
                console.log("json data ::" + JSON.stringify(data))
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    if (data.role === 'releaseManager') {
                        console.log("role based:" + data.role)

                        localStorage.setItem("jwt", data.token)
                        localStorage.setItem("user", JSON.stringify(data))
                        console.log("user :" + username.role)
                        M.toast({ html: "SignIn Success", classes: "#43a047 green darken-1" })
                        history.push('/Fotaupload')
                    }
                }
            }).catch(err => {
                console.log(err)
            })
    }
    return (
        <div className="container">
            <div className="">
                <h2>TechTez</h2>
                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className=""
                    onClick={() => PostData()}
                >
                    Login
              </button>
                <h5>
                    <Link to="/SignUp.js">Dont have an account ?</Link>
                </h5>
                <h6>
                </h6>
            </div>
        </div>
    )
}
export default SignIn