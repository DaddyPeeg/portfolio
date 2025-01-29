import { BrowserRouter, Routes, Route } from "react-router";
import Resume from "./pages/Resume";
import App from "./pages/App";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/portfolio" element={<App />} />
        <Route path="/portfolio/resume" element={<Resume />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
