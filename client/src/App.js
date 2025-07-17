  import React, { useState } from 'react';
  import NavBar from './components/NavBar';
  import Home from './pages/Home';
  import LoginSignup from './pages/LoginSignup';
  import URLTable from './pages/URLTable';
  import ProfilePage from './pages/ProfilePage';
  import ProtectedRoute from './components/ProtectedRoute';
  import { Route, Routes, Navigate } from "react-router-dom";
  import './App.css'; 
  import {Link}from "react-router-dom"

  export default function App() {
    const [urlData, setUrlData] = useState([]);
    const [darkMode, setDarkMode] = useState(true );
    const [isLogin, setLogin] = useState(()=>{
      return  !!localStorage.getItem("token");
    });
    return (
      <>
        <div className="wave-background"></div>
        <NavBar isLogin={isLogin} setLogin={setLogin} setDarkMode={setDarkMode} darkMode={darkMode}/>
        
<Routes>
    <Route path="/" element={<Navigate to="/home" />} />

    <Route
        path="/home"
        element={
            <ProtectedRoute>
                <Home urlData={urlData} setUrlData={setUrlData} />
            </ProtectedRoute>
        }
    />

    <Route
        path="/table"
        element={
            <ProtectedRoute>
                <URLTable urlData={urlData} setUrlData={setUrlData} darkMode={darkMode} />
            </ProtectedRoute>
        }
    />

    <Route
        path="/loginSignup"
        element={
            isLogin
                ? <Navigate to="/home" replace />
                : <LoginSignup isLogin={isLogin} setLogin={setLogin} />
        }
    />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="*" element={<h2 style={{ color: 'white', textAlign: 'center' }}>404: Page Not Found</h2>} />
</Routes>

      </>
    );
  }
