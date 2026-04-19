import axios from "axios";

const computedBaseUrl =
  import.meta.env.VITE_API_BASE_URL ||
  "/api";

const axiosInstance = axios.create({
  baseURL: computedBaseUrl,
});

axiosInstance.interceptors.request.use((config) => {

  const token =
    localStorage.getItem("adminToken") ||
    localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


axiosInstance.interceptors.response.use(

  (response) => response,

  (error) => {

    // ❌ Don't clear storage immediately
    if (error.response?.status === 401) {

      console.warn("Unauthorized request detected");

      // debug purpose
      console.log("Token at failure:", localStorage.getItem("token"));

      // only redirect (NOT remove storage yet)
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;