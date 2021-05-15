const { sequelize } = require("../database/database");
export async function All(req, res) {
  try {
    const datos = await sequelize.query(`select* from  MUNICIPIOS   `, {
      replacements: {},
      type: sequelize.QueryTypes.SELECT,
    });
    if (datos) {
      return res.json({
        message: "SE ENCONTRARON DATOS DE MUNICIPIOS",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo encontraron datos del MUNICIPIOS.",
        data: [],
      });
  }
}
export async function Find(req, res) {
  const { ID } = req.params;
  try {
    const datos = await sequelize.query(
      `select* from  MUNICIPIOS where ID_MUNICIPIO=${ID}  `,
      { replacements: {}, type: sequelize.QueryTypes.SELECT }
    );
    if (datos) {
      return res.json({
        message: "SE ENCONTRARON DATOS DE MUNICIPIOS",
        data: datos[0],
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo encontraron datos del MUNICIPIOS.",
        data: [],
      });
  }
}
export async function Create(req, res) {
  const { NOMBRE } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC INSERTAR_MUNICIPIOS  @NOMBRE=:NOMBRE                                              `,
      { replacements: { NOMBRE }, type: sequelize.QueryTypes.SELECT }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del MUNICIPIOS",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del MUNICIPIOS.",
        data: [],
      });
  }
}
export async function Update(req, res) {
  const { ID_MUNICIPIO, NOMBRE } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC ACTUALIZAR_MUNICIPIOS  @ID_MUNICIPIO=:ID_MUNICIPIO,@NOMBRE=:NOMBRE                                              `,
      {
        replacements: { ID_MUNICIPIO, NOMBRE },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del MUNICIPIOS",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del MUNICIPIOS.",
        data: [],
      });
  }
}
export async function Delete(req, res) {
  const { ID_MUNICIPIO } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC ELIMINAR_MUNICIPIOS  @ID_MUNICIPIO=:ID_MUNICIPIO                                              `,
      { replacements: { ID_MUNICIPIO }, type: sequelize.QueryTypes.SELECT }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del MUNICIPIOS",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del MUNICIPIOS.",
        data: [],
      });
  }
}
