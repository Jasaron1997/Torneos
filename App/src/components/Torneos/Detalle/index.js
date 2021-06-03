import React, { Component, Fragment } from "react";
import { fetchGet,fetchDelete, fetchPost} from "../../../utils/Fetch";
import { Link, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";

const estadoInicial = { BuscarDatos: "", data: null };

class DETALLE_PARTIDO extends Component {
  constructor(props) {
    super(props);
    this.state = { data: estadoInicial };
  }

  Buscar = async () =>{
    const { id } = this.props.match.params;
    const data = await fetchGet(`${process.env.REACT_APP_SERVER}/api/detalle_partido/ByPartido/${id}`);
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
    const datos = this.state.data.filter((dat) => patt.exec(dat.EQUIPO));

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
    `${process.env.REACT_APP_SERVER}/api/DETALLE_PARTIDO/delete`,this.state
  );
  alert(data.message);

await this.setState({...estadoInicial})

  const dataGet = await fetchGet(
    `${process.env.REACT_APP_SERVER}/api/DETALLE_PARTIDO/all`
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
        <h1 className="text-center mb-5">DETALLE_PARTIDO</h1>
        <form class="form-inline " onSubmit={this.BuscarDatos}>
          <label className="ml-5 mr-5">
            <strong>EQUIPO</strong>
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
            to={`${process.env.PUBLIC_URL}/DETALLE_PARTIDO/crear/${this.props.match.params.id}`}
            className="btn btn-link  ml-5 mr-5"
          >
            Crear
          </Link>
        )}
        {this.state.dataFiltrada && (
          <div className="ml-5 mr-5">
            <div className="row border">
              <div className="col-sm-3 col-xs-3">EQUIPO</div>
              <div className="col-sm-1 col-xs-1">FECHA</div>
              <div className="col-sm-1 col-xs-1">JUGADOR</div>
              <div className="col-sm-1 col-xs-1">GOL</div>
              <div className="col-sm-4 col-xs-4">OPCIONES</div>
            </div>
            {this.state.dataFiltrada.map((item) => {
              const { ID_DETALLE_PARTIDO } = item;
              return (
                <div className="row border" key={ID_DETALLE_PARTIDO}>
                  <div className="col-sm-3 col-xs-3">{item.EQUIPO}</div>
                  <div className="col-sm-1 col-xs-1">{new Date(item.FECHA_CREACION).toLocaleString()}</div>
                  <div className="col-sm-1 col-xs-1">{item.JUGADOR}</div>
                  <div className="col-sm-1 col-xs-1">{item.GOL}</div>
                  <div className="col-sm-4 col-xs-4">
                
                    {/* {this.props.Access("1")  && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/DETALLE_PARTIDO/modificar/${item.ID_DETALLE_PARTIDO}`}
                        className="btn btn-warning m-1"
                      >
                        Modificar
                      </Link>
                    )} */}

                    {/* {this.props.Access("1") && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/DETALLE_PARTIDO/detalle/${item.ID_DETALLE_PARTIDO}`}
                        className="btn btn-primary m-1"
                      >
                        Detalles
                      </Link>
                    )} */}
                    {this.props.Access("1")  &&(
                      <button
                        onClick={() => {
                          if (window.confirm("Seguro que deseas eliminar el gol")) {
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

export default withRouter(DETALLE_PARTIDO);
