import axios from "axios";
import * as Token from "../../auth/cookies/Cookies";

export const getStatistics = (setStatistics, setLoading) => {

    axios({
        method: "post",
        url: process.env.REACT_APP_USER_STATISTICS,
        headers: {
            Authorization: `Bearer ${Token.getToken()}`
        },
    }).then(response => response.data)
        .then((data) => {
            setStatistics(data);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
        });
}