import { Button, Container, Icon, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React,  {useEffect, useState} from 'react';
import { getUsuarios } from '../../../actions/UsuarioAction';
import useStyles from '../../../theme/useStyles';
import {withRouter} from 'react-router-dom';




const Usuarios = (props) => {
    const [requestUsuarios, setRequestUsuarios] = useState({
        pageIndex: 1,
        pageSize: 3,
        search: ''
    });

    const [paginadorUsuarios, setPaginadorUsuarios] = useState({
        count: 0,
        pageIndex: 0,
        pageSize: 0,
        PageCount: 0,
        data: []
    });

    const handleChange = (event, value) => {
        setRequestUsuarios( (anterior) => ({
            ...anterior,
            pageIndex: value
        }));
    }

    useEffect(  () => {

        const getListaUsuarios = async () => {
            const response = await getUsuarios(requestUsuarios);
            setPaginadorUsuarios(response.data);
        }
        
        getListaUsuarios();
    }, [requestUsuarios] )


    const classes = useStyles();

    const editaUsuario = (id) => {
        props.history.push("/admin/usuario/" + id);
    }

    return (
        <Container className={classes.containermt}>
            <Typography variant="h4" className={classes.text_title}>
                USUARIOS
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>USUARIO</TableCell>
                            <TableCell>EMAIL</TableCell>
                            <TableCell>USERNAME</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                   paginadorUsuarios.data.map((usuario) => (
        <TableRow key={usuario.id}>
            <TableCell>{usuario.id}</TableCell>
            <TableCell>{usuario.nombre + ' ' + usuario.apellido}</TableCell>
            <TableCell>{usuario.email}</TableCell>
            <TableCell>{usuario.username}</TableCell>
            <TableCell>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => editaUsuario(usuario.id)}
                >
                    <Icon>edit</Icon>
                </Button>
            </TableCell>
        </TableRow>
    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination count={paginadorUsuarios.pageCount} page={paginadorUsuarios.pageIndex} onChange={handleChange} />
        </Container>
    );
};

export default withRouter(Usuarios);