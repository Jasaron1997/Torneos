const { sequelize } = require("../database/database");

export async function getUsuario(req, res) {
  try {
  
 const datos = await sequelize.query(`SELECT * FROM TB_USUARIO where ESTADO='true' AND ID_EMPRESA = 
 CASE 
     WHEN 1=${req.body.ID_ROL} THEN ID_EMPRESA
     ELSE ${req.body.ID_EMPRESA} 
 END`, { type: sequelize.QueryTypes.SELECT });
 res.json({
      data: datos,
    });

  } catch (error) {
    console.log(error);
    res.json({
      data: {},
      message: "No se encontraron datos",
    });
  }
}


export async function postUsuario(req, res) {
  const { USUARIO_USUARIOR
    ,CONTRA_USUARIOR
    ,ID_ROLR
    ,NOMBRE_USUARIOR
    ,DIRECCION_USUARIOR
    ,DPI_USUARIOR
    ,TELEFONO_USUARIOR
    ,ESTADO
    ,ID_EMPRESAR
    ,ID_ESTACION} = req.body;
  try {
const datos = await sequelize.query(`EXEC	 [dbo].[SP_INSERTAR_Usuario]
@USUARIO_USUARIO=:USUARIO_USUARIOR,@CONTRA_USUARIO=:CONTRA_USUARIOR,@ID_ROL=:ID_ROLR,@NOMBRE_USUARIO=:NOMBRE_USUARIOR,@DIRECCION_USUARIO=:DIRECCION_USUARIOR,@DPI_USUARIO=:DPI_USUARIOR,@TELEFONO_USUARIO=:TELEFONO_USUARIOR,@ESTADO=:ESTADO,@ID_EMPRESA=:ID_EMPRESAR,@ID_ESTACION=:ID_ESTACION`,
  {  replacements: { USUARIO_USUARIOR
    ,CONTRA_USUARIOR
    ,ID_ROLR
    ,NOMBRE_USUARIOR
    ,DIRECCION_USUARIOR
    ,DPI_USUARIOR
    ,TELEFONO_USUARIOR
    ,ESTADO
    ,ID_EMPRESAR
    ,ID_ESTACION},
  type: sequelize.QueryTypes.SELECT });
    if (datos) {
      return res.json({
        message: "Nuevo Usuario Creado",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "No se pudo crear el Usuario.",
      data: {},
    });
  }
}

export async function getOneUsuario(req, res) {
  const { ID_USUARIO } = req.params;
  try {
    const datos = await sequelize.query(`SELECT * FROM TB_USUARIO where ID_USUARIO=${ID_USUARIO}`, { type: sequelize.QueryTypes.SELECT });
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

export async function putUsuario(req, res) {
  const { ID_USUARIO } = req.params;
  const { USUARIO_USUARIOR
    ,CONTRA_USUARIOR
    ,ID_ROLR
    ,NOMBRE_USUARIOR
    ,DIRECCION_USUARIOR
    ,DPI_USUARIOR
    ,TELEFONO_USUARIOR
    ,ESTADO
    ,ID_EMPRESAR
    ,ID_ESTACIONR} = req.body;
  try {
const datos = await sequelize.query(`EXEC	 [dbo].[SP_MODIFICAR_USUARIO]
@ID_USUARIO=:ID_USUARIO,@USUARIO_USUARIO=:USUARIO_USUARIOR,@CONTRA_USUARIO=:CONTRA_USUARIOR,@ID_ROL=:ID_ROLR,@NOMBRE_USUARIO=:NOMBRE_USUARIOR,@DIRECCION_USUARIO=:DIRECCION_USUARIOR,@DPI_USUARIO=:DPI_USUARIOR,@TELEFONO_USUARIO=:TELEFONO_USUARIOR,@ESTADO=:ESTADO,@ID_EMPRESA=:ID_EMPRESAR,@ID_ESTACION=:ID_ESTACIONR`,
  {  replacements: { ID_USUARIO,USUARIO_USUARIOR
    ,CONTRA_USUARIOR
    ,ID_ROLR
    ,NOMBRE_USUARIOR
    ,DIRECCION_USUARIOR
    ,DPI_USUARIOR
    ,TELEFONO_USUARIOR
    ,ESTADO
    ,ID_EMPRESAR
  ,ID_ESTACIONR},
  type: sequelize.QueryTypes.SELECT });
    res.json({ message: "Usuario Modificado", data: datos });
  } catch (e) {
    console.log(e);
    res.json({
      message: "No se pudo Modificar Usuario.",
      data: {},
    });
  }
}

export async function deleteUsuario(req, res) {
  const { ID_USUARIO,ESTADO } = req.params;
  try {
    let message;
    const datos = await sequelize.query(`EXEC	 [dbo].[SP_ACTUALIZAR_ESTADO_USUARIO]
    @ID_USUARIO =:ID_USUARIO ,@ESTADO =:ESTADO`,
    {  replacements: { ID_USUARIO,ESTADO },
    type: sequelize.QueryTypes.SELECT });
  console.log(ESTADO,message);
    if(ESTADO=='true'){
      message= "Usuario Reactivado";
    }
    else{
      message="Usuario Eliminado"
    }
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
