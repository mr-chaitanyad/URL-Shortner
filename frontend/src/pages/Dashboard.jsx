import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import UrlForm from "../components/UrlForm/UrlForm";
import { getMyUrls } from "../services/urlService";
import {
    FiCopy,
    FiMousePointer,
    FiCalendar,
    FiLink,
    FiBarChart2
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user"));

    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const fetchUrls = async () => {
        try {
            setLoading(true);
            const response = await getMyUrls();
            setUrls(response.data);
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

    const copyUrl = (url) => {
        navigator.clipboard.writeText(url);
        alert("Short URL copied!");
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-slate-100">
                <div className="max-w-7xl mx-auto px-6 py-10">

                    {/* Header */}

                    <div className="flex items-center justify-between mb-10">

                        <div>
                            <h1 className="text-4xl font-bold text-slate-900">
                                Welcome back, {user?.name}
                            </h1>

                            <p className="text-slate-500 mt-2">
                                Manage, shorten and track all your links.
                            </p>
                        </div>
                    </div>

                    {/* Top Section */}

                    <div className="grid lg:grid-cols-3 gap-6">

                        <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border">

                            <h2 className="text-xl font-semibold mb-6">
                                Create Short URL
                            </h2>

                            <UrlForm onSuccess={fetchUrls} />

                        </div>

                        <div className="space-y-5">

                            <div className="bg-white rounded-2xl p-6 shadow-sm border">

                                <p className="text-slate-500">
                                    Total URLs
                                </p>

                                <h2 className="text-4xl font-bold mt-3 text-blue-600">
                                    {totalUrls}
                                </h2>

                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-sm border">

                                <p className="text-slate-500">
                                    Total Clicks
                                </p>

                                <h2 className="text-4xl font-bold mt-3 text-blue-600">
                                    {totalClicks}
                                </h2>

                            </div>

                        </div>

                    </div>

                    {/* URL List */}

                    <div className="bg-white rounded-2xl shadow-sm border mt-8">

                        <div className="px-8 py-6 border-b flex justify-between">

                            <h2 className="text-xl font-semibold">
                                My URLs
                            </h2>

                            <span className="text-slate-500">
                                {totalUrls} Links
                            </span>

                        </div>

                        <div className="p-8">

                            {loading ? (
                                <p className="text-center text-slate-500">
                                    Loading URLs...
                                </p>
                            ) : urls.length === 0 ? (
                                <p className="text-center text-slate-500">
                                    No URLs created yet.
                                </p>
                            ) : (
                                <div className="space-y-5">                                    {urls.map((item) => (
                                        <div
                                            key={item._id}
                                            className="border rounded-xl p-5 hover:shadow-md transition"
                                        >
                                            {/* Original URL */}
                                            <p className="text-sm text-slate-500">
                                                Original URL
                                            </p>

                                            <a
                                                href={item.originalUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 break-all"
                                            >
                                                {item.originalUrl}
                                            </a>

                                            {/* Short URL */}
                                            <div className="mt-5">
                                                <p className="text-sm text-slate-500">
                                                    Short URL
                                                </p>

                                                <div className="flex items-center gap-3 flex-wrap">
                                                    <a
                                                        href={item.shortUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-green-600 font-medium"
                                                    >
                                                        {item.shortUrl}
                                                    </a>

                                                    <button
                                                        onClick={() =>
                                                            copyUrl(item.shortUrl)
                                                        }
                                                        className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 px-3 py-2 rounded-lg text-sm"
                                                    >
                                                        <FiCopy size={15} />
                                                        Copy
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Stats */}
                                            <div className="mt-5 flex flex-wrap gap-8 text-sm text-slate-600">
                                                <span className="flex items-center gap-2">
                                                    <FiMousePointer size={16} />
                                                    Clicks :
                                                    <strong>
                                                        {item.totalClicks || 0}
                                                    </strong>
                                                </span>

                                                <span className="flex items-center gap-2">
                                                    <FiCalendar size={16} />
                                                    {new Date(
                                                        item.createdAt
                                                    ).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;