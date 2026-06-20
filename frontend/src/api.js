import axios from "axios"

const api = axios.create({
    baseURL:
    process.env.NODE_ENV === "production"
        ? "https://visitorpass-project.onrender.com"
        : "",
});

export default api;