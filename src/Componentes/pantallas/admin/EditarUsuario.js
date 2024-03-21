import { Button, Checkbox, Container, FormControl, FormControlLabel, Grid, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useStyles from '../../../theme/useStyles';
import {useStateValue} from '../../../contexto/store';

import { agregarRole, getUsuarioById } from '../../../actions/UsuarioAction';
import {withRouter} from 'react-router-dom';
import Usuarios from './Usuarios';



const EditarUsuario = (props) => {

    const [{sesionUsuario}, dispatch] = useStateValue();

    const [usuario, setUsuario] = useState({
        nombre: '',
        apellido: '',
        email: ''
    });

    const [admin, setAdmin] = useState(false);

    const handleChange = (e) => {
        console.log(e.target.checked);
        setAdmin(e.target.checked);
    }

    useEffect( () => {
        const id = props.match.params.id;
        const getUsuarioIdAsync = async() => {
            const response = await getUsuarioById(id);
            console.log(response.data);
            setAdmin(response.data.admin);
            setUsuario(response.data);
        }

        getUsuarioIdAsync();
    }, [])


    const actualizarRoleUsuario = async (e) => {
        e.preventDefault();
        const id = props.match.params.id;
        const role = {
            nombre:  "ADMIN",
            status: admin
        };
        const response = await agregarRole(id, role, dispatch);

        if (response.status === 200){
            window.localStorage.setItem("token", response.data.token);
             props.history.push("/admin/usuarios");
        }
        else{
            dispatch({
                type: "OPEN_SNACKBAR",
                openMensaje: {
                    open: true,
                    mensaje: "No es posible agregar este role administrador"
                }
            })
        }
     }


    const classes = useStyles();
    return (
        <Container className={classes.containermt}>
            <Grid container justify="center">
                <Grid item lg={6} sm={12}>
                    <Typography variant="h4" className={classes.text_title}>
                        Editar Usuario
                    </Typography>
                    <form onSubmit={(e) => e.preventDefault()} className={classes.form}>
                        <TextField 
                        label="Nombre"
                        variant="filled"
                        value={usuario.nombre+ ' '+ usuario.apellido}
                        fullWidth
                        disabled
                        className={classes.gridmb}
                        />
                        <TextField 
                        label="Correo Electronico"
                        variant="filled"
                        value={usuario.email}
                        fullWidth
                        disabled
                        />
                        <FormControl className={classes.checkbox}>
                            <FormControlLabel 
                            control={<Checkbox color="primary"/>}
                            label="Es Administrador"
                            checked={admin}
                            onChange={handleChange}
                            />
                        </FormControl>
                        <Button
                         variant="contained"
                         color="primary"
                         onClick={actualizarRoleUsuario}
                         >
                            Actualizar
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
};

export default withRouter (EditarUsuario);