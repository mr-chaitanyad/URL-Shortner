import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    FiLink2,
    FiLogOut,
    FiMenu,
    FiX,
    FiHome
} from "react-icons/fi";

function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const [menuOpen, setMenuOpen] = useState(false);

    const token = localStorage.getItem("token");

    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {

        localStorage.clear();

        navigate("/login");

    };

    return (

        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">

            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Logo */}

                <Link
                    to="/dashboard"
                    className="flex items-center gap-2 text-blue-600 font-bold text-xl"
                >

                    <FiLink2 size={22} />

                    LinkShield

                </Link>

                {/* Desktop */}

                {token && (

                    <div className="hidden md:flex items-center gap-8">

                        <Link
                            to="/dashboard"
                            className={`flex items-center gap-2 transition ${
                                location.pathname === "/dashboard"
                                    ? "text-blue-600 font-semibold"
                                    : "text-slate-600 hover:text-blue-600"
                            }`}
                        >

                            <FiHome />

                            Dashboard

                        </Link>

                        <div className="h-6 w-px bg-slate-300"></div>

                        <span className="font-medium text-slate-700">

                            {user?.name}

                        </span>

                        <button
                            onClick={logout}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition"
                        >

                            <FiLogOut />

                            Logout

                        </button>

                    </div>

                )}

                {/* Mobile Button */}

                {token && (

                    <button
                        className="md:hidden"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >

                        {menuOpen ? (
                            <FiX size={24} />
                        ) : (
                            <FiMenu size={24} />
                        )}

                    </button>

                )}

            </div>

            {/* Mobile Menu */}

            {token && menuOpen && (

                <div className="md:hidden border-t border-slate-200 bg-white">

                    <div className="flex flex-col p-5 gap-5">

                        <Link
                            to="/dashboard"
                            onClick={() => setMenuOpen(false)}
                            className={`flex items-center gap-3 ${
                                location.pathname === "/dashboard"
                                    ? "text-blue-600 font-semibold"
                                    : "text-slate-700"
                            }`}
                        >

                            <FiHome />

                            Dashboard

                        </Link>

                        <div className="text-slate-500">

                            Signed in as

                            <div className="font-semibold text-slate-800 mt-1">

                                {user?.name}

                            </div>

                        </div>

                        <button
                            onClick={logout}
                            className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
                        >

                            <FiLogOut />

                            Logout

                        </button>

                    </div>

                </div>

            )}

        </nav>

    );

}

export default Navbar;