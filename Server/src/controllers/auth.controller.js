const { sequelize } = require("../database/database");
import bcrypt from "bcrypt";

const jwt = require("jsonwebtoken");

import dotenv from "dotenv";
dotenv.config();

const crearToken = (usuarioLogin, secreto, expiresIn) => {
  const { USUARIO } = usuarioLogin;
  console.log(USUARIO,usuarioLogin)
  return jwt.sign({ USUARIO }, secreto, { expiresIn });
};



export async function auth(req, res) {
  const { id, user, password } = req.body;
  try {
    const userone = await sequelize.query(`select users.*, rol.NOMBRE_ROL
    from TB_USUARIO users,
    TB_ROLES rol,
    where users.ID_ROL=rol.ID_ROL
    and users.USUARIO='${user}'`, { type: sequelize.QueryTypes.SELECT });
 
    if (userone[0]) {
    // if (userone) {
      // const passwordCorrecto = await bcrypt.compare(password, userone.password);
      // if (passwordCorrecto) {
        if(password===userone[0].CONTRA_USUARIO){
        res.json({
          data: userone,
          token: crearToken(userone[0], process.env.ACCESS_TOKEN, "12hr"),
        });
      } else {
        res.json({ data: null });
      }
      //   })
    } else {
      res.json({ data: null });
    }
  } catch (error) {
    console.log(error);
  }
}
