import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as NewsHandler from "./NewsHandler";

const News = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        NewsHandler.getNews(setNews);
    }, []);

    return (
        <section className={"container news align-items-center mt-5 p-3 p-md-4"}>
            <h1 className={"text-center"}>News</h1>
            <div className={"row"}>
                {
                    news.map((item, id) =>
                        <div key={id} className={"col-lg-4 col-md-6 col-sm-12 mb-4"}>
                            <div className={"card news-card"}>
                                <img src={process.env.REACT_APP_NEWS_IMAGES + item.image} alt={item.title}
                                     className={"image"}/>
                                <div className={"card-body"}>
                                    <h5 className={"card-title"}>{item.title}</h5>
                                    <span>{item.entryTime}</span>
                                    <div className={"text-end"}>
                                        <Link to={"/news/" + item.title} className={"button"}>Read News</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </section>
    )
}

export default News