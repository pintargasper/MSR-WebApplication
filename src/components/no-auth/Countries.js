import axios from "axios";

export const countries = (setCountries) => {

    axios({
        method: "get",
        url: process.env.REACT_APP_COUNTRIES,
    }).then(response => response.data)
        .then((data) => {
            setCountries(data);
        })
        .catch((error) => {
            console.log(error);
        });
}