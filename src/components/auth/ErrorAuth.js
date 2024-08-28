import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import * as Token from "./cookies/Cookies";
import Page404 from "../pages/404";

const ErrorAuth = ({ children }) => {
    const [auth, setAuth] = useState(false);

    const token = Token.getToken();
    const { setUserRoleValue } = useAuth();

    useEffect(() => {
        if (!token) {
            setAuth(false);
            return;
        }

        axios({
            method: "post",
            url: process.env.REACT_APP_AUTH_ERROR,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.data)
            .then(data => {
                if (data === "ROLE_USER" || data === "ROLE_ADMIN") {
                    setUserRoleValue(data);
                    setAuth(true);
                    return;
                }
                setAuth(false);
            })
            .catch(error => {
                setAuth(false);
            });
    }, [setUserRoleValue, token]);
    return auth ? children : <Page404 />;
};

export default ErrorAuth;