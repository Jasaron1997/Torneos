import React, { Component, Fragment } from "react";

import { fetchPost, fetchGet } from "../../../utils/Fetch";
import { withRouter } from "react-router-dom";
import {  Redirect } from "react-router-dom";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import AccesosIndex from "./Accesos";


const initialState = {
  rol: "",
  accesses: "",
  access: "",
};

class Asing extends Component {
  state = {
    ...initialState,
  };

  accesses = (asing) => {
   this.setState({
      asing: asing,
    });
  };

  clearState = () => {
    this.setState({
      ...initialState,
    });
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const data = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/roles/${id}`
    );
    const { ID_ROL, NOMBRE_ROL } = data.data[0];

    this.setState({rol:{ID_ROL, NOMBRE_ROL} });
   

    const dataaccesrol = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/accessrol/rol/${id}`
    );

    this.setState({asingAC:dataaccesrol.data });

    const dataAccess = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/accessrol/rol/no/${id}`
    );


    this.setState({ accesos: dataAccess.data });
  }

  CreateUpdateAccess = async (e) => {
    e.preventDefault();

    const dataGet = {
      ACCESOXROLES: this.state.asing,
      rol:this.state.rol,
    };


    const data = await fetchPost(
      `${process.env.REACT_APP_SERVER}/api/accessrol`,
      dataGet
    );
    this.setState({ data: data.data });
    alert(data.message);
    this.clearState();
    this.props.history.push("/roles");
  };

  render() {
    const redireccion = this.props.Access("VerAsingar") ? (
      ""
    ) : (
      <Redirect to="/login" />
    );
    
    return (
      <Fragment>
        <h1 className="text-center mb-5">Asignacion de Accessos</h1>
{redireccion}
        <div className="row justify-content-center">
          <form
            className="col-md-8 col-sm-12"
            onSubmit={(e) => this.CreateUpdateAccess(e)}
          >
            <div className="form-group">
              <label>ROL:</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Nombre del Rol"
                defaultValue={this.state.rol.NOMBRE_ROL}
                disabled={true}
              />
            </div>
            <div className="form-group">
              <Select
                onChange={this.accesses}
                // options={this.state.accesos}
                isMulti={true}
                components={makeAnimated()}
                placeholder={"Accesos Actuales"}
                getOptionLabel={(options) => options.NOMBRE_ACCESO}
                getOptionValue={(options) => options.ID_ACCESO}
                value={this.state.asingAC}
                isDisabled={true}
              />
            </div>


            <div className="form-group">
              <Select
                onChange={this.accesses}
                options={this.state.accesos}
                isMulti={true}
                components={makeAnimated()}
                placeholder={"Seleccione los Accesos Nuevos"}
                getOptionLabel={(options) => options.NOMBRE_ACCESO}
                getOptionValue={(options) => options.ID_ACCESO}
                value={this.state.asing}
              />
            </div>
            {this.props.Access("CrearAsingar")  &&  (
            <button
              // disabled={this.validarForm()}
              type="submit"
              className="btn btn-success float-right"
            >
              Aceptar
            </button>
            )}
          </form>


        </div>

        <AccesosIndex  Access={this.props.Access} ID_ROL={this.state.rol.ID_ROL}/>
     
     
      </Fragment>
    );
  }
}

export default withRouter(Asing);
