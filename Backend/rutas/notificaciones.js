const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cron = require('node-cron');
const multer = require('multer');

const notificacionSchema = new Schema({
  idnotificacion: String,
  mensaje: String,
  idpeticion: String,
  destinatario: String,
  fecha: {
    type: String,
    default: () => {
      const fechaActual = new Date();
      const fechaFormateada = ("0" + fechaActual.getDate()).slice(-2) + "/" +
        ("0" + (fechaActual.getMonth() + 1)).slice(-2) + "/" +
        fechaActual.getFullYear().toString().slice(-2);
      return fechaFormateada;
    }
  },
  estado: String,
});

const Notificacion = mongoose.model('Notificaciones', notificacionSchema);

// Programar la tarea de limpieza
cron.schedule('0 */2 * * *', async () => {
  try {
    const dosHorasAtras = new Date();
    dosHorasAtras.setHours(dosHorasAtras.getHours() - 2);

    await Notificacion.deleteMany({ fecha: { $lte: dosHorasAtras } });

    console.log('Notificaciones eliminadas después de 2 horas.');
  } catch (error) {
    console.error('Error al eliminar notificaciones:', error);
  }
});

router.post('/enviar-notificacion/:destinatarioId/:idpeticion', async (req, res) => {
  try {
    const { mensaje } = req.body;
    const destinatarioId = req.params.destinatarioId;
    const idpeticion = req.params.idpeticion;

    const nuevaNotificacion = new Notificacion({
      idnotificacion: new mongoose.Types.ObjectId().toHexString(),
      mensaje,
      destinatario: destinatarioId,
      idpeticion,
      estado: 'pendiente',
    });

    await nuevaNotificacion.save();

    res.json({ mensaje: 'Notificación enviada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al enviar la notificación' });
  }
});

router.get('/obtener-notificaciones/:destinatarioId', async (req, res) => {
  try {
    const destinatarioId = req.params.destinatarioId;

    const notificaciones = await Notificacion.find({ destinatario: destinatarioId });

    res.json(notificaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener las notificaciones' });
  }
});

module.exports = router;
