import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {"Content-Type": "application/json"}
});

axiosInstance.interceptors.request.use((request) => {
    request.headers["Authorization"] =
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTZjMDAyNmU3ZDc4MjM3ZTc4MjQ0YzZjY2FkYzE3NCIsIm5iZiI6MTczMTg1MTUwMC4wMTE2MTM4LCJzdWIiOiI2NWRjOTY5YzNkYzg4NTAxOGI0MzcxYjEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.EMCEHeFV5bka5NFBVmp-AMZrDdTPqhQ_0tM95LfJjuo";
    return request;
});
export { axiosInstance };