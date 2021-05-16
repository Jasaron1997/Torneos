
  import React, { Component, Fragment } from "react";
  import { fetchGet, fetchPut } from "../../../utils/Fetch";
  import { withRouter, Redirect } from "react-router-dom";
  import Select from "react-select";
  import makeAnimated from "react-select/animated";

  const initialState = {
  };
  
  class UsuarioEditar extends Component {
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
      const {USUARIO
        ,CONTRA_USUARIO,ID_ROL,NOMBRE1,NOMBRE2,APELLIDO1
        ,APELLIDO2 } = this.state;
      const noValido = !USUARIO || !CONTRA_USUARIO|| !ID_ROL|| !NOMBRE1|| !NOMBRE2|| !APELLIDO1|| !APELLIDO2;
      return noValido;
    };
  
    async componentDidMount() {
      const { id } = this.props.match.params;
      const data = await fetchGet(
        `${process.env.REACT_APP_SERVER}/api/usuarios/find/${id}`
      );
      this.setState({ ...data.data });

      const dataRol = await fetchGet(
        `${process.env.REACT_APP_SERVER}/api/roles/all`
      );
      
      const Roles=dataRol.data;
      const Rol=Roles.find(rol=>rol.ID_ROL===data.data.ID_ROL)

      this.setState({Rol, Roles,ID_ROLR:Rol.ID_ROL });
 

    }
  
    updateStateSelectRol = (Rol) => {
      this.setState({Rol,
        ID_ROLR:Rol.ID_ROL,
      });
    };

    UsuarioEditar = async (e) => {
      e.preventDefault();
  
      const data = await fetchPut(
        `${process.env.REACT_APP_SERVER}/api/usuarios/Update`,
        this.state
      );
      this.setState({ data: data.data });
      alert(data.message);
      this.props.history.push("/usuarios");
    };
  
    render() {
      const redireccion = this.props.Access("ModificarUsuarios") ? (
        ""
      ) : (
        <Redirect to="/login" />
      );
  
      const mensaje = this.props.modificar ? (
        "Editar usuario"
      ) : (
        "Detalles de usuario"
      );
      return (
        <Fragment>
          {redireccion}
<h1 className="text-center mb-5">{mensaje}</h1>
  
          <div className="row justify-content-center">
            <form
              className="col-md-8 col-sm-12"
              onSubmit={(e) => this.UsuarioEditar(e)}
            >
              <div className="form-group">
                <label>Usuario:</label>
                <input
                  type="text"
                  name="USUARIO"
                  className="form-control"
                  placeholder="Nombre"
                  onChange={this.UpdateState}
                  readOnly={!this.props.modificar}
                  defaultValue={this.state.USUARIO_USUARIO}
                />
              </div>
              <div className="form-group">
                <label>Contraseña:</label>
                <input
                  type={ this.props.Access("VerContra") ? (
        "text"
      ) : "password"}
                  name="CONTRA_USUARIO"
                  className="form-control"
                  placeholder="Descripcion de la acceso"
                  onChange={this.UpdateState}
                  defaultValue={this.state.CONTRA_USUARIO}
                  readOnly={!this.props.modificar}
                />
              </div>
              <div className="form-group">
                {/* <label>Id Rol:</label>
                <input
                  type="text"
                  name="ID_ROL"
                  className="form-control"
                  placeholder="Descripcion de la acceso"
                  onChange={this.UpdateState}
                  defaultValue={this.state.ID_ROL}
                  readOnly={!this.props.modificar}
                /> */}

<Select
                onChange={this.updateStateSelectRol}
                options={this.state.Roles}
                isMulti={false}
                isDisabled={!this.props.modificar}
                components={makeAnimated()}
                placeholder={"Seleccione el Rol"}
                getOptionLabel={(options) => options.NOMBRE_ROL}
                getOptionValue={(options) => options.ID_ROL}
                value={this.state.Rol}
              />


              </div>
                       <div className="form-group">
                <label>NOMBRE1:</label>
                <input
                  type="text"
                  name="NOMBRE1"
                  className="form-control"
                  placeholder="NOMBRE1"
                  onChange={this.UpdateState}
                  readOnly={!this.props.modificar}
                  defaultValue={this.state.NOMBRE1}
                />
              </div>
                       <div className="form-group">
                <label>NOMBRE2:</label>
                <input
                  type="text"
                  name="NOMBRE2"
                  className="form-control"
                  placeholder="NOMBRE2"
                  onChange={this.UpdateState}
                  readOnly={!this.props.modificar}
                  defaultValue={this.state.NOMBRE2}
                />
              </div>
                       <div className="form-group">
                <label>APELLIDO1:</label>
                <input
                  type="text"
                  name="APELLIDO1"
                  className="form-control"
                  placeholder="APELLIDO1"
                  onChange={this.UpdateState}
                  readOnly={!this.props.modificar}
                  defaultValue={this.state.APELLIDO1}
                />
              </div>
                       <div className="form-group">
                <label>APELLIDO2:</label>
                <input
                  type="text"
                  name="APELLIDO2"
                  className="form-control"
                  placeholder="APELLIDO2"
                  onChange={this.UpdateState}
                  readOnly={!this.props.modificar}
                  defaultValue={this.state.APELLIDO2}
                />
              </div>
             
              {this.props.modificar &&(
              <button
                // disabled={this.validarForm()}
                type="submit"
                className="btn btn-success float-right"
              >
                Editar Usuario
              </button>
              )}
            </form>
          </div>
        </Fragment>
      );
    }
  }
  
  export default withRouter(UsuarioEditar);
  