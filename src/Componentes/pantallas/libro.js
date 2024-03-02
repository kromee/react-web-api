import { Button, Card, Container, Dialog, DialogContent, DialogTitle, Divider, Grid, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useStyles from '../../theme/useStyles';
import { agregarLibro, editarLibros, eliminarLibro, listarLibros, obtenerLibroKey } from '../Data/libros';

const clearLibro = {
    categoria:'',
    titulo:'',
    autor:''
}

const Libro = () => {
    const[libro, setLibro] = useState({
        categoria:'',
        titulo:'',
        autor:''
    });

    const handleChangue = (e) =>{
        const {name, value} = e.target;
        setLibro( prev => ({
            ...prev,
            [name]:value
        }))

    }

    const guardarDatos = () => {
        agregarLibro(libro);
        setLibro(clearLibro)
    }

    const [liborsArray, setLibrosArray] = useState([])


    const listarDataLibros= () => {

        const data = listarLibros();
        setLibrosArray(data);
       // console.log("Listando libros", data);

    }

    useEffect(() => {
        listarDataLibros();
    }, [liborsArray.length])


    const abrirDialog = (key) => {
        setOpen(true);
       const dataLibro= obtenerLibroKey(key);

       setLibroEdita({
        key:key,
        categoriae: dataLibro.categoria,
        tituloe : dataLibro.titulo,
        autore: dataLibro.autor
       })

       // console.log("Mi button editar");

    }

    const eliminarDatos =(data) => {
       const nuevaListaLibros= eliminarLibro(data);
       setLibrosArray(nuevaListaLibros);
        console.log("Eliminar datos");
    }

    const [libroEdita, setLibroEdita]= useState ({
        key:0,
        categoriae:'',
        tituloe:'',
        autore:''
    })
    const handleChangueEdita = (e) => {
        const {name, value} = e.target;
        setLibroEdita( prev => ({
            ...prev,
            [name]:value
        }))
    }

    const [open, setOpen]= useState(false);
    const cerrarDialog = () => {
        setOpen(false);
    }

    const editarDatos = () => {
     const nuevaData= editarLibros(libroEdita);
        //console.log('Libro editar',nuevaData);
        cerrarDialog();
    }


    const classes = useStyles();
    return (
        <Container className={classes.containermt}>
            <Grid container justify='center'>
                <Grid item lg={7} md={8}>
                    <Card className={classes.card} align="center">
                        <Typography variant='h4'> Libros </Typography>
                        <form className={classes.form} onSubmit={(e)=> e.preventDefault()}>
                            <Grid container spacing={2}>
                                <Grid item md={12} xs={12} className={classes.gridmb}>
                                    <TextField select label="Categoría" variant='outlined' fullWidth align="left"
                                    name='categoria'
                                    value={libro.categoria}
                                    onChange={handleChangue}
                                    >
                                    <MenuItem value="Programacion"> Programación </MenuItem>
                                    <MenuItem value="Historia">Historia</MenuItem>
                                    <MenuItem value="Diseño web"> Diseño web </MenuItem>
                                    </TextField>
                                


                                </Grid>
                                    <Grid item md={6} xs={12} className={classes.gridmb}>
                                        <TextField
                                        label="Título"
                                        variant="outlined"
                                        fullWidth
                                        name='titulo'
                                        value={libro.titulo}
                                        onChange={handleChangue}
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12} className={classes.gridmb}>
                                        <TextField
                                        label="Autor"
                                        variant="outlined"
                                        fullWidth
                                        name='autor'
                                        value={libro.autor}
                                        onChange={handleChangue}
                                        />
                                    </Grid>
                                    <Grid item md={12} xs={12} className={classes.gridmb}>
                                       <Button
                                        variant="contained"
                                        fullWidth
                                        color="primary"
                                        type="submit"
                                        onClick={guardarDatos}
                                        >
                                            Guardar
                                       </Button>
                                    </Grid>
                            </Grid>
                        </form>
                    </Card>
                </Grid>
            </Grid>

            <TableContainer component={Paper} className={classes.containermt}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Categoria</TableCell>
                            <TableCell>Título</TableCell>
                            <TableCell>Autor</TableCell>
                            <TableCell align='center' colSpan={2}>Acción</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        liborsArray.map((libroObj) =>(

                            <TableRow key={libroObj.key}>
                            <TableCell>{libroObj.categoria}</TableCell>
                            <TableCell>{libroObj.titulo}</TableCell>
                            <TableCell>{libroObj.autor}</TableCell>
                            <TableCell>
                                <Button variant='contained' color='primary'
                                onClick={()=>abrirDialog(libroObj.key)}>
                                    Editar
                                </Button>
                            </TableCell>
                            <TableCell >
                                <Button variant='contained' color='secondary'
                                onClick={()=>eliminarDatos(libroObj)} >
                                    Eliminar
    
                                </Button>
                            </TableCell>
     
    
                            </TableRow>

                        ))
                    }

                     
                    </TableBody>
                </Table>

            </TableContainer>

            <Dialog open={open} onClose={cerrarDialog} maxWidth="xs" fullWidth 
            align="center">
                <DialogTitle>
                    Editar libro
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={(e)=> e.preventDefault()}>
                    <TextField select label="Categoría" 
                                    variant='outlined' 
                                    fullWidth align="left"
                                    className={classes.gridmb}
                                    name='categoriae'
                                    value={libroEdita.categoriae}
                                    onChange={handleChangueEdita} >
                                    <MenuItem value="Programacion"> Programación </MenuItem>
                                    <MenuItem value="Historia">Historia</MenuItem>
                                    <MenuItem value="Diseño web"> Diseño web </MenuItem>
                                    </TextField>

                                    <TextField
                                        label="Título"
                                        variant="outlined"
                                        fullWidth
                                        name='tituloe'
                                        className={classes.gridmb}
                                        value={libroEdita.tituloe}
                                        onChange={handleChangueEdita}
                                        />

                                        <TextField
                                        label="Autor"
                                        variant="outlined"
                                        fullWidth
                                        name='autore'
                                        className={classes.gridmb}
                                        value={libroEdita.autore}
                                        onChange={handleChangueEdita}
                                        />

                                <Button variant='contained' color='primary'
                                onClick={editarDatos} >
                                Guardar

                            </Button>

                    </form>
                </DialogContent>

            </Dialog>



        </Container>
    )
}

export default Libro;