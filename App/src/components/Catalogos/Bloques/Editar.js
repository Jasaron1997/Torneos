
  import React, { Component, Fragment } from "react";
  import { fetchPut,fetchGet } from "../../../utils/Fetch";
  import { withRouter, Redirect } from "react-router-dom";
  import Select from "react-select";
import makeAnimated from "react-select/animated";

  const initialState = {
    ID_ROL:""
    ,NOMBRE_ROL:""
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
      const { NOMBRE, Torneo} = this.state;
      const noValido = !NOMBRE|| ! Torneo;
      return noValido;
    };
    
    async componentDidMount() {
      const { id } = this.props.match.params;
  
      const data = await fetchGet(
        `${process.env.REACT_APP_SERVER}/api/bloques/find/${id}`
      );
     await this.setState({ ...data.data });
  
    debugger
      const Torneos = await fetchGet(
        `${process.env.REACT_APP_SERVER}/api/Torneos/all`
      );
      await this.setState({ Torneos:Torneos.data });
  
      const Torneo=this.state.Torneo.find(x=>x.ID_TORNEO==this.state.ID_TORNEO)
    
     await this.updateStateDepartamento(Torneo)
    }
    
      Editar = async (e) => {
        e.preventDefault();
    
        await this.setState({
          NOMBRE_COMPLETO:`${this.state.NOMBRE1} ${this.state.NOMBRE2} ${this.state.APELLIDO1} ${this.state.APELLIDO2}`
              })
        const data = await fetchPut(
          `${process.env.REACT_APP_SERVER}/api/bloques/Update`,
          this.state
        );
        this.setState({ data: data.data });
        alert(data.message);
        this.props.history.push("/bloques");
      };
      updateStateTorneos = async(Torneo) => {
        await  this.setState({Torneo,
            ID_TORNEO:Torneo.ID_TORNEO,
          });
    
    
        };
        

    render() {
      const redireccion = this.props.Access("1") ? (
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
          {redireccion}
        <h1 className="text-center mb-5">EDITAR</h1>

        <div className="row justify-content-center">
          <form
            className="col-md-8 col-sm-12"
            onSubmit={(e) => this.Editar(e)}
          >
              <div className="form-group">
                <label>NOMBRE:</label>
                <input
                  type="text"
                  name="DIRECCION"
                  className="form-control"
                  placeholder="NOMBRE"
                  onChange={this.UpdateState}
                  defaultValue={this.state.NOMBRE}
                  readOnly={!this.props.modificar} 
                />
              </div>
              <div className="form-group">
                <label>Torneo:</label>
                <Select
                onChange={this.updateStateTorneo}
                options={this.state.Torneo}
                isMulti={false}
                components={makeAnimated()}
                isDisabled={ !this.props.modificar}
                placeholder={"Seleccione el torneo"}
                getOptionLabel={(options) => options.ID_TORNEO}
                getOptionValue={(options) => options.ID_TORNEO}
                value={this.state.Torneo}
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
  