import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

class navbar extends Component {
  state = {};
  UpdateState = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  cerrarsesion = async () => {
    await localStorage.removeItem("token", "");
    this.props.authenticateToken();
    this.props.history.push("/");
  };
  render() {
    return (
      <nav className=" navbar  navbar-expand-lg navbar-dark text-black-50 bg-Color-Extra sticky-top">
        <Link to={`${process.env.PUBLIC_URL}/`} className="navbar-brand">
          Smart Gas
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
         
        <ul className="navbar-nav mr-auto">
                <li className="nav-item ">
                  <Link
                    to={`${process.env.PUBLIC_URL}/`}
                    className="nav-link"
                  >
                    Inicio
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link
                    to={`${process.env.PUBLIC_URL}/login`}
                    className="nav-link"
                  >
                    Login
                  </Link>
                </li>
          {this.props.auth && (
            <Fragment>
              <li className="nav-item dropdown">
                <div className="dropdown">
                  <button
                    class="btn nav-link dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Seguridad
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    {/* {this.props.Access("VerTiposDeClientes") && ( */}
                      <Link
                        to={`${process.env.PUBLIC_URL}/acceso`}
                        className="dropdown-item"
                      >
                      Acceso
                      </Link>
                    {/* )} */}
                  {/* {this.props.Access("VerTiposDeClientes") && ( */}
                      <Link
                        to={`${process.env.PUBLIC_URL}/roles`}
                        className="dropdown-item"
                      >
                      Roles
                      </Link>
                    {/* )} */}

                    {/* {this.props.Access("VerTiposDeClientes") && ( */}
                      <Link
                        to={`${process.env.PUBLIC_URL}/usuarios`}
                        className="dropdown-item"
                      >
                      Usuarios
                      </Link>

                      <Link
                        to={`${process.env.PUBLIC_URL}/usuarios/CambioContra`}
                        className="dropdown-item"
                      >
                      Cambiar Contraseña
                      </Link>
                    {/* )} */}
                  </div>
                </div>
              </li>
              <li className="nav-item dropdown">
                <div className="dropdown">
                  <button
                    class="btn nav-link dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Catalogos
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    {/* {this.props.Access("VerTiposDeClientes") && ( */}
                      <Link
                        to={`${process.env.PUBLIC_URL}/combustible`}
                        className="dropdown-item"
                      >
                      Combustible
                      </Link>
                    {/* )} */}
                    {/* {this.props.Access("VerRoles") && ( */}
                      <Link
                        to={`${process.env.PUBLIC_URL}/estacion`}
                        className="dropdown-item"
                      >
                        Estaciones
                      </Link>
                    {/* )} */}


                    {/* <div className="dropdown-divider" /> */}
        
                    {/* <div className="dropdown-divider" /> */}
                    {/* {this.props.Access("VerAccesos") && ( */}
                      <Link
                        to={`${process.env.PUBLIC_URL}/pilotos`}
                        className="dropdown-item"
                      >
                       Pilotos
                      </Link>
                    {/* )} */}
                    {/* {this.props.Access("VerAccesos") && ( */}
                      <Link
                        to={`${process.env.PUBLIC_URL}/unidad`}
                        className="dropdown-item"
                      >
                       Unidades
                      </Link>
                    {/* )} */}
                    {/* {this.props.Access("VerAccesos") && ( */}
                      <Link
                        to={`${process.env.PUBLIC_URL}/tipounidad`}
                        className="dropdown-item"
                      >
                       Tipo Unidad
                      </Link>
                    {/* )} */}
                    {/* {this.props.Access("VerAccesos") && ( */}
                      <Link
                        to={`${process.env.PUBLIC_URL}/empresa`}
                        className="dropdown-item"
                      >
                       Empresa
                      </Link>
                    {/* )} */}

                      {/* {this.props.Access("Tarjetas") && ( */}
                      <Link
                        to={`${process.env.PUBLIC_URL}/tarjeta`}
                        className="dropdown-item"
                      >
                       Tarjeta
                      </Link>
                    {/* )} */}
                    {/* {this.props.Access("Tarjetas") && ( */}
                      <Link
                        to={`${process.env.PUBLIC_URL}/PrecioDia`}
                        className="dropdown-item"
                      >
                       Precio Combustible Dia
                      </Link>
                    {/* )} */}
                  </div>
                </div>
              
              </li>
              <li className="nav-item dropdown">
                <div className="dropdown">
                  <button
                    class="btn nav-link dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton2"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Operaciones
                  </button>
                  <div 
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton2"
                  >
                    {/* {this.props.Access("VerTiposDeClientes") && ( */}
                      <Link
                        to={`${process.env.PUBLIC_URL}/asingtarjeta`}
                        className="dropdown-item"
                      >
                       Asignacion de Tarjetas
                      </Link>
                     
                    {/* )} */}
                    {/* {this.props.Access("VerTiposDeClientes") && ( */}
                      {/* <Link
                        to={`${process.env.PUBLIC_URL}/inicio`}
                        className="dropdown-item"
                      >
                       Entrega de Tarjetas
                      </Link> */}
                    {/* )} */}
                    {/* {this.props.Access("VerRoles") && ( */}
                      <Link
                        to={`${process.env.PUBLIC_URL}/Autorizacion`}
                        className="dropdown-item"
                      >
                        Autorizaciones
                      </Link>

                
                    {/* )} */}
                    {/* <div className="dropdown-divider" /> */}

                    {/* {this.props.Access("VerAccesos") && ( */}
                      <Link
                        to={`${process.env.PUBLIC_URL}/AsignacionCombustible`}
                        className="dropdown-item"
                      >
                        Asignacion Combustible
                      </Link>
                    {/* )} */}

                    {/* {this.props.Access("VerAccesos") && ( */}
                      <Link
                        to={`${process.env.PUBLIC_URL}/ConsumoCombustible`}
                        className="dropdown-item"
                      >
                        Despacho Combustible
                      </Link>
                    {/* )} */}

                    <Link
                        to={`${process.env.PUBLIC_URL}/asingtarjetaPivote`}
                        className="dropdown-item newitem"
                      >
                       Asignacion de Tarjetas Comodin
                      </Link>
                      <Link
                        to={`${process.env.PUBLIC_URL}/AutorizacionPivote`}
                        className="dropdown-item newitem"
                      >
                        Autorizaciones Comodin
                      </Link>
                  </div>
                </div>
                
              </li>
              <li className="nav-item dropdown">
                <div className="dropdown">
                  <button
                    class="btn nav-link dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton3"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Reportes
                  </button>
                  <div 
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton3"
                  >
                    {/* {this.props.Access("VerTiposDeClientes") && ( */}
                      <Link
                        to={`${process.env.PUBLIC_URL}/Reporte_Uno`}
                        className="dropdown-item"
                      >
                       Descargar Reporte
                      </Link>
                      
                    {/* )} */}
                    <Link
                        to={`${process.env.PUBLIC_URL}/Reporte_Dos`}
                        className="dropdown-item"
                      >
                       Descargar Reporte por Estacion
                      </Link>
                      <Link
                        to={`${process.env.PUBLIC_URL}/Reporte_Tres`}
                        className="dropdown-item"
                      >
                       Descargar Reporte por Empresa
                      </Link>
                      <Link
                        to={`${process.env.PUBLIC_URL}/Reporte_Cuatro`}
                        className="dropdown-item"
                      >
                       Descargar Reporte por Empresa y Estacion
                      </Link>
                      <Link
                        to={`${process.env.PUBLIC_URL}/ReportePagos`}
                        className="dropdown-item"
                      >
                       Reportes de Pagos Faltantes
                      </Link>
                      <Link
                        to={`${process.env.PUBLIC_URL}/ReportePagosListo`}
                        className="dropdown-item"
                      >
                       Reportes de Pagos
                      </Link>
                      <Link
                        to={`${process.env.PUBLIC_URL}/ReportePagosListoDos`}
                        className="dropdown-item"
                      >
                       Reportes de Pago
                      </Link>
                      
                  </div>
                </div>
                
              </li>
              </Fragment>
          )}
          <li className="nav-item ">
                  <Link
                    to={`${process.env.PUBLIC_URL}/estadistica`}
                    className="nav-link"
                  >
                    Estaditicas
                  </Link>
                </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(navbar);
