import Index from "./components/Index";
import Page404 from "./components/pages/404";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import Navigation from "./components/navigation/Navigation";
import SignIn from "./components/no-auth/sign-in/SignIn";
import SignUp from "./components/no-auth/sign-up/SignUp";
import ForgotPassword from "./components/no-auth/ForgotPassword";
import News from "./components/no-auth/news/News";
import Single from "./components/no-auth/news/Single";
import Dashboard from "./components/admin-auth/Dashboard";
import Admin from "./components/no-auth/sign-in/admin/Admin";
import Profile from "./components/user-auth/Profile";
import Settings from "./components/user-auth/settings/Settings";
import * as Token from "./components/auth/Cookies"
import ErrorAuth from "./components/auth/ErrorAuth";
import Statistics from "./components/user-auth/Statistics";
import UserAuth from "./components/auth/UserAuth";
import AdminAuth from "./components/auth/AdminAuth";
import PublicAuth from "./components/auth/PublicAuth";

const App = () => {

    const token = Token.getToken();

    return (
        <div className={"app"}>
            <BrowserRouter forceRefresh={true}>
                <Navigation/>
                <Routes>

                    {/*No Auth Required*/}
                    <Route exact path={"/"} element={<Index/>}/>

                    <Route exact path={"/news"} element={<News/>}/>
                    <Route exact path={"/news/:title"} element={<Single/>}/>

                    {/*Public Auth Required*/}
                    <Route exact path={"/admin"} element={<PublicAuth><Admin/></PublicAuth>}/>
                    <Route exact path={"/sign-in"} element={<PublicAuth><SignIn/></PublicAuth>}/>
                    <Route exact path={"/sign-up"} element={<PublicAuth><SignUp/></PublicAuth>}/>
                    <Route exact path={"/forgot-password"} element={<PublicAuth><ForgotPassword/></PublicAuth>}/>

                    {/*Admin Auth Required*/}
                    <Route exact path={"/dashboard"} element={<AdminAuth><Dashboard/></AdminAuth>}/>
                    <Route exact path={"/settings"} element={<AdminAuth><Settings/></AdminAuth>}/>

                    {/*User Auth Required*/}
                    <Route exact path={"/:username"} element={<UserAuth><Profile/></UserAuth>}/>
                    <Route exact path={"/:username/statistics"} element={<UserAuth><Statistics/></UserAuth>}/>
                    <Route exact path={"/:username/settings"} element={<UserAuth><Settings/></UserAuth>}/>

                    {/*Error*/}
                    <Route path={"*"} element={<ErrorAuth><Page404/></ErrorAuth>}/>
                </Routes>

                {!token ? <Footer/> : null}
            </BrowserRouter>
        </div>
    );
}

export default App;