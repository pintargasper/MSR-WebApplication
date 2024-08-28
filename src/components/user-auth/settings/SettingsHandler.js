import axios from "axios";
import * as Token from "../../auth/cookies/Cookies";
import {validateDeleteInputs, validateInputs, validatePasswordsInputs} from "../../auth/Validator";

export const updateProfile = async (event, fullName, username, emailAddress, birthdate, country, setProfileImage, image, setImage, setImagePreview, setError, setModalOpen, setModalType) => {

    const validationResult = validateInputs(fullName, username, emailAddress, null, null, birthdate, country, image);

    if (validationResult === true) {
        try {
            const response = await axios({
                method: "post",
                url: process.env.REACT_APP_USER_UPDATE_PROFILE,
                headers: {
                    Authorization: `Bearer ${Token.getToken()}`,
                    "Content-Type": "multipart/form-data"
                },
                data: {
                    fullName: fullName,
                    username: username,
                    emailAddress: emailAddress,
                    birthdate: birthdate,
                    country: country,
                    image: image,
                }
            });

            const data = response.data;

            Token.save(data, true);
            setError("Home successfully updated");
            setImagePreview(null);
            setModalType("UPDATE");
            setModalOpen(true);

            if (image !== null) {
                setProfileImage(`${username}.${image.name.split(".").pop()}`);
                setImage(null);
            }
            return username;
        } catch (error) {
            let errorMessage = "";

            if (!error.response || !error.response.data) {
                setError("An error occurred while updating profile");
                setModalType("UPDATE");
                setModalOpen(true);
                return;
            }

            const errors = error.response.data;
            const errorKeys = ["fullName", "username", "emailAddress", "birthdate", "country", "image", "payload"];
            errorKeys.forEach(key => {
                if (errors[key]) {
                    errorMessage = errors[key];
                }
            });
            setError(errorMessage || "An error occurred while updating profile");
            setModalType("UPDATE");
            setModalOpen(true);
        }
    } else {
        setError(validationResult);
        setModalType("UPDATE");
        setModalOpen(true);
    }
}

export const passwordChange = async (event, currentPassword, newPassword, confirmPassword, setError, setModalOpen, setModalType) => {

    const validationResult = validatePasswordsInputs(currentPassword, newPassword, confirmPassword);

    if (validationResult === true) {
        try {
            const response = await axios({
                method: "post",
                url: process.env.REACT_APP_USER_CHANGE_PASSWORD,
                headers: {
                    Authorization: `Bearer ${Token.getToken()}`
                },
                data: {
                    currentPassword: currentPassword,
                    newPassword: newPassword,
                    confirmPassword: confirmPassword
                }
            });

            const data = response.data;

            if (data) {
                setError("Password successfully updated");
                setModalType("PASSWORD");
                setModalOpen(true);
            }
        } catch (error) {
            setError(error.response.data.global);
            setModalType("PASSWORD");
            setModalOpen(true);
        }
    } else {
        setError(validationResult);
        setModalType("PASSWORD");
        setModalOpen(true);
    }
};

export const deleteAccount = async (event, username, verificationString, navigate, setError, setModalOpen, setModalType, accountDelete) => {

    const validationResult = validateDeleteInputs(username, verificationString);

    if (validationResult === true) {
        try {
            const response = await axios({
                method: "post",
                url: process.env.REACT_APP_USER_DELETE_ACCOUNT,
                headers: {
                    Authorization: `Bearer ${Token.getToken()}`
                },
                data: {
                    verificationString: verificationString
                }
            });

            const data = response.data;

            if (data && data === "SUCCESS") {
                Token.clear();
                accountDelete(true);
                navigate("/sign-in");
                return;
            }
            setError(data);
            setModalType("DELETE");
            setModalOpen(true);

        } catch (error) {
            setError(error.response.data.verificationString);
            setModalType("DELETE");
            setModalOpen(true);
        }
    } else {
        setError(validationResult);
        setModalType("DELETE");
        setModalOpen(true);
    }
}