
  import React, { Component, Fragment } from "react";
  import { fetchGet, fetchPut } from "../../../utils/Fetch";
  import { withRouter, Redirect } from "react-router-dom";
  import Select from "react-select";
  import makeAnimated from "react-select/animated";

  const initialState = {
     ID_USUARIO:"",
     CONTRA_USUARIO:""
    ,ID_ROL:""
    ,NOMBRE_USUARIO:""
    ,DIRECCION_USUARIO:""
    ,DPI_USUARIO:""
    ,TELEFONO_USUARIO:""
    ,ESTADO:"1"
    ,ID_EMPRESAR:2

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
      const {USUARIO_USUARIOR
        ,CONTRA_USUARIOR,ID_ROLR,NOMBRE_USUARIOR,DIRECCION_USUARIOR,DPI_USUARIOR
        ,TELEFONO_USUARIOR } = this.state;
      const noValido = !USUARIO_USUARIOR || !CONTRA_USUARIOR|| !ID_ROLR|| !NOMBRE_USUARIOR|| !DIRECCION_USUARIOR|| !DPI_USUARIOR|| !TELEFONO_USUARIOR;

    console.log(USUARIO_USUARIOR
      ,CONTRA_USUARIOR,ID_ROLR,NOMBRE_USUARIOR,DIRECCION_USUARIOR,DPI_USUARIOR
      ,TELEFONO_USUARIOR )
      return noValido;
    };
  
    async componentDidMount() {
      const {  ID_USUARIO } = this.props.auth[0];
  
      const data = await fetchGet(
        `${process.env.REACT_APP_SERVER}/api/usuario/${ID_USUARIO}`
      );
      this.setState({ ...data.data[0] });

      this.setState({  
       ID_USUARIOR:data.data[0].ID_USUARIO
      ,CONTRA_USUARIOR:data.data[0].CONTRA_USUARIO
      ,NOMBRE_USUARIOR:data.data[0].NOMBRE_USUARIO
      ,DIRECCION_USUARIOR:data.data[0].DIRECCION_USUARIO
      ,DPI_USUARIOR:data.data[0].DPI_USUARIO
      ,TELEFONO_USUARIOR:data.data[0].TELEFONO_USUARIO
      ,USUARIO_USUARIOR:data.data[0].USUARIO_USUARIO
    });
      const dataRol = await fetchGet(
        `${process.env.REACT_APP_SERVER}/api/roles`
      );
      
      const Roles=dataRol.data;
      const Rol=Roles.find(rol=>rol.ID_ROL===data.data[0].ID_ROL)

      this.setState({Rol, Roles,ID_ROLR:Rol.ID_ROL });
 

      const Empresas = await fetchGet(
        `${process.env.REACT_APP_SERVER}/api/empresa`
      );
      const Empresa = await fetchGet(
        `${process.env.REACT_APP_SERVER}/api/empresa/${data.data[0].ID_EMPRESA}`
      );
      this.setState({ Empresas:Empresas.data,Empresa:Empresa.data[0],ID_EMPRESAR:Empresa.data[0].ID_EMPRESA});
  
  



  
    }
  
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
    UsuarioEditar = async (e) => {
      e.preventDefault();
  
      const data = await fetchPut(
        `${process.env.REACT_APP_SERVER}/api/usuario/${this.state.ID_USUARIO}`,
        this.state
      );
      this.setState({ data: data.data });
      alert(data.message);
      this.props.history.push("/usuarios");
    };
  
    render() {
      const redireccion = this.props.Access("CambioContraUsuarios") ? (
        ""
      ) : (
        <Redirect to="/login" />
      );
  
      const mensaje = this.props.modificar ? (
        "Cambiar Contraseña"
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
                {/* <div className="form-group">
                  <label>Usuario:</label>
                  <input
                    type="text"
                    name="USUARIO_USUARIOR"
                    className="form-control"
                    placeholder="Nombre"
                    onChange={this.UpdateState}
                    readOnly={!this.props.modificar}
                    defaultValue={this.state.USUARIO_USUARIO}
                  />
                </div> */}
              <div className="form-group">
                <label>Contraseña:</label>
                <input
                  type={ this.props.Access("VerContra") ? (
        "text"
      ) : "password"}
                  name="CONTRA_USUARIOR"
                  className="form-control"
                  placeholder="Descripcion de la acceso"
                  onChange={this.UpdateState}
                  defaultValue={this.state.CONTRA_USUARIO}
                  readOnly={!this.props.modificar}
                />
              </div>
              {/* <div className="form-group">

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
                <label>Nombre Usuario:</label>
                <input
                  type="text"
                  name="NOMBRE_USUARIOR"
                  className="form-control"
                  placeholder="Nombre"
                  onChange={this.UpdateState}
                  readOnly={!this.props.modificar}
                  defaultValue={this.state.NOMBRE_USUARIO}
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
                  readOnly={!this.props.modificar}
                  defaultValue={this.state.DIRECCION_USUARIO}
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
                  readOnly={!this.props.modificar}
                  defaultValue={this.state.DPI_USUARIO}
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
                  readOnly={!this.props.modificar}
                  defaultValue={this.state.TELEFONO_USUARIO}
                />
              </div>
              <div className="form-group">
                <label>Id Empresa:</label>
                
                <Select
                onChange={this.updateStateSelectEmpresa}
                options={this.state.Empresas}
                isMulti={false}
                isDisabled={!this.props.Access("CambioEmpresa") || !this.props.modificar}
                components={makeAnimated()}
                placeholder={"Seleccione el Rol"}
                getOptionLabel={(options) => options.NOMBRE_EMPRESA}
                getOptionValue={(options) => options.ID_EMPRESA}
                value={this.state.Empresa}
              />
              </div>
             */}
              {this.props.modificar &&(
              <button
                // disabled={this.validarForm()}
                type="submit"
                className="btn btn-success float-right"
              >
                Cambiar
              </button>
              )}
            </form>
          </div>
        </Fragment>
      );
    }
  }
  
  export default withRouter(UsuarioEditar);
  