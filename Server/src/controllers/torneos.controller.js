const { sequelize } = require("../database/database");
export async function All(req, res) {
  try {
    const datos = await sequelize.query(`select* from  TORNEOS   `, {
      replacements: {},
      type: sequelize.QueryTypes.SELECT,
    });
    if (datos) {
      return res.json({
        message: "SE ENCONTRARON DATOS DE TORNEOS",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "No se pudo encontraron datos del TORNEOS.", data: [] });
  }
}
export async function Find(req, res) {
  const { ID } = req.params;
  try {
    const datos = await sequelize.query(
      `select* from  TORNEOS where ID_TORNEO=${ID}  `,
      { replacements: {}, type: sequelize.QueryTypes.SELECT }
    );
    if (datos) {
      return res.json({
        message: "SE ENCONTRARON DATOS DE TORNEOS",
        data: datos[0],
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "No se pudo encontraron datos del TORNEOS.", data: [] });
  }
}
export async function Create(req, res) {
  const { FECHA_DE_CREACION, ID_USUARIO, ID_MUNICIPIO, ID_DEPARTAMENTO } =
    req.body;
  try {
    const datos = await sequelize.query(
      `EXEC INSERTAR_TORNEOS  @FECHA_DE_CREACION=:FECHA_DE_CREACION,@ID_USUARIO=:ID_USUARIO,@ID_MUNICIPIO=:ID_MUNICIPIO,@ID_DEPARTAMENTO=:ID_DEPARTAMENTO                                              `,
      {
        replacements: {
          FECHA_DE_CREACION,
          ID_USUARIO,
          ID_MUNICIPIO,
          ID_DEPARTAMENTO,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del TORNEOS",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del TORNEOS.",
        data: [],
      });
  }
}
export async function Update(req, res) {
  const {
    ID_TORNEO,
    FECHA_DE_CREACION,
    ID_USUARIO,
    ID_MUNICIPIO,
    ID_DEPARTAMENTO,
  } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC ACTUALIZAR_TORNEOS  @ID_TORNEO=:ID_TORNEO,@FECHA_DE_CREACION=:FECHA_DE_CREACION,@ID_USUARIO=:ID_USUARIO,@ID_MUNICIPIO=:ID_MUNICIPIO,@ID_DEPARTAMENTO=:ID_DEPARTAMENTO                                              `,
      {
        replacements: {
          ID_TORNEO,
          FECHA_DE_CREACION,
          ID_USUARIO,
          ID_MUNICIPIO,
          ID_DEPARTAMENTO,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del TORNEOS",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del TORNEOS.",
        data: [],
      });
  }
}
export async function Delete(req, res) {
  const { ID_TORNEO } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC ELIMINAR_TORNEOS  @ID_TORNEO=:ID_TORNEO                                              `,
      { replacements: { ID_TORNEO }, type: sequelize.QueryTypes.SELECT }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del TORNEOS",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del TORNEOS.",
        data: [],
      });
  }
}
