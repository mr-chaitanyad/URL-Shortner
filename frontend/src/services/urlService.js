import api from "./api";

export const createShortUrl = async (originalUrl) => {

    const token = localStorage.getItem("token");

    const response = await api.post(
        "/url/shorten",
        {
            originalUrl
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;

};

export const getMyUrls = async () => {

    const token = localStorage.getItem("token");

    const response = await api.get(
        "/url/myurls",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;

};