const { sequelize } = require("../database/database");
export async function All(req, res) {
  try {
    const datos = await sequelize.query(`select* from  PARTIDO_BLOQUE   `, {
      replacements: {},
      type: sequelize.QueryTypes.SELECT,
    });
    if (datos) {
      return res.json({
        message: "SE ENCONTRARON DATOS DE PARTIDO_BLOQUE",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo encontraron datos del PARTIDO_BLOQUE.",
        data: [],
      });
  }
}
export async function Find(req, res) {
  const { ID } = req.params;
  try {
    const datos = await sequelize.query(
      `select* from  PARTIDO_BLOQUE where ID_PARTIDO_BLOQUE=${ID}  `,
      { replacements: {}, type: sequelize.QueryTypes.SELECT }
    );
    if (datos) {
      return res.json({
        message: "SE ENCONTRARON DATOS DE PARTIDO_BLOQUE",
        data: datos[0],
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo encontraron datos del PARTIDO_BLOQUE.",
        data: [],
      });
  }
}
export async function Create(req, res) {
  const {
    FECHA_DE_CREACION,
    ID_USUARIO,
    ID_LOCAL,
    ID_VISITANTE,
    GOLES_LOCAL,
    GOLES_VISITANTE,
    ID_ARBITRO1,
    ID_ARBITRO2,
    ID_ARBITRO3,
    ID_BLOQUE=null,
    ID_TORNEO,
  } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC INSERTAR_PARTIDO_BLOQUE  @FECHA_DE_CREACION=:FECHA_DE_CREACION,@ID_USUARIO=:ID_USUARIO,@ID_LOCAL=:ID_LOCAL,@ID_VISITANTE=:ID_VISITANTE,@GOLES_LOCAL=:GOLES_LOCAL,@GOLES_VISITANTE=:GOLES_VISITANTE,@ID_ARBITRO1=:ID_ARBITRO1,@ID_ARBITRO2=:ID_ARBITRO2,@ID_ARBITRO3=:ID_ARBITRO3,@ID_BLOQUE=:ID_BLOQUE,@ID_TORNEO=:ID_TORNEO                                              `,
      {
        replacements: {
          FECHA_DE_CREACION,
          ID_USUARIO,
          ID_LOCAL,
          ID_VISITANTE,
          GOLES_LOCAL,
          GOLES_VISITANTE,
          ID_ARBITRO1,
          ID_ARBITRO2,
          ID_ARBITRO3,
          ID_BLOQUE,
          ID_TORNEO,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del PARTIDO_BLOQUE",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del PARTIDO_BLOQUE.",
        data: [],
      });
  }
}
export async function Update(req, res) {
  const {
    ID_PARTIDO_BLOQUE,
    FECHA_DE_CREACION,
    ID_USUARIO,
    ID_LOCAL,
    ID_VISITANTE,
    GOLES_LOCAL,
    GOLES_VISITANTE,
    ID_ARBITRO1,
    ID_ARBITRO2,
    ID_ARBITRO3,
    ID_BLOQUE,
    ID_TORNEO,
  } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC ACTUALIZAR_PARTIDO_BLOQUE  @ID_PARTIDO_BLOQUE=:ID_PARTIDO_BLOQUE,@FECHA_DE_CREACION=:FECHA_DE_CREACION,@ID_USUARIO=:ID_USUARIO,@ID_LOCAL=:ID_LOCAL,@ID_VISITANTE=:ID_VISITANTE,@GOLES_LOCAL=:GOLES_LOCAL,@GOLES_VISITANTE=:GOLES_VISITANTE,@ID_ARBITRO1=:ID_ARBITRO1,@ID_ARBITRO2=:ID_ARBITRO2,@ID_ARBITRO3=:ID_ARBITRO3,@ID_BLOQUE=:ID_BLOQUE,@ID_TORNEO=:ID_TORNEO                                              `,
      {
        replacements: {
          ID_PARTIDO_BLOQUE,
          FECHA_DE_CREACION,
          ID_USUARIO,
          ID_LOCAL,
          ID_VISITANTE,
          GOLES_LOCAL,
          GOLES_VISITANTE,
          ID_ARBITRO1,
          ID_ARBITRO2,
          ID_ARBITRO3,
          ID_BLOQUE,
          ID_TORNEO,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del PARTIDO_BLOQUE",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del PARTIDO_BLOQUE.",
        data: [],
      });
  }
}
export async function Delete(req, res) {
  const { ID_PARTIDO_BLOQUE } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC ELIMINAR_PARTIDO_BLOQUE  @ID_PARTIDO_BLOQUE=:ID_PARTIDO_BLOQUE                                              `,
      { replacements: { ID_PARTIDO_BLOQUE }, type: sequelize.QueryTypes.SELECT }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del PARTIDO_BLOQUE",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del PARTIDO_BLOQUE.",
        data: [],
      });
  }
}
export async function ByTorneo(req, res) {
  try {
    const { ID } = req.params;
    const datos = await sequelize.query(
      `select par.*,locall.NOMBRE LOCAL, visitante.NOMBRE VISITANTE,
      ARBITRO1.NOMBRE_COMPLETO ARBITRO1,
      ARBITRO2.NOMBRE_COMPLETO ARBITRO2,
      ARBITRO3.NOMBRE_COMPLETO ARBITRO3
      from PARTIDO_BLOQUE par
      inner join EQUIPOS locall on locall.ID_EQUIPO=par.ID_LOCAL
      inner join EQUIPOS visitante on visitante.ID_EQUIPO=par.ID_VISITANTE
      left join ARBITROS ARBITRO1 on ARBITRO1.ID_ARBITRO=par.ID_ARBITRO1
      left join ARBITROS ARBITRO2 on ARBITRO2.ID_ARBITRO=par.ID_ARBITRO2
      left join ARBITROS ARBITRO3 on ARBITRO3.ID_ARBITRO=par.ID_ARBITRO3
       where par.ID_TORNEO=${ID}   `,
      {
        replacements: {},
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (datos) {
      return res.json({
        message: "SE ENCONTRARON DATOS DE PARTIDOS",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "No se pudo encontraron datos del PARTIDOS.",
      data: [],
    });
  }
}


export async function ByTorneoJuego(req, res) {
  try {
    const { ID } = req.params;
    const datos = await sequelize.query(
      `

      select* from EQUIPOS where ID_EQUIPO in (
      select res.EQUIPO FROM (SELECT SUMA.EQUIPO,BLO.ID_TORNEO, MAX(GOLES) GOLES FROM 
      (SELECT TER.ID_BLOQUE,TER.EQUIPO,SUM(TER.GOLES) GOLES FROM (
      select SEG.ID_BLOQUE, seg.ID_LOCAL EQUIPO,seg.GOLES_LOCAL GOLES
      from (
      SELECT ID_BLOQUE,
      ID_LOCAL,ID_VISITANTE,sum(GOLES_LOCAL) GOLES_LOCAL,sum(GOLES_VISITANTE) GOLES_VISITANTE
       FROM PARTIDOS
      group by ID_BLOQUE,
      ID_LOCAL,ID_VISITANTE) seg
       union all
       select SEG.ID_BLOQUE, seg.ID_VISITANTE EQUIPO,seg.GOLES_VISITANTE GOLES
      from (
      SELECT ID_BLOQUE,
      ID_LOCAL,ID_VISITANTE,sum(GOLES_LOCAL) GOLES_LOCAL,sum(GOLES_VISITANTE) GOLES_VISITANTE
       FROM PARTIDOS
      group by ID_BLOQUE,
      ID_LOCAL,ID_VISITANTE) seg
      ) TER
      GROUP BY TER.ID_BLOQUE,TER.EQUIPO 
      )SUMA
      INNER JOIN BLOQUES BLO ON BLO.ID_BLOQUE=SUMA.ID_BLOQUE
      WHERE BLO.ID_TORNEO= ${ID} 
      GROUP BY SUMA.EQUIPO,BLO.ID_TORNEO)RES
      )
       `,
      {
        replacements: {},
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (datos) {
      return res.json({
        message: "SE ENCONTRARON DATOS DE PARTIDOS",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "No se pudo encontraron datos del PARTIDOS.",
      data: [],
    });
  }
}