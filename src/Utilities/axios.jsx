import axios from "axios";

// Use import.meta.env instead of process.env for Vite
const baseURLSagemetrics = import.meta.env.VITE_REACT_APP_BASE_URL;

const vitelWirelessSageMetrics = axios.create({
  baseURL: baseURLSagemetrics
});

export { vitelWirelessSageMetrics };