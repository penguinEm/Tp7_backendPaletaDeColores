import mongoose from "mongoose";
import "dotenv/config";

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI);

const verificarConexion = mongoose.connection
verificarConexion.once("open", () => {
    console.log("DB conectada")
})
