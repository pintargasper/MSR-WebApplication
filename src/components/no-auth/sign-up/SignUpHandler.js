import axios from "axios";
import { validateInputs } from "../../auth/Validator";

export const signUp = async (event, fullName, username, emailAddress, password, confirmPassword, birthdate, country, setError, setModalOpen) => {
    event.preventDefault();

    const validationResult = validateInputs(fullName, username, emailAddress, password, confirmPassword, birthdate, country);

    if (validationResult === true) {
        try {
            const response = await axios({
                method: "post",
                url: process.env.REACT_APP_SIGN_UP,
                data: {
                    fullName: fullName,
                    username: username,
                    emailAddress: emailAddress,
                    password: password,
                    confirmPassword: confirmPassword,
                    birthdate: birthdate,
                    country: country
                }
            });
            const data = response.data;

            setError(data);
            setModalOpen(true);
        } catch (error) {
            let errorMessage = "";
            const errors = error.response.data;
            const errorKeys = ["fullName", "username", "emailAddress", "password", "birthdate", "country"];
            errorKeys.forEach(key => {
                if (errors[key]) {
                    errorMessage = errors[key];
                }
            });
            setError(errorMessage || "An error occurred while updating profile");
            setModalOpen(true);
        }
    } else {
        setError(validationResult);
        setModalOpen(true);
    }
}