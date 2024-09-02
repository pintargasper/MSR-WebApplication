import axios from "axios";

export const confirmAccount = async (token) => {
    try {
        const response = await axios({
            method: "post",
            url: process.env.REACT_APP_USER_CONFIRM_ACCOUNT,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                token
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        let errorMessage = "";
        if (error.response && error.response.data) {
            const errors = error.response.data;
            const errorKeys = ["token"];
            errorKeys.forEach(key => {
                if (errors[key]) {
                    errorMessage = errors[key];
                }
            });
        }
        return { success: false, error: errorMessage || "An error occurred while confirming your profile" };
    }
}