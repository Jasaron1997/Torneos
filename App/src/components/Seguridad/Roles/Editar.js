
  import React, { Component, Fragment } from "react";
  import { fetchPut,fetchGet } from "../../../utils/Fetch";
  import { withRouter, Redirect } from "react-router-dom";
  
  const initialState = {
    ID_ROL:""
    ,NOMBRE_ROL:""
    ,NIVEL_AUTORIZACION:""  ,ESTADO:true
  };
  
  class RolEditar extends Component {
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
      const {NOMBRE_ROL,NIVEL_AUTORIZACION} = this.state;
      const noValido = !NOMBRE_ROL|| ! NIVEL_AUTORIZACION;
      return noValido;
    };
    
  async componentDidMount() {
    const { id } = this.props.match.params;

    const data = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/roles/find/${id}`
    );
    this.setState({ ...data.data});
  }
  
    RolEditar = async (e) => {
      e.preventDefault();
  
      const data = await fetchPut(
        `${process.env.REACT_APP_SERVER}/api/roles/update`,
        this.state
      );
      this.setState({ data: data.data });
      alert(data.message);
      this.props.history.push("/roles");
    };
  
    render() {
      const redireccion = this.props.Access("1") ? (
        ""
      ) : (
        <Redirect to="/login" />
      );

      const mensaje = this.props.modificar ? (
        "Editar Rol"
      ) : (
        "Detalle Rol"
      );
  
      return (
        <Fragment>
          {redireccion}
      <h1 className="text-center mb-5">{mensaje}</h1>
  
          <div className="row justify-content-center">
            <form
              className="col-md-8 col-sm-12"
              onSubmit={(e) => this.RolEditar(e)}
            >
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  name="NOMBRE_ROL"
                  className="form-control"
                  placeholder="Nombre deL rol"
                  onChange={this.UpdateState}
                  defaultValue={this.state.NOMBRE_ROL}
                  readOnly={!this.props.modificar} 
                />
              </div>
  
              <div className="form-group">
                <label>NIVEL AUTORIZACION:</label>
                <input
                  type="number"
                  name="NIVEL_AUTORIZACION"
                  className="form-control"
                  placeholder="NIVEL AUTORIZACION"
                  onChange={this.UpdateState}
                  defaultValue={this.state.NIVEL_AUTORIZACION}
                  readOnly={!this.props.modificar} 
                />
              </div>
  
              {this.props.modificar && (            
              <button
                disabled={this.validarForm()}
                type="submit"
                className="btn btn-success float-right"
              >
                Editar Rol
              </button>
              )}
            </form>
          </div>
        </Fragment>
      );
    }
  }
  
  export default withRouter(RolEditar);
  