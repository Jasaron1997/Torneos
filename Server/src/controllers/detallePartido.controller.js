const { sequelize } = require("../database/database");
export async function All(req, res) {
  try {
    const datos = await sequelize.query(`select* from  DETALLE_PARTIDO   `, {
      replacements: {},
      type: sequelize.QueryTypes.SELECT,
    });
    if (datos) {
      return res.json({
        message: "SE ENCONTRARON DATOS DE DETALLE_PARTIDO",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo encontraron datos del DETALLE_PARTIDO.",
        data: [],
      });
  }
}
export async function Find(req, res) {
  const { ID } = req.params;
  try {
    const datos = await sequelize.query(
      `select* from  DETALLE_PARTIDO where ID_DETALLE_PARTIDO=${ID}  `,
      { replacements: {}, type: sequelize.QueryTypes.SELECT }
    );
    if (datos) {
      return res.json({
        message: "SE ENCONTRARON DATOS DE DETALLE_PARTIDO",
        data: datos[0],
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo encontraron datos del DETALLE_PARTIDO.",
        data: [],
      });
  }
}
export async function byPartido(req, res) {
  const { ID } = req.params;
  try {
    const datos = await sequelize.query(
      `SELECT DP.*,EQ.NOMBRE EQUIPO,JU.NOMBRE_COMPLETO JUGADOR FROM DETALLE_PARTIDO DP
      INNER JOIN EQUIPOS EQ ON EQ.ID_EQUIPO=DP.ID_EQUIPO
      INNER JOIN JUGADORES JU ON JU.ID_JUGADOR=DP.ID_JUGADOR WHERE DP.ID_PARTIDO=${ID}  `,
      { replacements: {}, type: sequelize.QueryTypes.SELECT }
    );
    if (datos) {
      return res.json({
        message: "SE ENCONTRARON DATOS DE DETALLE_PARTIDO",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo encontraron datos del DETALLE_PARTIDO.",
        data: [],
      });
  }
}
export async function Create(req, res) {
  const { ID_EQUIPO, GOL, FECHA_CREACION,ID_JUGADOR,ID_PARTIDO } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC INSERTAR_DETALLE_PARTIDO  @ID_EQUIPO=:ID_EQUIPO,@GOL=:GOL,@FECHA_CREACION=:FECHA_CREACION,
      @ID_JUGADOR=:ID_JUGADOR,@ID_PARTIDO=:ID_PARTIDO                                              `,
      {
        replacements: { ID_EQUIPO, GOL, FECHA_CREACION,ID_JUGADOR,ID_PARTIDO },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del DETALLE_PARTIDO",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del DETALLE_PARTIDO.",
        data: [],
      });
  }
}
export async function Create_bloque(req, res) {
  const { ID_EQUIPO, GOL, FECHA_CREACION,ID_JUGADOR,ID_PARTIDO } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC INSERTAR_DETALLE_PARTIDO_BLOQUE  @ID_EQUIPO=:ID_EQUIPO,@GOL=:GOL,@FECHA_CREACION=:FECHA_CREACION,
      @ID_JUGADOR=:ID_JUGADOR,@ID_PARTIDO=:ID_PARTIDO                                              `,
      {
        replacements: { ID_EQUIPO, GOL, FECHA_CREACION,ID_JUGADOR,ID_PARTIDO },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del DETALLE_PARTIDO",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del DETALLE_PARTIDO.",
        data: [],
      });
  }
}
export async function Update(req, res) {
  const { ID_DETALLE_PARTIDO, ID_EQUIPO, GOL, FECHA_CREACION } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC ACTUALIZAR_DETALLE_PARTIDO  @ID_DETALLE_PARTIDO=:ID_DETALLE_PARTIDO,@ID_EQUIPO=:ID_EQUIPO,@GOL=:GOL,@FECHA_CREACION=:FECHA_CREACION                                              `,
      {
        replacements: { ID_DETALLE_PARTIDO, ID_EQUIPO, GOL, FECHA_CREACION },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del DETALLE_PARTIDO",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del DETALLE_PARTIDO.",
        data: [],
      });
  }
}
export async function Delete(req, res) {
  const { ID_DETALLE_PARTIDO } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC ELIMINAR_DETALLE_PARTIDO  @ID_DETALLE_PARTIDO=:ID_DETALLE_PARTIDO                                              `,
      {
        replacements: { ID_DETALLE_PARTIDO },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del DETALLE_PARTIDO",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del DETALLE_PARTIDO.",
        data: [],
      });
  }
}
