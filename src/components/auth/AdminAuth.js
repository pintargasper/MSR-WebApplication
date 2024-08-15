import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import axios from "axios";
import {useAuth} from "./AuthContext";

const AdminAuth = ({children}) => {

    const [auth, setAuth] = useState(null);

    const { token, setUserRoleValue } = useAuth();

    useEffect(() => {
        if (!token) {
            setAuth(false);
            return;
        }

        const fetchData = async () => {
            try {
                const response = await axios({
                    method: "post",
                    url: process.env.REACT_APP_AUTH_ADMIN,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = response.data;
                setAuth(true);
                if (data) {
                    setAuth(data);
                    setUserRoleValue("ROLE_ADMIN");
                    return;
                }
                setAuth(false);
            } catch (error) {
                setAuth(false);
            }
        };
        fetchData().then(result => null);
    }, [setUserRoleValue, token]);

    if (auth === null) {
        return <div>Loading...</div>;
    }

    return (
        !auth ? <Navigate to={"/admin"}/> : children
    );
};

export default AdminAuth;