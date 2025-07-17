import React, { useEffect } from 'react';
import './URLTable.css';
import { Link } from 'react-router-dom';

export default function URLTable({ urlData, setUrlData, darkMode }) {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:5000/table');
                const data = await res.json();
                setUrlData(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [setUrlData]);

    return (
        <div className={`data-table-container ${darkMode ? 'dark' : 'light'}`}>
            <div className="data-table-header">
                <h2 className="fw-bold">URL Data</h2>
                <Link className="add-btn" to="/home">Add URL</Link>
            </div>
            <table className="url-table fw-bold">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Short URL</th>
                        <th>Original URL</th>
                        <th>Clicks</th>
                        <th>Date Created</th>
                    </tr>
                </thead>
                <tbody>
                    {urlData && urlData.length > 0 ? (
                        urlData.map((item, index) => (
                            <tr key={item._id || index}>
                                <td>{index + 1}</td>
                                <td>
                                    <a
                                        href={`http://localhost:5000/${item.shortURL}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {item.shortURL}
                                    </a>
                                </td>
                                <td className="truncate">
                                    <a
                                        href={item.originalURL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {item.originalURL}
                                    </a>
                                </td>
                                <td>{item.visitHistory ? item.visitHistory.length : 0}</td>
                                <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '-'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="no-data">No data found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
