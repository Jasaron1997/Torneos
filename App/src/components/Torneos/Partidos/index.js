import React, { Component, Fragment } from "react";
import { fetchGet,fetchDelete, fetchPost} from "../../../utils/Fetch";
import { Link, Redirect,withRouter } from "react-router-dom";

const estadoInicial = { BuscarDatos: "", data: null };

class Partidos extends Component {
  constructor(props) {
    super(props);
    this.state = { data: estadoInicial };
  }

  Buscar = async () =>{
    const { id } = this.props.match.params;
    const data = await fetchGet(`${process.env.REACT_APP_SERVER}/api/Partidos/byBloques/${id}`);
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
    const datos = this.state.data.filter((dat) => patt.exec(dat.LOCAL));

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
    `${process.env.REACT_APP_SERVER}/api/Partidos/delete`,this.state
  );
  alert(data.message);

await this.setState({...estadoInicial})
  const { id } = this.props.match.params;
  const dataGet = await fetchGet(`${process.env.REACT_APP_SERVER}/api/Partidos/byBloques/${id}`);
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
        <h1 className="text-center mb-5">Partidos</h1>
        <form class="form-inline " onSubmit={this.BuscarDatos}>
          <label className="ml-5 mr-5">
            <strong>Nombre:</strong>
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
            to={`${process.env.PUBLIC_URL}/Partidos/crear/${this.props.match.params.id}`}
            className="btn btn-link  ml-5 mr-5 text-dark"
          >
            Crear
          </Link>
        )}
        {this.state.dataFiltrada && (
            <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">FECHA</th>
                <th scope="col">BLOQUE</th>
                <th scope="col">LOCAL</th>
                <th scope="col">VISITANTE</th>
                <th scope="col">GOLES LOCAL</th>
                <th scope="col">GOLES VISITANTES</th>
                <th scope="col">ARBITRO 1</th>
                <th scope="col">ARBITRO 2</th>
                <th scope="col">ARBITRO 3</th>
                <th scope="col">OPCIONES</th>
                </tr>
  </thead>
  <tbody >
            {this.state.dataFiltrada.map((item) => {
              const { ID_PARTIDO } = item;
              return (
                <tr key={ID_PARTIDO}>
                   <td>{new Date(item.FECHA_DE_CREACION).toLocaleDateString()}</td>
                   <td>{item.BLOQUE}</td>
                   <td>{item.LOCAL}</td>
                   <td>{item.VISITANTE}</td>
                   <td>{item.GOLES_LOCAL}</td>
                   <td>{item.GOLES_VISITANTE}</td>
                   <td>{item.ARBITRO1}</td>
                   <td>{item.ARBITRO2}</td>
                   <td>{item.ARBITRO3}</td>
                   <td>
                
                    {this.props.Access("1")  && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/Partidos/modificar/${item.ID_PARTIDO}`}
                        className="btn btn-warning m-1"
                      >
                        Modificar
                      </Link>
                    )}

                    {this.props.Access("1") && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/Partidos/detalle/${item.ID_PARTIDO}`}
                        className="btn btn-primary m-1"
                      >
                        Detalles
                      </Link>
                    )}
                    {this.props.Access("1")  &&(
                      <button
                        onClick={() => {
                          if (window.confirm("Seguro que deseas eliminar el partido")) {
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
                        to={`${process.env.PUBLIC_URL}/DETALLE_PARTIDO/${item.ID_PARTIDO}`}
                        className="btn btn-info m-1"
                      >
                        Detalles del partido
                      </Link>
                    )}
                    {this.props.Access("1")  && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/ver_cancha/${item.ID_PARTIDO}`}
                        className="btn btn-info m-1"
                      >
                        Ver cancha
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

export default withRouter(Partidos);
