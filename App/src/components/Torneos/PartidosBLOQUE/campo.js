
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
      `${process.env.REACT_APP_SERVER}/api/partido_Bloque/find/${id}`
    );
    await this.setState({ ...data.data });

    const JugadoresLocal = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/jugadores/byEquipo/${data.data.ID_LOCAL}`
    );
  await  this.setState({ JugadoresLocal: JugadoresLocal.data });
    const JugadoresVisistante = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/jugadores/byEquipo/${data.data.ID_VISITANTE}`
    );
    await this.setState({ JugadoresVisistante: JugadoresVisistante.data });
await this.AsignarPosicion();

}
  AsignarPosicion = async() =>{
    // 1	PORTERO	2012-12-12 00:00:00.000	1
    // 6	DEFENSA IZQUIERDA	2021-06-04 05:51:01.253	1
    // 7	DEFENSA CENTRAL	2021-06-04 05:51:08.820	1
    // 8	DEFENSA CENTRAL 2	2021-06-04 05:51:26.020	1
    // 9	DEFENSA DERECHA	2021-06-04 05:51:42.323	1
    // 10	MEDIA IZQUIERDO	2021-06-04 05:51:49.997	1
    // 11	MEDIA CENTRAL A	2021-06-04 05:51:57.123	1
    // 12	MEDIA CENTRAL B	2021-06-04 05:52:05.050	1
    // 13	MEDIA DERECHA	2021-06-04 05:52:12.187	1
    // 14	DELANTERO A	2021-06-04 05:52:21.267	1
    // 15	DELANTERO B	2021-06-04 05:52:28.747	1

await this.setState({
  LPORTERO:this.state.JugadoresLocal.find(x=>x.ID_POSICION==1), 
LDEFENSAIZQUIERDA:this.state.JugadoresLocal.find(x=>x.ID_POSICION==6), 
LDEFENSACENTRAL:this.state.JugadoresLocal.find(x=>x.ID_POSICION==7), 
LDEFENSACENTRAL2:this.state.JugadoresLocal.find(x=>x.ID_POSICION==8), 
LDEFENSADERECHA:this.state.JugadoresLocal.find(x=>x.ID_POSICION==9), 
LMEDIAIZQUIERDO:this.state.JugadoresLocal.find(x=>x.ID_POSICION==10), 
LMEDIACENTRALA:this.state.JugadoresLocal.find(x=>x.ID_POSICION==11), 
LMEDIACENTRALB:this.state.JugadoresLocal.find(x=>x.ID_POSICION==12), 
LMEDIADERECHA:this.state.JugadoresLocal.find(x=>x.ID_POSICION==13), 
LDELANTEROA:this.state.JugadoresLocal.find(x=>x.ID_POSICION==14), 
LDELANTEROB:this.state.JugadoresLocal.find(x=>x.ID_POSICION==15), 
VPORTERO:this.state.JugadoresVisistante.find(x=>x.ID_POSICION==1),  
VDEFENSAIZQUIERDA:this.state.JugadoresVisistante.find(x=>x.ID_POSICION==6),  
VDEFENSACENTRAL:this.state.JugadoresVisistante.find(x=>x.ID_POSICION==7),  
VDEFENSACENTRAL2:this.state.JugadoresVisistante.find(x=>x.ID_POSICION==8),  
VDEFENSADERECHA:this.state.JugadoresVisistante.find(x=>x.ID_POSICION==9),  
VMEDIAIZQUIERDO:this.state.JugadoresVisistante.find(x=>x.ID_POSICION==10),  
VMEDIACENTRALA:this.state.JugadoresVisistante.find(x=>x.ID_POSICION==11),  
VMEDIACENTRALB:this.state.JugadoresVisistante.find(x=>x.ID_POSICION==12),  
VMEDIADERECHA:this.state.JugadoresVisistante.find(x=>x.ID_POSICION==13),  
VDELANTEROA:this.state.JugadoresVisistante.find(x=>x.ID_POSICION==14),  
VDELANTEROB:this.state.JugadoresVisistante.find(x=>x.ID_POSICION==15),  
})}
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
                <h6 id="MDI1">{this.state.VMEDIAIZQUIERDO?this.state.VMEDIAIZQUIERDO.NOMBRE1:""}</h6>
                <h6 id="MDC_A1">{this.state.VMEDIACENTRALA?this.state.VMEDIACENTRALA.NOMBRE1:""}</h6>
                <h6 id="MDC_B1">{this.state.VMEDIACENTRALB?this.state.VMEDIACENTRALB.NOMBRE1:""}</h6>
                <h6 id="MDD1">{this.state.VMEDIADERECHA?this.state.VMEDIADERECHA.NOMBRE1:""}</h6>
                <h6 id="DL_b1">{this.state.VDELANTEROB?this.state.VDELANTEROB.NOMBRE1:""}</h6>
                <h6 id="DL_a1">{this.state.VDELANTEROA?this.state.VDELANTEROA.NOMBRE1:""}</h6>
                <div id="area-grande-izquierda"></div>
                <div id="area-pequena-izquierda"></div> {/* aqui no */}
                <div id="medio-campo-izquierda"></div>
                <div id="semicirculo-izquierda"></div>
                <div id="penalty-izquierda">
                  <h6 id="DFi2">{this.state.LDEFENSAIZQUIERDA?this.state.LDEFENSAIZQUIERDA.NOMBRE1:""}</h6>
                  <h6 id="DFm_A2">{this.state.LDEFENSACENTRAL?this.state.LDEFENSACENTRAL.NOMBRE1:""}</h6>
                  <h6 id="DFm_B2">{this.state.LDEFENSACENTRAL2?this.state.LDEFENSACENTRAL2.NOMBRE1:""}</h6>
                  <h6 id="DFd_2">{this.state.LDEFENSADERECHA?this.state.LDEFENSADERECHA.NOMBRE1:""}</h6>
                  {/* media y delantero segun equipo */}
                  <h6 id="MDI_2">{this.state.LMEDIAIZQUIERDO?this.state.LMEDIAIZQUIERDO.NOMBRE1:""}</h6>
                  <h6 id="MDC_A2">{this.state.LMEDIACENTRALA?this.state.LMEDIACENTRALA.NOMBRE1:""}</h6>
                  <h6 id="MDC_B2">{this.state.LMEDIACENTRALB?this.state.LMEDIACENTRALB.NOMBRE1:""}</h6>
                  <h6 id="MDD2">{this.state.LMEDIADERECHA?this.state.LMEDIADERECHA.NOMBRE1:""}</h6>
                  <h6 id="DL_A2">{this.state.LDELANTEROA?this.state.LDELANTEROA.NOMBRE1:""}</h6>
                  <h6 id="DL_B2">{this.state.LDELANTEROB?this.state.LDELANTEROB.NOMBRE1:""}</h6>

                  <h6 id="POR2">{this.state.LPORTERO?this.state.LPORTERO.NOMBRE1:""}</h6></div>
                <div id="linea-vertical-medio-campo-medio"></div>
                <div id="circulo-central"></div>
                <div id="area-grande-derecha"></div>
                <div id="area-pequena-derecha">
                  <h6 id="POR1">{this.state.VPORTERO?this.state.VPORTERO.NOMBRE1:""}</h6></div>
                <div id="medio-campo-derecha">
                  <h6 id="DFd_1">{this.state.VMEDIACENTRALA?this.state.VMEDIACENTRALA.NOMBRE1:""}</h6>
                  <h6 id="DFm_A1">{this.state.VMEDIACENTRALA?this.state.VMEDIACENTRALA.NOMBRE1:""}</h6>
                  <h6 id="DFm_B1">{this.state.VMEDIACENTRALA?this.state.VMEDIACENTRALA.NOMBRE1:""}</h6>
                  <h6 id="DFi_1">{this.state.VMEDIACENTRALA?this.state.VMEDIACENTRALA.NOMBRE1:""}</h6></div>
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
