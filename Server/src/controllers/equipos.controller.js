const { sequelize } = require("../database/database");
export async function All(req, res) {
  try {
    const datos = await sequelize.query(`select* from  EQUIPOS   `, {
      replacements: {},
      type: sequelize.QueryTypes.SELECT,
    });
    if (datos) {
      return res.json({
        message: "SE ENCONTRARON DATOS DE EQUIPOS",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "No se pudo encontraron datos del EQUIPOS.", data: [] });
  }
}
export async function Find(req, res) {
  const { ID } = req.params;
  try {
    const datos = await sequelize.query(
      `select* from  EQUIPOS where ID_EQUIPO=${ID}  `,
      { replacements: {}, type: sequelize.QueryTypes.SELECT }
    );
    if (datos) {
      return res.json({
        message: "SE ENCONTRARON DATOS DE EQUIPOS",
        data: datos[0],
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "No se pudo encontraron datos del EQUIPOS.", data: [] });
  }
}
export async function Create(req, res) {
  const {
    NOMBRE,
    FECHA_DE_CREACION,
    ID_USUARIO,
    ID_ENTRENADOR,
    DIRECCION,
    ID_DEPARTAMENTO,
    ID_MUNICIPIO,
  } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC INSERTAR_EQUIPOS  @NOMBRE=:NOMBRE,@FECHA_DE_CREACION=:FECHA_DE_CREACION,@ID_USUARIO=:ID_USUARIO,@ID_ENTRENADOR=:ID_ENTRENADOR,@DIRECCION=:DIRECCION,@ID_DEPARTAMENTO=:ID_DEPARTAMENTO,@ID_MUNICIPIO=:ID_MUNICIPIO                                              `,
      {
        replacements: {
          NOMBRE,
          FECHA_DE_CREACION,
          ID_USUARIO,
          ID_ENTRENADOR,
          DIRECCION,
          ID_DEPARTAMENTO,
          ID_MUNICIPIO,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del EQUIPOS",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del EQUIPOS.",
        data: [],
      });
  }
}
export async function Update(req, res) {
  const {
    ID_EQUIPO,
    NOMBRE,
    FECHA_DE_CREACION,
    ID_USUARIO,
    ID_ENTRENADOR,
    DIRECCION,
    ID_DEPARTAMENTO,
    ID_MUNICIPIO,
  } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC ACTUALIZAR_EQUIPOS  @ID_EQUIPO=:ID_EQUIPO,@NOMBRE=:NOMBRE,@FECHA_DE_CREACION=:FECHA_DE_CREACION,@ID_USUARIO=:ID_USUARIO,@ID_ENTRENADOR=:ID_ENTRENADOR,@DIRECCION=:DIRECCION,@ID_DEPARTAMENTO=:ID_DEPARTAMENTO,@ID_MUNICIPIO=:ID_MUNICIPIO                                              `,
      {
        replacements: {
          ID_EQUIPO,
          NOMBRE,
          FECHA_DE_CREACION,
          ID_USUARIO,
          ID_ENTRENADOR,
          DIRECCION,
          ID_DEPARTAMENTO,
          ID_MUNICIPIO,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del EQUIPOS",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del EQUIPOS.",
        data: [],
      });
  }
}
export async function Delete(req, res) {
  const { ID_EQUIPO } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC ELIMINAR_EQUIPOS  @ID_EQUIPO=:ID_EQUIPO                                              `,
      { replacements: { ID_EQUIPO }, type: sequelize.QueryTypes.SELECT }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del EQUIPOS",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del EQUIPOS.",
        data: [],
      });
  }
}
