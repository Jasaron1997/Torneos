const { sequelize } = require("../database/database");
export async function All(req, res) {
  try {
    const datos = await sequelize.query(`select 
    AR.*,DEP.NOMBRE DEPARTAMENTO,MUN.NOMBRE MUNICIPIO,pos.nombre POSICION from  JUGADORES AR 
    inner join departamentos dep on dep.ID_DEPARTAMENTO=AR.ID_DEPARTAMENTO
    inner join MUNICIPIOS MUN on MUN.ID_MUNICIPIO=AR.ID_MUNICIPIO 
    inner join POSCICIONES pos on pos.id_posicion=AR.id_posicion 
    
    `, {
      replacements: {},
      type: sequelize.QueryTypes.SELECT,
    });
    if (datos) {
      return res.json({
        message: "SE ENCONTRARON DATOS DE JUGADORES",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo encontraron datos del JUGADORES.",
        data: [],
      });
  }
}
export async function Find(req, res) {
  const { ID } = req.params;
  try {
    const datos = await sequelize.query(
      `select* from  JUGADORES where ID_JUGADOR=${ID}  `,
      { replacements: {}, type: sequelize.QueryTypes.SELECT }
    );
    if (datos) {
      return res.json({
        message: "SE ENCONTRARON DATOS DE JUGADORES",
        data: datos[0],
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo encontraron datos del JUGADORES.",
        data: [],
      });
  }
}

export async function byEquipo(req, res) {
  try {
  const { ID } = req.params;
const wuer=
`select jpe.*,eq.NOMBRE EQUIPO,JUG.NOMBRE_COMPLETO JUGADOR,pos.NOMBRE POSICION  from JUGADORES_POR_EQUIPO jpe
inner join EQUIPOS eq on eq.ID_EQUIPO=jpe.ID_EQUIPO
inner join  JUGADORES jug on jug.ID_JUGADOR=jpe.ID_JUGADOR
inner join  POSCICIONES POS on POS.ID_POSICION=jpe.ID_POSICION
where eq.ID_EQUIPO=${ID}   `
console.log(wuer)
    const datos = await sequelize.query(wuer,
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
export async function Create(req, res) {
  const {
    NOMBRE1,
    NOMBRE2,
    APELLIDO1,
    APELLIDO2,
    NOMBRE_COMPLETO,
    ID_USUARIO,
    ID_DEPARTAMENTO,
    ID_MUNICIPIO,
    ID_POSICION,
  } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC INSERTAR_JUGADORES  @NOMBRE1=:NOMBRE1,@NOMBRE2=:NOMBRE2,@APELLIDO1=:APELLIDO1,@APELLIDO2=:APELLIDO2,@NOMBRE_COMPLETO=:NOMBRE_COMPLETO,@ID_USUARIO=:ID_USUARIO,@ID_DEPARTAMENTO=:ID_DEPARTAMENTO,@ID_MUNICIPIO=:ID_MUNICIPIO,@ID_POSICION=:ID_POSICION                                              `,
      {
        replacements: {
          NOMBRE1,
          NOMBRE2,
          APELLIDO1,
          APELLIDO2,
          NOMBRE_COMPLETO,
          ID_USUARIO,
          ID_DEPARTAMENTO,
          ID_MUNICIPIO,
          ID_POSICION,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del JUGADORES",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del JUGADORES.",
        data: [],
      });
  }
}
export async function Update(req, res) {
  const {
    ID_JUGADOR,
    NOMBRE1,
    NOMBRE2,
    APELLIDO1,
    APELLIDO2,
    NOMBRE_COMPLETO,
    ID_USUARIO,
    ID_DEPARTAMENTO,
    ID_MUNICIPIO,
    ID_POSICION,
  } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC ACTUALIZAR_JUGADORES  @ID_JUGADOR=:ID_JUGADOR,@NOMBRE1=:NOMBRE1,@NOMBRE2=:NOMBRE2,@APELLIDO1=:APELLIDO1,@APELLIDO2=:APELLIDO2,@NOMBRE_COMPLETO=:NOMBRE_COMPLETO,@ID_USUARIO=:ID_USUARIO,@ID_DEPARTAMENTO=:ID_DEPARTAMENTO,@ID_MUNICIPIO=:ID_MUNICIPIO,@ID_POSICION=:ID_POSICION                                              `,
      {
        replacements: {
          ID_JUGADOR,
          NOMBRE1,
          NOMBRE2,
          APELLIDO1,
          APELLIDO2,
          NOMBRE_COMPLETO,
          ID_USUARIO,
          ID_DEPARTAMENTO,
          ID_MUNICIPIO,
          ID_POSICION,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del JUGADORES",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del JUGADORES.",
        data: [],
      });
  }
}
export async function Delete(req, res) {
  const { ID_JUGADOR } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC ELIMINAR_JUGADORES  @ID_JUGADOR=:ID_JUGADOR                                              `,
      { replacements: { ID_JUGADOR }, type: sequelize.QueryTypes.SELECT }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del JUGADORES",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del JUGADORES.",
        data: [],
      });
  }
}
