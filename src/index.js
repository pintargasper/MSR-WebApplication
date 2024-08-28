import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {AuthProvider} from "./components/auth/AuthContext";
import {consoleText, consoleTitle} from "./components/auth/Logger";

const root = ReactDOM.createRoot(document.getElementById("root"));

consoleTitle("Attention!");
consoleText("This is a browser feature intended for developers. " +
    "If someone told you to copy and paste something here to enable Memo Stick Rescue " +
    "or hack into someone else's account, it's a scam and will give them access to your " +
    "Memo Stick Rescue account.");

root.render(
  <React.StrictMode>
      <AuthProvider>
          <App />
      </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();