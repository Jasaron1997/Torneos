const { sequelize } = require("../database/database");
export async function All(req, res) {
  try {
    const datos = await sequelize.query(`select* from  USUARIOS   `, {
      replacements: {},
      type: sequelize.QueryTypes.SELECT,
    });
    if (datos) {
      return res.json({
        message: "SE ENCONTRARON DATOS DE USUARIOS",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo encontraron datos del USUARIOS.",
        data: [],
      });
  }
}
export async function Find(req, res) {
  const { ID } = req.params;
  try {
    const datos = await sequelize.query(
      `select* from  USUARIOS where ID_USUARIO=${ID}  `,
      { replacements: {}, type: sequelize.QueryTypes.SELECT }
    );
    if (datos) {
      return res.json({
        message: "SE ENCONTRARON DATOS DE USUARIOS",
        data: datos[0],
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo encontraron datos del USUARIOS.",
        data: [],
      });
  }
}
export async function Create(req, res) {
  const {
    NOMBRE1,
    NOMBRE2,
    APELLIDO1,
    APELLIDO2,
    CONTRA_USUARIO,
    FECHA_DE_CREACION,
    ID_ROL,
    USUARIO,
  } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC INSERTAR_USUARIOS  @NOMBRE1=:NOMBRE1,@NOMBRE2=:NOMBRE2,@APELLIDO1=:APELLIDO1,@APELLIDO2=:APELLIDO2,@CONTRA_USUARIO=:CONTRA_USUARIO,@FECHA_DE_CREACION=:FECHA_DE_CREACION,@ID_ROL=:ID_ROL,@USUARIO=:USUARIO                                              `,
      {
        replacements: {
          NOMBRE1,
          NOMBRE2,
          APELLIDO1,
          APELLIDO2,
          CONTRA_USUARIO,
          FECHA_DE_CREACION,
          ID_ROL,
          USUARIO,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del USUARIOS",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del USUARIOS.",
        data: [],
      });
  }
}
export async function Update(req, res) {
  const {
    ID_USUARIO,
    NOMBRE1,
    NOMBRE2,
    APELLIDO1,
    APELLIDO2,
    CONTRA_USUARIO,
    FECHA_DE_CREACION,
    ID_ROL,
    USUARIO,
  } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC ACTUALIZAR_USUARIOS  @ID_USUARIO=:ID_USUARIO,@NOMBRE1=:NOMBRE1,@NOMBRE2=:NOMBRE2,@APELLIDO1=:APELLIDO1,@APELLIDO2=:APELLIDO2,@CONTRA_USUARIO=:CONTRA_USUARIO,@FECHA_DE_CREACION=:FECHA_DE_CREACION,@ID_ROL=:ID_ROL,@USUARIO=:USUARIO                                              `,
      {
        replacements: {
          ID_USUARIO,
          NOMBRE1,
          NOMBRE2,
          APELLIDO1,
          APELLIDO2,
          CONTRA_USUARIO,
          FECHA_DE_CREACION,
          ID_ROL,
          USUARIO,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del USUARIOS",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del USUARIOS.",
        data: [],
      });
  }
}
export async function Delete(req, res) {
  const { ID_USUARIO } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC ELIMINAR_USUARIOS  @ID_USUARIO=:ID_USUARIO                                              `,
      { replacements: { ID_USUARIO }, type: sequelize.QueryTypes.SELECT }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del USUARIOS",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del USUARIOS.",
        data: [],
      });
  }
}
