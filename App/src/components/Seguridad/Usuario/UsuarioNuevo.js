import React, { Component, Fragment } from "react";
import { fetchPost,fetchGet } from "../../../utils/Fetch";
import { withRouter, Redirect } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const initialState = {
   ID_USUARIOR:"",
   CONTRA_USUARIOR:"",
   ID_EMPRESAR:2
  ,ID_ROLR:""
  ,NOMBRE_USUARIOR:""
  ,DIRECCION_USUARIOR:""
  ,DPI_USUARIOR:""
  ,TELEFONO_USUARIOR:""
  ,ESTADO:"1"
  ,ID_ESTACION:1
  // ,ID_EMPRESA:""
};

class UsuarioNuevo extends Component {
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

  CrearUsuario = async (e) => {
    e.preventDefault();
await this.setState({FECHA_DE_CREACION:new Date()})
    const data = await fetchPost(
      `${process.env.REACT_APP_SERVER}/api/usuarios/create`,
      this.state
    );
    this.setState({ data: data.data });
    alert(data.message);
    this.props.history.push("/usuarios");
  };

  async componentDidMount() {


    const data = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/roles/all`
    );
    this.setState({ Roles:data.data });



  }


  updateStateSelectRol = (Rol) => {
    this.setState({Rol,
      ID_ROL:Rol.ID_ROL,
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
        <h1 className="text-center mb-5">Nuevo Usuario</h1>

        <div className="row justify-content-center">
          <form
            className="col-md-8 col-sm-12"
            onSubmit={(e) => this.CrearUsuario(e)}
          >
<div className="form-group">
                <label>Usuario:</label>
                <input
                  type="text"
                  name="USUARIO"
                  className="form-control"
                  placeholder="Nombre"
                  onChange={this.UpdateState}
                  defaultValue={this.state.USUARIO}
                />
              </div>
              <div className="form-group">
                <label>Contraseña:</label>
                <input
                  type="password"
                  name="CONTRA_USUARIO"
                  className="form-control"
                  placeholder=""
                  onChange={this.UpdateState}
                  defaultValue={this.state.CONTRA_USUARIOR}
                />
              </div>

              <div className="form-group">
                <label>Id Rol:</label>
                {/* <input
                  type="text"
                  name="ID_ROL"
                  className="form-control"
                  placeholder="Id Rol"
                  onChange={this.UpdateState}
                  defaultValue={this.state.ID_ROL}
                /> */}
                <Select
                onChange={this.updateStateSelectRol}
                options={this.state.Roles}
                isMulti={false}
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
                  placeholder="Nombre"
                  onChange={this.UpdateState}
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
                  defaultValue={this.state.APELLIDO1}
                />
              </div>
              <div className="form-group">
                <label>APELLIDO2:</label>
                <input
                  type="text"
                  name="APELLIDO2"
                  className="form-control"
                  placeholder="Nombre"
                  onChange={this.UpdateState}
                  defaultValue={this.state.APELLIDO2}
                />
              </div>
            
            <button
              disabled={this.validarForm()}
              type="submit"
              className="btn btn-success float-right"
            >
              Nuevo Usuario
            </button>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(UsuarioNuevo);
