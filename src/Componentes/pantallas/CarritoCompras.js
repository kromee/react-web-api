import { Button, CardMedia, Container, Divider, Grid, Icon, IconButton, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { productoArray } from '../Data/dataPrueba';
import useStyles from '../../theme/useStyles';



const CarritoCompras = (props)=>{
    const miArray = productoArray;
    let suma = 0;
    miArray.forEach(prod => {
        suma += prod.precio 
    });

    
    const realizarCompra = () => {
        props.history.push("/procesoCompra");
    }
    const classes = useStyles();

return (

    <Container className={classes.containermt}>
    <Typography variant="h4" className={classes.text_title}>
        CARRITO DE COMPRAS
    </Typography>
    <Grid container spacing={2}>
        <Grid item lg={9} md={8} sm={12} xs={12}>
            <TableContainer>
            <Table>
                <TableBody>
                    { miArray.map(producto => (
                    <TableRow key={producto.key}>
                        <TableCell>
                            <CardMedia 
                            className={classes.imgProductoCC}
                            image="https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_200x200-min.png"
                            title="Imagen en Carrito"
                            />
                        </TableCell>
                        <TableCell>
                            <Typography className={classes.text_detalle}>
                                {producto.titulo}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography className={classes.text_detalle}>
                                ${producto.precio}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <TextField
                            select
                            variant="outlined"
                            size="small">
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>                        
                            </TextField>
                        </TableCell>
                        <TableCell>
                            <IconButton>
                                <Icon>delete</Icon>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Grid>
        
        <Grid item lg={3} md={4} sm={6} xs={12}>
            <Paper variant="outlined" square className={classes.paperPadding}>
                <Typography variant="h6" className={classes.text_title}>
                    SUBTOTAL ({miArray.length}) PRODUCTOS
                </Typography>
                <Typography className={classes.text_title}>
                    ${Math.round(suma * 100) / 100}
                </Typography>
                <Divider className={classes.gridmb}/>
                <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={realizarCompra}
                >
                    REALIZAR COMPRA
                </Button>
            </Paper>
        </Grid>
    </Grid>
</Container>

);
};

export default CarritoCompras;

