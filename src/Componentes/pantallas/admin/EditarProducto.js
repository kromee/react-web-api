import {MenuItem, Avatar, Button, Container, FormControl, Grid, InputLabel, Select, TextField, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from '../../../theme/useStyles';
import ImageUploader from 'react-images-upload';
import { useEffect, useState } from 'react';

import {getProducto, actualizarProducto} from '../../../actions/ProductoAction';
import {v4 as uuidv4} from 'uuid';



const EditarProducto = (props) => {
const imagenDefault = "https://tottope.vteximg.com.br/arquivos/ids/167188-1000-1000/PILIGRAM-H-1810-V07_A.png?v=636723781789170000";
    const [producto, setProducto] =useState({
        id:0,
        nombre:'',
        descripcion:'',
        stock:0,
        marcaId:'',
        categoriaId:'',
        precio:0.0,
        imagen:'',
        file:'',
        imagenTemporal:null
    })

    const [categoria, setCategoria] = useState("");
    const [marca, setMarca] = useState("");

    const handleCategoriaChange = (event) => {
        setCategoria(event.target.value);
    }

    const handleMarcaChange = (event) => {
        setMarca(event.target.value);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProducto( (prev) => ({
            ...prev,
            [name] : value
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
    useEffect( () => {
        const id = props.match.params.id;    
        const getProductoAsync = async() => {
           const response = await getProducto(id);
           setProducto(response.data);
           setCategoria(response.data.categoriaId);
           setMarca(response.data.marcaId);
        }
        getProductoAsync();

    }, [])

    const guardarProducto =async()=>{
        producto.categoriaId=categoria;
        producto.marcaId=marca;

        const id = props.match.params.id;   
       const resultado =await actualizarProducto(id, producto );
       console.log(resultado);
       props.history.push("/admin/listaProductos");

    }
    const keyImage = uuidv4();


    const classes = useStyles();
    return (
        <Container className={classes.containermt}>
            <Grid container justify="center">
                <Grid item sm={6} xs={12}>
                    <Typography variant="h4" className={classes.text_title}>
                        EDITAR PRODUCTO
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
                        value={producto.nombre}
                        name="nombre"
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
                        value={producto.precio}
                        name="precio"
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
                        value={producto.stock}
                        name="stock"
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
                        value={producto.descripcion}
                        name="descripcion"
                        onChange={handleChange}
                        />
                        
                        <FormControl className={classes.formControl}>
                            <InputLabel id="marca-select-label"> Marca
                            </InputLabel>
                            <Select labelId="marca-select-label"
                            id="marca-select"
                            value={marca}
                            onChange={handleMarcaChange}> 
                            <MenuItem value={1}>Nike</MenuItem>
                            <MenuItem value={2}>Adidas</MenuItem>
                            <MenuItem value={3}>Maldiva</MenuItem>
                            </Select>
                        </FormControl>

                                
                        <FormControl className={classes.formControl}>
                            <InputLabel id="categoria-select-label"> Categoria
                            </InputLabel>
                            <Select labelId="categoria-select-label"
                            id="categoria-select"
                            value={categoria}
                            onChange={handleCategoriaChange}> 
                            <MenuItem value={1}>Verano</MenuItem>
                            <MenuItem value={2}>Invierno</MenuItem>
                            <MenuItem value={3}>Primavera</MenuItem>
                            </Select>
                        </FormControl>

                        <Grid container spacing={2}>
                            <Grid item sm={6} xs={12}>
                            <ImageUploader
                                singleImage={true}
                                key={keyImage}
                                withIcon={true}
                                buttonText="Buscar Imagen"
                                imgExtension={['.jpg', '.jpeg', '.png', '.gif']}
                                maxFileSize={5242880} /* bytes */
                                onChange={subirImagen}
                                />
                                
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <Avatar 
                                variant="square"
                                className={classes.avatarProducto}
                                src={
                                    producto.imagenTemporal
                                    ? producto.imagenTemporal
                                    :( producto.imagen?producto.imagen:imagenDefault)

                                   
                                    
                                    }/>
                            </Grid>
                        </Grid>
                        <Button 
                        variant="contained"
                        color="primary" 
                        onClick={guardarProducto}
                        >
                            ACTUALIZAR
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
};

export default EditarProducto;