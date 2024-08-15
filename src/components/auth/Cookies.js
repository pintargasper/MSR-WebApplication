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