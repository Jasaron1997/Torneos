const { sequelize } = require("../database/database");
export async function All(req, res) {
  try {
    const datos = await sequelize.query(`select AR.*,DEP.NOMBRE DEPARTAMENTO,MUN.NOMBRE MUNICIPIO from  ARBITROS AR 
    inner join departamentos dep on dep.ID_DEPARTAMENTO=AR.ID_DEPARTAMENTO
    inner join MUNICIPIOS MUN on MUN.ID_MUNICIPIO=AR.ID_MUNICIPIO
    
    `, {
      replacements: {},
      type: sequelize.QueryTypes.SELECT,
    });
    if (datos) {
      return res.json({
        message: "SE ENCONTRARON DATOS DE ARBITROS",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo encontraron datos del ARBITROS.",
        data: [],
      });
  }
}
export async function Find(req, res) {
  const { ID } = req.params;
  try {
    const datos = await sequelize.query(
      `select* from  ARBITROS where ID_ARBITRO=${ID}  `,
      { replacements: {}, type: sequelize.QueryTypes.SELECT }
    );
    if (datos) {
      return res.json({
        message: "SE ENCONTRARON DATOS DE ARBITROS",
        data: datos[0],
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo encontraron datos del ARBITROS.",
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
    DIRECCION,
    ID_DEPARTAMENTO,
    ID_MUNICIPIO,
    FECHA_DE_CREACION,
  } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC INSERTAR_ARBITROS  @NOMBRE1=:NOMBRE1,@NOMBRE2=:NOMBRE2,@APELLIDO1=:APELLIDO1,@APELLIDO2=:APELLIDO2,@NOMBRE_COMPLETO=:NOMBRE_COMPLETO,@ID_USUARIO=:ID_USUARIO,@DIRECCION=:DIRECCION,@ID_DEPARTAMENTO=:ID_DEPARTAMENTO,@ID_MUNICIPIO=:ID_MUNICIPIO,@FECHA_DE_CREACION=:FECHA_DE_CREACION                                              `,
      {
        replacements: {
          NOMBRE1,
          NOMBRE2,
          APELLIDO1,
          APELLIDO2,
          NOMBRE_COMPLETO,
          ID_USUARIO,
          DIRECCION,
          ID_DEPARTAMENTO,
          ID_MUNICIPIO,
          FECHA_DE_CREACION,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del ARBITROS",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del ARBITROS.",
        data: [],
      });
  }
}
export async function Update(req, res) {
  const {
    ID_ARBITRO,
    NOMBRE1,
    NOMBRE2,
    APELLIDO1,
    APELLIDO2,
    NOMBRE_COMPLETO,
    ID_USUARIO,
    DIRECCION,
    ID_DEPARTAMENTO,
    ID_MUNICIPIO,
    FECHA_DE_CREACION,
  } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC ACTUALIZAR_ARBITROS  @ID_ARBITRO=:ID_ARBITRO,@NOMBRE1=:NOMBRE1,@NOMBRE2=:NOMBRE2,@APELLIDO1=:APELLIDO1,@APELLIDO2=:APELLIDO2,@NOMBRE_COMPLETO=:NOMBRE_COMPLETO,@ID_USUARIO=:ID_USUARIO,@DIRECCION=:DIRECCION,@ID_DEPARTAMENTO=:ID_DEPARTAMENTO,@ID_MUNICIPIO=:ID_MUNICIPIO,@FECHA_DE_CREACION=:FECHA_DE_CREACION                                              `,
      {
        replacements: {
          ID_ARBITRO,
          NOMBRE1,
          NOMBRE2,
          APELLIDO1,
          APELLIDO2,
          NOMBRE_COMPLETO,
          ID_USUARIO,
          DIRECCION,
          ID_DEPARTAMENTO,
          ID_MUNICIPIO,
          FECHA_DE_CREACION,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del ARBITROS",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del ARBITROS.",
        data: [],
      });
  }
}
export async function Delete(req, res) {
  const { ID_ARBITRO } = req.body;
  try {
    const datos = await sequelize.query(
      `EXEC ELIMINAR_ARBITROS  @ID_ARBITRO=:ID_ARBITRO                                              `,
      { replacements: { ID_ARBITRO }, type: sequelize.QueryTypes.SELECT }
    );
    if (datos) {
      return res.json({
        message: "Operacion realizada con exito del ARBITROS",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "No se pudo realizar la operacion del ARBITROS.",
        data: [],
      });
  }
}
