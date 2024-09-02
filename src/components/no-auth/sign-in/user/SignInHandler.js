import axios from "axios";
import { validateSignInInputs } from "../../../auth/Validator";

export const signIn = async (usernameEmail, password) => {

    const validationResult = validateSignInInputs(usernameEmail, password);

    if (validationResult !== true) {
        return { success: false, error: validationResult };
    }

    try {
        const { data } = await axios.post(process.env.REACT_APP_SIGN_IN, {
            usernameOrEmailAddress: usernameEmail.trim(),
            password: password
        });

        const messages = {
            "Bad Credentials": "The provided credentials are incorrect.",
            "Email address is not confirmed": "Please confirm your email address before signing in.",
            "Account is Locked": "Your account has been locked. Please contact support.",
            "No privileges": "You do not have the appropriate permissions"
        };

        if (messages[data]) {
            return { success: false, error: messages[data] };
        } else {
            return { success: true, data };
        }
    } catch (error) {
        return { success: false, error: "Username or email address does not exist" };
    }
}