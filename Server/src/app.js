import express, { json } from "express";
import morgan from "morgan";
import cors from "cors";

import config from "./config";

const app = express();

app.use(cors(config));

// Import routes
import accessRoutes from "./routes/access";
import pilotoRoutes from "./routes/piloto";
import empresaRoutes from "./routes/empresa";

import tipoUnidadRouter from "./routes/tipoUnidad";
import tarjeta from "./routes/tarjeta";

import unidadRouter from "./routes/unidad";


import rolesRouter from "./routes/roles";


import usuarioRouter from "./routes/usuario";

import estacionRouter from "./routes/estacion";

import combustibleRouter from "./routes/combustible";

import precioCombustibleDiaRouter from "./routes/precioCombustibleDia";

import asignacionCombustibleRouter from "./routes/asignacionCombustible";

import asignacionTarjetaUnidadRouter from "./routes/asignacionTarjetaUnidad";


import consumoCombustibleRouter from "./routes/consumoCombustible";
import detalleConsumoCombustibleRouter from "./routes/detalleConsumoCombustible";
import accessRolRouter from "./routes/accessRol";
import authRoutes from "./routes/auth";
import authenticateTokenRoutes from "./routes/authenticateToken";

import reportesRoutes from "./routes/reportes";




// Middlewares
app.use(morgan("dev"));
app.use(json());

// Routes
app.use("/api/acceso", accessRoutes);
app.use("/api/piloto", pilotoRoutes);
app.use("/api/empresa", empresaRoutes);

app.use("/api/tipounidad",tipoUnidadRouter);
app.use("/api/tarjeta",tarjeta);

app.use("/api/unidad",unidadRouter);

app.use("/api/roles",rolesRouter);

app.use("/api/usuario",usuarioRouter);

app.use("/api/estacion",estacionRouter);

app.use("/api/combustible",combustibleRouter);

app.use("/api/preciocombustibledia",precioCombustibleDiaRouter);

app.use("/api/asignaciontarjetaunidad",asignacionTarjetaUnidadRouter);
app.use("/api/asignacioncombustible",asignacionCombustibleRouter);



app.use("/api/consumocombustible",consumoCombustibleRouter);
app.use("/api/detalleconsumocombustible",detalleConsumoCombustibleRouter);

app.use("/api/accessrol",accessRolRouter);


app.use("/api/auth", authRoutes);
app.use("/api/authenticateToken", authenticateTokenRoutes);

app.use("/api/reportes", reportesRoutes);

export default app;
