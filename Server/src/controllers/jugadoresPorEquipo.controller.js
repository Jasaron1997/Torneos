const { sequelize } = require("../database/database");
export async function All(req, res) {
  try {
    const datos = await sequelize.query(
      `select jpe.*,eq.NOMBRE EQUIPO,JUG.NOMBRE_COMPLETO JUGADOR,pos.NOMBRE POSICION  from JUGADORES_POR_EQUIPO jpe
      inner join EQUIPOS eq on eq.ID_EQUIPO=jpe.ID_EQUIPO
      inner join  JUGADORES jug on jug.ID_JUGADOR=jpe.ID_JUGADOR
      inner join  POSCICIONES POS on POS.ID_POSICION=jpe.ID_POSICION   `,
      { replacements: {}, type: sequelize.QueryTypes.SELECT }
    );
    if (datos) {
      return res.json({
        message: "SE ENCONTRARON DATOS DE JUGADORES_POR_EQUIPO",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo encontraron datos del JUGADORES_POR_EQUIPO.",
        data: [],
      });
  }
}
export async function Find(req, res) {
  const { ID } = req.params;
  try {
    const datos = await sequelize.query(
      `select* from  JUGADORES_POR_EQUIPO where ID_JUGADOR_POR_EQUIPO=${ID}  `,
      { replacements: {}, type: sequelize.QueryTypes.SELECT }
    );
    if (datos) {
      return res.json({
        message: "SE ENCONTRARON DATOS DE JUGADORES_POR_EQUIPO",
        data: datos[0],
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo encontraron datos del JUGADORES_POR_EQUIPO.",
        data: [],
      });
  }
}
export async function Create(req, res) {
  const { FECHA_DE_CREACION, ID_USUARIO, ID_EQUIPO, ID_JUGADOR, ID_POSICION } =
    req.body;
  try {
    const datos = await sequelize.query(
      `EXEC INSERTAR_JUGADORES_POR_EQUIPO  @FECHA_DE_CREACION=:FECHA_DE_CREACION,@ID_USUARIO=:ID_USUARIO,@ID_EQUIPO=:ID_EQUIPO,@ID_JUGADOR=:ID_JUGADOR,@ID_POSICION=:ID_POSICION                                              `,
      {
        replacements: {
          FECHA_DE_CREACION,
          ID_USUARIO,
          ID_EQUIPO,
          ID_JUGADOR,
          ID_POSICION,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del JUGADORES_POR_EQUIPO",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del JUGADORES_POR_EQUIPO.",
        data: [],
      });
  }
}
export async function Update(req, res) {
  const {
    ID_JUGADOR_POR_EQUIPO,
    FECHA_DE_CREACION,
    ID_USUARIO,
    ID_EQUIPO,
    ID_JUGADOR,
    ID_POSICION,
  } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC ACTUALIZAR_JUGADORES_POR_EQUIPO  @ID_JUGADOR_POR_EQUIPO=:ID_JUGADOR_POR_EQUIPO,@FECHA_DE_CREACION=:FECHA_DE_CREACION,@ID_USUARIO=:ID_USUARIO,@ID_EQUIPO=:ID_EQUIPO,@ID_JUGADOR=:ID_JUGADOR,@ID_POSICION=:ID_POSICION                                              `,
      {
        replacements: {
          ID_JUGADOR_POR_EQUIPO,
          FECHA_DE_CREACION,
          ID_USUARIO,
          ID_EQUIPO,
          ID_JUGADOR,
          ID_POSICION,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del JUGADORES_POR_EQUIPO",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del JUGADORES_POR_EQUIPO.",
        data: [],
      });
  }
}
export async function Delete(req, res) {
  const { ID_JUGADOR_POR_EQUIPO } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC ELIMINAR_JUGADORES_POR_EQUIPO  @ID_JUGADOR_POR_EQUIPO=:ID_JUGADOR_POR_EQUIPO                                              `,
      {
        replacements: { ID_JUGADOR_POR_EQUIPO },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del JUGADORES_POR_EQUIPO",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del JUGADORES_POR_EQUIPO.",
        data: [],
      });
  }
}
