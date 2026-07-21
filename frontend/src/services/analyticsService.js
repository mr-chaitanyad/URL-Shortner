    import axios from "axios";

    const API = axios.create({
        baseURL: "https://url-shortner-r2u6.onrender.com/api",
    });

    API.interceptors.request.use((config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    });

    export const getAnalytics = (id) => {
        return API.get(`/url/analytics/${id}`);
    };  