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
    const {NOMBRE,DIRECCION, Departamento, Municipio} = this.state;
    const noValido = !NOMBRE|| ! DIRECCION|| ! Departamento|| ! Municipio;
    return noValido;
  };

  Crear= async (e) => {
    e.preventDefault();
   await this.setState({
ID_USUARIO:this.props.auth[0].ID_USUARIO,
FECHA_DE_CREACION:new Date(),
NOMBRE_COMPLETO:`${this.state.NOMBRE1} ${this.state.NOMBRE2} ${this.state.APELLIDO1} ${this.state.APELLIDO2}`
    })


    const data = await fetchPost(
      `${process.env.REACT_APP_SERVER}/api/equipos/create`,
      this.state
    );
    this.setState({ data: data.data });
    alert(data.message);
    this.props.history.push("/equipos");
  };
  async componentDidMount() {
    const Departamentos = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/Departamentos/all`
    );
    this.setState({ Departamentos:Departamentos.data });

    const Entrenadores = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/Entrenadores/all`
    );
    this.setState({ Entrenadores:Entrenadores.data });
  }

  updateStateEntrenadores = async(Entrenador) => {
    await  this.setState({Entrenador,
      ID_ENTRENADOR:Entrenador.ID_ENTRENADOR,
      });
  }
  updateStateMunicipios = async(Municipio) => {
    await  this.setState({Municipio,
        ID_MUNICIPIO:Municipio.ID_MUNICIPIO,
      });
    };

  updateStateDepartamento = async(Departamento) => {
  await  this.setState({Departamento,
      ID_DEPARTAMENTO:Departamento.ID_DEPARTAMENTO,
    });
    


const data = await fetchGet(
    `${process.env.REACT_APP_SERVER}/api/municipios/byDepartamento/${Departamento.ID_DEPARTAMENTO}`
  );
  await   this.setState({ Municipios:data.data });
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
                <label>DIRECCION:</label>
                <input
                  type="text"
                  name="DIRECCION"
                  className="form-control"
                  placeholder="DIRECCION"
                  onChange={this.UpdateState}
                  defaultValue={this.state.DIRECCION}
                />
              </div>
              <div className="form-group">
                <label>Departamento:</label>
                <Select
                onChange={this.updateStateDepartamento}
                options={this.state.Departamentos}
                isMulti={false}
                components={makeAnimated()}
                placeholder={"Seleccione el departamento"}
                getOptionLabel={(options) => options.NOMBRE}
                getOptionValue={(options) => options.ID_DEPARTAMENTO}
                value={this.state.Departamento}
              />
              </div>
              <div className="form-group">
                <label>Municipios:</label>
                <Select
                onChange={this.updateStateMunicipios}
                options={this.state.Municipios}
                isMulti={false}
                components={makeAnimated()}
                placeholder={"Seleccione el municipio"}
                getOptionLabel={(options) => options.NOMBRE}
                getOptionValue={(options) => options.ID_MUNICIPIO}
                value={this.state.Municipio}
              />
              </div>
              <div className="form-group">
                <label>Entrenador:</label>
                <Select
                onChange={this.updateStateEntrenadores}
                options={this.state.Entrenadores}
                isMulti={false}
                components={makeAnimated()}
                placeholder={"Seleccione el entrenador"}
                getOptionLabel={(options) => options.NOMBRE_COMPLETO}
                getOptionValue={(options) => options.ID_ENTRENADOR}
                value={this.state.Entrenador}
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
