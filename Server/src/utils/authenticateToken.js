const jwt = require("jsonwebtoken");
import dotenv from "dotenv";
const { sequelize } = require("../database/database");

dotenv.config();




export default  function  authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN, async (err,  user) =>  {
    console.log(err);
    if (err) return res.sendStatus(403);
    try {
      const userone = await sequelize.query(`select users.*, rol.NOMBRE_ROL
      from USUARIOS users,
      ROLES rol
      where users.ID_ROL=rol.ID_ROL
      and users.USUARIO='${user.USUARIO}'`, { type: sequelize.QueryTypes.SELECT });
      
      req.user = user;
      req.body.USUARIO_USUARIO=userone[0].USUARIO;
      req.body.ID_USUARIO=userone[0].ID_USUARIO;
      req.body.ID_ROL=userone[0].ID_ROL;
      next();
    } catch (error) {
      console.log(error);
    }
  });
}
