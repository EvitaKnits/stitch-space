import axios from "axios";

if (import.meta.env.DEV){
    axios.defaults.baseURL = "https://8000-evitaknits-stitchspacea-7teiu88dgwp.ws.codeinstitute-ide.net/"
} else {
    axios.defaults.baseURL = "https://stitch-space-api-007f388f42eb.herokuapp.com/"
}

axios.defaults.params = {}
axios.defaults.params['format'] = "json"
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosClient = axios.create();