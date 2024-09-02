import axios from "axios";
import { validateInputs } from "../../auth/Validator";

export const signUp = async (fullName, username, emailAddress, password, confirmPassword, birthdate, country) => {

    const validationResult = validateInputs(fullName, username, emailAddress, password, confirmPassword, birthdate, country);

    if (validationResult !== true) {
        return { success: false, error: validationResult };
    }

    try {
        const response = await axios({
            method: "post",
            url: process.env.REACT_APP_SIGN_UP,
            data: {
                fullName,
                username,
                emailAddress,
                password,
                confirmPassword,
                birthdate,
                country
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        let errorMessage = "";
        const errors = error.response?.data || {};
        const errorKeys = ["fullName", "username", "emailAddress", "password", "birthdate", "country"];
        errorKeys.forEach(key => {
            if (errors[key]) {
                errorMessage = errors[key];
            }
        });
        return { success: false, error: errorMessage || "An error occurred while creating your profile" };
    }
}