export const validateFullName = (fullName) => {
    if (fullName.trim().length < 3 || fullName.trim().length > 30) {
        return "Full name must be between 3 and 30 characters long.";
    }

    if (/\d/.test(fullName)) {
        return "Full name must not contain numbers.";
    }

    if (!/^[a-zA-ZčćđšžČĆĐŠŽ\s]+$/.test(fullName)) {
        return "Full name must include only Latin letters.";
    }
    return true;
}

export const validateUsername = (username) => {
    if (username.trim().length < 4 || username.trim().length > 16) {
        return "Username must be between 4 and 16 characters long.";
    }

    if (/[A-Z]/.test(username)) {
        return "Username must not contain uppercase letters.";
    }

    if (/[^a-z0-9]/.test(username)) {
        return "Username contains illegal characters.";
    }
    return true;
}

export const validateEmail = (emailAddress) => {
    if (!/^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(emailAddress)) {
        return "Invalid email address pattern.";
    }
    return true;
}

export const validatePassword = (password, confirmPassword) => {
    if (password.length < 8 || password.length > 16) {
        return "Password must be between 8 and 16 characters long.";
    }

    if (!/[A-Z]/.test(password)) {
        return "Password must contain at least one uppercase letter.";
    }

    if (!/[a-z]/.test(password)) {
        return "Password must contain at least one lowercase letter.";
    }

    if (!/\d/.test(password)) {
        return "Password must contain at least one number.";
    }

    if (!/[!@#$%^&*()]/.test(password)) {
        return "Password must contain at least one special character (!, @, #, $, %, ^, &, *, ()).";
    }

    if (password !== confirmPassword) {
        return "Passwords do not match.";
    }
    return true;
}

export const validateBirthdate = (birthdate) => {
    if (!birthdate) {
        return "Birthdate must not be null.";
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(birthdate)) {
        return "Birthdate must be in YYYY-MM-DD format.";
    }

    const age = ((new Date() - new Date(birthdate)) / (1000 * 60 * 60 * 24 * 365.25));
    if (age < 10) {
        return "You must be at least 10 years old.";
    }
    return true;
}

export const validateCountry = (country) => {
    if (/\d/.test(country)) {
        return "Country must not contain numbers.";
    }

    if (!/^[a-zA-Z\s]+$/.test(country)) {
        return "Country must contain only letters.";
    }
    return true;
}

export const validateVerificationString = (username, verificationString) => {
    return verificationString !== `${username}/delete` ? `Verification string must be ${username}/delete` : true;
}

export const validateImage = (image) => {
    if (!image) {
        return "Image must not be null.";
    }

    if (image.size > 1048576) {
        return "Image size must not exceed 1 MB.";
    }

    if (image.name.includes("..")) {
        return "Image contains invalid characters.";
    }
    return true;
}

export const validateInputs = (fullName, username, emailAddress, password = null, confirmPassword = null, birthdate, country, image = null) => {
    if (!fullName || !username || !emailAddress || !birthdate || !country ||
        (password === null && confirmPassword !== null ) ||
        (password !== null && confirmPassword === null)) {
        return "Fields cannot be empty.";
    }

    const validators = [
        validateFullName(fullName),
        validateUsername(username),
        validateEmail(emailAddress),
        validateBirthdate(birthdate),
        validateCountry(country)
    ];

    if (password !== null && confirmPassword !== null) {
        validators.push(validatePassword(password, confirmPassword));
    }

    if (image !== null) {
        validators.push(validateImage(image));
    }

    for (const validation of validators) {
        if (validation !== true) {
            return validation;
        }
    }
    return true;
}

export const validatePasswordsInputs = (currentPassword, newPassword, confirmPassword) => {
    if (!currentPassword || !newPassword || !confirmPassword) {
        return "Fields cannot be empty.";
    }

    const validators = [validatePassword(newPassword, confirmPassword)];

    for (const validation of validators) {
        if (validation !== true) {
            return validation;
        }
    }
    return true;
}

export const validateDeleteInputs = (username, verificationString) => {
    if (!verificationString) {
        return "Field cannot be empty.";
    }

    const validators = [validateVerificationString(username, verificationString)];

    for (const validation of validators) {
        if (validation !== true) {
            return validation;
        }
    }
    return true;
}