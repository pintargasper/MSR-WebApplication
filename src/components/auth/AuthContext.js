import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import * as Cookies from "./cookies/Cookies";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(Cookies.getToken());
    const [cookieAgreement, setCookieAgreement] = useState(Cookies.getCookieAgreement());
    const [userRole, setUserRole] = useState(null);
    const [userData, setUserData] = useState({});
    const [deletedAccount, setDeletedAccount] = useState(false);
    const [profileImage, setProfileImage] = useState("");

    useEffect(() => {

        if (!token) {
            return;
        }

        const fetchData = async () => {
            try {
                const response = await axios({
                    method: "post",
                    url: process.env.REACT_APP_USER_DATA,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = response.data;
                setUserData(data);
                setProfileImage(userData.image);
            } catch (error) {
                Cookies.clear();
            }
        };
        fetchData().then(result => null);
    }, [token, userRole, userData.image]);


    const setTokenValue = (value) => {setToken(value); Cookies.save(value, true);}
    const setCookieAgreementValue = (value) => {setCookieAgreement(value); Cookies.saveCookieAgreement(value);}
    const clearCookie = () => {Cookies.clear();}
    const setUserRoleValue = (role) => setUserRole(role);
    const signOut = () => {Cookies.clear(); setUserRoleValue(null); setTokenValue(null); clearCookie();}
    const addProfileImage = (image) => setProfileImage(image);
    const accountDelete = (is) => setDeletedAccount(is);

    return (
        <AuthContext.Provider value={{ token, cookieAgreement, setCookieAgreementValue: setCookieAgreementValue, setTokenValue: setTokenValue, userRole: userRole, setUserRoleValue: setUserRoleValue, signOutUser: signOut, userData: userData, profileImage: profileImage, setProfileImage: addProfileImage, accountDelete: accountDelete, deletedAccount: deletedAccount }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);