const { sequelize } = require("../database/database");
export async function All(req, res) {
  try {
    const datos = await sequelize.query(`select* from  POSCICIONES   `, {
      replacements: {},
      type: sequelize.QueryTypes.SELECT,
    });
    if (datos) {
      return res.json({
        message: "SE ENCONTRARON DATOS DE POSCICIONES",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo encontraron datos del POSCICIONES.",
        data: [],
      });
  }
}
export async function Find(req, res) {
  const { ID } = req.params;
  try {
    const datos = await sequelize.query(
      `select* from  POSCICIONES where ID_POSICION=${ID}  `,
      { replacements: {}, type: sequelize.QueryTypes.SELECT }
    );
    if (datos) {
      return res.json({
        message: "SE ENCONTRARON DATOS DE POSCICIONES",
        data: datos[0],
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo encontraron datos del POSCICIONES.",
        data: [],
      });
  }
}
export async function Create(req, res) {
  const { NOMBRE, FECHA_DE_CREACION, ID_USUARIO } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC INSERTAR_POSCICIONES  @NOMBRE=:NOMBRE,@FECHA_DE_CREACION=:FECHA_DE_CREACION,@ID_USUARIO=:ID_USUARIO                                              `,
      {
        replacements: { NOMBRE, FECHA_DE_CREACION, ID_USUARIO },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del POSCICIONES",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del POSCICIONES.",
        data: [],
      });
  }
}
export async function Update(req, res) {
  const { ID_POSICION, NOMBRE, FECHA_DE_CREACION, ID_USUARIO } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC ACTUALIZAR_POSCICIONES  @ID_POSICION=:ID_POSICION,@NOMBRE=:NOMBRE,@FECHA_DE_CREACION=:FECHA_DE_CREACION,@ID_USUARIO=:ID_USUARIO                                              `,
      {
        replacements: { ID_POSICION, NOMBRE, FECHA_DE_CREACION, ID_USUARIO },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del POSCICIONES",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del POSCICIONES.",
        data: [],
      });
  }
}
export async function Delete(req, res) {
  const { ID_POSICION } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC ELIMINAR_POSCICIONES  @ID_POSICION=:ID_POSICION                                              `,
      { replacements: { ID_POSICION }, type: sequelize.QueryTypes.SELECT }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del POSCICIONES",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del POSCICIONES.",
        data: [],
      });
  }
}
