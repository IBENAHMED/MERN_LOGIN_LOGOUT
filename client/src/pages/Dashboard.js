import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const Dashboard = () => {
    const navigate = useNavigate()
    const [quote, setQuote] = useState('');
    const [tempQuote, setTempQuote] = useState('');
    const [cookies, setCookies, removeCookie] = useCookies("access_token");

    useEffect(() => {
        const token = cookies.access_token;
        if (token) {
            const user = jwtDecode(token)
            if (!user) {
                Logout()
            } else {
                populateQuote()
            }
        }
    }, []);

    async function populateQuote() {
        const req = await fetch('http://localhost:5000/api/quote', {
            headers: {
                'x-access-token': cookies.access_token,
            },
        })

        const data = await req.json();
        if (data.status === 'ok') {
            setQuote(data.quote)
        } else {
            // Just ADMIN CAN GO TO THE DASHBORD
            // Logout();
            // navigate("/user")
            console.log("Just ADMIN CAN GO TO THE DASHBORD")
        }
    }

    async function updateQuote(event) {
        event.preventDefault()

        const req = await fetch('http://localhost:5000/api/quote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': cookies.access_token,
            },
            body: JSON.stringify({
                quote: tempQuote,
            }),
        })

        const data = await req.json()
        if (data.status === 'ok') {
            setQuote(tempQuote)
            setTempQuote('')
        } else {
            alert(data.error)
        }
    }

    const Logout = () => {
        removeCookie("access_token");
        localStorage.removeItem('userID');
        localStorage.removeItem('role');
        navigate("/login")
    }

    return (
        <div>
            <h1>Your quote: {quote || 'No quote found'}</h1>
            <form onSubmit={updateQuote}>
                <input
                    type="text"
                    placeholder="Quote"
                    value={tempQuote}
                    onChange={(e) => setTempQuote(e.target.value)}
                />
                <input type="submit" value="Update quote" />
                <button onClick={Logout}>logout</button>
                <Link to="/register">
                    <button>register</button>
                </Link>
                <Link to="/login">
                    <button>Login</button>
                </Link>
            </form>
        </div>
    )
}

export default Dashboard
