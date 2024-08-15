import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {AuthProvider} from "./components/auth/AuthContext";
import {consoleText, consoleTitle} from "./components/auth/Logger";

const root = ReactDOM.createRoot(document.getElementById("root"));

consoleTitle("Pozor!");
consoleText("To je funkcija brskalnika, ki je namenjena razvijalcem. " +
    "Če vam je nekdo rekel, da kopirajte in prilepite nekaj sem, da bi omogočili funkcijo " +
    "Memo Stick Rescue ali vdrli v račun nekoga drugega, je to prevara in jim bo omogočilo dostop do " +
    "vašega Memo Stick Rescue računa.");

root.render(
  <React.StrictMode>
      <AuthProvider>
          <App />
      </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();