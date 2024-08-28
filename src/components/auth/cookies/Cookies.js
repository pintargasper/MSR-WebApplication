import Cookies from "js-cookie";

export const getToken = () => {
    return Cookies.get(process.env.REACT_APP_COOKIE_TOKEN);
}

export const save = (value) => {
    Cookies.set(process.env.REACT_APP_COOKIE_TOKEN, value, { expires: 1 })
}

export function clear() {
    Cookies.remove(process.env.REACT_APP_COOKIE_TOKEN);
}

export const getCookieAgreement = () => {
    return Cookies.get(process.env.REACT_APP_COOKIE_AGREEMENT);
}

export const saveCookieAgreement = (value) => {
    Cookies.set(process.env.REACT_APP_COOKIE_AGREEMENT, value, { expires: 180 })
}

export const getCookiePreferences = () => {
    return Cookies.get(process.env.REACT_APP_COOKIE_PREFERENCE);
}

export const saveCookiePreferences = (value) => {
    Cookies.set(process.env.REACT_APP_COOKIE_PREFERENCE, value, { expires: 180 })
}