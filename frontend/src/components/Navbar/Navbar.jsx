import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiLink2, FiLogOut } from "react-icons/fi";

function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {

        localStorage.clear();

        navigate("/login");

    };

    return (

        <nav className="bg-white border-b border-slate-200">

            <div className="max-w-7xl mx-auto h-16 px-6 flex justify-between items-center">

                <Link
                    to="/dashboard"
                    className="flex items-center gap-2 text-xl font-bold text-blue-600"
                >

                    <FiLink2 />

                    URL Shortener

                </Link>

                {
                    token &&

                    <div className="flex items-center gap-8">

                        <Link
                            to="/dashboard"
                            className={`${
                                location.pathname==="/dashboard"
                                ? "text-blue-600 font-semibold"
                                : "text-slate-600"
                            }`}
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/analytics"
                            className={`${
                                location.pathname==="/analytics"
                                ? "text-blue-600 font-semibold"
                                : "text-slate-600"
                            }`}
                        >
                            Analytics
                        </Link>

                        <span className="text-slate-500">

                            {user?.name}

                        </span>

                        <button
                            onClick={logout}
                            className="text-red-500 hover:text-red-600"
                        >
                            <FiLogOut size={20}/>
                        </button>

                    </div>

                }

            </div>

        </nav>

    );

}

export default Navbar;