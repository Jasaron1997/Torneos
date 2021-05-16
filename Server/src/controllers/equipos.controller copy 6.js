// import Access from "../models/Access";
// import Piloto from "../models/Piloto";
const { sequelize } = require("../database/database");

export async function getRolesInactivo(req, res) {
  try {
 const datos = await sequelize.query("SELECT * FROM TB_ROLES where ESTADO='false'", { type: sequelize.QueryTypes.SELECT });
 res.json({
      data: datos,
    });

  } catch (error) {
    res.json({
      data: {},
      message: "No se encontraron datos",
    });
  }
}

export async function getRoles(req, res) {
  try {
 const datos = await sequelize.query(`SELECT * FROM TB_ROLES where 'true' =
 CASE 
     WHEN 1=${req.body.ID_ROL} THEN 'true'
     ELSE ESTADO
 END`, { type: sequelize.QueryTypes.SELECT });
 res.json({
      data: datos,
    });

  } catch (error) {
    res.json({
      data: {},
      message: "No se encontraron datos",
    });
  }
}


export async function postRoles(req, res) {
  const { NOMBRE_ROL,
    DESCRIPCION_ROL,ESTADO } = req.body;
  try {
const datos = await sequelize.query(`EXEC	 [dbo].[SP_INSERTAR_TB_ROLES]
@NOMBRE_ROL=:NOMBRE_ROL
,@DESCRIPCION_ROL=:DESCRIPCION_ROL,@ESTADO=:ESTADO`,
  {  replacements: { NOMBRE_ROL,DESCRIPCION_ROL,ESTADO },
  type: sequelize.QueryTypes.SELECT });
    if (datos) {
      return res.json({
        message: "Nuevo Rol Creado",
        data: datos,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "No se pudo crear la Roles.",
      data: {},
    });
  }
}

export async function getOneRoles(req, res) {
  const { ID_ROL } = req.params;
  try {
    const datos = await sequelize.query(`SELECT * FROM TB_ROLES WHERE ID_ROL=${ID_ROL} `, { type: sequelize.QueryTypes.SELECT });
    res.json({
         data: datos,
       });
  } catch (error) {
    res.json({
      data: {},
      message: "No se encontraron datos",
    });
  }
}

export async function putRoles(req, res) {
  const { ID_ROL } = req.params;
  const { NOMBRE_ROL,DESCRIPCION_ROL ,ESTADO } = req.body;
  try {
    const datos = await sequelize.query(`EXEC	 [dbo].[SP_MODIFICAR_TB_ROLES]
    @ID_ROL=:ID_ROL
  ,@NOMBRE_ROL=:NOMBRE_ROL
  ,@DESCRIPCION_ROL=:DESCRIPCION_ROL, @ESTADO=:ESTADO`,
      {  replacements: { ID_ROL,
        NOMBRE_ROL,
        DESCRIPCION_ROL,ESTADO },
      type: sequelize.QueryTypes.SELECT });


    res.json({ message: "Rol Modificado", data: datos });
  } catch (e) {
    console.log(e)
    res.json({
      message: "No se pudo Modificar Rol.",
      data: {},
    });
  }
}



export async function estadoRoles(req, res) {
  const { ID_ROL,ESTADO } = req.params;
  try {
    let message;
    const datos = await sequelize.query(`EXEC	 [dbo].[SP_MODIFICAR_ESTADO_ROLES]
    @ID_ROL =:ID_ROL ,@ESTADO =:ESTADO`,
    {  replacements: { ID_ROL,ESTADO },
    type: sequelize.QueryTypes.SELECT });
  console.log(ESTADO,message);
    if(ESTADO=='true'){
      message= "Rol Reactivado";
    }
    else{
      message="Rol Eliminado"
    }
    console.log(ESTADO,message);
  
    res.json({
      message,
      count: datos,
    });
  } catch (error) {
    res.json({
      message: "No se pudo realizar el proceso",
      data: {},
    });
  }
}
