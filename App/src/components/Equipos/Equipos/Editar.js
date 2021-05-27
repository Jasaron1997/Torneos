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
      const {NOMBRE, DIRECCION, Departamento, Municipio} = this.state;
      const noValido = !NOMBRE|| ! DIRECCION||  ! Departamento|| ! Municipio;
      return noValido;
    };
    
  async componentDidMount() {
    const { id } = this.props.match.params;

    const data = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/Equipos/find/${id}`
    );
   await this.setState({ ...data.data });

    const Departamentos = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/Departamentos/all`
    );
    await this.setState({ Departamentos:Departamentos.data });

    const Departamento=Departamentos.data.find(x=>x.ID_DEPARTAMENTO==this.state.ID_DEPARTAMENTO)
  
   await this.updateStateDepartamento(Departamento)

    const Municipio=this.state.Municipios.find(x=>x.ID_MUNICIPIO==this.state.ID_MUNICIPIO)

    await this.setState({ Municipio:Municipio });


    const Entrenadores = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/Entrenadores/all`
    );
    this.setState({ Entrenadores:Entrenadores.data });
    const Entrenador=this.state.Entrenadores.find(x=>x.ID_ENTRENADOR==this.state.ID_ENTRENADOR)

    await this.setState({ Entrenador:Entrenador});


  }
  
   Editar = async (e) => {
      e.preventDefault();
  
      await this.setState({
        NOMBRE_COMPLETO:`${this.state.NOMBRE} ${this.state.DIRECCION}`
            })
      const data = await fetchPut(
        `${process.env.REACT_APP_SERVER}/api/equipos/Update`,
        this.state
      );
      this.setState({ data: data.data });
      alert(data.message);
      this.props.history.push("/equipos");
    };
  
    updateStateEntrenadores = async(Entrenador) => {
      await  this.setState({Entrenador,
        ID_ENTRENADOR:Entrenador.ID_ENTRENADOR,
        });
      };
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

      const mensaje = this.props.modificar ? (
        "Editar"
      ) : (
        "Detalle"
      );
  
      return (
        <Fragment>
          {redireccion}
      <h1 className="text-center mb-5">{mensaje}</h1>
  
          <div className="row justify-content-center">
            <form
              className="col-md-8 col-sm-12"
              onSubmit={(e) => this.Editar(e)}
            >
              <div className="form-group">
                <label>NOMBRE1:</label>
                <input
                  type="text"
                  name="NOMBRE"
                  className="form-control"
                  placeholder="NOMBRE"
                  onChange={this.UpdateState}
                  defaultValue={this.state.NOMBRE}
                  readOnly={!this.props.modificar} 
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
                  readOnly={!this.props.modificar} 
                />
               </div>
              <div className="form-group">
                <label>Departamento:</label>
                <Select
                onChange={this.updateStateDepartamento}
                options={this.state.Departamentos}
                isMulti={false}
                components={makeAnimated()}
                isDisabled={ !this.props.modificar}
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
                isDisabled={ !this.props.modificar}
              />
              </div>
              <div className="form-group">
                <label>Entrenadores:</label>
                <Select
                onChange={this.updateStateEntrenadores}
                options={this.state.Entrenadores}
                isMulti={false}
                components={makeAnimated()}
                placeholder={"Seleccione al Entrenador"}
                getOptionLabel={(options) => options.NOMBRE_COMPLETO}
                getOptionValue={(options) => options.ID_ENTRENADOR}
                value={this.state.Entrenadores}
                isDisabled={ !this.props.modificar}
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
  