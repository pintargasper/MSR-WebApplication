import axios from "axios";

export const signOut = async (token) => {

    try {
        const response = await axios({
            method: "post",
            url: process.env.REACT_APP_SIGN_OUT,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}