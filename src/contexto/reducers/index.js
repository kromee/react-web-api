import sesionUsuarioReducer from "./sesionUsuarioReducer"

export const mainReducer = ({sesionUsuario}, action) =>{
    return {
        sesionUsuario: sesionUsuarioReducer(sesionUsuario, action),
    }
}