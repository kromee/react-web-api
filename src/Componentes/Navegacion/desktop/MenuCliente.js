import React, { useState }  from "react";
import { Link } from 'react-router-dom';
import useStyles from "../../../theme/useStyles";
import { Avatar, Button, Icon, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core';
import { useStateValue } from "../../../contexto/store";

const MenuCliente = () => {

    const [{sesionUsuario}, dispacth] = useStateValue();



    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (e) =>{
        setAnchorEl(e.currentTarget);
    }
    const handleClose = ()=>{
        setAnchorEl(null);
    }

    return (
        <>
            <Button color="inherit" className={classes.buttonIcon}>
                <Link className={classes.linkAppBarDesktop} to="/carrito">
                    <Icon className={classes.mr}>shopping_cart</Icon>
                    MIS PEDIDOS
                </Link>
            </Button>
            <div>
                <Button color="inherit" className={classes.buttonIcon} onClick={handleClick}>
                    <div className={classes.linkAppBarDesktop}>
                        <Avatar alt="mi imagen"
                        className={classes.avatarPerfilAppBar}
                        src="./images/perfil.png"/> 
                        {sesionUsuario ? 
                            (sesionUsuario.autenticado ? 
                            sesionUsuario.usuario.nombre + ' '+sesionUsuario.usuario.apellido : 'Sin sesión')
                        : 'no session'}
                        <Icon> keyboard_arrow_down</Icon>
                    </div>

                </Button>
                <Menu 
                        elevation = {2}
                        anchorEl={anchorEl}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                            vertical:"bottom",
                            horizontal:"center"
                        }}
                        transformOrigin={{
                            vertical:"top",
                            horizontal:"center"
                        }}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}>
                            <MenuItem className={classes.listItem} onClick ={handleClose}>
                                <Link className={classes.linkAppBarMobile} to="/perfil">
                                    <ListItemIcon className={classes.listItemIcon}> 
                                    <Icon>person</Icon>
                                    </ListItemIcon>
                                    <ListItemText>Mi perfil</ListItemText>
                                </Link>
                            </MenuItem>

                            <MenuItem className={classes.listItem} onClick ={handleClose}>
                                <Link className={classes.linkAppBarMobile} to="/">
                                    <ListItemIcon className={classes.listItemIcon}> 
                                    <Icon>exit_to_app</Icon>
                                    </ListItemIcon>
                                    <ListItemText>Cerrar sesion</ListItemText>
                                </Link>
                            </MenuItem>

                        </Menu>
            </div>


        </>
    )
}

export default MenuCliente;

