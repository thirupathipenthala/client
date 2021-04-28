import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import M from 'materialize-css'

const SignIn = () => {
    // const histor = useHistory()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const PostData = () => {

        fetch("/auth/login", {
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
                        console.log("role :" + data.role)

                        M.toast({ html: "SignIn Success", classes: "#43a047 green darken-1" })

                    }

                }
            }).catch(err => {
                console.log(err)
            })
    }
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
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
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
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