import express from "express";
import activitiesController from "./controllers/activitiesController.js";

const port = 3000;
const app = express();

app.get('/', activitiesController);

app.listen(port, () => {
    console.log(`Running on ${port}`);
});