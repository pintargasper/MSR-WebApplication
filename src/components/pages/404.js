import {Link} from "react-router-dom";
import {useAuth} from "../auth/AuthContext";
import * as Token from "../auth/cookies/Cookies";
import {useEffect, useState} from "react";

const Page404 = () => {

    const [signIn, setSignIn] = useState(false);

    const { userRole, userData } = useAuth();

    const token = Token.getToken();

    useEffect(() => {
        setSignIn(!!token);
    }, [token, userRole]);

    return (
        <div className={"page404 d-flex align-items-center justify-content-center mt-5"}>
            <div className={"text-center"}>
                <h1 className={"display-1 font-weight-bold text-danger"}>404</h1>
                <h2 className={"my-4"}>Oops! Page not found :(</h2>
                <p className={"lead"}>
                    We apologize, but the page you are looking for could not be found.
                </p>
                <Link to={!signIn ? "/" : `/${userData.username}`}>
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