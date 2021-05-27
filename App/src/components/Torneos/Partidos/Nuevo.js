import React, { Component, Fragment } from "react";
import { fetchPost,fetchGet } from "../../../utils/Fetch";
import { withRouter, Redirect } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const initialState = {
  ID_ROL:""
  ,NOMBRE_ROL:""
  ,DESCRIPCION_ROL:""
  ,ESTADO:true
};

class Nuevo  extends Component {
  state = {
    ...initialState,
  };

  clearState = () => {
    this.setState({
      ...initialState,
    });
  };

  UpdateState = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  Crear= async (e) => {
    e.preventDefault();
   await this.setState({
ID_USUARIO:this.props.auth[0].ID_USUARIO,
ID_BLOQUE: this.props.match.params.id,
FECHA_DE_CREACION:new Date()
})
  const data = await fetchPost(
    `${process.env.REACT_APP_SERVER}/api/partidos/create`,
    this.state
  );
  this.setState({ data: data.data });
  alert(data.message);
  this.props.history.push(`/partidos/${this.props.match.params.id}`);
};

  validarForm = () => {
    const { Local,Visitante,FECHA_DE_CREACION,GOLES_LOCAL,GOLES_VISITANTE,Arbitro1} = this.state;
    const noValido = !Local || !Visitante || !FECHA_DE_CREACION || !GOLES_LOCAL || !GOLES_VISITANTE|| !Arbitro1;
    return noValido;
  };
   updateStateLocal = async(Local) => {
    await  this.setState({Local,
        ID_LOCAL:Local.ID_EQUIPO,
      });
    };
    updateStateVisitante = async(Visitante) => {
      await  this.setState({Visitante,
        ID_VISITANTE:Visitante.ID_EQUIPO,
        });
      };
      updateStateArbitro1 = async(Arbitro1) => {
        await  this.setState({Arbitro1,
          ID_ARBITRO1:Arbitro1.ID_ARBITRO,
          });
        };
        updateStateArbitro2 = async(Arbitro2) => {
          await  this.setState({Arbitro2,
            ID_ARBITRO2:Arbitro2.ID_ARBITRO,
            });
          };

          updateStateArbitro3 = async(Arbitro3) => {
            await  this.setState({Arbitro3,
              ID_ARBITRO3:Arbitro3.ID_ARBITRO,
              });
            };

      
      
  async componentDidMount() {
    const { id } = this.props.match.params;

    const data = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/partidos/find/${id}`
    );
   await this.setState({ ...data.data });


   const Equipos = await fetchGet(
    `${process.env.REACT_APP_SERVER}/api/equipos/all`
  );
 await this.setState({ Locales:Equipos.data,Visitantes:Equipos.data });


 const Arbitros = await fetchGet(
  `${process.env.REACT_APP_SERVER}/api/Arbitros/all`
);
await this.setState({ Arbitros1:Arbitros.data,Arbitros2:Arbitros.data,Arbitros3:Arbitros.data });

  

  }
  
  render() {
    const redireccion = this.props.Access("1") ? (
      ""
    ) : (
      <Redirect to="/login" />
    );


    return (
      <Fragment>
        {redireccion}
      <h1 className="text-center mb-5">Nuevo</h1>

      <div className="row justify-content-center">
        <form
          className="col-md-8 col-sm-12"
          onSubmit={(e) => this.Crear(e)}
        >
            <div className="form-group">
              <label>FECHA:</label>
              <input
                type="date"
                name="FECHA_DE_CREACION"
                className="form-control"
                placeholder="FECHA"
                onChange={this.UpdateState}
                defaultValue={this.state.FECHA_DE_CREACION}
                 
              />
            </div>
            <div className="form-group">
              <label>Local:</label>
              <Select
              onChange={this.updateStateLocal}
              options={this.state.Locales}
              isMulti={false}
              components={makeAnimated()}
              
              placeholder={"Seleccione el Local"}
              getOptionLabel={(options) => options.NOMBRE}
              getOptionValue={(options) => options.ID_EQUIPO}
              value={this.state.Local}
            />
            </div>
            <div className="form-group">
              <label>Visitante:</label>
              <Select
              onChange={this.updateStateVisitante}
              options={this.state.Visitantes}
              isMulti={false}
              components={makeAnimated()}
              
              placeholder={"Seleccione el Visitante"}
              getOptionLabel={(options) => options.NOMBRE}
              getOptionValue={(options) => options.ID_EQUIPO}
              value={this.state.Visitante}
            />
            </div>
           
            <div className="form-group">
              <label>GOLES_LOCAL:</label>
              <input
                type="number"
                name="GOLES_LOCAL"
                className="form-control"
                placeholder="GOLES_LOCAL"
                onChange={this.UpdateState}
                defaultValue={this.state.GOLES_LOCAL}
              />
            </div>
            <div className="form-group">
              <label>GOLES_VISITANTE:</label>
              <input
                type="number"
                name="GOLES_VISITANTE"
                className="form-control"
                placeholder="GOLES_VISITANTE"
                onChange={this.UpdateState}
                defaultValue={this.state.GOLES_VISITANTE}
                 
              />
            </div>
            <div className="form-group">
              <label>Arbitro 1:</label>
              <Select
              onChange={this.updateStateArbitro1}
              options={this.state.Arbitros1}
              isMulti={false}
              components={makeAnimated()}
              
              placeholder={"Seleccione el Arbitro 1"}
              getOptionLabel={(options) => options.NOMBRE_COMPLETO}
              getOptionValue={(options) => options.ID_ARBITRO}
              value={this.state.Arbitro1}
            />
            </div>
            <div className="form-group">
              <label>Arbitro 2:</label>
              <Select
              onChange={this.updateStateArbitro2}
              options={this.state.Arbitros2}
              isMulti={false}
              components={makeAnimated()}
              
              placeholder={"Seleccione el Arbitro 2"}
              getOptionLabel={(options) => options.NOMBRE_COMPLETO}
              getOptionValue={(options) => options.ID_ARBITRO}
              value={this.state.Arbitro2}
            />
            </div>
            <div className="form-group">
              <label>Arbitro 3:</label>
              <Select
              onChange={this.updateStateArbitro3}
              options={this.state.Arbitros3}
              isMulti={false}
              components={makeAnimated()}
              
              placeholder={"Seleccione el Arbitro 3"}
              getOptionLabel={(options) => options.NOMBRE_COMPLETO}
              getOptionValue={(options) => options.ID_ARBITRO}
              value={this.state.Arbitro3}
            />
            </div>
            <button
              disabled={this.validarForm()}
              type="submit"
              className="btn btn-success float-right"
            >
              Guardar
            </button>
        </form>
      </div>
      </Fragment>
    );
  }
}

export default withRouter(Nuevo);
