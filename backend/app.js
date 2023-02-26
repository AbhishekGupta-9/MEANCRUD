import express from "express";
import bodyParser from "body-parser";
import DB from "./db/db";
import cors from "cors";

const app = express();

import userRoutes from './routes/userRoutes';

//DB Connection
DB();

// middleware

app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json());

app.use("/", express.static("public"));
app.use(userRoutes);





export default app;
