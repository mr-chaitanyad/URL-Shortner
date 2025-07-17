import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar({ isLogin, setLogin,darkMode,setDarkMode }) {
    const navigate = useNavigate();

    const handleToggle = () => {
        setDarkMode(!darkMode);
        if(document.body.style.backgroundColor=="white"){
          document.body.style.backgroundColor = "#0f172a"
        }
        else{
        document.body.style.backgroundColor = "white"
        }

        if(document.body.style.color=="white"){
          document.body.style.color = "#0f172a"
        }
        else{
        document.body.style.coloe = "white"
        }
        // Optional: persist to localStorage or apply dark class to body
    };

    return (
        <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'bg-body-tertiary'}`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">SnipURL</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/table">Data</Link>
                        </li>
                        {!isLogin && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/loginSignup">Login/SignUp</Link>
                            </li>
                        )}
                    </ul>

                    <div className="d-flex align-items-center">
                        {/* Toggle Switch */}
                        <div className="form-check form-switch me-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="flexSwitchCheckDefault"
                                checked={darkMode}
                                onChange={handleToggle}
                            />
                        </div>

                        {isLogin && (
                            <>
                                {/* Profile Button */}
                                <button
                                    className="btn btn-outline-primary me-2"
                                    onClick={() => navigate("/profile")}
                                >
                                    Profile
                                </button>

                                {/* Logout Button */}
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => {
                                        localStorage.removeItem("token");
                                        setLogin(false);
                                        navigate("/loginSignup");
                                    }}
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
