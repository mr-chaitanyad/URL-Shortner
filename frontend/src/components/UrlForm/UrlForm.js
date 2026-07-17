import { useState } from "react";
import { createShortUrl } from "../../services/urlService";

function UrlForm({ onUrlCreated }) {

    const [originalUrl, setOriginalUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!originalUrl) {
            alert("Please enter URL");
            return;
        }

        try {

            setLoading(true);

            const response = await createShortUrl(originalUrl);

            alert("Short URL Created Successfully");

            setOriginalUrl("");

            // Refresh URL List
            onUrlCreated();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >

            <input
                type="url"
                placeholder="https://example.com"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                className="w-full border rounded-lg p-3"
            />

            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >

                {
                    loading
                        ? "Creating..."
                        : "Shorten URL"
                }

            </button>

        </form>

    );

}

export default UrlForm;