
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
      const { NOMBRE} = this.state;
      const noValido = !NOMBRE;
      return noValido;
    };
    
    async componentDidMount() {
      const { id } = this.props.match.params;
  
      const data = await fetchGet(
        `${process.env.REACT_APP_SERVER}/api/posiciones/find/${id}`
      );
     await this.setState({ ...data.data });
    }
    
      Editar = async (e) => {
        e.preventDefault();
        const data = await fetchPut(
          `${process.env.REACT_APP_SERVER}/api/posiciones/Update`,
          this.state
        );
        this.setState({ data: data.data });
        alert(data.message);
        this.props.history.push("/posiciones");
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
  