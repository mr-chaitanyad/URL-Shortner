import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import UrlForm from "../components/UrlForm/UrlForm";
import { getMyUrls } from "../services/urlService";
import Footer from "../components/Footer/Footer";
import {
    FiCopy,
    FiMousePointer,
    FiCalendar,
    FiLink,
    FiExternalLink,
    FiCheck
} from "react-icons/fi";

function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user"));

    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [copiedId, setCopiedId] = useState(null);

    const fetchUrls = async () => {
        try {
            setLoading(true);
            const response = await getMyUrls();
            setUrls(response.data || []);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUrls();
    }, []);

    const totalUrls = urls.length;

    const totalClicks = urls.reduce(
        (sum, item) => sum + (item.totalClicks || 0),
        0
    );

    const copyUrl = (url, id) => {
        navigator.clipboard.writeText(url);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

                {/* Header Section */}
                <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-5 sm:p-8 mb-6 sm:mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest">
                                URL Shortener
                            </span>
                            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 sm:mt-2">
                                Dashboard
                            </h1>
                            <p className="text-slate-500 text-sm sm:text-base mt-1 sm:mt-2 max-w-xl">
                                Create short links, monitor traffic, and manage all your URLs
                                from a single dashboard.
                            </p>
                        </div>

                        <div className="w-full md:w-auto">
                            <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 sm:px-6 sm:py-4">
                                <p className="text-xs text-slate-500 font-medium">
                                    Active Account
                                </p>
                                <h3 className="font-semibold text-slate-900 mt-0.5 text-sm sm:text-base truncate max-w-[280px]">
                                    {user?.email || "User Account"}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top Grid: Form & Quick Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Form Container */}
                    <div className="lg:col-span-2 bg-white rounded-2xl p-5 sm:p-8 shadow-sm border border-slate-200/80">
                        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-slate-800">
                            Create Short URL
                        </h2>
                        <UrlForm onSuccess={fetchUrls} />
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-5">
                        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/80 flex sm:flex-col justify-between sm:justify-start items-center sm:items-start">
                            <div>
                                <p className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wider">
                                    Total URLs
                                </p>
                                <h2 className="text-3xl sm:text-4xl font-extrabold mt-1 sm:mt-2 text-blue-600">
                                    {totalUrls}
                                </h2>
                            </div>
                            <div className="sm:hidden text-blue-100 bg-blue-50 p-3 rounded-xl">
                                <FiLink size={24} className="text-blue-600" />
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/80 flex sm:flex-col justify-between sm:justify-start items-center sm:items-start">
                            <div>
                                <p className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wider">
                                    Total Clicks
                                </p>
                                <h2 className="text-3xl sm:text-4xl font-extrabold mt-1 sm:mt-2 text-blue-600">
                                    {totalClicks}
                                </h2>
                            </div>
                            <div className="sm:hidden text-blue-100 bg-blue-50 p-3 rounded-xl">
                                <FiMousePointer size={24} className="text-blue-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* URL List Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 mt-6 sm:mt-8">
                    <div className="px-5 sm:px-8 py-4 sm:py-6 border-b border-slate-100 flex items-center justify-between">
                        <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                            My URLs
                        </h2>
                        <span className="text-xs sm:text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                            {totalUrls} {totalUrls === 1 ? "Link" : "Links"}
                        </span>
                    </div>

                    <div className="p-4 sm:p-8">
                        {loading ? (
                            <div className="py-12 text-center text-slate-500">
                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent mb-3"></div>
                                <p className="text-sm">Loading your URLs...</p>
                            </div>
                        ) : urls.length === 0 ? (
                            <div className="py-12 text-center text-slate-500">
                                <p className="text-base font-medium">No URLs created yet</p>
                                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                                    Create your first shortened link using the form above.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4 sm:space-y-5">
                                {urls.map((item) => (
                                    <div
                                        key={item._id}
                                        className="border border-slate-200/80 rounded-xl p-4 sm:p-5 hover:border-blue-200 hover:shadow-md transition-all duration-200 bg-white"
                                    >
                                        {/* Original URL */}
                                        <div>
                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                                                Original URL
                                            </p>
                                            <a
                                                href={item.originalUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm sm:text-base text-slate-800 hover:text-blue-600 break-all font-normal transition-colors inline-flex items-center gap-1.5 max-w-full"
                                            >
                                                <span className="truncate">{item.originalUrl}</span>
                                                <FiExternalLink size={14} className="shrink-0 text-slate-400" />
                                            </a>
                                        </div>

                                        {/* Short URL Block */}
                                        <div className="mt-4 pt-3 border-t border-slate-100">
                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                                                Short URL
                                            </p>

                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                                <a
                                                    href={item.shortUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm sm:text-base text-green-600 hover:text-green-700 font-semibold break-all"
                                                >
                                                    {item.shortUrl}
                                                </a>

                                                <button
                                                    onClick={() => copyUrl(item.shortUrl, item._id)}
                                                    className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors w-full sm:w-auto shrink-0 ${
                                                        copiedId === item._id
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                                                    }`}
                                                >
                                                    {copiedId === item._id ? (
                                                        <>
                                                            <FiCheck size={14} />
                                                            Copied!
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FiCopy size={14} />
                                                            Copy
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Stats Row */}
                                        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs sm:text-sm text-slate-500 gap-3">
                                            <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md">
                                                <FiMousePointer size={14} className="text-slate-400" />
                                                Clicks: <strong className="text-slate-800">{item.totalClicks || 0}</strong>
                                            </span>

                                            <span className="flex items-center gap-1.5">
                                                <FiCalendar size={14} className="text-slate-400" />
                                                {new Date(item.createdAt).toLocaleDateString(undefined, {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric"
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Dashboard;