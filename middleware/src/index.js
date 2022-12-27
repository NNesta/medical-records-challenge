import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes/routes.js";

const app = express();

//Setting up cors to allow all hosts
app.use(cors());
app.options("*", cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Mouting routes
app.use("/api/v1", router);

//Setting up entry api point
app.get("/", (req, res) => {
  res.send("Hello Mom! >>>> From ngabonziza!😎");
});

//Setting the entry port
const port = 5500;

//Starting the app on configured port
app.listen(port, () =>
);
