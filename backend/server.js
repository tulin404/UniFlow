import express from "express";
import activitiesController from "./controllers/activitiesController.js";
import cors from "cors";
import { configDotenv } from "dotenv";

configDotenv({ path: ".env.local" });

const port = 3000;
const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credential: true
}));

app.get('/activities', activitiesController);

app.listen(port, () => {
    console.log(`Running on ${port}`);
});