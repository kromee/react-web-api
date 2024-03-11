import { Avatar, Card, Container, Grid, Icon, TextField, Typography, Button } from "@material-ui/core";
import React, { useState } from "react";
import useStyles from '../../theme/useStyles';

import { Link } from "react-router-dom";
import {loginUsuario} from '../../actions/UsuarioAction';
import {useStateValue} from '../../contexto/store';


const clearUsuario = {
    email:'',
    password:''
};


const Login = (props) => {
    
    const [{sesionUsuario}, dispacth] = useStateValue();
    
    const [usuario, setUsuario] = useState({
        email:'',
        password:''
    });

    const handleChange = (e)=>{
        const {name, value}=e.target;
        setUsuario(prev =>({
            ...prev,
            [name]:value
        }))
    };

    const loginEventoUsuario = ()=>{

        loginUsuario(usuario, dispacth).then(response=>{
            console.log("Respuesta ", response)
            if (response && response.status === 200){
                window.localStorage.setItem('token', response.data.token);
                console.log('Login exitoso',  response.data);
                props.history.push('/');
            }else{
                console.log('Credenciales incorrectas', response && response.data);
            }
        })
       /* const respuesta = accesoUsuario(usuario);
        uif (!respuesta.status){
            console.log('Emial y password incorrectos');
        }
        setUsuario(clearUsuario);
        console.log('Bienvenido', respuesta.miUsuario.nobre);
        */

    }

    const classes = useStyles();
    return (
    <div>
       <Container className={classes.containermt}>
        <Grid  container justifyContent="center">
            <Grid  item lg={5} md={6}>
                <Card id="cardlogin" aling="center" className= {classes.card}>
                    <Avatar className= {classes.avatar}>
                        <Icon className= {classes.icon}>person</Icon>
                    </Avatar>
                    <Typography variant="h5" color="primary" className={classes.typography}>
                        Ingrese su usuario:
                    </Typography>
                    <form className={classes.form} onSubmit={(e)=>e.preventDefault()} >
                    <Grid container spacing={2} className={classes.gridmb}>
                        <Grid item xs={12}>
                            <TextField label="Email" variant="outlined"  fullWidth type="email"
                             name="email"
                             value={usuario.email}
                            onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={12} className={classes.gridmb}>
                            <TextField label="Password" variant="outlined"  fullWidth type="password"
                            name="password"
                             value={usuario.password}
                             onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={12} className={classes.gridmb}>
                            <Button variant="contained"
                            fullWidth
                            color="primary"
                            onClick={loginEventoUsuario}
                            >Ingresar</Button>
                        </Grid>
                    </Grid>
                    <Link to="/registrar" variant="body1" className={classes.link}>¿No tienes cuenta?, Registrate</Link>
                    </form>
              
                </Card>

            </Grid>
        </Grid>
       </Container>
    </div>
    )
}

export default Login;