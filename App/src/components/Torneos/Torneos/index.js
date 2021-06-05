import React, { Component, Fragment } from "react";
import { fetchGet,fetchDelete, fetchPost} from "../../../utils/Fetch";
import { Link, Redirect } from "react-router-dom";

const estadoInicial = { BuscarDatos: "", data: null };

class Torneos extends Component {
  constructor(props) {
    super(props);
    this.state = { data: estadoInicial };
  }

  Buscar = async () =>{
    const data = await fetchGet(`${process.env.REACT_APP_SERVER}/api/Torneos/all`);
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
    `${process.env.REACT_APP_SERVER}/api/Torneos/delete`,this.state
  );
  alert(data.message);

await this.setState({...estadoInicial})

  const dataGet = await fetchGet(
    `${process.env.REACT_APP_SERVER}/api/Torneos/all`
  );
  this.setState({ dataFiltrada: dataGet.data, data: dataGet.data });
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
        <h1 className="text-center mb-5">Torneos</h1>
        <form class="form-inline " onSubmit={this.BuscarDatos}>
          <label className="ml-5 mr-5">
            <strong>NOMBRE</strong>
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

        {this.props.Access("1") && (
          <Link
            to={`${process.env.PUBLIC_URL}/Torneos/crear`}
            className="btn btn-link  ml-5 mr-5 text-dark"
          >
            Crear
          </Link>
        )}
        {this.state.dataFiltrada && (
         <table class="table table-hover">
            <thead>
              <tr>
              <th scope="col">NOMBRE</th>
              <th scope="col">FECHA</th>
              <th scope="col">DEPARTAMENTO</th>
              <th scope="col">MUNICIPIO</th>
              <th scope="col">OPCIONES</th>
              </tr>
  </thead>
  <tbody >
            {this.state.dataFiltrada.map((item) => {
              const { ID_TORNEO } = item;
              return (
               
                <tr  key={ID_TORNEO}>
                  <td>{item.NOMBRE}</td>
                  <td>{new Date(item.FECHA_DE_CREACION).toLocaleDateString()}</td>
                  <td>{item.DEPARTAMENTO}</td>
                  <td>{item.MUNICIPIO}</td>
                  <td>
                
                    {this.props.Access("1")  && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/Torneos/modificar/${item.ID_TORNEO}`}
                        className="btn btn-warning m-1"
                      >
                        Modificar
                      </Link>
                    )}

                    {this.props.Access("1") && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/Torneos/detalle/${item.ID_TORNEO}`}
                        className="btn btn-primary m-1"
                      >
                        Detalles
                      </Link>
                    )}
                    {this.props.Access("1")  &&(
                      <button
                        onClick={() => {
                          if (window.confirm("Seguro que deseas eliminar el torneo")) {
                            this.Eliminar(item);
                          }
                        }}
                        type="button"
                        className="btn btn-danger m-1 "
                      >
                        &times; Eliminar
                      </button>
                    )}
                     {this.props.Access("1")  && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/bloques/${item.ID_TORNEO}`}
                        className="btn btn-info m-1"
                      >
                        bloques
                      </Link>
                    )}
                      {this.props.Access("1")  && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/partido_bloques/${item.ID_TORNEO}`}
                        className="btn btn-info m-1"
                      >
                        partidos de bloque
                      </Link>
                    )}
                 </td>
                  {/* </td> */}
                  {/* </tr> */}
                  </tr>
              );
            })}
            </tbody>
        </table>
        )}
      </Fragment>
    );
  }
}

export default Torneos;
