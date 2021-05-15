import React, { Component, Fragment } from "react";
import { fetchGet, fetchDelete } from "../../../utils/Fetch";
import { Link, Redirect } from "react-router-dom";

const estadoInicial = { BuscarDatos: "", data: null,};

class Acceso extends Component {
  constructor(props) {
    super(props);
    this.state = { data: estadoInicial };
  }

  Buscar = async () =>{
    const data = await fetchGet(`${process.env.REACT_APP_SERVER}/api/acceso`);
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
    const datos = this.state.data.filter((dat) => patt.exec(dat.NOMBRE_ACCESO));

    this.setState({
      dataFiltrada: datos,
    });
  };

  Eliminar = async (ID_ACCESO) => {
    const data = await fetchDelete(
      `${process.env.REACT_APP_SERVER}/api/acceso/${ID_ACCESO}/${false}`
    );
    alert(data.message);
    const dataGet = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/acceso`
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


  Reactivar = async (ID_ACCESO) => {
    const data = await fetchDelete(
      `${process.env.REACT_APP_SERVER}/api/acceso/${ID_ACCESO}/${true}`
    );
    alert(data.message);
   this.Inactivos();
  };

  Inactivos = async () => {
  const data = await fetchGet(`${process.env.REACT_APP_SERVER}/api/acceso/inactivo`);
  this.setState({ dataFiltrada: data.data, data: data.data,estado:"Activos"  });
};



cambioEstado = (e) => {
  const { name, value } = e.target;
  this.setState({
    [name]: value,
  });
};

  render() {
    const redireccion = this.props.Access("VerAccesos") ? (
      ""
    ) : (
      <Redirect to="/login" />
    );

    return (
      <Fragment>
        {redireccion}
        <h1 className="text-center mb-5">Acessos</h1>
        <form class="form-inline " onSubmit={this.BuscarDatos}>
          <label className="ml-5 mr-5">
            <strong>Nombre Acceso:</strong>
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

        {this.props.Access("CrearAccesos") && (
          <Link
            to={`${process.env.PUBLIC_URL}/acceso/crear`}
            className="btn btn-link  ml-5 mr-5"
          >
            Crear
          </Link>
        )}

        {this.props.Access("ReactivarAccesos") && (
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
              <div className="col-md-4 col-sm-12 col-xs-4">NOMBRE</div>
              <div className="col-md-4  d-none  d-sm-block ">DESCRIPCION</div>
              <div className="col-md-4   d-none  d-sm-block">OPCIONES</div>
            </div>
            {this.state.dataFiltrada.map((item) => {
              const { ID_ACCESO } = item;
              return (
                <div className="row border" key={ID_ACCESO}>
                  <div className="col-md-4 col-sm-6 col-xs-4">{item.NOMBRE_ACCESO}</div>
                  <div className="col-md-4  d-none  d-sm-block ">{item.DESCRIPCION_ACCESO}</div>
                  
                  <div className="col-md-4 col-sm-6 col-xs-4 ">
                
                    {this.props.Access("ModificarAccesos") && item.ESTADO && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/acceso/modificar/${item.ID_ACCESO}`}
                        className="btn btn-warning m-1"
                      >
                        Modificar
                      </Link>
                    )}

                    {this.props.Access("DetallesAccesos")  && item.ESTADO && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/acceso/detalle/${item.ID_ACCESO}`}
                        className="btn btn-primary m-1"
                      >
                        Detalles
                      </Link>
                    )}

                    {this.props.Access("EliminarAccesos")  && item.ESTADO&& (
                      <button
                        onClick={() => {
                          if (window.confirm("Seguro que deseas eliminar acceso")) {
                            this.Eliminar(item.ID_ACCESO);
                          }
                        }}
                        type="button"
                        className="btn btn-danger m-1 "
                      >
                        &times; Eliminar
                      </button>
                    )}

                    {this.props.Access("ReactivarAccesos")  && !item.ESTADO && (
                      <button
                        onClick={() => {
                          if (window.confirm("Seguro que deseas el piloto")) {
                            this.Reactivar(item.ID_ACCESO);
                          }
                        }}
                        type="button"
                        className="btn btn-danger m-1 "
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

export default Acceso;
