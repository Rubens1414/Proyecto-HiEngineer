const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const cron = require('node-cron'); 

const multer = require('multer');



const notificacionSchema = new Schema({
    idnotificacion: String,
    mensaje: String,
    idpeticion:String,
    destinatario: String, // El destinatario de la notificación
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
    estado: String, // Puede ser "pendiente", "visto", etc.
  });
  const Notificacion = mongoose.model('Notificaciones', notificacionSchema);
  cron.schedule('0 */2 * * *', async () => {
    try {
      const dosHorasAtras = new Date();
      dosHorasAtras.setHours(dosHorasAtras.getHours() - 2);
  
      // Elimina las notificaciones más antiguas de hace 2 horas o más
      await Notificacion.deleteMany({ fecha: { $lte: dosHorasAtras } });
  
      console.log('Notificaciones eliminadas después de 2 horas.');
    } catch (error) {
      console.error('Error al eliminar notificaciones:', error);
    }
  });
// Ruta para enviar notificaciones a un destinatario específico
router.post('/enviar-notificacion/:destinatarioId/:idpeticion', async (req, res) => {
  try {
    const { mensaje } = req.body; // Ajusta los campos según tus necesidades
    const destinatarioId = req.params.destinatarioId; // Obtiene el destinatarioId de la URL
    const idpeticion = req.params.idpeticion; // Obtiene idpeticion de la URL

    // Crea una nueva notificación
    const nuevaNotificacion = new Notificacion({
      idnotificacion: new mongoose.Types.ObjectId().toHexString(),
      mensaje,
      destinatario: destinatarioId,
      idpeticion,
      estado: 'pendiente', // Puedes establecer el estado inicial según tus necesidades
    });

    // Guarda la notificación en la base de datos
    await nuevaNotificacion.save();

    res.json({ mensaje: 'Notificación enviada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al enviar la notificación' });
  }
});

//ruta para obtener notificaciones de un usuario

router.get('/obtener-notificaciones/:destinatarioId', async (req, res) => {

  try {

    const destinatarioId = req.params.destinatarioId; // Obtiene el destinatarioId de la URL

    // Obtiene las notificaciones del destinatario
    const notificaciones = await Notificacion.find({ destinatario: destinatarioId });

    res.json(notificaciones);

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener las notificaciones' });
  }
}
);

module.exports = router;
