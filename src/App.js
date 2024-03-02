import React, { useEffect, useState }  from "react";
import Login from "./Componentes/Seguridad/Login";
import { ThemeProvider } from "@material-ui/core";
import  theme from "./theme/theme";
import RegistrarUsuario from "./Componentes/Seguridad/RegistroUsuario";
import MenuAppBar from "./Componentes/Navegacion/MenuAppBar"


import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Productos from "./Componentes/pantallas/Productos";
import DetalleProducto from './Componentes/pantallas/DetalleProducto';
import CarritoCompras from './Componentes/pantallas/CarritoCompras';
import ProcesoCompra from './Componentes/pantallas/ProcesoCompra';
import OrdenCompra from "./Componentes/pantallas/OrdenCompra";
import Perfil from './Componentes/Seguridad/Perfil';
import Usuarios from './Componentes/pantallas/admin/Usuarios';
import EditarUsuario from './Componentes/pantallas/admin/EditarUsuario';
import ListaProductos from './Componentes/pantallas/admin/ListaProductos';
import AgregarProducto from './Componentes/pantallas/admin/AgregarProducto';
import EditarProducto from './Componentes/pantallas/admin/EditarProducto';
import ListaPedidos from './Componentes/pantallas/admin/ListaPedidos';
import { getUsuario } from "./actions/UsuarioAction";
import { useStateValue } from "./contexto/store";

function App() {

const [{sesionUsuario}, dispacth] = useStateValue();


const [servidorRespuesta, setServidorRespuesta] = useState(false);
  

useEffect (()=>{
    if(!servidorRespuesta){
    getUsuario(dispacth).then(response=>{
      setServidorRespuesta (true);
      console.log('estado de la sesion', response);
    })
    }
  }, [servidorRespuesta])



  return (
  <ThemeProvider theme={theme}>
    <Router>
    <MenuAppBar/>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/registrar" component={RegistrarUsuario} />
        <Route exact path="/" component={Productos} />
        <Route exact path="/detalleProducto/:id" component={DetalleProducto} />
        <Route exact path="/carrito" component={CarritoCompras} />
        <Route exact path="/procesoCompra" component={ProcesoCompra} />
          <Route exact path="/ordenCompra/:id" component={OrdenCompra} />
    
          <Route exact path="/perfil" component={Perfil} />
          <Route exact path="/admin/usuarios" component={Usuarios} />
          <Route exact path="/admin/usuario/:id" component={EditarUsuario} />
          <Route exact path="/admin/listaProductos" component={ListaProductos} />
          <Route exact path="/admin/agregarProducto" component={AgregarProducto} />
          <Route exact path="/admin/editarProducto/:id" component={EditarProducto} />
          <Route exact path="/admin/listaPedidos" component={ListaPedidos} />

      </Switch>
    </Router>
  </ThemeProvider>


  );
}

export default App;
