// src/App.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Registeer() {

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function registerUser(event) {
        event.preventDefault();

        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        })

        const data = await response.json()
        if (data.status === 'ok') {
            navigate('/login')
        }
    }

    return (
        <div>
            <h1>Registerrrrr</h1>
            <form onSubmit={registerUser}>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Name"
                />
                <br />
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
                <input type="submit" value="Register" />
                <Link to="/login">
                    <button>Login</button>
                </Link>
            </form>
        </div>
    )
}

export default Registeer;