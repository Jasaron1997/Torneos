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

class Nuevo extends Component {
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

  validarForm = () => {
    const {Equipo, Jugador, Posicion} = this.state;
    const noValido = !Equipo|| ! Jugador||  ! Posicion;
    return noValido;
  };

  Crear= async (e) => {
    e.preventDefault();
   await this.setState({
ID_USUARIO:this.props.auth[0].ID_USUARIO,
FECHA_DE_CREACION:new Date(),
    })


    const data = await fetchPost(
      `${process.env.REACT_APP_SERVER}/api/Jugadores_Por_Equipo/create`,
      this.state
    );
    this.setState({ data: data.data });
    alert(data.message);
    this.props.history.push("/Jugadores_Por_Equipo");
  };
  async componentDidMount() {

    const Posiciones = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/Posiciones/all`
    );
    await this.setState({ Posiciones:Posiciones.data });


    const Jugadores = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/Jugadores/all`
    );
    this.setState({ Jugadores:Jugadores.data });
   

    const Equipos = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/Equipos/all`
    );
    this.setState({ Equipos:Equipos.data });

  }
  
  updateStateEquipo = async(Equipo) => {
    await  this.setState({Equipo,
      ID_EQUIPO:Equipo.ID_EQUIPO,
      });
    };
  updateStateJugador = async(Jugador) => {
    await  this.setState({Jugador,
        ID_JUGADOR:Jugador.ID_JUGADOR,
      });
    };

  updateStatePosicion = async(Posicion) => {
  await  this.setState({Posicion,
      ID_POSICION:Posicion.ID_POSICION,
    });
  };

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
                <label>Posicion:</label>
                <Select
                onChange={this.updateStatePosicion}
                options={this.state.Posiciones}
                isMulti={false}
                components={makeAnimated()}
                placeholder={"Seleccione el Posicion"}
                getOptionLabel={(options) => options.NOMBRE}
                getOptionValue={(options) => options.ID_POSICION}
                value={this.state.Posicion}
              />
              </div>
              <div className="form-group">
                <label>Equipos:</label>
                <Select
                onChange={this.updateStateEquipo}
                options={this.state.Equipos}
                isMulti={false}
                components={makeAnimated()}
                placeholder={"Seleccione el Equipos"}
                getOptionLabel={(options) => options.NOMBRE}
                getOptionValue={(options) => options.ID_EQUIPO}
                value={this.state.Equipo}
              />
              </div>
              <div className="form-group">
                <label>Jugadores:</label>
                <Select
                onChange={this.updateStateJugador}
                options={this.state.Jugadores}
                isMulti={false}
                components={makeAnimated()}
                placeholder={"Seleccione al Jugador"}
                getOptionLabel={(options) => options.NOMBRE_COMPLETO}
                getOptionValue={(options) => options.ID_JUGADOR}
                value={this.state.Jugador}
              />
              </div>
            <button
              disabled={this.validarForm()}
              type="submit"
              className="btn btn-success float-right"
            >
              Nuevo
            </button>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(Nuevo);
