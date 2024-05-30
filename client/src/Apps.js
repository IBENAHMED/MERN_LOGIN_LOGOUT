import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login'
import Registeer from './pages/Registeer'
import Dashboard from './pages/Dashboard';
import User from './pages/User';
import { useCookies } from "react-cookie"
import { PrivateRoute } from './utils/PrivateRoute';



const Apps = () => {

    let [cookies, setCookies, removeCookie] = useCookies("access_token");
    let role = localStorage.getItem("role");

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/register' element={<Registeer />} />
                    <Route path='/login' element={<Login />} />
                    <Route
                        path='/user'
                        element={<User />}
                    />
                    <Route
                        path="/dashboard"
                        element={<PrivateRoute><Dashboard /></PrivateRoute>}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Apps
