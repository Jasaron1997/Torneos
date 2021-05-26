import React, { Component, Fragment } from "react";
import { fetchGet,fetchDelete, fetchPost} from "../../../utils/Fetch";
import { Link, Redirect } from "react-router-dom";

const estadoInicial = { BuscarDatos: "", data: null };

class Jugadores extends Component {
  constructor(props) {
    super(props);
    this.state = { data: estadoInicial };
  }

  Buscar = async () =>{
    const data = await fetchGet(`${process.env.REACT_APP_SERVER}/api/Jugadores/all`);
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
    const datos = this.state.data.filter((dat) => patt.exec(dat.NOMBRE_COMPLETO));

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
    `${process.env.REACT_APP_SERVER}/api/Jugadores/delete`,this.state
  );
  alert(data.message);

await this.setState({...estadoInicial})

  const dataGet = await fetchGet(
    `${process.env.REACT_APP_SERVER}/api/Jugadores/all`
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
        <h1 className="text-center mb-5">Jugadores</h1>
        <form class="form-inline " onSubmit={this.BuscarDatos}>
          <label className="ml-5 mr-5">
            <strong>NOMBRE COMPLETO:</strong>
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
            to={`${process.env.PUBLIC_URL}/Jugadores/crear`}
            className="btn btn-link  ml-5 mr-5"
          >
            Crear
          </Link>
        )}
        {this.state.dataFiltrada && (
          <div className="ml-5 mr-5">
            <div className="row border">
              <div className="col-sm-3 col-xs-3">NOMBRE_COMPLETO</div>
              <div className="col-sm-1 col-xs-1">DEPARTAMENTO</div>
              <div className="col-sm-1 col-xs-1">MUNICIPIO</div>
              <div className="col-sm-1 col-xs-1">POSICION</div>
              <div className="col-sm-4 col-xs-4">OPCIONES</div>
            </div>
            {this.state.dataFiltrada.map((item) => {
              const { ID_JUGADOR } = item;
              return (
                <div className="row border" key={ID_JUGADOR}>
                  <div className="col-sm-3 col-xs-3">{item.NOMBRE_COMPLETO}</div>
                  <div className="col-sm-1 col-xs-1">{item.DEPARTAMENTO}</div>
                  <div className="col-sm-1 col-xs-1">{item.MUNICIPIO}</div>
                  <div className="col-sm-1 col-xs-1">{item.POSICION}</div>
                  <div className="col-sm-4 col-xs-4">
                
                    {this.props.Access("1")  && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/Jugadores/modificar/${item.ID_JUGADOR}`}
                        className="btn btn-warning m-1"
                      >
                        Modificar
                      </Link>
                    )}

                    {this.props.Access("1") && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/Jugadores/detalle/${item.ID_JUGADOR}`}
                        className="btn btn-primary m-1"
                      >
                        Detalles
                      </Link>
                    )}
                    {this.props.Access("EliminarRoles")  &&(
                      <button
                        onClick={() => {
                          if (window.confirm("Seguro que deseas eliminar al jugador")) {
                            this.Eliminar(item);
                          }
                        }}
                        type="button"
                        className="btn btn-danger m-1 "
                      >
                        &times; Eliminar
                      </button>
                    )}
                  </div>
                  {/* </td> */}
                  {/* </tr> */}
                </div>
              );
            })}
          </div>
        )}
      </Fragment>
    );
  }
}

export default Jugadores;
