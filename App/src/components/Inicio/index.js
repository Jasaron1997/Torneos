import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchGet } from "../../utils/Fetch";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader


// import { fetchPost } from "../../utils/Fetch";
// import Error from '../Alertas/Error';
// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";

const initialState = {
  user: "",
  password: "",
  super:[],
diesel:[],
regular:[],
datadia:null,

};

class Inicio extends Component {
  state = {
    ...initialState,
  };

  actualizarState = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  limpiarState = () => {
    this.setState({ ...initialState });
  };

  async componentDidMount() {
   
  }

  validarForm = () => {
    const { user, password } = this.state;

    const noValido = !user || !password;

    return noValido;
  };

  render() {
    // const data = [
    //   {
    //     "name": "Page A",
    //     "uv": 4000,
    //     "pv": 2400,
    //     "amt": 2400
    //   },
    //   {
    //     "name": "Page B",
    //     "uv": 3000,
    //     "pv": 1398,
    //     "amt": 2210
    //   },
    //   {
    //     "name": "Page C",
    //     "uv": 2000,
    //     "pv": 9800,
    //     "amt": 2290
    //   },
    //   {
    //     "name": "Page D",
    //     "uv": 2780,
    //     "pv": 3908,
    //     "amt": 2000
    //   },
    //   {
    //     "name": "Page E",
    //     "uv": 1890,
    //     "pv": 4800,
    //     "amt": 2181
    //   },
    //   {
    //     "name": "Page F",
    //     "uv": 2390,
    //     "pv": 3800,
    //     "amt": 2500
    //   },
    //   {
    //     "name": "Page G",
    //     "uv": 3490,
    //     "pv": 4300,
    //     "amt": 2100
    //   }
    // ]

    // const redireccion = this.props.Access("VerAcceso") ? (
    //   ""
    // ) : (
    //   <Redirect to="/login" />
    // );

    return (
      <Fragment>
        {/* {redireccion} */}
     
      </Fragment>
    );
  }
}

export default withRouter(Inicio);
