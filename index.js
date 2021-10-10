import mongoose from "mongoose";
import dotenv from "dotenv";
import startSeeding from "./seeders.js";
import startRelations from "./relations.js";

const { connect, connection } = mongoose;

dotenv.config();

try {
    await connect(process.env.MONGODB_URI);
    await startSeeding();
    await startRelations();
} catch (err) {
    console.error(err);
} finally {
    connection.close();
}
