import React, { Fragment, useContext, useState } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {
    const [proyecto, setProyecto] = useState({
        nombre: ''
    });

    const proyectosContext = useContext(proyectoContext);
    const {
        formulario,
        errorformulario,
        mostrarFormulario,
        agregarProyecto,
        mostrarError
    } = proyectosContext;

    const { nombre } = proyecto;

    const onChangeProyecto = e => {
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }
    const onSubmitProyecto = e => {
        e.preventDefault();
        if (nombre === '') {
            mostrarError();
            return;
        }

        agregarProyecto(proyecto);
        setProyecto({
            nombre: ''
        })
    }
    const onClickFormulario = () => {
        mostrarFormulario();
    }
    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={onClickFormulario}
            >Nuevo Proyecto</button>
            {formulario ? (
                <form
                    className="formulario-nuevo-proyecto"
                    onSubmit={onSubmitProyecto}
                >
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Proyecto"
                        name="nombre"
                        value={nombre}
                        onChange={onChangeProyecto}
                    />
                    <input
                        type="submit"
                        className="btn btn-primario btn-block"
                        value="Agregar Proyecto"
                    />
                </form>
            ) : (
                null
            )}
            {errorformulario ? (<p className="mensaje error">El nombre del proyecto es obligatorio</p>) : null}
        </Fragment>
    )
}

export default NuevoProyecto
