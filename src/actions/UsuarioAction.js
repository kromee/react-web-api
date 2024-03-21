import HttpCliente from '../servicios/HttpCliente';
import axios from 'axios';
import {uploadImage} from '../firebase'

const instancia = axios.create();
instancia.calcelToken = axios.CancelToken;
instancia.isCancel = axios.isCancel;


export const getUsuarioById = (id) => {
    return new Promise( (resolve, eject) => {
        HttpCliente.get(`/api/usuario/account/${id}`)
        .then(response => {
            resolve(response);
        })
        .catch(error => {
            resolve(error.response);
        })
    });
}

export const agregarRole = (id, role, dispatch) => {
    return new Promise((resolve, eject) => {
        HttpCliente.put(`/api/usuario/role/${id}`, role)
        .then(response => {
            resolve(response);
        })
        .catch(error => {
            resolve(error.response)
        });
    })
}



export const getUsuarios = (request) => {
    return new Promise( (resolve, eject) => {
        HttpCliente.get(`/api/usuario/pagination?pageIndex=${request.pageIndex}&pageSize=${request.pageSize}&search=${request.search}`)
        .then(response => {
            resolve(response);
        })
        .catch( error => {
            resolve(error.response);
        });
    });
}



export const actualizarUsuario = async (id,usuario, dispatch) =>{

    if (usuario.file){
        const urlImagen = await uploadImage(usuario.file);
        usuario.imagen=urlImagen;
    }

    return new Promise((resolve,reject) =>{
        HttpCliente.put (`api/usuario/actualizar/${id}`,usuario)
        .then(respose=>{
            dispatch({
                type:"ACTUALIZAR_USUARIO",
                nuevoUsuario:respose.data,
                autenticado:true
            })
            resolve(respose);
        })
        .catch(error=>{
            console.log("Error al actualizar el usuario ", error)
            resolve(error.response);
        })
    })
}


export const registrarUsuario = (usuario, dispatch) =>{
 
    return new Promise((resolve, rejet)=>{


        instancia.post("/api/Usuario/registrar", usuario).then (response =>{

            dispatch ({
                type: "INICIAR_SESION",
                sesion: response.data,
                autenticado:true
            })

            resolve(response);
        })
        .catch((error)=>{
            resolve (error);
        })
    });
}


export const loginUsuario = (usuario, dispatch) =>{
    return new Promise((resolve,rejet)=>{
        instancia.post("/api/Usuario/login", usuario)
       .then (response =>{
        dispatch({
            type: "INICIAR_SESION",
            sesion: response.data,
            autenticado: true
        })
            resolve(response);
       }).catch((error)=>{  
            resolve(error.response);
       })
    });
}

export const getUsuario = (dispatch) =>{
    return new Promise((resolve,rejet)=>{
       HttpCliente.get("/api/Usuario")
       .then (response =>{

        dispatch({
            type: "INICIAR_SESION",
            sesion: response.data,
            autenticado:true
        })

            resolve(response);
       }).catch((error)=>{  
            resolve(error.response);
       })
    });
}