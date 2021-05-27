import React, { Component, Fragment } from "react";
import { fetchGet, fetchDelete, fetchPost} from "../../../utils/Fetch";
import { Link, Redirect } from "react-router-dom";

const estadoInicial = { BuscarDatos: "", data: null,};

class Usuario extends Component {
  constructor(props) {
    super(props);
    this.state = { data: estadoInicial };
  }

  Buscar = async () =>{
    const data = await fetchGet(`${process.env.REACT_APP_SERVER}/api/usuarios/all`);
    this.setState({ dataFiltrada: data.data, data: data.data });
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
    const datos = this.state.data.filter((dat) => patt.exec(dat.USUARIO));

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

  Eliminar = async (ID_USUARIO) => {

await this.setState({
  Eliminar:{
    ID_USUARIO:ID_USUARIO
  }
})

    const data = await fetchPost(
      `${process.env.REACT_APP_SERVER}/api/usuarios/delete`,this.state.Eliminar
    );
    alert(data.message);
    const dataGet = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/usuarios/all`
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
        <h1 className="text-center mb-5">Usuarios</h1>
        <form class="form-inline " onSubmit={this.BuscarDatos}>
          <label className="ml-5 mr-5">
            <strong>Nombre Usuario:</strong>
          </label>
          <input
            class="form-control mr-md-5"
            type="search"
            name="BuscarDatos"
            onChange={this.cambioEstado}
            defaultValue={this.state.BuscarDatos}
            placeholder=""
            aria-label="Search"
          />
          <button class="btn btn-outline-dark my-2 my-md-0" type="submit">
            Buscar
          </button>
        </form>

        {this.props.Access("2") && (
          <Link
            to={`${process.env.PUBLIC_URL}/usuarios/crear`}
            className="btn btn-link  ml-5 mr-5"
          >
            Crear
          </Link>
        )}

       

        {this.state.dataFiltrada && (
          <div className="ml-5 mr-5">
            <div className="row border">
              <div className="col-md-2 col-sm-12 col-xs-2">NOMBRE1</div>
             {/* <div className="col-md-2  d-none  d-sm-block ">Contraseña</div> */}
              <div className="col-md-2   d-none  d-sm-block">NOMBRE2</div>
              <div className="col-md-2 d-none  d-sm-block">APELLIDO1</div>
              <div className="col-md-2  d-none  d-sm-block ">APELLIDO2</div>
              <div className="col-md-1   d-none  d-sm-block">USUARIO</div>
              <div className="col-sm-3 col-xs-3">OPCIONES</div>

            </div>
            {this.state.dataFiltrada.map((item) => {
              const { ID_USUARIO } = item;
              return (
                <div className="row border" key={ID_USUARIO}>
                  <div className="col-md-2 col-sm-6 col-xs-2">{item.NOMBRE1}</div>
                  {/* <div className="col-md-2 col-sm-6 col-xs-4">{item.CONTRA_USUARIO}</div> */}
                  <div className="col-md-2 col-sm-6 col-xs-2">{item.NOMBRE2}</div>
                  <div className="col-md-2  d-none  d-sm-block ">{item.APELLIDO1}</div>
                  <div className="col-md-2  d-none  d-sm-block ">{item.APELLIDO2}</div>
                  <div className="col-md-1  d-none  d-sm-block ">{item.USUARIO}</div>
                  <div className="col-sm-3 col-xs-3">
                
                    {this.props.Access("1") &&(
                      <Link
                        to={`${process.env.PUBLIC_URL}/usuarios/modificar/${item.ID_USUARIO}`}
                        className="btn btn-warning"
                      >
                        Modificar
                      </Link>
                    )}

                    {this.props.Access("1") &&(
                      <Link
                        to={`${process.env.PUBLIC_URL}/usuarios/detalle/${item.ID_USUARIO}`}
                        className="btn btn-primary m-1"
                      >
                        Detalles
                      </Link>
                    )}

                    {this.props.Access("1")  && (
                      <button
                        onClick={() => {
                          if (window.confirm("Seguro que deseas eliminar usuario")) {
                            this.Eliminar(item.ID_USUARIO);
                          }
                        }}
                        type="button"
                        className="btn btn-danger "
                      >
                        &times; Eliminar
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Fragment>
    );
  }
}

export default Usuario;
