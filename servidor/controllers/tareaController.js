const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

exports.crearTarea = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const { proyecto } = req.body;
        const existeProyecto = await Proyecto.findById(proyecto);
        if (!existeProyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado.' });
        }

        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.stat(401).json({ msg: 'No autorizado.' });
        }

        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({ tarea });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error.');
    }
}

exports.obtenerTareas = async (req, res) => {
    try {
        const { proyecto } = req.query;
        const existeProyecto = await Proyecto.findById(proyecto);
        if (!existeProyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado.' });
        }

        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.stat(401).json({ msg: 'No autorizado.' });
        }

        const tareas = await Tarea.find({ proyecto }).sort({ creado: -1 });
        res.json({ tareas })
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error.');
    }
}

exports.actualizarTarea = async (req, res) => {
    try {
        const { proyecto, nombre, estado } = req.body;

        let tarea = await Tarea.findById(req.params.id);
        if (!tarea) {
            return res.stat(404).json({ msg: 'No existe esa tarea.' });
        }

        const existeProyecto = await Proyecto.findById(proyecto);

        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.stat(401).json({ msg: 'No autorizado.' });
        }

        const nuevaTarea = {};

        nuevaTarea.nombre = nombre;
        nuevaTarea.estado = estado;

        tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, { new: true });
        res.json({ tarea })


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error.');
    }
}

exports.eliminarTarea = async (req, res) => {
    try {
        const { proyecto } = req.query;

        let tarea = await Tarea.findById(req.params.id);
        if (!tarea) {
            return res.stat(404).json({ msg: 'No existe esa tarea.' });
        }

        const existeProyecto = await Proyecto.findById(proyecto);

        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.stat(401).json({ msg: 'No autorizado.' });
        }
        await Tarea.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Tarea eliminada.' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error.');
    }
}