import React, { Component, Fragment } from "react";
import { fetchGet,fetchDelete, fetchPost} from "../../../utils/Fetch";
import { Link, Redirect } from "react-router-dom";

const estadoInicial = { BuscarDatos: "", data: null };

class Rol extends Component {
  constructor(props) {
    super(props);
    this.state = { data: estadoInicial };
  }

  Buscar = async () =>{
    const data = await fetchGet(`${process.env.REACT_APP_SERVER}/api/roles/all`);
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



Eliminar = async (item) => {

  await this.setState({...item})
  const data = await fetchPost(
    `${process.env.REACT_APP_SERVER}/api/roles/delete/`,this.state
  );
  alert(data.message);
  const dataGet = await fetchGet(
    `${process.env.REACT_APP_SERVER}/api/roles/all`
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

        {this.props.Access("1") && (
          <Link
            to={`${process.env.PUBLIC_URL}/roles/crear`}
            className="btn btn-link  ml-5 mr-5 text-dark"
          >
            Crear
          </Link>
        )}

        {this.state.dataFiltrada && (
             <table class="table table-hover"> 
            <thead>
              <tr>
              <td>NOMBRE</td>
              <td>NIVEL_AUTORIZACION</td>
              <td>OPCIONES</td>
              </tr>
  </thead>
  <tbody >
            {this.state.dataFiltrada.map((item) => {
              const { ID_ROL } = item;
              return (
                <tr key={ID_ROL}>
                 <td>{item.NOMBRE_ROL}</td>
                 <td>{item.NIVEL_AUTORIZACION}</td>    
                 <td>
                
                    {this.props.Access("1")  &&  (
                      <Link
                        to={`${process.env.PUBLIC_URL}/roles/modificar/${item.ID_ROL}`}
                        className="btn btn-warning m-1"
                      >
                        Modificar
                      </Link>
                    )}

                    {this.props.Access("1")  && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/roles/detalle/${item.ID_ROL}`}
                        className="btn btn-primary m-1"
                      >
                        Detalles
                      </Link>
                    )}
                    {this.props.Access("1")  && (
                      <button
                        onClick={() => {
                          if (window.confirm("Seguro que deseas el rol")) {
                            this.Eliminar(item);
                          }
                        }}
                        type="button"
                        className="btn btn-danger m-1 "
                      >
                        &times; Eliminar
                      </button>
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

export default Rol;
