import axios from "axios";
import {validatePasswordsInputs, validateResetPasswordInput} from "../../auth/Validator";

export const forgotPassword = async (emailAddress) => {

    const validationResult = validateResetPasswordInput(emailAddress);

    if (validationResult !== true) {
        return { success: false, error: validationResult };
    }

    try {
        const response = await axios({
            method: "post",
            url: process.env.REACT_APP_USER_FORGOT_PASSWORD,
            data: {
                emailAddress
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        let errorMessage = "";
        if (error.response && error.response.data) {
            const errors = error.response.data;
            const errorKeys = ["emailAddress"];
            errorKeys.forEach(key => {
                if (errors[key]) {
                    errorMessage = errors[key];
                }
            });
        }
        return { success: false, error: errorMessage || "An error occurred while sending reset email" };
    }
}

export const resetPassword = async (token, password, confirmPassword) => {

    const validationResult = validatePasswordsInputs(password, password, confirmPassword);

    if (validationResult !== true) {
        return { success: false, error: validationResult };
    }

    try {
        const response = await axios({
            method: "post",
            url: process.env.REACT_APP_USER_RESET_PASSWORD,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                password,
                newPassword: password,
                confirmPassword,
                token
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        let errorMessage = "";
        if (error.response && error.response.data) {
            const errors = error.response.data;
            const errorKeys = ["global", "token"];
            errorKeys.forEach(key => {
                if (errors[key]) {
                    errorMessage = errors[key];
                }
            });
        }
        return { success: false, error: errorMessage || "An error occurred while changing your password" };
    }
}