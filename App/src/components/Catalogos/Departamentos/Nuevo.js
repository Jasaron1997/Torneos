import React, { Component, Fragment } from "react";
import { fetchPost } from "../../../utils/Fetch";
import { withRouter, Redirect } from "react-router-dom";

const initialState = {
  ID_ROL:""
  ,NOMBRE_ROL:""
  ,DESCRIPCION_ROL:""
  ,ESTADO:true
};

class RolNuevo extends Component {
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
    const {NOMBRE_ROL,DESCRIPCION_ROL} = this.state;
    const noValido = !NOMBRE_ROL|| ! DESCRIPCION_ROL;
    return noValido;
  };

  CrearRol = async (e) => {
    e.preventDefault();

    const data = await fetchPost(
      `${process.env.REACT_APP_SERVER}/api/roles`,
      this.state
    );
    this.setState({ data: data.data });
    alert(data.message);
    this.props.history.push("/roles");
  };

  render() {
    const redireccion = this.props.Access("CrearRoles") ? (
      ""
    ) : (
      <Redirect to="/login" />
    );

    return (
      <Fragment>
        {redireccion}
        <h1 className="text-center mb-5">Nuevo Rol</h1>

        <div className="row justify-content-center">
          <form
            className="col-md-8 col-sm-12"
            onSubmit={(e) => this.CrearRol(e)}
          >
            <div className="form-group">
              <label>Nombre:</label>
              <input
                type="text"
                name="NOMBRE_ROL"
                className="form-control"
                placeholder="Nombre del Rol"
                onChange={this.UpdateState}
                defaultValue={this.state.NOMBRE_ROL}
              />
            </div>

            <div className="form-group">
              <label>Descripcion:</label>
              <input
                type="text"
                name="DESCRIPCION_ROL"
                className="form-control"
                placeholder="Descripcion"
                onChange={this.UpdateState}
                defaultValue={this.state.DESCRIPCION_ROL}
              />
            </div>

            
            <button
              disabled={this.validarForm()}
              type="submit"
              className="btn btn-success float-right"
            >
              Nuevo Rol
            </button>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(RolNuevo);
