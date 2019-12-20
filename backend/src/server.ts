import { app } from "./app";
import { port } from "./config";
import "./db/mongoose";

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
