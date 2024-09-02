import axios from "axios";

export const getWeaponStatistics = async (token) => {

    try {
        const response = await axios({
            method: "post",
            url: process.env.REACT_APP_USER_WEAPON_STATISTICS,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: "Error fetching weapon statistics" };
    }
}