const { sequelize } = require("../database/database");
export async function All(req, res) {
  try {
    const datos = await sequelize.query(`select* from  DEPARTAMENTOS   `, {
      replacements: {},
      type: sequelize.QueryTypes.SELECT,
    });
    if (datos) {
      return res.json({
        message: "SE ENCONTRARON DATOS DE DEPARTAMENTOS",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo encontraron datos del DEPARTAMENTOS.",
        data: [],
      });
  }
}
export async function Find(req, res) {
  const { ID } = req.params;
  try {
    const datos = await sequelize.query(
      `select* from  DEPARTAMENTOS where ID_DEPARTAMENTO=${ID}  `,
      { replacements: {}, type: sequelize.QueryTypes.SELECT }
    );
    if (datos) {
      return res.json({
        message: "SE ENCONTRARON DATOS DE DEPARTAMENTOS",
        data: datos[0],
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo encontraron datos del DEPARTAMENTOS.",
        data: [],
      });
  }
}
export async function Create(req, res) {
  const { NOMBRE } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC INSERTAR_DEPARTAMENTOS  @NOMBRE=:NOMBRE                                              `,
      { replacements: { NOMBRE }, type: sequelize.QueryTypes.SELECT }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del DEPARTAMENTOS",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del DEPARTAMENTOS.",
        data: [],
      });
  }
}
export async function Update(req, res) {
  const { ID_DEPARTAMENTO, NOMBRE } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC ACTUALIZAR_DEPARTAMENTOS  @ID_DEPARTAMENTO=:ID_DEPARTAMENTO,@NOMBRE=:NOMBRE                                              `,
      {
        replacements: { ID_DEPARTAMENTO, NOMBRE },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del DEPARTAMENTOS",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del DEPARTAMENTOS.",
        data: [],
      });
  }
}
export async function Delete(req, res) {
  const { ID_DEPARTAMENTO } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC ELIMINAR_DEPARTAMENTOS  @ID_DEPARTAMENTO=:ID_DEPARTAMENTO                                              `,
      { replacements: { ID_DEPARTAMENTO }, type: sequelize.QueryTypes.SELECT }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del DEPARTAMENTOS",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del DEPARTAMENTOS.",
        data: [],
      });
  }
}
