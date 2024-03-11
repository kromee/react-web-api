import { Avatar, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from '../../../theme/useStyles';
import ImageUploader from 'react-images-upload';
import { registraProducto } from '../../../actions/ProductoAction';

import {v4 as uuidv4} from 'uuid';


const AgregarProducto = (props) => {
    const imagenDefault = "https://tottope.vteximg.com.br/arquivos/ids/167188-1000-1000/PILIGRAM-H-1810-V07_A.png?v=636723781789170000";

    const [producto, setProducto] = React.useState({
        id:0,
        nombre:'',
        descripcion: '',
        stock:'',
        marcaId:0,
        categoriaId:0,
        precio:0.0,
        imagen:'',
        file:'',
        imagenTemporal:null

    });

    const [categoria, setCategoria] = React.useState("");

    const [marca, setMarca] = React.useState("");

    const handleCategoriaChange = (event) => {
        setCategoria(event.target.value);
    }
    const handleMarcaChange = (event) => {
        setMarca(event.target.value);
    }

    const guardarProducto = async ()=>{
        producto.categoriaId= categoria;
        producto.marcaId=marca;

        const resultado = await  registraProducto(producto);
        props.history.push("/admin/listaProductos");


    }

    const handleChange = (e) => {
        const {name, value}= e.target;
        setProducto (prev=>( {
            ...prev,
            [name]:value
        }))
    }

    const subirImagen = (imagenes) => {
        let foto = imagenes[0];

        let fotoUrl = "";
        try{
            fotoUrl = URL.createObjectURL(foto);
        }catch(e){
            console.log(e);
        }
        setProducto( (prev) => ({
            ...prev,
            file : foto,
            imagenTemporal: fotoUrl
        }))
    }

    const classes = useStyles();

    const keyImage = uuidv4();


    return (
        <Container className={classes.containermt}>
            <Grid container justify="center">
                <Grid item sm={6} xs={12}>
                    <Typography variant="h4" className={classes.text_title}>
                        AGREGAR PRODUCTO
                    </Typography>
                    <form onSubmit={(e) => e.preventDefault()} className={classes.form}>
                        <TextField 
                        label="Nombre Producto"
                        variant="outlined"
                        fullWidth
                        className={classes.gridmb}
                        InputLabelProps={{
                            shrink: true
                        }}
                        name='nombre'
                        value={producto.nombre}
                        onChange={handleChange}

                        />
                        <TextField 
                        label="Precio"
                        variant="outlined"
                        fullWidth
                        className={classes.gridmb}
                        InputLabelProps={{
                            shrink: true
                        }}
                        name='precio'
                        value={producto.precio}
                        onChange={handleChange}
                        />
                      
                        
                        <TextField 
                        label="Stock"
                        variant="outlined"
                        fullWidth
                        className={classes.gridmb}
                        InputLabelProps={{
                            shrink: true
                        }}
                        name='stock'
                        value={producto.stock}
                        onChange={handleChange}
                        />
                        <TextField 
                        label="Descripcion"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        className={classes.gridmb}
                        InputLabelProps={{
                            shrink: true
                        }}
                        name='descripcion'
                        value={producto.descripcion}
                        onChange={handleChange}
                        />
                        <FormControl className={classes.formControl}>
                        <InputLabel id="marca-select-label">Marca:</InputLabel>
                        <Select
                         labelId="marca-select-label"
                         id="marca-select"
                         value={marca}
                         onChange={handleMarcaChange}
                        >
                            <MenuItem value={1}>Nike</MenuItem>
                            <MenuItem value={2}>Adidas</MenuItem>
                            <MenuItem value={2}>Maldiva</MenuItem>
                        </Select>  
                        </FormControl>
                     
                        <FormControl className={classes.formControl}>
                        <InputLabel id="categoria-select-label">Categoría:</InputLabel>
                        <Select
                         labelId="categoria-select-label"
                         id="categoria-select"
                         value={categoria}
                         onChange={handleCategoriaChange}
                        >
                            <MenuItem value={1}>Verano</MenuItem>
                            <MenuItem value={2}>Invierno</MenuItem>
                            <MenuItem value={2}>Primavera</MenuItem>
                        </Select>  
                        </FormControl>


                        <Grid container spacing={2}>
                            <Grid item sm={6} xs={12}>
                                <ImageUploader 
                                withIcon={true}
                                singleImage={true}
                                key={keyImage}
                                buttonText="Buscar Imagen"
                                imgExtension={['.jpg', '.jpeg', '.png', '.gif']}
                                maxFileSize={5242880}
                                onChange={subirImagen}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <Avatar 
                                variant="square"
                                className={classes.avatarProducto}
                                src={
                                    producto.imagenTemporal
                                    ?producto.imagenTemporal
                                    :imagenDefault
                                }/>
                            </Grid>
                        </Grid>
                        <Button 
                        variant="contained"
                        color="primary" onClick={guardarProducto}>
                            AGREGAR
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AgregarProducto;