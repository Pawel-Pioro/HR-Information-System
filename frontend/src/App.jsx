import { Routes, BrowserRouter, Route } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "./context/contexts.js";

import Layout from "./pages/Layout.jsx"
import LandingPage from "./pages/LandingPage.jsx"
import Login from "./pages/Auth/Login.jsx"
import Register from "./pages/Auth/Register.jsx";
import EmployeeDashboard from "./pages/Employee/EmployeeDashboard.jsx";
import ManagementDashboard from "./pages/Management/ManagementDashboard.jsx";
import NotFound from "./pages/404notFound.jsx";
import ManageEmployees from "./pages/Management/ManageEmployees.jsx";
import EmployeeDetail from "./components/Management/EmployeeDetail/EmployeeDetail.jsx";
import EditEmployee from "./components/Management/EmployeeDetail/EditEmployee/EditEmployee.jsx";

function App() {

  const { user, loading } = useContext(AuthContext)
  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <span className="loading loading-dots loading-xl"></span>
      </div>
    )
  }
  console.log(user.logged_in)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} >
          {user.logged_in === true
            ? (
              user.is_staff === true
                ? (
                  <>
                    <Route index element={<ManagementDashboard />} />
                    <Route path="employees" element={<ManageEmployees />} />
                    <Route path="employees/:id" element={<EmployeeDetail />} />
                    <Route path="employees/:id/edit" element={<EditEmployee />} />
                  </>
                )
                : (
                  <>
                    <Route index element={<EmployeeDashboard />} />

                  </>
                )
            )
            : (
              <>
                <Route index element={<LandingPage />} />
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
              </>
            )}
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
