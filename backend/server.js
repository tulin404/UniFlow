import express from "express";
import getLoginToken from "./service.js";
import { getSessKey } from "./service.js";

const port = 3000;
const app = express();

app.get('/', getLoginToken);

app.listen(port, () => {
    console.log(`Running on ${port}`);
});