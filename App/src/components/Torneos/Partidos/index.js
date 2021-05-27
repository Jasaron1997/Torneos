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
            className="btn btn-link  ml-5 mr-5"
          >
            Crear
          </Link>
        )}
        {this.state.dataFiltrada && (
          <div className="ml-5 mr-5">
            <div className="row border">
              <div className="col-sm-1 col-xs-1">FECHA</div>
              <div className="col-sm-1 col-xs-1">BLOQUE</div>
              <div className="col-sm-1 col-xs-1">LOCAL</div>
              <div className="col-sm-1 col-xs-1">VISITANTE</div>
              <div className="col-sm-1 col-xs-1">GOLES LOCAL</div>
              <div className="col-sm-1 col-xs-1">GOLES VISITANTES</div>
              <div className="col-sm-1 col-xs-1">ARBITRO 1</div>
              <div className="col-sm-1 col-xs-1">ARBITRO 2</div>
              <div className="col-sm-1 col-xs-1">ARBITRO 3</div>
              <div className="col-sm-3 col-xs-3">OPCIONES</div>
            </div>
            {this.state.dataFiltrada.map((item) => {
              const { ID_PARTIDO } = item;
              return (
                <div className="row border" key={ID_PARTIDO}>
                  <div className="col-sm-1 col-xs-1">{new Date(item.FECHA_DE_CREACION).toLocaleDateString()}</div>
                  <div className="col-sm-1 col-xs-1">{item.BLOQUE}</div>
                  <div className="col-sm-1 col-xs-1">{item.LOCAL}</div>
                  <div className="col-sm-1 col-xs-1">{item.VISITANTE}</div>
                  <div className="col-sm-1 col-xs-1">{item.GOLES_LOCAL}</div>
                  <div className="col-sm-1 col-xs-1">{item.GOLES_VISITANTE}</div>
                  <div className="col-sm-1 col-xs-1">{item.ARBITRO1}</div>
                  <div className="col-sm-1 col-xs-1">{item.ARBITRO2}</div>
                  <div className="col-sm-1 col-xs-1">{item.ARBITRO3}</div>
                  <div className="col-sm-3 col-xs-3">
                
                    {this.props.Access("1")  && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/Partidos/modificar/${item.ID_BLOQUE}`}
                        className="btn btn-warning m-1"
                      >
                        Modificar
                      </Link>
                    )}

                    {this.props.Access("1") && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/Partidos/detalle/${item.ID_BLOQUE}`}
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
                        to={`${process.env.PUBLIC_URL}/partidoDetalle/${item.ID_PARTIDO}`}
                        className="btn btn-info m-1"
                      >
                        detalle
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

export default withRouter(Partidos);
