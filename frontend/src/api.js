import axios from "axios"

const api = axios.create({
    baseURL:
    process.env.NODE_ENV === "production"
        ? "https://YOUR-RENDER-URL.onrender.com"
        : "",
});

export default api;