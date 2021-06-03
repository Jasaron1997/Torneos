
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
      const {NOMBRE, Departamento, Municipio} = this.state;
      const noValido = !NOMBRE|| ! Departamento|| ! Municipio;
      return noValido;
    };
    
  async componentDidMount() {
    const { id } = this.props.match.params;

    const data = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/torneos/find/${id}`
    );
   await this.setState({ ...data.data });

  debugger
    const Departamentos = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/Departamentos/all`
    );
    await this.setState({ Departamentos:Departamentos.data });

    const Departamento=Departamentos.data.find(x=>x.ID_DEPARTAMENTO==this.state.ID_DEPARTAMENTO)
  
   await this.updateStateDepartamento(Departamento)

    const Municipio=this.state.Municipios.find(x=>x.ID_MUNICIPIO==this.state.ID_MUNICIPIO)

    await this.setState({ Municipio:Municipio });

  }
  
   Editar = async (e) => {
      e.preventDefault();
  
      const data = await fetchPut(
        `${process.env.REACT_APP_SERVER}/api/torneos/Update`,
        this.state
      );
      this.setState({ data: data.data });
      alert(data.message);
      this.props.history.push("/torneos");
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
      const reFECHA = this.props.Access("1") ? (
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
          {reFECHA}
      <h1 className="text-center mb-5">{mensaje}</h1>
  
          <div className="row justify-content-center">
            <form
              className="col-md-8 col-sm-12"
              onSubmit={(e) => this.Editar(e)}
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
                  readOnly={!this.props.modificar} 
                />
              </div>
               <div className="form-group">
                <label>FECHA:</label>
                <input
                  type="date"
                  name="FECHA"
                  className="form-control"
                  placeholder="FECHA_DE_CREACION"
                  onChange={this.UpdateState}
                  defaultValue={this.state.FECHA_DE_CREACION}
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
  