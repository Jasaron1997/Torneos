import React, { Component, Fragment } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { fetchPost } from "./utils/Fetch";

import Login from "./components/Login";
import Navbar from "./components/Navbar/navbar";
import Inicio from "./components/Inicio";


//roles
import Rol from "./components/Seguridad/Roles";
import RolNuevo from "./components/Seguridad/Roles/Nuevo";
import RolEditar from "./components/Seguridad/Roles/Editar";

//asign

import Asing from "./components/Seguridad/Asing/Asing";

//Usuarios
import Usuario from "./components/Seguridad/Usuario";
import UsuarioNuevo from "./components/Seguridad/Usuario/UsuarioNuevo";
import UsuarioEditar from "./components/Seguridad/Usuario/UsuarioEditar";
import CambioContra from "./components/Seguridad/Usuario/CambioContra";

//catalogos
import Arbitros from "./components/Catalogos/Arbitros";
import ArbitrosEditar from "./components/Catalogos/Arbitros/Editar";
import ArbitrosNuevo from "./components/Catalogos/Arbitros/Nuevo";
import Bloques from "./components/Catalogos/Bloques";
import BloquesEditar from "./components/Catalogos/Bloques/Editar";
import BloquesNuevo from "./components/Catalogos/Bloques/Nuevo";
import Departamentos from "./components/Catalogos/Departamentos";
import DepartamentosEditar from "./components/Catalogos/Departamentos/Editar";
import DepartamentosNuevo from "./components/Catalogos/Departamentos/Nuevo";
import Entrenadores from "./components/Catalogos/Entrenadores";
import EntrenadoresEditar from "./components/Catalogos/Entrenadores/Editar";
import EntrenadoresNuevo from "./components/Catalogos/Entrenadores/Nuevo";
import Jugadores from "./components/Catalogos/Jugadores";
import JugadoresEditar from "./components/Catalogos/Jugadores/Editar";
import JugadoresNuevo from "./components/Catalogos/Jugadores/Nuevo";
import Municipios from "./components/Catalogos/Municipios";
import MunicipiosEditar from "./components/Catalogos/Municipios/Editar";
import MunicipiosNuevo from "./components/Catalogos/Municipios/Nuevo";

//equipos
import Equipos from "./components/Equipos/Equipos";
import EquiposEditar from "./components/Equipos/Equipos/Editar";
import EquiposNuevo from "./components/Equipos/Equipos/Nuevo";
import JugadoresPorEquipo from "./components/Equipos/JugadoresPorEquipo";
import JugadoresPorEquipoEditar from "./components/Equipos/JugadoresPorEquipo/Editar";
import JugadoresPorEquipoNuevo from "./components/Equipos/JugadoresPorEquipo/Nuevo";

//Torneos
import Torneos from "./components/Torneos/Torneos";
import TorneosEditar from "./components/Torneos/Torneos/Editar";
import TorneosNuevo from "./components/Torneos/Torneos/Nuevo";
import Partidos from "./components/Torneos/Partidos";
import PartidosEditar from "./components/Torneos/Partidos/Editar";
import PartidosNuevo from "./components/Torneos/Partidos/Nuevo";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { auth: false };
  }

  async componentDidMount() {
    await this.authenticateToken();
  }

  authenticateToken = async () => {
    const data = await fetchPost(
      `${process.env.REACT_APP_SERVER}/api/authenticateToken`,
      this.state
    );


if(data)
   { 
     this.auth(data.data);}
   else{
    this.auth(false);
   }
  };

  Access = (acceso) => {
    const { auth  } = this.state;
    // console.log('auth',auth)
    let resultadoBusqueda;
return true;
    // if(auth){
    //   auth.map((data, index) => {
    //       if (data.NOMBRE_ACCESO === acceso) {
  

    //         resultadoBusqueda = true;
    //         return true;
    //       } else {
    //         return false;
    //       }
    //   });
    // }
    // else{
    //   return false;
    // }
    // return !!resultadoBusqueda;
  };

  auth = (auth) => {
    auth[0].NOMBRE_COMPLETO=auth[0].NOMBRE1+" "+auth[0].NOMBRE2+" "+auth[0].APELLIDO1+" "+auth[0].APELLIDO2
    
    this.setState({
      auth,
    });
  };

  cerrarsesion = async () => {
    await localStorage.removeItem("token", "");
    this.authenticateToken();

  };

  render() {
    const mensaje = this.state.auth ? (
      <Fragment> 
      <p>{`Bienvenido: ${this.state.auth[0].NOMBRE_COMPLETO}`}</p>
      <button className="btn btn-light" onClick={this.cerrarsesion}>Cerrar Sesion</button>
</Fragment>
      // `Bienvenido: Prueba de login`
    ) : (
      <Redirect to="/" />
    );

    return (
      <Router>
    
          {/* {this.authenticateToken()} */}
          <Navbar auth={this.state.auth} authenticateToken={this.authenticateToken}   Access={this.Access}/>
          <header className=" container-fluid App-header ">
          <p className="text-right">{mensaje}</p>
          <Switch>
          <Route exact path={`${process.env.PUBLIC_URL}/`} render={() => <Inicio auth={this.auth}   Access={this.Access}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/login`} render={() => <Login auth={this.auth}   Access={this.Access}/>} />
       
          
          {/*Usuario*/}
          <Route exact path={`${process.env.PUBLIC_URL}/usuarios`} render={() => <Usuario Access={this.Access}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/usuarios/crear`} render={() => <UsuarioNuevo Access={this.Access} auth={this.state.auth}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/usuarios/detalle/:id`} render={() => <UsuarioEditar modificar={false} Access={this.Access}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/usuarios/modificar/:id`} render={() => <UsuarioEditar modificar={true} Access={this.Access}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/usuarios/CambioContra`} render={() => <CambioContra modificar={true} Access={this.Access} auth={this.state.auth}/>} />

         </Switch>
        </header>
      </Router>
    );
  }
}

export default App;
