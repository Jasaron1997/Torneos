import React, { Component, Fragment } from "react";
  import { fetchPut,fetchGet } from "../../../utils/Fetch";
  import { withRouter, Redirect } from "react-router-dom";
  import Select from "react-select";
import makeAnimated from "react-select/animated";

  const initialState = {
    ID_ROL:""
    ,Equipo_ROL:""
    ,DESCRIPCION_ROL:""  ,ESTADO:true
  };
  
  class Editar extends Component {
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
    
  async componentDidMount() {
    const { id } = this.props.match.params;
    const data = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/Jugadores_Por_Equipo/find/${id}`
    );
   await this.setState({ ...data.data });

    const Posiciones = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/Posiciones/all`
    );
    await this.setState({ Posiciones:Posiciones.data });
    debugger

    const Posicion=Posiciones.data.find(x=>x.ID_POSICION==this.state.ID_POSICION)
    this.setState({ Posicion:Posicion });
  


    const Jugadores = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/Jugadores/all`
    );
    this.setState({ Jugadores:Jugadores.data });
    const Jugador=Jugadores.data.find(x=>x.ID_JUGADOR==this.state.ID_JUGADOR)

    await this.setState({ Jugador:Jugador});


    const Equipos = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/Equipos/all`
    );
    this.setState({ Equipos:Equipos.data });
    const Equipo=Equipos.data.find(x=>x.ID_EQUIPO==this.state.ID_EQUIPO)

    await this.setState({ Equipo:Equipo});
  }
  
   Editar = async (e) => {
      e.preventDefault();
      const data = await fetchPut(
        `${process.env.REACT_APP_SERVER}/api/Jugadores_Por_Equipo/Update`,
        this.state
      );
      this.setState({ data: data.data });
      alert(data.message);
      this.props.history.push("/Jugadores_Por_Equipo");
    };
  
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
      const reJugador = this.props.Access("1") ? (
        ""
      ) : (
        <Redirect to="/login" />
      );

      const mensaje = this.props.modificar ? (
        "Editar"
      ) : (
        "Detalle"
      );
  
      return (
        <Fragment>
          {reJugador}
      <h1 className="text-center mb-5">{mensaje}</h1>
  
          <div className="row justify-content-center">
            <form
              className="col-md-8 col-sm-12"
              onSubmit={(e) => this.Editar(e)}
            >
              <div className="form-group">
                <label>Posicion:</label>
                <Select
                onChange={this.updateStatePosicion}
                options={this.state.Posiciones}
                isMulti={false}
                components={makeAnimated()}
                isDisabled={ !this.props.modificar}
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
                isDisabled={ !this.props.modificar}
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
                isDisabled={ !this.props.modificar}
              />
              </div>
              {this.props.modificar && (            
              <button
                disabled={this.validarForm()}
                type="submit"
                className="btn btn-success float-right"
              >
                Editar
              </button>
              )}
            </form>
          </div>
        </Fragment>
      );
    }
  }
  
  export default withRouter(Editar);
  