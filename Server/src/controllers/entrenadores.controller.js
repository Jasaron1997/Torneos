const { sequelize } = require("../database/database");
export async function All(req, res) {
  try {
    const datos = await sequelize.query(`select* from  ENTRENADORES   `, {
      replacements: {},
      type: sequelize.QueryTypes.SELECT,
    });
    if (datos) {
      return res.json({
        message: "SE ENCONTRARON DATOS DE ENTRENADORES",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo encontraron datos del ENTRENADORES.",
        data: [],
      });
  }
}
export async function Find(req, res) {
  const { ID } = req.params;
  try {
    const datos = await sequelize.query(
      `select* from  ENTRENADORES where ID_ENTRENADOR=${ID}  `,
      { replacements: {}, type: sequelize.QueryTypes.SELECT }
    );
    if (datos) {
      return res.json({
        message: "SE ENCONTRARON DATOS DE ENTRENADORES",
        data: datos[0],
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo encontraron datos del ENTRENADORES.",
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
    NOMBRE_COMPLETO,
    ID_USUARIO,
    DIRECCION,
    ID_DEPARTAMENTO,
    ID_MUNICIPIO,
    FECHA_DE_CREACION,
  } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC INSERTAR_ENTRENADORES  @NOMBRE1=:NOMBRE1,@NOMBRE2=:NOMBRE2,@APELLIDO1=:APELLIDO1,@APELLIDO2=:APELLIDO2,@NOMBRE_COMPLETO=:NOMBRE_COMPLETO,@ID_USUARIO=:ID_USUARIO,@DIRECCION=:DIRECCION,@ID_DEPARTAMENTO=:ID_DEPARTAMENTO,@ID_MUNICIPIO=:ID_MUNICIPIO,@FECHA_DE_CREACION=:FECHA_DE_CREACION                                              `,
      {
        replacements: {
          NOMBRE1,
          NOMBRE2,
          APELLIDO1,
          APELLIDO2,
          NOMBRE_COMPLETO,
          ID_USUARIO,
          DIRECCION,
          ID_DEPARTAMENTO,
          ID_MUNICIPIO,
          FECHA_DE_CREACION,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del ENTRENADORES",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del ENTRENADORES.",
        data: [],
      });
  }
}
export async function Update(req, res) {
  const {
    ID_ENTRENADOR,
    NOMBRE1,
    NOMBRE2,
    APELLIDO1,
    APELLIDO2,
    NOMBRE_COMPLETO,
    ID_USUARIO,
    DIRECCION,
    ID_DEPARTAMENTO,
    ID_MUNICIPIO,
    FECHA_DE_CREACION,
  } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC ACTUALIZAR_ENTRENADORES  @ID_ENTRENADOR=:ID_ENTRENADOR,@NOMBRE1=:NOMBRE1,@NOMBRE2=:NOMBRE2,@APELLIDO1=:APELLIDO1,@APELLIDO2=:APELLIDO2,@NOMBRE_COMPLETO=:NOMBRE_COMPLETO,@ID_USUARIO=:ID_USUARIO,@DIRECCION=:DIRECCION,@ID_DEPARTAMENTO=:ID_DEPARTAMENTO,@ID_MUNICIPIO=:ID_MUNICIPIO,@FECHA_DE_CREACION=:FECHA_DE_CREACION                                              `,
      {
        replacements: {
          ID_ENTRENADOR,
          NOMBRE1,
          NOMBRE2,
          APELLIDO1,
          APELLIDO2,
          NOMBRE_COMPLETO,
          ID_USUARIO,
          DIRECCION,
          ID_DEPARTAMENTO,
          ID_MUNICIPIO,
          FECHA_DE_CREACION,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del ENTRENADORES",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del ENTRENADORES.",
        data: [],
      });
  }
}
export async function Delete(req, res) {
  const { ID_ENTRENADOR } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC ELIMINAR_ENTRENADORES  @ID_ENTRENADOR=:ID_ENTRENADOR                                              `,
      { replacements: { ID_ENTRENADOR }, type: sequelize.QueryTypes.SELECT }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del ENTRENADORES",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del ENTRENADORES.",
        data: [],
      });
  }
}
