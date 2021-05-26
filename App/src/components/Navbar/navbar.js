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
          Torneos
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
                      <Link
                        to={`${process.env.PUBLIC_URL}/usuarios`}
                        className="dropdown-item"
                      >
                      Usuarios
                      </Link>
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
                      <Link
                        to={`${process.env.PUBLIC_URL}/arbitros`}
                        className="dropdown-item"
                      >
                      arbitros
                      </Link>
                      <Link
                        to={`${process.env.PUBLIC_URL}/bloques`}
                        className="dropdown-item"
                      >
                      Bloques
                      </Link>
                      <Link
                        to={`${process.env.PUBLIC_URL}/entrenadores`}
                        className="dropdown-item"
                      >
                      entrenadores
                      </Link>
                      <Link
                        to={`${process.env.PUBLIC_URL}/MUNICIPIOS`}
                        className="dropdown-item"
                      >
                      Municipios
                      </Link>
                      <Link
                        to={`${process.env.PUBLIC_URL}/Departamentos`}
                        className="dropdown-item"
                      >
                      Departamentos
                      </Link>
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
                    Torneos
                  </button>
                  <div 
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton2"
                  >
                    {/* {this.props.Access("VerTiposDeClientes") && ( */}
                      <Link
                        to={`${process.env.PUBLIC_URL}/Torneos`}
                        className="dropdown-item"
                      >
                       Torneos
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
                    Equipos
                  </button>
                  <div 
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton3"
                  >
                      <Link
                        to={`${process.env.PUBLIC_URL}/Equipos`}
                        className="dropdown-item"
                      >
                      Equipos
                      </Link>
                    
                  </div>
                </div>
                
              </li>
              </Fragment>
          )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(navbar);
