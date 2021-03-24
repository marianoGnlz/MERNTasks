import React, { useReducer } from 'react';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import { FORMULARIO_PROYECTO, OBTENER_PROYECTOS } from '../../types';



const ProyectoState = props => {

    const proyectos = [
        { id: 1, nombre: 'Tienda Virtual 1' },
        { id: 2, nombre: 'Tienda Virtual 2' },
        { id: 3, nombre: 'Tienda Virtual 3' },
    ]

    const initialState = {
        proyectos: [],
        formulario: false
    }

    const [state, dispatch] = useReducer(proyectoReducer, initialState);


    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    const obtenerProyectos = () => {
        dispatch({
            type: OBTENER_PROYECTOS,
            payload: proyectos
        })
    }


    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                mostrarFormulario,
                obtenerProyectos
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;

