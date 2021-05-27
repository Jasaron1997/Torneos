import React, { Component, Fragment } from "react";
import { fetchGet,fetchDelete, fetchPost} from "../../../utils/Fetch";
import { Link, Redirect,withRouter } from "react-router-dom";

const estadoInicial = { BuscarDatos: "", data: null };

class Bloques extends Component {
  constructor(props) {
    super(props);
    this.state = { data: estadoInicial };
  }

  Buscar = async () =>{
    const { id } = this.props.match.params;
    const data = await fetchGet(`${process.env.REACT_APP_SERVER}/api/bloques/ByTorneos/${id}`);
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
    `${process.env.REACT_APP_SERVER}/api/bloques/delete`,this.state
  );
  alert(data.message);

await this.setState({...estadoInicial})
  const { id } = this.props.match.params;
  const dataGet = await fetchGet(`${process.env.REACT_APP_SERVER}/api/bloques/ByTorneos/${id}`);
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
        <h1 className="text-center mb-5">Bloques</h1>
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
            to={`${process.env.PUBLIC_URL}/bloques/crear/${this.props.match.params.id}`}
            className="btn btn-link  ml-5 mr-5"
          >
            Crear
          </Link>
        )}
        {this.state.dataFiltrada && (
          <div className="ml-5 mr-5">
            <div className="row border">
              <div className="col-sm-4 col-xs-4">NOMBRE</div>
              <div className="col-sm-4 col-xs-4">TORNEO</div>
              <div className="col-sm-4 col-xs-4">OPCIONES</div>
            </div>
            {this.state.dataFiltrada.map((item) => {
              const { ID_BLOQUE } = item;
              return (
                <div className="row border" key={ID_BLOQUE}>
                  <div className="col-sm-4 col-xs-4">{item.NOMBRE}</div>
                  <div className="col-sm-4 col-xs-4">{item.TORNEO}</div>
                  <div className="col-sm-4 col-xs-4">
                
                    {this.props.Access("1")  && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/bloques/modificar/${item.ID_BLOQUE}`}
                        className="btn btn-warning m-1"
                      >
                        Modificar
                      </Link>
                    )}

                    {this.props.Access("1") && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/bloques/detalle/${item.ID_BLOQUE}`}
                        className="btn btn-primary m-1"
                      >
                        Detalles
                      </Link>
                    )}
                    {this.props.Access("1")  &&(
                      <button
                        onClick={() => {
                          if (window.confirm("Seguro que deseas eliminar el bloque")) {
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
                        to={`${process.env.PUBLIC_URL}/partidos/${item.ID_BLOQUE}`}
                        className="btn btn-info m-1"
                      >
                        Partidos
                      </Link>
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

export default withRouter(Bloques);
