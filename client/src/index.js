import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { StudentProvider } from "./context/StudentContext";
import { ReportProvider } from "./context/reportContext";
// import 'antd/dist/antd.css';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <StudentProvider>
        <ReportProvider>
        <App />
        </ReportProvider>
      </StudentProvider>
    </React.StrictMode>
  </BrowserRouter>,
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
