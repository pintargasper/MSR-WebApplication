import {Link, useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import * as NewsHandler from "./NewsHandler";
import Page404 from "../../pages/404";

const Single = () => {

    const location = useLocation();
    const { title } = useParams();

    const [single, setSingle] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        NewsHandler.single(title, setSingle);
        NewsHandler.suggestions(title, setSuggestions);
    }, [location, title]);

    if (single || Object.keys(single).length !== 0) {
        return (
            <section className={"container align-items-center mt-5 p-3 p-md-4"}>
                <div className={"row"}>
                    <div key={single.id} className={"col-md-8 section-bg mb-5"}>
                        <div className={"single"}>
                            <img
                                src={process.env.REACT_APP_NEWS_IMAGES + single.image}
                                className={"img-fluid mb-3 col-12 image"}
                                alt={single.title}
                            />
                            <h1 className={"display-4"}>{single.title}</h1>
                            <p className={"text-muted"}>Published on {single.entryTime}</p>
                            <hr className={"my-4"}/>
                            {single.text && single.text.split("\\n").map((line, index) => (
                                <p key={index}>{line}</p>
                            ))}
                        </div>
                    </div>

                    <div className={"col-md-4 single"}>
                        <h3 className={"text-center mt-2"}>More News</h3>
                        {suggestions.map((suggestion, id) => (
                            <div key={id} className={"col-12 mb-4"}>
                                <div className={"card single-card"}>
                                    <img
                                        src={process.env.REACT_APP_NEWS_IMAGES + suggestion.image}
                                        alt={suggestion.title}
                                        className={"single-news"}
                                    />
                                    <div className={"card-body"}>
                                        <h5 className={"card-title"}>{suggestion.title}</h5>
                                        <span>{suggestion.entryTime}</span>
                                        <div className={"text-end mt-4"}>
                                            <Link to={"/news/" + suggestion.title} className={"button"}>Read News</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }
    return <Page404/>;
}

export default Single;