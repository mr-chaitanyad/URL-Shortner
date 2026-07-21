import Navbar from "../components/Navbar/Navbar";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
    Legend,
    BarChart,
    Bar
} from "recharts";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnalytics } from "../services/analyticsService";

function Analytics() {

const { id } = useParams();

const [analytics, setAnalytics] = useState(null);

useEffect(() => {

    const fetchAnalytics = async () => {

        try {

            const response = await getAnalytics(id);

            console.log(response.data);

            setAnalytics(response.data);

        } catch (err) {

            console.log(err);

        }

    };

    fetchAnalytics();

}, [id]);



    const COLORS = [
        "#2563EB",
        "#60A5FA",
        "#93C5FD",
        "#BFDBFE",
        "#1D4ED8"
    ];

    const clickData =
        analytics?.clickTrend || [];

    const deviceData =
        analytics?.deviceDistribution || [];

    const browserData =
        analytics?.browserDistribution || [];

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-slate-100">

                <div className="max-w-7xl mx-auto px-6 py-10">

                    <div className="mb-10">

                        <h1 className="text-4xl font-bold text-slate-900">
                            URL Analytics
                        </h1>

                        <p className="text-slate-500 mt-2">
                            View detailed analytics of your shortened URL.
                        </p>

                    </div>

                    {/* Summary */}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                        <div className="bg-white rounded-2xl border p-6">

                            <p className="text-sm text-slate-500 uppercase">
                                Total Clicks
                            </p>

                            <h2 className="text-4xl font-bold mt-3">
                                {analytics?.totalClicks || 0}
                            </h2>

                        </div>

                        <div className="bg-white rounded-2xl border p-6">

                            <p className="text-sm text-slate-500 uppercase">
                                Unique Visitors
                            </p>

                            <h2 className="text-4xl font-bold mt-3">
                                {analytics?.uniqueVisitors || 0}
                            </h2>

                        </div>

                        <div className="bg-white rounded-2xl border p-6">

                            <p className="text-sm text-slate-500 uppercase">
                                Countries
                            </p>

                            <h2 className="text-4xl font-bold mt-3">
                                {analytics?.countryDistribution?.length || 0}
                            </h2>

                        </div>

                        <div className="bg-white rounded-2xl border p-6">

                            <p className="text-sm text-slate-500 uppercase">
                                Devices
                            </p>

                            <h2 className="text-4xl font-bold mt-3">
                                {deviceData.length}
                            </h2>

                        </div>

                    </div>
                                        {/* Click Trend */}

                    <div className="bg-white rounded-2xl border shadow-sm mt-8 p-6">

                        <h2 className="text-xl font-semibold mb-6">
                            Click Trend
                        </h2>

                        <div className="h-80">

                            <ResponsiveContainer width="100%" height="100%">

                                <LineChart data={clickData}>

                                    <CartesianGrid strokeDasharray="3 3" />

                                    <XAxis dataKey="date" />

                                    <YAxis />

                                    <Tooltip />

                                    <Line
                                        type="monotone"
                                        dataKey="clicks"
                                        stroke="#2563EB"
                                        strokeWidth={3}
                                    />

                                </LineChart>

                            </ResponsiveContainer>

                        </div>

                    </div>

                    {/* Device & Browser */}

                    <div className="grid lg:grid-cols-2 gap-6 mt-8">

                        {/* Device Distribution */}

                        <div className="bg-white rounded-2xl border shadow-sm p-6">

                            <h2 className="text-xl font-semibold mb-6">
                                Device Distribution
                            </h2>

                            <div className="h-72">

                                <ResponsiveContainer width="100%" height="100%">

                                    <PieChart>

                                        <Pie
                                            data={deviceData}
                                            dataKey="value"
                                            nameKey="name"
                                            outerRadius={90}
                                            label
                                        >

                                            {deviceData.map((entry, index) => (

                                                <Cell
                                                    key={index}
                                                    fill={COLORS[index % COLORS.length]}
                                                />

                                            ))}

                                        </Pie>

                                        <Tooltip />

                                        <Legend />

                                    </PieChart>

                                </ResponsiveContainer>

                            </div>

                        </div>

                        {/* Browser Distribution */}

                        <div className="bg-white rounded-2xl border shadow-sm p-6">

                            <h2 className="text-xl font-semibold mb-6">
                                Browser Distribution
                            </h2>

                            <div className="h-72">

                                <ResponsiveContainer width="100%" height="100%">

                                    <BarChart
                                        data={browserData}
                                    >

                                        <CartesianGrid strokeDasharray="3 3" />

                                        <XAxis dataKey="browser" />

                                        <YAxis />

                                        <Tooltip />

                                        <Bar
                                            dataKey="clicks"
                                            fill="#2563EB"
                                            radius={[8, 8, 0, 0]}
                                        />

                                    </BarChart>

                                </ResponsiveContainer>

                            </div>

                        </div>

                    </div>
                                        {/* Recent Visitors */}

{/* Recent Visitors */}

<div className="bg-white rounded-2xl border shadow-sm mt-8 p-6">

    <h2 className="text-xl font-semibold mb-6">
        Recent Visitors
    </h2>

    <div className="overflow-x-auto">

        <table className="min-w-full border-collapse">

            <thead className="bg-slate-100">

                <tr>

                    <th className="text-left px-4 py-3">Time</th>

                    <th className="text-left px-4 py-3">IP</th>

                    <th className="text-left px-4 py-3">Country</th>

                    <th className="text-left px-4 py-3">Region</th>

                    <th className="text-left px-4 py-3">City</th>

                    <th className="text-left px-4 py-3">Browser</th>

                    <th className="text-left px-4 py-3">OS</th>

                    <th className="text-left px-4 py-3">Device</th>

                    <th className="text-left px-4 py-3">ISP</th>

                    <th className="text-left px-4 py-3">Timezone</th>

                </tr>

            </thead>

            <tbody>

                {
                    analytics?.recentVisitors?.length > 0 ? (

                        analytics.recentVisitors.map((click, index) => (

                            <tr
                                key={index}
                                className="border-b hover:bg-slate-50"
                            >

                                <td className="px-4 py-3">
                                    {new Date(click.createdAt).toLocaleString()}
                                </td>

                                <td className="px-4 py-3">
                                    {click.ip}
                                </td>

                                <td className="px-4 py-3">
                                    {click.country}
                                </td>

                                <td className="px-4 py-3">
                                    {click.region}
                                </td>

                                <td className="px-4 py-3">
                                    {click.city}
                                </td>

                                <td className="px-4 py-3">
                                    {click.browser}
                                </td>

                                <td className="px-4 py-3">
                                    {click.os}
                                </td>

                                <td className="px-4 py-3">
                                    {click.device}
                                </td>

                                <td className="px-4 py-3">
                                    {click.isp}
                                </td>

                                <td className="px-4 py-3">
                                    {click.timezone}
                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan="10"
                                className="text-center py-10 text-slate-500"
                            >
                                No visitors found.
                            </td>

                        </tr>

                    )
                }

            </tbody>

        </table>

    </div>

</div>

                </div>

            </div>

        </>

    );

}

export default Analytics;