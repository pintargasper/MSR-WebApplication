import axios from "axios";

export const getNews = (setNews) => {

    axios({
        method: "get",
        url: process.env.REACT_APP_NEWS
    }).then(response => response.data)
        .then((data) => {
            setNews(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

export const single = (title, setSingle) => {

    axios({
        method: "get",
        url: process.env.REACT_APP_SINGLE_NEWS + title,
    }).then(response => response.data)
        .then((data) => {
            setSingle(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

export const suggestions = (title, setSuggestions) => {

    axios({
        method: "get",
        url: process.env.REACT_APP_NEWS_SUGGESTIONS + title,
    }).then(response => response.data)
        .then((data) => {
            setSuggestions(data);
        })
        .catch((error) => {
            console.log(error);
        });
}