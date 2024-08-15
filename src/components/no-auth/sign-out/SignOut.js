import axios from "axios";
import * as Token from "../../auth/Cookies";

export const signOut = (event, navigate, signOutUser) => {

    event.preventDefault();
    const token = Token.getToken();

    axios({
        method: "post",
        url: process.env.REACT_APP_SIGN_OUT,
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data)
        .then((data) => {
            signOutUser();
            navigate(data);
        })
        .catch((error) => {
            console.log(error);
        });
}