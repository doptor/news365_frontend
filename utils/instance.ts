import axios from "axios";

// Create an instance of Axios with custom configuration
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
  // timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
