import { Avatar, Button, Card, Container, Grid, Icon, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import useStyles from '../../theme/useStyles';

import { Link } from "react-router-dom";
import { registrarUsuario } from "../../actions/UsuarioAction";
import {useStateValue} from "../../contexto/store";


const clearUsuario ={
    nombre:'',
    apellido:'',
    email:'',
    password:'',
    username:'',
}

const RegistrarUsuario =(props)=>{

const [{sesionUsuario}, dispatch] = useStateValue();


    const [usuario, setUsuario]= useState({
        nombre:'',
        apellido:'',
        email:'',
        password:'',
        username:'',

    });


const handleChange = (e)=>{
    const {name, value}= e.target;
    setUsuario(prev=>({
        ...prev,
        [name]:value
    }))
}

const guardarUsuario=()=>{

    registrarUsuario (usuario, dispatch).then (response =>{
        console.log('Objeto del guardarUsuario ', response);
        if (response.status!=200){
            return;
        }
        props.history.push('/');
        console.log('Objeto del servidor', response);
        window.localStorage.setItem('token', response.data.token);
        
    })
}


    const classes = useStyles();
    return (
        <Container className={classes.containermt}>
            <Grid container justifyContent="center">
                <Grid item lg={6} md={8}>
                   <Card className={classes.card}>
                    <Avatar className={classes.avatar}>
                        <Icon className={classes.icon}>person-add</Icon>
                    </Avatar>
                    <Typography variant="h5" color="primary">Registro de usuario</Typography>
                   </Card>
                   <form className={classes.form} onSubmit={(e)=>e.preventDefault()}>
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={12} className={classes.gridmb}>
                                    <TextField
                                        label="Nombre"
                                        variant="outlined"
                                        name='nombre'
                                        value={usuario.nombre}
                                        onChange={handleChange}
                                        fullWidth
                                        />
                    
                            </Grid>
                            <Grid item md={6} xs={12} className={classes.gridmb}>
                                    <TextField
                                        label="Apellidos"
                                        variant="outlined"
                                        name='apellido'
                                        value={usuario.apellido}
                                        onChange={handleChange}
                                        fullWidth/>
                                
                            </Grid>
                            <Grid item md={12} xs={12} className={classes.gridmb}>
                                    <TextField
                                        label="Email"
                                        variant="outlined"
                                        fullWidth
                                        name='email'
                                        value={usuario.email}
                                        onChange={handleChange}
                                        type="email" />
                                
                            </Grid>
                            <Grid item md={12} xs={12} className={classes.gridmb}>
                                    <TextField
                                        label="Password"
                                        variant="outlined"
                                        fullWidth
                                        type="password"
                                        name='password'
                                        value={usuario.password}
                                        onChange={handleChange}
                                        />
                                
                            </Grid>
                            <Grid item md={12} xs={12} className={classes.gridmb}>
                                    <TextField
                                        label="user"
                                        variant="outlined"
                                        name='username'
                                        value={usuario.username}
                                        onChange={handleChange}
                                        fullWidth/>
                                
                            </Grid>
                            <Grid item md={12} xs={12} className={classes.gridmb}>
                                  <Button 
                                  variant="contained"
                                  fullWidth
                                  color="primary"
                                  onClick={guardarUsuario}
                                  > 
                                 
                                  Registrar
                                  </Button>
                            </Grid>
                         
                        </Grid>
                        <Link 
                        to="/login"
                        variant="body1"     className={classes.link}>
                        
                            ¿Ya tienes una cuenta?, logeate
                        </Link>
                    </form>


                </Grid>

            </Grid>
        </Container>
    );
};

export default RegistrarUsuario;