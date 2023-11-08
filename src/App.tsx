import { BrowserRouter, Route, Routes } from "react-router-dom";
import FrontLayout from "./components/layout/front/FrontLayout";
import HomePage from "./pages/public/HomePage";
import LoginPage from "./pages/public/LoginPage";
import RegisterPage from "./pages/public/RegisterPage";

import DashboardLayout from "./components/layout/dashboard/DashboardLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import SkillsPage from "./pages/admin/SkillsPage";
import EducationPage from "./pages/admin/EducationPage";
import RegisterSucces from "./pages/public/RegisterSucces";
import MemoPortfoliosPage from "./pages/admin/PortfoliosPage";
import MemoExperiencePage from "./pages/admin/ExperiencesPage";
// import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<FrontLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register-succes" element={<RegisterSucces />} />
        </Route>
        <Route path="" element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/portfolios" element={<MemoPortfoliosPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/educations" element={<EducationPage />} />
          <Route path="/experience" element={<MemoExperiencePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
