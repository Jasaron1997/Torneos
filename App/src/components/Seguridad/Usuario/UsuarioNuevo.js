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
    const {USUARIO_USUARIOR
      ,CONTRA_USUARIOR,ID_ROLR,NOMBRE_USUARIOR,DIRECCION_USUARIOR,DPI_USUARIOR
      ,TELEFONO_USUARIOR } = this.state;
    const noValido = !USUARIO_USUARIOR || !CONTRA_USUARIOR|| !ID_ROLR|| !NOMBRE_USUARIOR|| !DIRECCION_USUARIOR|| !DPI_USUARIOR|| !TELEFONO_USUARIOR;
    return noValido;
  };

  CrearUsuario = async (e) => {
    e.preventDefault();

    const data = await fetchPost(
      `${process.env.REACT_APP_SERVER}/api/usuario`,
      this.state
    );
    this.setState({ data: data.data });
    alert(data.message);
    this.props.history.push("/usuarios");
  };

  async componentDidMount() {


    const data = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/roles`
    );
    this.setState({ Roles:data.data });



    const Empresas = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/empresa`
    );
    this.setState({ Empresas:Empresas.data });


// if(!this.props.Access("CambioEmpresa")){
  const Empresa = await fetchGet(
    `${process.env.REACT_APP_SERVER}/api/empresa/${this.props.auth[0].ID_EMPRESA}`
  );
  this.setState({Empresa:Empresa.data[0],ID_EMPRESAR:Empresa.data[0].ID_EMPRESA });


// }/


const Estaciones = await fetchGet(
  `${process.env.REACT_APP_SERVER}/api/estacion`
);
this.setState({ Estaciones:Estaciones.data });

  }


  updateStateSelectEstacion= (Estacion) => {
    this.setState({Estacion,
      ID_ESTACION:Estacion.ID_ESTACION,
    });
  };


  updateStateSelectRol = (Rol) => {
    this.setState({Rol,
      ID_ROLR:Rol.ID_ROL,
    });
  };
  updateStateSelectEmpresa= (Empresa) => {
    this.setState({Empresa,
      ID_EMPRESAR:Empresa.ID_EMPRESA,
    });
  };

  render() {
    const redireccion = this.props.Access("CrearUsuarios") ? (
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
                  name="USUARIO_USUARIOR"
                  className="form-control"
                  placeholder="Nombre"
                  onChange={this.UpdateState}
                  defaultValue={this.state.USUARIO_USUARIOR}
                />
              </div>
              <div className="form-group">
                <label>Contraseña:</label>
                <input
                  type="password"
                  name="CONTRA_USUARIOR"
                  className="form-control"
                  placeholder="Descripcion de la acceso"
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
                <label>Estacion:</label>
                {/* <input
                  type="text"
                  name="ID_ROL"
                  className="form-control"
                  placeholder="Id Rol"
                  onChange={this.UpdateState}
                  defaultValue={this.state.ID_ROL}
                /> */}
                <Select
                onChange={this.updateStateSelectEstacion}
                options={this.state.Estaciones}
                isMulti={false}
                components={makeAnimated()}
                placeholder={"Seleccione la Estacion"}
                getOptionLabel={(options) => options.NOMBRE_ESTACON}
                getOptionValue={(options) => options.ID_ESTACION}
                value={this.state.Estacion}
              />
              </div>
              <div className="form-group">
                <label>Nombre Usuario:</label>
                <input
                  type="text"
                  name="NOMBRE_USUARIOR"
                  className="form-control"
                  placeholder="Nombre"
                  onChange={this.UpdateState}
                  defaultValue={this.state.NOMBRE_USUARIOR}
                />
              </div>

              <div className="form-group">
                <label>Direccion Usuario:</label>
                <input
                  type="text"
                  name="DIRECCION_USUARIOR"
                  className="form-control"
                  placeholder="Direccion"
                  onChange={this.UpdateState}
                  defaultValue={this.state.DIRECCION_USUARIOR}
                />
              </div>

              <div className="form-group">
                <label> DPI Usuario:</label>
                <input
                  type="text"
                  name="DPI_USUARIOR"
                  className="form-control"
                  placeholder="DPI"
                  onChange={this.UpdateState}
                  defaultValue={this.state.DPI_USUARIOR}
                />
              </div>

              <div className="form-group">
                <label>Telefono:</label>
                <input
                  type="text"
                  name="TELEFONO_USUARIOR"
                  className="form-control"
                  placeholder="Telefono"
                  onChange={this.UpdateState}
                  defaultValue={this.state.TELEFONO_USUARIOR}
                />
              </div>
              
              <div className="form-group">
                <label>Id Empresa:</label>
                {/* <input
                  type="text"
                  name="ID_EMPRESA"
                  className="form-control"
                  placeholder="Id Empresa"
                  onChange={this.UpdateState}
                  defaultValue={this.state.ID_EMPRESA}
                /> */}
                <Select
                onChange={this.updateStateSelectEmpresa}
                options={this.state.Empresas}
                isMulti={false}
                isDisabled={!this.props.Access("CambioEmpresa") }
                components={makeAnimated()}
                placeholder={"Seleccione el Rol"}
                getOptionLabel={(options) => options.NOMBRE_EMPRESA}
                getOptionValue={(options) => options.ID_EMPRESA}
                value={this.state.Empresa}
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
