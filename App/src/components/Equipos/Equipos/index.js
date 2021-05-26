import React, { Component, Fragment } from "react";
import { fetchGet,fetchDelete} from "../../../utils/Fetch";
import { Link, Redirect } from "react-router-dom";

const estadoInicial = { BuscarDatos: "", data: null };

class Rol extends Component {
  constructor(props) {
    super(props);
    this.state = { data: estadoInicial };
  }

  Buscar = async () =>{
    const data = await fetchGet(`${process.env.REACT_APP_SERVER}/api/roles`);
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
    const datos = this.state.data.filter((dat) => patt.exec(dat.NOMBRE_ROL));

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



Eliminar = async (ID_ROL) => {
  const data = await fetchDelete(
    `${process.env.REACT_APP_SERVER}/api/roles/${ID_ROL}/${false}`
  );
  alert(data.message);
  const dataGet = await fetchGet(
    `${process.env.REACT_APP_SERVER}/api/roles`
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


Reactivar = async (ID_ROL) => {
  const data = await fetchDelete(
    `${process.env.REACT_APP_SERVER}/api/roles/${ID_ROL}/${true}`
  );
  alert(data.message);
 this.Inactivos();
};

Inactivos = async () => {
const data = await fetchGet(`${process.env.REACT_APP_SERVER}/api/roles/inactivo`);
this.setState({ dataFiltrada: data.data, data: data.data,estado:"Activos"  });
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
        <h1 className="text-center mb-5">Rol</h1>
        <form class="form-inline " onSubmit={this.BuscarDatos}>
          <label className="ml-5 mr-5">
            <strong>Nombre Rol:</strong>
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

        {this.props.Access("CrearRoles") && (
          <Link
            to={`${process.env.PUBLIC_URL}/roles/crear`}
            className="btn btn-link  ml-5 mr-5"
          >
            Crear
          </Link>
        )}
   {this.props.Access("ReactivarRoles") && (
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
              <div className="col-sm-4 col-xs-4">NOMBRE</div>
              <div className="col-sm-4 col-xs-4 d-none d-sm-block">DESCRIPCION</div>
              <div className="col-sm-4 col-xs-4">OPCIONES</div>
            </div>
            {this.state.dataFiltrada.map((item) => {
              const { ID_ROL } = item;
              return (
                <div className="row border" key={ID_ROL}>
                  <div className="col-sm-4 col-xs-4">{item.NOMBRE_ROL}</div>
                  <div className="col-sm-4 col-xs-4 d-none d-sm-block">{item.DESCRIPCION_ROL}</div>    
                  <div className="col-sm-4 col-xs-4">
                
                    {this.props.Access("ModificarRoles")  && item.ESTADO && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/roles/modificar/${item.ID_ROL}`}
                        className="btn btn-warning m-1"
                      >
                        Modificar
                      </Link>
                    )}

                    {this.props.Access("DetallesRoles")  && item.ESTADO && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/roles/detalle/${item.ID_ROL}`}
                        className="btn btn-primary m-1"
                      >
                        Detalles
                      </Link>
                    )}
                    {this.props.Access("EliminarRoles")  && item.ESTADO&& (
                      <button
                        onClick={() => {
                          if (window.confirm("Seguro que deseas el rol")) {
                            this.Eliminar(item.ID_ROL);
                          }
                        }}
                        type="button"
                        className="btn btn-danger m-1 "
                      >
                        &times; Eliminar
                      </button>
                    )}
                  {this.props.Access("ReactivarRoles")  && (item.ESTADO===false) && (
                      <button
                        onClick={() => {
                          if (window.confirm("Seguro que deseas el role")) {
                            this.Reactivar(item.ID_ROL);
                          }
                        }}
                        type="button"
                        className="btn btn-danger m-1 "
                      >
                        &times; Activar
                      </button>
                    )}
                    {this.props.Access("VerAsingar") &&   (
                        <Link
                          to={`${process.env.PUBLIC_URL}/asing/${item.ID_ROL}`}
                          className="btn btn-warning m-1"
                        >
                          Asign. Accesos
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

export default Rol;
