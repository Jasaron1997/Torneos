// import Access from "../models/Access";
// import Piloto from "../models/Piloto";
const { sequelize } = require("../database/database");

export async function getAccesoInactivo(req, res) {
  try {
 const datos = await sequelize.query("SELECT * FROM TB_ACCESO where ESTADO='false'", { type: sequelize.QueryTypes.SELECT });
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

export async function getAcceso(req, res) {
  try {
 const datos = await sequelize.query("SELECT * FROM TB_ACCESO where ESTADO='true'", { type: sequelize.QueryTypes.SELECT });
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


export async function postAcceso(req, res) {
  const { NOMBRE_ACCESO,
    DESCRIPCION_ACCESO,ESTADO } = req.body;
  try {
const datos = await sequelize.query(`EXEC	 [dbo].[SP_INSERTAR_ACCESO]
@NOMBRE_ACCESO=:NOMBRE_ACCESO,
@DESCRIPCION_ACCESO=:DESCRIPCION_ACCESO, @ESTADO=:ESTADO`,
  {  replacements: { NOMBRE_ACCESO,
    DESCRIPCION_ACCESO,ESTADO},
  type: sequelize.QueryTypes.SELECT });
    if (datos) {
      return res.json({
        message: "Nueva Acceso Creado",
        data: datos,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "No se pudo crear el Acceso.",
      data: {},
    });
  }
}

export async function getOneAcceso(req, res) {
  const { ID_ACCESO } = req.params;
  try {
    const datos = await sequelize.query(`SELECT * FROM TB_ACCESO WHERE ID_ACCESO=${ID_ACCESO}`, { type: sequelize.QueryTypes.SELECT });
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

export async function putAcceso(req, res) {
  const { ID_ACCESO } = req.params;
  const { NOMBRE_ACCESO,
    DESCRIPCION_ACCESO,ESTADO } = req.body;
  try {
const datos = await sequelize.query(`EXEC	 [dbo].[SP_MODIFICAR_ACCESO]
@ID_ACCESO=:ID_ACCESO,@NOMBRE_ACCESO=:NOMBRE_ACCESO,
@DESCRIPCION_ACCESO=:DESCRIPCION_ACCESO, @ESTADO=:ESTADO`,
  {  replacements: { ID_ACCESO,NOMBRE_ACCESO,
    DESCRIPCION_ACCESO,ESTADO},
  type: sequelize.QueryTypes.SELECT });


    res.json({ message: "Acceso Modificado", data: datos });
  } catch (e) {
    console.log(e)
    res.json({
      message: "No se pudo Modificar Acceso.",
      data: {},
    });
  }
}

export async function estadoAcceso(req, res) {
  const { ID_ACCESO,ESTADO } = req.params;
  try {
    let message;
    const datos = await sequelize.query(`EXEC	 [dbo].[SP_CAMBIAR_ESTADO_ACCESO]
    @ID_ACCESO =:ID_ACCESO ,@ESTADO =:ESTADO`,
    {  replacements: { ID_ACCESO,ESTADO },
    type: sequelize.QueryTypes.SELECT });
  console.log(ESTADO,message);
    if(ESTADO=='true'){
      message= "Acceso Reactivado";
    }
    else{
      message="Acceso Eliminado"
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

