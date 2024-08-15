import axios from "axios";

export const signIn = async (event, usernameEmail, password, setError, setModalOpen, navigate, setTokenValue, setUserRoleValue, setIsDeleted) => {

    event.preventDefault();
    setIsDeleted(false);

    const validationResult = validateInputs(usernameEmail, password);

    if (validationResult) {
        setError(validationResult);
        setModalOpen(true);
        return;
    }

    try {
        const { data } = await axios.post(process.env.REACT_APP_SIGN_IN, {
            usernameOrEmailAddress: usernameEmail.trim(),
            password: password
        });

        const [data1, data2] = data;

        const messages = {
            "Bad Credentials": "The provided credentials are incorrect.",
            "Email address is not confirmed": "Please confirm your email address before signing in.",
            "Account is Locked": "Your account has been locked. Please contact support.",
            "No privileges": "You do not have the appropriate permissions"
        };

        if (messages[data1.trim()]) {
            setError(messages[data1.trim()]);
        } else {
            setTokenValue(data1);
            setUserRoleValue("ROLE_USER");
            navigate(`/${data2}`);
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