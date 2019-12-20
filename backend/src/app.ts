import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { ClientRouter } from "./routes/Client";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes below
app.use("/api/client", ClientRouter);

// Handle errors
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(JSON.stringify(err, undefined, 2));
    res.status(400).send({ err });
});

export { app };
