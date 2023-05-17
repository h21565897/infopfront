import { MongoClient } from "mongodb";
if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}
const uri = process.env.MONGODB_URI;

let client;
let clientProimise: Promise<MongoClient>;
client = new MongoClient(uri, {});
clientProimise = client.connect();
export default clientProimise;
