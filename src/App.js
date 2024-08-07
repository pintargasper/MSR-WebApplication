import './App.css';
import Index from "./components/Index";
import Page404 from "./components/pages/404";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
      <BrowserRouter forceRefresh={true}>
        <Routes>
          {/*No Auth Required*/}
          <Route exact path={"/"} element={<Index/>}/>

          <Route path={"*"} element={<Page404/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;