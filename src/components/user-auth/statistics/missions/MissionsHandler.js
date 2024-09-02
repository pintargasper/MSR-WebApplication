import axios from "axios";

export const getMissionsStatistics = async (token) => {

    try {
        const response = await axios({
            method: "post",
            url: process.env.REACT_APP_USER_MISSION_STATISTICS,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: "Error fetching missions" };
    }
}

export const getMissionStatistics = async (name, token) => {

    try {
        const response = await axios({
            method: "post",
            url: process.env.REACT_APP_USER_SINGLE_MISSION_STATISTICS,
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                name
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: "Error fetching mission statistics" };
    }
}