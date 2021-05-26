import React, { Component, Fragment } from "react";
import { fetchPost,fetchGet } from "../../../utils/Fetch";
import { withRouter, Redirect } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const initialState = {
  ID_ROL:""
  ,NOMBRE_ROL:""
  ,DESCRIPCION_ROL:""
  ,ESTADO:true
};

class Nuevo extends Component {
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

  Crear= async (e) => {
    e.preventDefault();
   await this.setState({
ID_USUARIO:this.props.auth[0].ID_USUARIO,

FECHA_DE_CREACION:new Date()
})


    const data = await fetchPost(
      `${process.env.REACT_APP_SERVER}/api/posiciones/create`,
      this.state
    );
    this.setState({ data: data.data });
    alert(data.message);
    this.props.history.push("/posiciones");
  };
  async componentDidMount() {
    
  }
   render() {
    const redireccion = this.props.Access("1") ? (
      ""
    ) : (
      <Redirect to="/login" />
    );

    return (
      <Fragment>
        {redireccion}
        <h1 className="text-center mb-5">Nuevo</h1>

        <div className="row justify-content-center">
          <form
            className="col-md-8 col-sm-12"
            onSubmit={(e) => this.Crear(e)}
          >
             <div className="form-group">
                <label>NOMBRE:</label>
                <input
                  type="text"
                  name="NOMBRE"
                  className="form-control"
                  placeholder="NOMBRE"
                  onChange={this.UpdateState}
                  defaultValue={this.state.NOMBRE}
                />
              </div>
             <button
              disabled={this.validarForm()}
              type="submit"
              className="btn btn-success float-right"
            >
              Nuevo
            </button>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(Nuevo);
