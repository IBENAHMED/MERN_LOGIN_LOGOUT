import { Navigate } from "react-router-dom"
import { useCookies } from "react-cookie"

export const PrivateRoute = ({ children }) => {
    let [cookies, setCookies, removeCookie] = useCookies("access_token")
    let role = localStorage.getItem("role")

    if (cookies.access_token && role == "admin") {
        return children
    }

    return <Navigate to="/user" />

}