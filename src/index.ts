import express from "express";
import { router } from "./router";
import { database } from "./config/database";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

database.connect()

app.listen(process.env.PORT, () => {
    console.log(`Listening at http://localhost:${process.env.PORT}`);
  });
  