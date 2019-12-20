import mongoose from "mongoose";
import { mongoUri } from "../config";

mongoose.Promise = global.Promise;
console.log(mongoUri);
mongoose.connect(mongoUri, {
    useNewUrlParser: true
}).catch((e: any) => console.log(e) );

export { mongoose };