import axios from "axios";
import * as Constants from "./Constants";

const API = axios.create({
    baseURL: Constants.BASE_URL,
});

export default API;
