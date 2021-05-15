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
import RolNuevo from "./components/Seguridad/Roles/RolNuevo";
import RolEditar from "./components/Seguridad/Roles/RolEditar";

//asign

import Asing from "./components/Seguridad/Asing/Asing";

//Usuarios
import Usuario from "./components/Seguridad/Usuario";
import UsuarioNuevo from "./components/Seguridad/Usuario/UsuarioNuevo";
import UsuarioEditar from "./components/Seguridad/Usuario/UsuarioEditar";

import CambioContra from "./components/Seguridad/Usuario/CambioContra";


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

    if(auth){
      auth.map((data, index) => {
        // console.log(data.NOMBRE_ACCESO,data.NOMBRE_ACCESO === acceso)
        // return data.accesses.map((acc, index_p) => {
          if (data.NOMBRE_ACCESO === acceso) {
  

            resultadoBusqueda = true;
            return true;
          } else {
            return false;
          }
        // });
      });
    }
    else{
      return false;
    }
    return !!resultadoBusqueda;
  };

  auth = (auth) => {
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
      <p>{`Bienvenido: ${this.state.auth[0].NOMBRE_USUARIO}`}</p>
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
       
          
          {/* Acceso */}
          <Route exact path={`${process.env.PUBLIC_URL}/acceso`} render={() => <Acceso Access={this.Access}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/acceso/crear`} render={() => <AccesoNuevo Access={this.Access}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/acceso/detalle/:id`} render={() => <AccesoEditar  modificar={false} Access={this.Access}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/acceso/modificar/:id`} render={() => <AccesoEditar modificar={true} Access={this.Access}/>} />
          {/*Roles */}
          <Route exact path={`${process.env.PUBLIC_URL}/roles`} render={() => <Rol Access={this.Access}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/roles/crear`} render={() => <RolNuevo Access={this.Access}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/roles/detalle/:id`} render={() => <RolEditar modificar={false} Access={this.Access}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/roles/modificar/:id`} render={() => <RolEditar modificar={true} Access={this.Access}/>} />
          {/* Asing */}
          <Route exact path={`${process.env.PUBLIC_URL}/Asing/:id`} render={() => <Asing Access={this.Access}/>} />
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
