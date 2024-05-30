import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    let [_, setCookies] = useCookies(["access_token"]);

    async function loginUser(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })

        const data = await response.json()

        if (data.user) {
            ("access_token", data.user);
            localStorage.setItem('userID', data._id);
            localStorage.setItem('role', data.role);
            if (data.user && data.role === "admin") {
                setCookiesnavigate("/dashboard")
            } else if (data.user && data.role !== "admin") {
                navigate("/user")
            } else {
                alert("page Error 404")
            }

        } else {
            alert('Please check your username and password')
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={loginUser}>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                />
                <br />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                />
                <br />
                <input type="submit" value="Login" />
                <Link to="/register">
                    <button>register</button>
                </Link>
            </form>
        </div>
    )
}

export default Login

