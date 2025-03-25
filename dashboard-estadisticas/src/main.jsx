import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { DashboardProvider } from "./context/DashboardContext";
import "./i18n"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DashboardProvider>
      <App />
    </DashboardProvider>
  </React.StrictMode>
);
