import { Routes, BrowserRouter, Route } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "./context/contexts.js";

import Layout from "./pages/Layout.jsx"
import LandingPage from "./pages/LandingPage.jsx"
import Login from "./pages/Auth/Login.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Register from "./pages/Auth/Register.jsx";


function App() {

  const { user, loading } = useContext(AuthContext)
  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <span className="loading loading-dots loading-xl"></span>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} >
          {user.logged_in === true
            ? (
              <>
                <Route index element={<Dashboard />} />
              </>
            )
            : (
              <>
                <Route index element={<LandingPage />} />
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
              </>
            )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
