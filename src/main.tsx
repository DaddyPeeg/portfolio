import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import ToasterContext from "./context/ToasterContext.tsx";
import { SkillProvider } from "./context/SkillContext.tsx";
import Router from "./router/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SkillProvider>
      <ToasterContext />
      <Router />
    </SkillProvider>
  </React.StrictMode>
);
