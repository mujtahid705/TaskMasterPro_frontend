import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import CreateProject from "./pages/CreateProject";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UpdateProject from "./pages/UpdateProject";
import CreateEmployee from "./pages/CreateEmployee";
import UpdateEmployee from "./pages/UpdateEmployee";
import ProjectPage from "./pages/ProjectPage";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<HomePage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/dashboard/create-project" element={<CreateProject />} />

          <Route
            path="/dashboard/update-project/:id"
            element={<UpdateProject />}
          />

          <Route
            path="/dashboard/create-employee"
            element={<CreateEmployee />}
          />

          <Route
            path="/dashboard/update-employee/:id"
            element={<UpdateEmployee />}
          />

          <Route path="/dashboard/project/:id" element={<ProjectPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
