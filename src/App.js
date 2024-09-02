import Index from "./components/Index";
import Page404 from "./components/pages/404";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import Navigation from "./components/navigation/Navigation";
import SignIn from "./components/no-auth/sign-in/user/SignIn";
import SignUp from "./components/no-auth/sign-up/SignUp";
import ForgotPassword from "./components/no-auth/form/ForgotPassword";
import News from "./components/no-auth/news/News";
import Single from "./components/no-auth/news/Single";
import Dashboard from "./components/admin-auth/Dashboard";
import Admin from "./components/no-auth/sign-in/admin/Admin";
import Home from "./components/user-auth/home/Home";
import Settings from "./components/user-auth/settings/Settings";
import ErrorAuth from "./components/auth/ErrorAuth";
import Weapons from "./components/user-auth/statistics/weapons/Weapons";
import UserAuth from "./components/auth/UserAuth";
import AdminAuth from "./components/auth/AdminAuth";
import PublicAuth from "./components/auth/PublicAuth";
import {useAuth} from "./components/auth/AuthContext";
import Notification from "./components/auth/cookies/Notification";
import Missions from "./components/user-auth/statistics/missions/Missions";
import Mission from "./components/user-auth/statistics/missions/Mission";
import Confirm from "./components/no-auth/email/Confirm";
import ResetPassword from "./components/no-auth/form/ResetPassword";

const App = () => {

    const { token, cookieAgreement } = useAuth();

    return (
        <div className={"app"}>
            <BrowserRouter forceRefresh={true}>
                <Navigation/>
                <Routes>

                    {/*No Auth Required*/}
                    <Route exact path={"/"} element={<Index/>}/>

                    <Route exact path={"/news"} element={<News/>}/>
                    <Route exact path={"/news/:title"} element={<Single/>}/>

                    <Route exact path={"/confirm/:token"} element={<Confirm/>}/>

                    {/*Public Auth Required*/}
                    <Route exact path={"/admin"} element={<PublicAuth><Admin/></PublicAuth>}/>
                    <Route exact path={"/sign-in"} element={<PublicAuth><SignIn/></PublicAuth>}/>
                    <Route exact path={"/sign-up"} element={<PublicAuth><SignUp/></PublicAuth>}/>
                    <Route exact path={"/forgot-password"} element={<PublicAuth><ForgotPassword/></PublicAuth>}/>
                    <Route exact path={"/reset-password/:token"} element={<PublicAuth><ResetPassword/></PublicAuth>}/>

                    {/*Admin Auth Required*/}
                    <Route exact path={"/dashboard"} element={<AdminAuth><Dashboard/></AdminAuth>}/>
                    <Route exact path={"/settings"} element={<AdminAuth><Settings/></AdminAuth>}/>

                    {/*User Auth Required*/}
                    <Route exact path={"/:username"} element={<UserAuth><Home/></UserAuth>}/>
                    <Route exact path={"/:username/weapons"} element={<UserAuth><Weapons/></UserAuth>}/>
                    <Route exact path={"/:username/missions"} element={<UserAuth><Missions/></UserAuth>}/>
                    <Route exact path={"/:username/settings"} element={<UserAuth><Settings/></UserAuth>}/>

                    <Route exact path={"/:username/missions/:name"} element={<UserAuth><Mission/></UserAuth>}/>

                    {/*Error*/}
                    <Route path={"*"} element={<ErrorAuth><Page404/></ErrorAuth>}/>
                </Routes>

                {!token ? <Footer/> : null}
                {!cookieAgreement ? <Notification/> : null}
            </BrowserRouter>
        </div>
    );
}

export default App;