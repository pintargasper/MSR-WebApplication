import {useAuth} from "../auth/AuthContext";
import {useParams} from "react-router-dom";
import Page404 from "../pages/404";

const Statistics = () => {

    const {userData} = useAuth();
    const {username} = useParams();

    if (userData.username === username) {
        return (
            <div className={"mt-5"}>Statistics</div>
        );
    }
    return <Page404/>;
}

export default Statistics;