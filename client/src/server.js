import axios from "axios";
import dotenv from "dotenv";

console.log(process.env.PKEY_1);

const server = axios.create({
  baseURL: "http://localhost:3042",
});

export default server;
