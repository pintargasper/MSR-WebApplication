import {Link} from "react-router-dom";

const Page404 = () => {

    return (
        <div className={"page404 d-flex align-items-center justify-content-center mt-5"}>
            <div className={"text-center"}>
                <h1 className={"display-1 font-weight-bold text-danger"}>404</h1>
                <h2 className={"my-4"}>Oops! Page not found :(</h2>
                <p className={"lead"}>
                    We apologize, but the page you are looking for could not be found.
                </p>
                <Link to={"/"}>
                    <input
                        type={"button"}
                        value={"Return to home page"}
                        className={"btn btn-light w-100 mt-2 button"}
                    />
                </Link>
            </div>
        </div>
    )
}

export default Page404