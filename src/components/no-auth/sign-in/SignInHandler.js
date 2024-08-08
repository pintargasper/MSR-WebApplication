import axios from "axios";

export const signIn = (event, emailUsernameEmailAddress, password, setFeedback, setModalOpen, navigate, signIn) => {
    event.preventDefault();

    const validationResult = validateInputs(emailUsernameEmailAddress, password);

    if (validationResult != null) {
        alert("validation");
        return;
    }

    axios({
        method: "post",
        url: process.env.REACT_APP_SIGN_IN,
        data: {
            usernameOrEmailAddress: emailUsernameEmailAddress.trim(),
            password: password
        },
    }).then(response => response.data)
        .then((data) => {
            alert(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

const validateInputs = (...inputs) => {
    for (const input of inputs) {
        if (input.trim().length === 0) {
            return "Fields can not be empty";
        }
    }
    return null;
}

const saveToken = (token) => {
    localStorage.setItem("token", token);
}