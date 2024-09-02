import axios from "axios";

export const countries = async () => {

    try {
        const response = await axios({
            method: "get",
            url: process.env.REACT_APP_COUNTRIES
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: "Error fetching countries" };
    }
}