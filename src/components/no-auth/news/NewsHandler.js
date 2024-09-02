import axios from "axios";

export const getNews = async () => {

    try {
        const response = await axios({
            method: "get",
            url: process.env.REACT_APP_NEWS
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: "Error fetching news" };
    }
}

export const single = async (title) => {

    try {
        const response = await axios({
            method: "get",
            url: `${process.env.REACT_APP_SINGLE_NEWS}${title}`
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: "Error fetching news" };
    }
}

export const suggestions = async (title) => {

    try {
        const response = await axios({
            method: "get",
            url: `${process.env.REACT_APP_NEWS_SUGGESTIONS}${title}`
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: "Error fetching news suggestions" };
    }
}