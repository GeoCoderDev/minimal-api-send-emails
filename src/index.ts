import express from "express";
import sendRouter from "./routes/sendMe";
import morgan from "morgan";
import method_override from "method-override";
import cors, { CorsOptions } from "cors";

const PORT = process.env.PORT || 3000;

const app = express();

//Cadena de middlewares
app.use(morgan("dev"));
app.use(express.json()); //Convierte el cuerpo del request a un objeto JSON

// Configuración de cors con orígenes permitidos
const allowedOrigins = ["https://geocoderdev.github.io/"];

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors());

app.use(method_override()); // Soporte para HTTP method override
app.use(method_override("X-HTTP-Method-Override")); // Soporte adicional para HTTP method override

// Asignando los routers a sus respectivas rutas
app.use("/sendMe", sendRouter);
app.get("*", (req, res) => {
  res.send("HOLAAAAAAAAAAAAAAAAA");
});

//Iniciando servidor
app.listen(PORT, () => {
  console.log("Servidor escuchando en puerto " + PORT);
});
