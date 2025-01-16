import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./App.css";
import ToasterContext from "./context/ToasterContext.tsx";
import { SkillProvider } from "./context/SkillContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SkillProvider>
      <ToasterContext />
      <App />
    </SkillProvider>
  </React.StrictMode>
);
