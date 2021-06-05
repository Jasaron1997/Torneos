
import React, { Component, Fragment } from "react";
import { fetchPut, fetchGet } from "../../../utils/Fetch";
import { withRouter, Redirect } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "./campo.css"
const initialState = {
  ID_ROL: ""
  , NOMBRE_ROL: ""
  , DESCRIPCION_ROL: "", ESTADO: true
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
    const { NOMBRE } = this.state;
    const noValido = !NOMBRE;
    return noValido;
  };

  async componentDidMount() {
    const { id } = this.props.match.params;

    const data = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/partidos/find/${id}`
    );
    await this.setState({ ...data.data });

    const JugadoresLocal = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/jugadores/byEquipo/${data.data.ID_LOCAL}`
    );
    this.setState({ JugadoresLocal: JugadoresLocal.data });
    const JugadoresVisistante = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/jugadores/byEquipo/${data.data.ID_VISITANTE}`
    );
    this.setState({ JugadoresVisistante: JugadoresVisistante.data });

  }


  render() {
    return (
      <Fragment>

        <div id="escenario">
          <input type="checkbox" id="conmutador-input" />
          <label for="conmutador-input" id="conmutador-label" title="Click to change the view"></label>
          <div id="contenedor-responsive" title="Responsive behavior, resize your browser ;)">
            <div class="contenedor-campo">
              <div id="esquina-superior-izquierda"></div>
              <div id="esquina-superior-derecha"></div>
              <div id="esquina-inferior-izquierda"></div>
              <div id="esquina-inferior-derecha"></div>
              <div id="linea-vertical-medio-campo-arriba"></div>
              <div id="linea-vertical-medio-campo-abajo"></div>
              <div id="zona-central">
                <h4 id="MDI1">MDI1</h4>
                <h4 id="MDC_A1">MDCA1</h4>
                <h4 id="MDC_B1">MDCB1</h4>
                <h4 id="MDD1">MDD1</h4>
                <h4 id="DL_b1">DLb1</h4>
                <h4 id="DL_a1">DLa1</h4>
                <div id="area-grande-izquierda"></div>
                <div id="area-pequena-izquierda"></div> {/* aqui no */}
                <div id="medio-campo-izquierda"></div>
                <div id="semicirculo-izquierda"></div>
                <div id="penalty-izquierda">
                  <h4 id="DFi2">DFi2</h4>
                  <h4 id="DFm_A2">DFmA2</h4>
                  <h4 id="DFm_B2">DFmB2</h4>
                  <h4 id="DFd_2">DFd2</h4>
                  {/* media y delantero segun equipo */}
                  <h4 id="MDI_2">MDI_2</h4>
                  <h4 id="MDC_A2">MDCA2</h4>
                  <h4 id="MDC_B2">MDCB2</h4>
                  <h4 id="MDD2">MDD2</h4>
                  <h4 id="DL_A2">DLA2</h4>
                  <h4 id="DL_B2">DLB2</h4>

                  <h6 id="POR2">POR2</h6></div>
                <div id="linea-vertical-medio-campo-medio"></div>
                <div id="circulo-central"></div>
                <div id="area-grande-derecha"></div>
                <div id="area-pequena-derecha">
                  <h6 id="POR1">POR1</h6></div>
                <div id="medio-campo-derecha">
                  <h4 id="DFd_1">DFd1</h4>
                  <h4 id="DFm_A1">DFmA1</h4>
                  <h4 id="DFm_B1">DFmB1</h4>
                  <h4 id="DFi_1">DFi1</h4></div>
                <div id="semicirculo-derecha"></div>
                <div id="penalty-derecha"></div>
              </div>
            </div>
          </div>
        </div></Fragment>
    );
  }
}

export default withRouter(Editar);
