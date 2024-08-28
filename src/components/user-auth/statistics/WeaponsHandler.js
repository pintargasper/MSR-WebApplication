import axios from "axios";
import * as Token from "../../auth/cookies/Cookies";

export const getWeaponStatistics = (setWeaponStatistics) => {

    axios({
        method: "post",
        url: process.env.REACT_APP_USER_WEAPON_STATISTICS,
        headers: {
            Authorization: `Bearer ${Token.getToken()}`,
        },
    }).then(response => response.data)
        .then((data) => {
            setWeaponStatistics(data);
        })
        .catch((error) => {
            console.log(error);
        });
}