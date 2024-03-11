import sesionCarritoCompraReducer from "./sesionCarritoCompraReducer"
import sesionUsuarioReducer from "./sesionUsuarioReducer"


export const mainReducer = ({sesionUsuario, sesionCarritoCompra}, action) =>{

    return {
        sesionUsuario: sesionUsuarioReducer(sesionUsuario, action),
      
        sesionCarritoCompra: sesionCarritoCompraReducer(sesionCarritoCompra, action)
    }
}