import React, {useReducer} from 'react';

import tareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import {v4} from 'uuid'

import {
    AGREGAR_TAREA,
    TAREAS_PROYECTO,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types';

const TareaState = props => {
    const initialState = {
        tareas: [
            { id:1, nombre: 'Elegir Plataforma 1', estado: true, proyectoId: 1},
            { id:2, nombre: 'Elegir Plataforma 2', estado: true, proyectoId: 2},
            { id:3, nombre: 'Elegir Plataforma 3', estado: true, proyectoId: 3},
            { id:4, nombre: 'Elegir Colores 3', estado: false, proyectoId: 3 },
            { id:5, nombre: 'Elegir Colores 2', estado: false, proyectoId: 2 },
            { id:6, nombre: 'Elegir Colores 1', estado: false, proyectoId: 1 },
            { id:7, nombre: 'Elegir Plataformas de pago 2', estado: true, proyectoId: 2 },
            { id:8, nombre: 'Elegir Plataformas de pago 1', estado: true, proyectoId: 1 },
            { id:9, nombre: 'Elegir Plataformas de pago 3', estado: true, proyectoId: 3 },
            { id:10, nombre: 'Elegir Hosting 3', estado: false, proyectoId: 3 },
            { id:11, nombre: 'Elegir Hosting 1', estado: false, proyectoId: 1 },
            { id:12, nombre: 'Elegir Hosting 2', estado: false, proyectoId: 2 },
        ],
        tareasproyecto: null,
        errortarea: false,
        tareaseleccionada: null
    }

    const [state, dispatch] = useReducer(TareaReducer, initialState);

    const obtenerTareas = proyectoId => {
        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyectoId
        })
    }
    const agregarTarea = tarea => {
        tarea.id = v4()
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        })
    }

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }
    
    const eliminarTarea = id => {
        dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        })
    }

    const cambiarEstadoTarea = tarea => {
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        })
    }

    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    const actualizarTarea = tarea => {
        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: tarea
        })
    }

    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return (
        <tareaContext.Provider
            value={{
                tareaseleccionada: state.tareaseleccionada,
                errortarea: state.errortarea,
                tareas: state.tareas,
                tareasproyecto: state.tareasproyecto,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                cambiarEstadoTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </tareaContext.Provider>
    );
}

export default TareaState;
