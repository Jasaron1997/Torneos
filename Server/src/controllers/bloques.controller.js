const { sequelize } = require("../database/database");
export async function All(req, res) {
  try {
    const datos = await sequelize.query(`select* from  BLOQUES   `, {
      replacements: {},
      type: sequelize.QueryTypes.SELECT,
    });
    if (datos) {
      return res.json({
        message: "SE ENCONTRARON DATOS DE BLOQUES",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "No se pudo encontraron datos del BLOQUES.", data: [] });
  }
}

export async function ByTorneso(req, res) {
  try {
  const { ID } = req.params;
    const datos = await sequelize.query(`select BLO.*,TOR.NOMBRE TORNEO from  BLOQUES BLO
    INNER JOIN TORNEOS TOR ON TOR.ID_TORNEO=BLO.ID_TORNEO
    where BLO.ID_TORNEO=${ID}  `, {
      replacements: {},
      type: sequelize.QueryTypes.SELECT,
    });
    if (datos) {
      return res.json({
        message: "SE ENCONTRARON DATOS DE BLOQUES",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "No se pudo encontraron datos del BLOQUES.", data: [] });
  }
}
export async function Find(req, res) {
  const { ID } = req.params;
  try {
    const datos = await sequelize.query(
      `select* from  BLOQUES where ID_BLOQUE=${ID}  `,
      { replacements: {}, type: sequelize.QueryTypes.SELECT }
    );
    if (datos) {
      return res.json({
        message: "SE ENCONTRARON DATOS DE BLOQUES",
        data: datos[0],
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "No se pudo encontraron datos del BLOQUES.", data: [] });
  }
}
export async function Create(req, res) {
  const { NOMBRE, FECHA_DE_CREACION, ID_USUARIO, ID_TORNEO } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC INSERTAR_BLOQUES  @NOMBRE=:NOMBRE,@FECHA_DE_CREACION=:FECHA_DE_CREACION,@ID_USUARIO=:ID_USUARIO,@ID_TORNEO=:ID_TORNEO                                              `,
      {
        replacements: { NOMBRE, FECHA_DE_CREACION, ID_USUARIO, ID_TORNEO },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del BLOQUES",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del BLOQUES.",
        data: [],
      });
  }
}
export async function Update(req, res) {
  const { ID_BLOQUE, NOMBRE, FECHA_DE_CREACION, ID_USUARIO, ID_TORNEO } =
    req.body;
  try {
    const datos = await sequelize.query(
      `EXEC ACTUALIZAR_BLOQUES  @ID_BLOQUE=:ID_BLOQUE,@NOMBRE=:NOMBRE,@FECHA_DE_CREACION=:FECHA_DE_CREACION,@ID_USUARIO=:ID_USUARIO,@ID_TORNEO=:ID_TORNEO                                              `,
      {
        replacements: {
          ID_BLOQUE,
          NOMBRE,
          FECHA_DE_CREACION,
          ID_USUARIO,
          ID_TORNEO,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del BLOQUES",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del BLOQUES.",
        data: [],
      });
  }
}
export async function Delete(req, res) {
  const { ID_BLOQUE } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC ELIMINAR_BLOQUES  @ID_BLOQUE=:ID_BLOQUE                                              `,
      { replacements: { ID_BLOQUE }, type: sequelize.QueryTypes.SELECT }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del BLOQUES",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del BLOQUES.",
        data: [],
      });
  }
}
