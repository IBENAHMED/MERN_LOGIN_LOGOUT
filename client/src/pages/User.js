import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const User = () => {
    const [cookies, setCookies, removeCookie] = useCookies("access_token");
    const navigate = useNavigate();

    const Logout = () => {
        removeCookie("access_token");
        localStorage.removeItem('userID');
        localStorage.removeItem('role');
        navigate("/login")
    }

    return (
        <div>
            <h1>User Can't see DASHBORD</h1>
            <button onClick={Logout}>logout</button>
        </div>
    )
}

export default User
