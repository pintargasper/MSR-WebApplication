import axios from "axios";

export const signIn = async (event, usernameEmail, password, setError, setModalOpen, navigate, setTokenValue, setUserRoleValue) => {
    event.preventDefault();

    const validationResult = validateInputs(usernameEmail, password);

    if (validationResult) {
        setError(validationResult);
        setModalOpen(true);
        return;
    }

    try {
        const { data } = await axios.post(process.env.REACT_APP_ADMIN_SIGN_IN, {
            usernameOrEmailAddress: usernameEmail.trim(),
            password: password
        });

        const messages = {
            "Bad Credentials": "The provided credentials are incorrect.",
            "Email address is not confirmed": "Please confirm your email address before signing in.",
            "Account is Locked": "Your account has been locked. Please contact support.",
            "No privileges": "You do not have the appropriate permissions"
        };

        if (messages[data.trim()]) {
            setError(messages[data.trim()]);
        } else {
            setTokenValue(data);
            setUserRoleValue("ROLE_ADMIN");
            navigate("/dashboard");
            return;
        }
        setModalOpen(true);
    } catch (error) {
        setError("Username or email address does not exist");
        setModalOpen(true);
    }
}

const validateInputs = (usernameEmail, password) => {
    if (!usernameEmail || !password) {
        return "Fields cannot be empty.";
    }
    return null;
}