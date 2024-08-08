import Index from "./components/Index";
import Page404 from "./components/pages/404";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import Navigation from "./components/navigation/Navigation";
import SignIn from "./components/no-auth/sign-in/SignIn";
import SignUp from "./components/no-auth/SignUp";
import ForgotPassword from "./components/no-auth/ForgotPassword";
import News from "./components/no-auth/news/News";
import Single from "./components/no-auth/news/Single";

const App = () => {
  return (
      <div className={"app"}>
          <BrowserRouter forceRefresh={true}>
              <Navigation/>
              <Routes>
                  {/*No Auth Required*/}
                  <Route exact path={"/"} element={<Index/>}/>
                  <Route exact path={"/sign-in"} element={<SignIn/>}/>
                  <Route exact path={"/sign-up"} element={<SignUp/>}/>
                  <Route exact path={"/forgot-password"} element={<ForgotPassword/>}/>

                  <Route exact path={"/news"} element={<News/>}/>
                  <Route exact path={"/news/:title"} element={<Single/>}/>

                  <Route path={"*"} element={<Page404/>}/>
              </Routes>

              <Footer/>
          </BrowserRouter>
      </div>
  );
}

export default App;