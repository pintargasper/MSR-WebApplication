import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import axios from "axios";
import {useAuth} from "./AuthContext";

const PublicAuth = ({children}) => {

    const [auth, setAuth] = useState(null);
    const [role, setRole] = useState(null);

    const { token, userData, setUserRoleValue } = useAuth();

    useEffect(() => {
        if (!token) {
            setAuth(false);
            return;
        }

        const fetchData = async () => {

            while (!userData || !userData.username) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }

            try {
                const response = await axios({
                    method: "post",
                    url: process.env.REACT_APP_AUTH_PUBLIC,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = response.data;
                setAuth(true);
                if (data === "ROLE_ADMIN" || data === "ROLE_USER") {
                    setAuth(true);
                    setUserRoleValue(data);
                    setRole(data);
                    return;
                }
                setAuth(false);
            } catch (error) {
                setAuth(false);
            }
        };
        fetchData().then(result => null);
    }, [setUserRoleValue, token, userData, userData.username]);

    if (auth === null) {
        return <div>Loading...</div>;
    }

    return (
        auth && role === "ROLE_ADMIN" ? <Navigate to={"/dashboard"}/> : auth && role === "ROLE_USER" ? <Navigate to={`/${userData.username}`}/> : children
    );
};

export default PublicAuth;