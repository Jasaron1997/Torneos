import React, { Component, Fragment } from "react";
import { fetchGet, fetchDelete} from "../../../utils/Fetch";
import { Link, Redirect } from "react-router-dom";

const estadoInicial = { BuscarDatos: "", data: null,};

class Usuario extends Component {
  constructor(props) {
    super(props);
    this.state = { data: estadoInicial };
  }

  Buscar = async () =>{
    const data = await fetchGet(`${process.env.REACT_APP_SERVER}/api/usuario`);
    this.setState({ dataFiltrada: data.data, data: data.data,estado:"Re Activar" });
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
    const datos = this.state.data.filter((dat) => patt.exec(dat.NOMBRE_USUARIO));

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
    const data = await fetchDelete(
      `${process.env.REACT_APP_SERVER}/api/usuario/${ID_USUARIO}/${false}`
    );
    alert(data.message);
    const dataGet = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/usuario`
    );
    this.setState({ dataFiltrada: dataGet.data, data: dataGet.data });
  };


  ActivoReactivo =  (e) => {
    e.preventDefault();
    console.log(this.state.estado,"Re Activar")
  if(this.state.estado==="Re Activar")
{
this.Inactivos();
}
else{
  this.Buscar();
}
  };


  Reactivar = async (ID_USUARIO) => {
    const data = await fetchDelete(
      `${process.env.REACT_APP_SERVER}/api/usuario/${ID_USUARIO}/${true}`
    );
    alert(data.message);
   this.Inactivos();
  };

  Inactivos = async () => {
  const data = await fetchGet(`${process.env.REACT_APP_SERVER}/api/usuario/inactivo`);
  this.setState({ dataFiltrada: data.data, data: data.data,estado:"Activos"  });
};



  render() {
    const redireccion = this.props.Access("VerUsuarios") ? (
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

        {this.props.Access("CrearUsuarios") && (
          <Link
            to={`${process.env.PUBLIC_URL}/usuarios/crear`}
            className="btn btn-link  ml-5 mr-5"
          >
            Crear
          </Link>
        )}

        {this.props.Access("ReactivarUsuarios") && (
          <button 
          onClick={this.ActivoReactivo}
          className="btn btn-link  float-right  ml-5 mr-5">
           {
             this.state.estado
           } 

          </button>
        )}
        

        {this.state.dataFiltrada && (
          <div className="ml-5 mr-5">
            <div className="row border">
              <div className="col-md-2 col-sm-12 col-xs-2">USUARIO</div>
             {/* <div className="col-md-2  d-none  d-sm-block ">Contraseña</div> */}
              <div className="col-md-2   d-none  d-sm-block">NOMBRE</div>
              <div className="col-md-2 d-none  d-sm-block">DIRECCION</div>
              <div className="col-md-2  d-none  d-sm-block ">DPI</div>
              <div className="col-md-1   d-none  d-sm-block">TELEFONO</div>
              <div className="col-sm-3 col-xs-3">OPCIONES</div>

            </div>
            {this.state.dataFiltrada.map((item) => {
              const { ID_USUARIO } = item;
              return (
                <div className="row border" key={ID_USUARIO}>
                  <div className="col-md-2 col-sm-6 col-xs-2">{item.USUARIO_USUARIO}</div>
                  {/* <div className="col-md-2 col-sm-6 col-xs-4">{item.CONTRA_USUARIO}</div> */}
                  <div className="col-md-2 col-sm-6 col-xs-2">{item.NOMBRE_USUARIO}</div>
                  <div className="col-md-2  d-none  d-sm-block ">{item.DIRECCION_USUARIO}</div>
                  <div className="col-md-2  d-none  d-sm-block ">{item.DPI_USUARIO}</div>
                  <div className="col-md-1  d-none  d-sm-block ">{item.TELEFONO_USUARIO}</div>
                  <div className="col-sm-3 col-xs-3">
                
                    {this.props.Access("ModificarUsuarios") && item.ESTADO &&(
                      <Link
                        to={`${process.env.PUBLIC_URL}/usuarios/modificar/${item.ID_USUARIO}`}
                        className="btn btn-warning"
                      >
                        Modificar
                      </Link>
                    )}

                    {this.props.Access("DetallesUsuarios")  && item.ESTADO &&(
                      <Link
                        to={`${process.env.PUBLIC_URL}/usuarios/detalle/${item.ID_USUARIO}`}
                        className="btn btn-primary m-1"
                      >
                        Detalles
                      </Link>
                    )}

                    {this.props.Access("EliminarUsuarios")  && item.ESTADO&& (
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

                    {this.props.Access("ReactivarUsuarios")  && !item.ESTADO && (
                      <button
                        onClick={() => {
                          if (window.confirm("Seguro que deseas activar usuario")) {
                            this.Reactivar(item.ID_USUARIO);
                          }
                        }}
                        type="button"
                        className="btn btn-danger "
                      >
                        &times; Activar
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

export default Usuario;
