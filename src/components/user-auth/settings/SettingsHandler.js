import axios from "axios";
import * as Cookies from "../../auth/cookies/Cookies";
import {validateDeleteInputs, validateInputs, validatePasswordsInputs} from "../../auth/Validator";

export const updateProfile = async (fullName, username, emailAddress, birthdate, country, image) => {

    const validationResult = validateInputs(fullName, username, emailAddress, null, null, birthdate, country, image);

    if (validationResult !== true) {
        return {success: false, error: validationResult};
    }

    try {
        const response = await axios({
            method: "post",
            url: process.env.REACT_APP_USER_UPDATE_PROFILE,
            headers: {
                Authorization: `Bearer ${Cookies.getToken()}`,
                "Content-Type": "multipart/form-data"
            },
            data: {
                fullName,
                username,
                emailAddress,
                birthdate,
                country,
                image
            }
        });
        const data = response.data;
        return { success: true, data };
    } catch (error) {
        let errorMessage = "An error occurred while updating profile";

        if (error.response && error.response.data) {
            const errors = error.response.data;
            const errorKeys = ["fullName", "username", "emailAddress", "birthdate", "country", "image", "payload"];
            errorKeys.forEach(key => {
                if (errors[key]) {
                    errorMessage = errors[key];
                }
            });
        }
        return { success: false, error: errorMessage };
    }
}

export const passwordChange = async (currentPassword, newPassword, confirmPassword) => {

    const validationResult = validatePasswordsInputs(currentPassword, newPassword, confirmPassword);

    if (validationResult !== true) {
        return { success: false, error: validationResult };
    }

    try {
        const response = await axios({
            method: "post",
            url: process.env.REACT_APP_USER_CHANGE_PASSWORD,
            headers: {
                Authorization: `Bearer ${Cookies.getToken()}`
            },
            data: {
                currentPassword,
                newPassword,
                confirmPassword
            }
        });

        const data = response.data;

        if (data) {
            return { success: true };
        }
    } catch (error) {
        const errorMessage = error.response?.data?.global || "An error occurred while changing password";
        return { success: false, error: errorMessage };
    }
};

export const deleteAccount = async (username, verificationString) => {

    const validationResult = validateDeleteInputs(username, verificationString);

    if (validationResult !== true) {
        return { success: false, error: validationResult };
    }

    try {
        const response = await axios({
            method: "post",
            url: process.env.REACT_APP_USER_DELETE_ACCOUNT,
            headers: {
                Authorization: `Bearer ${Cookies.getToken()}`
            },
            data: {
                verificationString
            }
        });

        const data = response.data;

        if (data === "SUCCESS") {
            return { success: true };
        } else {
            return { success: false, error: data };
        }
    } catch (error) {
        const errorMessage = error.response?.data?.verificationString || "An error occurred while deleting the account";
        return { success: false, error: errorMessage };
    }
};