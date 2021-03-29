import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_ERROR,
    LOGIN_EXITOSO,
    CERRAR_SESION
 } from '../../types';

// eslint-disable-next-line
export default (state, action) => {
    switch(action.type) {
        case REGISTRO_EXITOSO: 
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                autenticado: true,
                mensaje: null
            }
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                mensaje: action.payload
            }
        case OBTENER_USUARIO: 
            return {
                ...state,
                usuario: action.payload
            }
        case LOGIN_EXITOSO: 
            return {
                ...state,
            }
        case CERRAR_SESION: 
            return {
                ...state,
            }
        default:
            return state;
    }
}