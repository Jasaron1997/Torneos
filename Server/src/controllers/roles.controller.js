const { sequelize } = require("../database/database");
export async function All(req, res) {
  try {
    const datos = await sequelize.query(`select* from  ROLES   `, {
      replacements: {},
      type: sequelize.QueryTypes.SELECT,
    });
    if (datos) {
      return res.json({
        message: "SE ENCONTRARON DATOS DE ROLES",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "No se pudo encontraron datos del ROLES.", data: [] });
  }
}
export async function Find(req, res) {
  const { ID } = req.params;
  try {
    const datos = await sequelize.query(
      `select* from  ROLES where ID_ROL=${ID}  `,
      { replacements: {}, type: sequelize.QueryTypes.SELECT }
    );
    if (datos) {
      return res.json({
        message: "SE ENCONTRARON DATOS DE ROLES",
        data: datos[0],
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "No se pudo encontraron datos del ROLES.", data: [] });
  }
}
export async function Create(req, res) {
  const { NOMBRE_ROL, FECHA_CREACION, ID_USUARIO, NIVEL_AUTORIZACION } =
    req.body;
    console.log(req.body)
  try {
    const datos = await sequelize.query(
      `EXEC INSERTAR_ROLES  @NOMBRE_ROL=:NOMBRE_ROL,@FECHA_CREACION=:FECHA_CREACION,@ID_USUARIO=:ID_USUARIO,@NIVEL_AUTORIZACION=:NIVEL_AUTORIZACION                                              `,
      {
        replacements: {
          NOMBRE_ROL,
          FECHA_CREACION,
          ID_USUARIO,
          NIVEL_AUTORIZACION,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del ROLES",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del ROLES.",
        data: [],
      });
  }
}
export async function Update(req, res) {
  const { ID_ROL, NOMBRE_ROL, FECHA_CREACION, ID_USUARIO, NIVEL_AUTORIZACION } =
    req.body;
  try {
    const datos = await sequelize.query(
      `EXEC ACTUALIZAR_ROLES  @ID_ROL=:ID_ROL,@NOMBRE_ROL=:NOMBRE_ROL,@FECHA_CREACION=:FECHA_CREACION,@ID_USUARIO=:ID_USUARIO,@NIVEL_AUTORIZACION=:NIVEL_AUTORIZACION                                              `,
      {
        replacements: {
          ID_ROL,
          NOMBRE_ROL,
          FECHA_CREACION,
          ID_USUARIO,
          NIVEL_AUTORIZACION,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del ROLES",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del ROLES.",
        data: [],
      });
  }
}
export async function Delete(req, res) {
  const { ID_ROL } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC ELIMINAR_ROLES  @ID_ROL=:ID_ROL                                              `,
      { replacements: { ID_ROL }, type: sequelize.QueryTypes.SELECT }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del ROLES",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del ROLES.",
        data: [],
      });
  }
}
