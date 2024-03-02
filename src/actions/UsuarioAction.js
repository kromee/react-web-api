import HttpCliente from '../servicios/HttpCliente';
import axios from 'axios';

const instancia = axios.create();
instancia.calcelToken = axios.CancelToken;
instancia.isCancel = axios.isCancel;


export const registrarUsuario = (usuario, dispacth) =>{
    return new Promise((resolve, rejet)=>{
        instancia.post("/api/Usuario/registrar", usuario).then (response =>{

            dispacth ({
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


export const loginUsuario = (usuario, dispacth) =>{
    return new Promise((resolve,rejet)=>{
        instancia.post("/api/Usuario/login", usuario)
       .then (response =>{
        
        dispacth({

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

export const getUsuario = (dispacth) =>{
    return new Promise((resolve,rejet)=>{
       HttpCliente.get("/api/Usuario")
       .then (response =>{

        dispacth({
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