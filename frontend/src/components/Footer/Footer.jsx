import {
    FiInstagram,
    FiLinkedin
} from "react-icons/fi";

function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 mt-10">

            <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">


                    {/* Brand */}
                    <div>
                        <h2 className="text-xl font-bold text-white">
                            LinkShield
                        </h2>

                        <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                            A simple and powerful URL shortener platform.
                            Create short links, track clicks and manage your
                            URLs easily.
                        </p>
                    </div>



                    {/* Product */}
                    <div>

                        <h3 className="text-white font-semibold mb-4">
                            Product
                        </h3>

                        <ul className="space-y-3 text-sm">

                            <li>
                                <a
                                    href="/dashboard"
                                    className="hover:text-blue-400 transition"
                                >
                                    Dashboard
                                </a>
                            </li>


                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-400 transition"
                                >
                                    Create URL
                                </a>
                            </li>

                        </ul>

                    </div>




                    {/* Connect */}
                    <div>

                        <h3 className="text-white font-semibold mb-4">
                            Connect
                        </h3>


                        <div className="flex gap-4">

                            <a
                                href="https://instagram.com/mr-chaitanyad"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition"
                            >
                                <FiInstagram size={18}/>
                            </a>



                            <a
                                href="https://linkedin.com/in/chaitanya-dhayarkar"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition"
                            >
                                <FiLinkedin size={18}/>
                            </a>

                        </div>


                        <p className="mt-4 text-sm text-slate-400">
                            Built by 
                            <span className="text-white font-medium ml-1">
                                Chaitanya Dhayarkar
                            </span>
                        </p>

                    </div>

                </div>



                {/* Bottom */}

                <div className="border-t border-slate-700 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">


                    <p className="text-sm text-slate-400">
                        © {new Date().getFullYear()} SnipURL.
                        Developed by 
                        <span className="text-white font-medium ml-1">
                            Chaitanya Dhayarkar
                        </span>
                    </p>



                    <div className="flex gap-5 text-sm">

                        <a
                            href="#"
                            className="hover:text-blue-400 transition"
                        >
                            Privacy Policy
                        </a>


                        <a
                            href="#"
                            className="hover:text-blue-400 transition"
                        >
                            Terms
                        </a>

                    </div>


                </div>


            </div>

        </footer>
    );
}

export default Footer;