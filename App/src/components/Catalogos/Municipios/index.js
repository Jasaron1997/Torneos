import React, { Component, Fragment } from "react";
import { fetchGet,fetchDelete, fetchPost} from "../../../utils/Fetch";
import { Link, Redirect } from "react-router-dom";

const estadoInicial = { BuscarDatos: "", data: null };

class Municipios extends Component {
  constructor(props) {
    super(props);
    this.state = { data: estadoInicial };
  }

  Buscar = async () =>{
    const data = await fetchGet(`${process.env.REACT_APP_SERVER}/api/Municipios/all`);
    this.setState({ dataFiltrada: data.data, data: data.data,estado:"Re Activar"});
  }

   componentDidMount() {
   this.Buscar();
  }
  // cambioEstado = async (e) => {
  //  const data = await fetchGet(`${process.env.REACT_APP_SERVER}/api/piloto`);
  //   this.setState({ dataFiltrada: data.data, data: data.data });
  //   const { name, value } = e.target;
  //   this.setState({
  //     [name]: value,
  //   });
  // };

  BuscarDatos = (e) => {
    e.preventDefault();
    const patt = new RegExp(`${this.state.BuscarDatos}`, "gi");
    const datos = this.state.data.filter((dat) => patt.exec(dat.NOMBRE));

    this.setState({
      dataFiltrada: datos,
    });
  };

cambioEstado = (e) => {
  const { name, value } = e.target;
  this.setState({
    [name]: value,
  });
};



Eliminar = async (item) => {
await this.setState({...item})

  const data = await fetchPost(
    `${process.env.REACT_APP_SERVER}/api/arbitros/delete`,this.state
  );
  alert(data.message);

await this.setState({...estadoInicial})

  const dataGet = await fetchGet(
    `${process.env.REACT_APP_SERVER}/api/arbitros/all`
  );
  this.setState({ dataFiltrada: dataGet.data, data: dataGet.data });
};


  render() {
    const redireccion = this.props.Access("VerRoles") ? (
      ""
    ) : (
      <Redirect to="/login" />
    );

    return (
      <Fragment>
        {redireccion}
        <h1 className="text-center mb-5">Municipios</h1>
        <form class="form-inline " onSubmit={this.BuscarDatos}>
          <label className="ml-5 mr-5">
            <strong>Municipio:</strong>
          </label>
          <input
            class="form-control mr-sm-5"
            type="search"
            name="BuscarDatos"
            onChange={this.cambioEstado}
            defaultValue={this.state.BuscarDatos}
            placeholder=""
            aria-label="Search"
          />
          <button class="btn btn-outline-dark my-2 my-sm-0" type="submit">
            Buscar
          </button>
        </form>
       
        {this.state.dataFiltrada && (
          <div className="ml-5 mr-5">
            <div className="row border">
              <div className="col-sm-6 col-xs-6">DEPARTAMENTO</div>
              <div className="col-sm-6 col-xs-6">NOMBRE</div>
            </div>
            {this.state.dataFiltrada.map((item) => {
              const { ID_MUNICIPIO } = item;
              return (
                <div className="row border" key={ID_MUNICIPIO}>
                  <div className="col-sm-6 col-xs-6">{item.DEPARTAMENTO}</div>
                  <div className="col-sm-6 col-xs-6">{item.NOMBRE}</div>
                </div>
              );
            })}
          </div>
        )}
      </Fragment>
    );
  }
}

export default Municipios;
