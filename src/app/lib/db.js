import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017/doost_dev";
const client = new MongoClient(uri);

const db = client.db("doost_dev");
console.log(uri);

// Експортуємо db для використання в інших файлах
export { db };
