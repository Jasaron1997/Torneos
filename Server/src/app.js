import express, { json } from "express";
import morgan from "morgan";
import cors from "cors";

import config from "./config";

const app = express();

app.use(cors(config));

// Import routes
//import accessRoutes from "./routes/access";
import accessRoutes from "./routes/access";
import arbitrosRoutes from "./routes/arbitros";
import authRoutes from "./routes/auth";
import authenticateTokenRoutes from "./routes/authenticateToken";
import bloquesRoutes from "./routes/bloques";
import departamentosRoutes from "./routes/departamentos";
import entrenadoresRoutes from "./routes/entrenadores";
import jugadoresRoutes from "./routes/jugadores";
import equiposRoutes from "./routes/equipos";
import jugadoresPorEquipoRoutes from "./routes/jugadoresPorEquipo";
import municipiosRoutes from "./routes/municipios";
import partidosRoutes from "./routes/partidos";
 import posicionesRoutes from "./routes/posiciones";
 import rolesRoutes from "./routes/roles";
 import torneosRoutes from "./routes/torneos";
 import usuarioRoutes from "./routes/usuario";
 import detallePartidoRoutes from "./routes/detallePartido";



// // Middlewares
app.use(morgan("dev"));
app.use(json());

// // Routes
app.use("/api/access",accessRoutes);
app.use("/api/arbitros",arbitrosRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/authenticateToken",authenticateTokenRoutes);
app.use("/api/bloques",bloquesRoutes);
app.use("/api/departamentos",departamentosRoutes);
app.use("/api/entrenadores",entrenadoresRoutes);
app.use("/api/jugadores",jugadoresRoutes);
app.use("/api/jugadores_Por_Equipo",jugadoresPorEquipoRoutes);
app.use("/api/detalle_partido",detallePartidoRoutes);
app.use("/api/municipios",municipiosRoutes);
app.use("/api/partidos",partidosRoutes);
app.use("/api/posiciones",posicionesRoutes);
app.use("/api/roles",rolesRoutes);
app.use("/api/torneos",torneosRoutes);
app.use("/api/usuarios",usuarioRoutes);
app.use("/api/equipos",equiposRoutes);




export default app;
