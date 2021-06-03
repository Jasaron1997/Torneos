import React, { Component, Fragment } from "react";
import { fetchPost,fetchGet } from "../../../utils/Fetch";
import { withRouter, Redirect } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const initialState = {
  ID_ROL:""
  ,NOMBRE_ROL:""
  ,DESCRIPCION_ROL:""
  ,ESTADO:true ,FECHA_DE_CREACION:new Date(),
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
    const {GOL, Jugador, Equipo,FECHA_CREACION} = this.state;
    const noValido = !GOL|| ! Jugador|| ! Equipo|| ! FECHA_CREACION;
    return noValido;
  };

  Crear= async (e) => {
    debugger
    e.preventDefault();
   await this.setState({
ID_USUARIO:this.props.auth[0].ID_USUARIO,
ID_PARTIDO:this.props.match.params.id,
FECHA_CREACION:new Date(this.state.FECHA_CREACION)
    })


    const data = await fetchPost(
      `${process.env.REACT_APP_SERVER}/api/DETALLE_PARTIDO/create`,
      this.state
    );
    this.setState({ data: data.data });
    alert(data.message);
    this.props.history.push(`/DETALLE_PARTIDO/${this.props.match.params.id}`);
  };
  async componentDidMount() {
    const Equipos = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/equipos/byPartido/${this.props.match.params.id}`
    );
    this.setState({ Equipos:Equipos.data });
  }
  updateStateEquipo = async(Equipo) => {
    await  this.setState({Equipo,
        ID_EQUIPO:Equipo.ID_EQUIPO,
      });


      const Jugadores = await fetchGet(
        `${process.env.REACT_APP_SERVER}/api/Jugadores/byEquipo/${Equipo.ID_EQUIPO}`
      );
      await this.setState({ Jugadores:Jugadores.data });
    };
  updateStateJugador = async(Jugador) => {
    await  this.setState({Jugador,
        ID_JUGADOR:Jugador.ID_JUGADOR,
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
                <label>GOL:</label>
                <input
                  type="number"
                  name="GOL"
                  className="form-control"
                  placeholder="GOL"
                  onChange={this.UpdateState}
                  defaultValue={this.state.GOL}
                />
              </div>
              <div className="form-group">
                <label>FECHA:</label>
                <input
                  type="datetime-local"
                  name="FECHA_CREACION"
                  className="form-control"
                  placeholder="FECHA_CREACION"
                  onChange={this.UpdateState}
                  defaultValue={this.state.FECHA_CREACION}
                />
              </div>
              <div className="form-group">
                <label>Equipo:</label>
                <Select
                onChange={this.updateStateEquipo}
                options={this.state.Equipos}
                isMulti={false}
                components={makeAnimated()}
                placeholder={"Seleccione el Equipo"}
                getOptionLabel={(options) => options.NOMBRE}
                getOptionValue={(options) => options.ID_EQUIPO}
                value={this.state.Equipo}
              />
              </div>
              <div className="form-group">
                <label>Jugador:</label>
                <Select
                onChange={this.updateStateJugador}
                options={this.state.Jugadores}
                isMulti={false}
                components={makeAnimated()}
                placeholder={"Seleccione el Jugadores"}
                getOptionLabel={(options) => options.JUGADOR}
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
