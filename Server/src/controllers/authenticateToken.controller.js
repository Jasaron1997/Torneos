const { sequelize } = require("../database/database");


export async function auth(req, res) {
  const acceso = req.user;
  try {
    const userone = await sequelize.query(`select users.*, rol.NOMBRE_ROL
    from TB_USUARIO users,
    TB_ROLES rol,
    where users.ID_ROL=rol.ID_ROL
    and users.USUARIO='${acceso.USUARIO}'`, { type: sequelize.QueryTypes.SELECT });
    if (userone[0]) {
      res.json({
        data: userone,
      });
    } else {
      res.json({ data: null });
    }
  } catch (error) {
    console.log(error);
  }
}
