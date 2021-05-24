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
    const { NOMBRE, Torneo} = this.state;
    const noValido = !NOMBRE|| ! Torneo;
    return noValido;
  };

  Crear= async (e) => {
    e.preventDefault();
   await this.setState({
ID_USUARIO:this.props.auth[0].ID_USUARIO,

FECHA_DE_CREACION:new Date()
})


    const data = await fetchPost(
      `${process.env.REACT_APP_SERVER}/api/bloques/create`,
      this.state
    );
    this.setState({ data: data.data });
    alert(data.message);
    this.props.history.push("/bloques");
  };
  async componentDidMount() {
    const Bloques = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/bloques/all`
    );
    this.setState({ Bloques:Bloques.data });

    const Torneos = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/torneos/all`
    );
    this.setState({ Torneos:Torneos.data });
    
  }
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
              <div className="form-group">
                <label>ID_TORNEO:</label>
                <Select
                onChange={this.updateStateTorneos}
                options={this.state.Torneos}
                isMulti={false}
                components={makeAnimated()}
                placeholder={"Seleccione el torneo"}
                getOptionLabel={(options) => options.ID_TORNEO}
                getOptionValue={(options) => options.ID_TORNEO}
                value={this.state.Bloque}
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
