const { sequelize } = require("../database/database");
export async function All(req, res) {
  try {
    const datos = await sequelize.query(`select* from  PARTIDOS   `, {
      replacements: {},
      type: sequelize.QueryTypes.SELECT,
    });
    if (datos) {
      return res.json({
        message: "SE ENCONTRARON DATOS DE PARTIDOS",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo encontraron datos del PARTIDOS.",
        data: [],
      });
  }
}
export async function Find(req, res) {
  const { ID } = req.params;
  try {
    const datos = await sequelize.query(
      `select* from  PARTIDOS where ID_PARTIDO=${ID}  `,
      { replacements: {}, type: sequelize.QueryTypes.SELECT }
    );
    if (datos) {
      return res.json({
        message: "SE ENCONTRARON DATOS DE PARTIDOS",
        data: datos[0],
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo encontraron datos del PARTIDOS.",
        data: [],
      });
  }
}
export async function Create(req, res) {
  const {
    FECHA_DE_CREACION,
    ID_USUARIO,
    ID_BLOQUE,
    ID_LOCAL,
    ID_VISITANTE,
    GOLES_LOCAL,
    GOLES_VISITANTE,
    ID_ARBITRO1,
    ID_ARBITRO2,
    ID_ARBITRO3,
  } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC INSERTAR_PARTIDOS  @FECHA_DE_CREACION=:FECHA_DE_CREACION,@ID_USUARIO=:ID_USUARIO,@ID_BLOQUE=:ID_BLOQUE,@ID_LOCAL=:ID_LOCAL,@ID_VISITANTE=:ID_VISITANTE,@GOLES_LOCAL=:GOLES_LOCAL,@GOLES_VISITANTE=:GOLES_VISITANTE,@ID_ARBITRO1=:ID_ARBITRO1,@ID_ARBITRO2=:ID_ARBITRO2,@ID_ARBITRO3=:ID_ARBITRO3                                              `,
      {
        replacements: {
          FECHA_DE_CREACION,
          ID_USUARIO,
          ID_BLOQUE,
          ID_LOCAL,
          ID_VISITANTE,
          GOLES_LOCAL,
          GOLES_VISITANTE,
          ID_ARBITRO1,
          ID_ARBITRO2,
          ID_ARBITRO3,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del PARTIDOS",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del PARTIDOS.",
        data: [],
      });
  }
}
export async function Update(req, res) {
  const {
    ID_PARTIDO,
    FECHA_DE_CREACION,
    ID_USUARIO,
    ID_BLOQUE,
    ID_LOCAL,
    ID_VISITANTE,
    GOLES_LOCAL,
    GOLES_VISITANTE,
    ID_ARBITRO1,
    ID_ARBITRO2,
    ID_ARBITRO3,
  } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC ACTUALIZAR_PARTIDOS  @ID_PARTIDO=:ID_PARTIDO,@FECHA_DE_CREACION=:FECHA_DE_CREACION,@ID_USUARIO=:ID_USUARIO,@ID_BLOQUE=:ID_BLOQUE,@ID_LOCAL=:ID_LOCAL,@ID_VISITANTE=:ID_VISITANTE,@GOLES_LOCAL=:GOLES_LOCAL,@GOLES_VISITANTE=:GOLES_VISITANTE,@ID_ARBITRO1=:ID_ARBITRO1,@ID_ARBITRO2=:ID_ARBITRO2,@ID_ARBITRO3=:ID_ARBITRO3                                              `,
      {
        replacements: {
          ID_PARTIDO,
          FECHA_DE_CREACION,
          ID_USUARIO,
          ID_BLOQUE,
          ID_LOCAL,
          ID_VISITANTE,
          GOLES_LOCAL,
          GOLES_VISITANTE,
          ID_ARBITRO1,
          ID_ARBITRO2,
          ID_ARBITRO3,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del PARTIDOS",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del PARTIDOS.",
        data: [],
      });
  }
}
export async function Delete(req, res) {
  const { ID_PARTIDO } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC ELIMINAR_PARTIDOS  @ID_PARTIDO=:ID_PARTIDO                                              `,
      { replacements: { ID_PARTIDO }, type: sequelize.QueryTypes.SELECT }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del PARTIDOS",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del PARTIDOS.",
        data: [],
      });
  }
}
