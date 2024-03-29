
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const path = require('path');


const storage = multer.diskStorage({
  destination: 'images/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });



const eschemapeticiones = new mongoose.Schema({
  nombre: String,
  apellido: String,
  problema: [String],
  lugar: String,
  imagen: String, // Cambiar a tipo String para almacenar la ruta de la imagen en local
  descripcion: String,
  idusuario: String,
  idpeticion: String,
  idencargado: String,
  estado: { type: String, default: "Pendiente" },
  descripcion_admin: String,

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
  hora: {
    type: String,
    default: () => {
      const fechaActual = new Date();
      const horaFormateada = ("0" + fechaActual.getHours()).slice(-2) + ":" +
        ("0" + fechaActual.getMinutes()).slice(-2);
      return horaFormateada;
    }
  }
});

// Ruta para manejar la subida de imágenes
router.post('/subir_imagen', upload.single('imagen'), (req, res) => {
  // Devuelve la ruta de la imagen en local
  res.json({ imageUrl: path.join('images', req.file.originalname) });
});

const peticiones = mongoose.model('peticiones', eschemapeticiones);
module.exports = router;

//guardar peticiones
//guardar peticiones
router.post('/mandar-peticion', upload.single('imagen'), (req, res) => {
  // Guardar petición
let imagen = null;
if (req.file) {
  imagen = req.file.filename; // Obtén el nombre del archivo guardado por multer
}
const nuevapeticion = new peticiones({
  nombre: req.body.nombre,
  apellido: req.body.apellido,
  problema: req.body.problema,
  lugar: req.body.lugar,
  imagen: imagen, // Establecer la imagen o null
  descripcion: req.body.descripcion,
  descripcion_admin:'No hay descripcion',
  idusuario: req.body.idusuario,
  idpeticion: req.body.idpeticion,
  idencargado:req.body.idencargado,
});

  nuevapeticion.save()
    .then(() => {
      res.send("Peticion agregada");
    })
    .catch((err) => {
      res.send(err);
    }); 
});
  router.get('/obtener_historial_pendiente/:idusuario', (req, res) => {
    const idusuario = req.params.idusuario;
    peticiones.find({ $and: [{ idusuario: idusuario }, { estado: "Pendiente" }] })
      .then((usuario) => {
        res.send(usuario);
      })
      .catch((err) => {
        res.send(err);
      });
  });
  router.get('/obtener_historial_aceptado/:idusuario', (req, res) => {
    const idusuario = req.params.idusuario;
    peticiones.find({ $and: [{ idusuario: idusuario }, { estado: "Aceptado" }] }) 
      .then((usuario) => {
        res.send(usuario);
      })
      .catch((err) => {
        res.send(err);
      });
  });
  router.get('/obtener_historial_en_proceso/:idusuario', (req, res) => {
    const idusuario = req.params.idusuario;
    peticiones.find({ $and: [{ idusuario: idusuario }, { estado: "En proceso" }] })
      .then((usuario) => {
        res.send(usuario);
      })
      .catch((err) => {
        res.send(err);
      });
  });
  router.get('/obtener_historial_cancelado/:idusuario', (req, res) => {
    const idusuario = req.params.idusuario;
    peticiones.find({ $and: [{ idusuario: idusuario }, { estado: "Cancelado" }] })
      .then((usuario) => {
        res.send(usuario);
      })
      .catch((err) => {
        res.send(err);
      });
  });
  router.get('/obtener_historial_falsas/:idusuario', (req, res) => {
    const idusuario = req.params.idusuario;
    peticiones.find({ $and: [{ idusuario: idusuario }, { estado: "Falso" }] })
      .then((usuario) => {
        res.send(usuario);
      })
      .catch((err) => {
        res.send(err);
      });
  });

  
  router.get('/obtener_solicitudes/:idusuario', (req, res) => {
    const idusuario = req.params.idusuario;
    peticiones.find({ $and: [{ idencargado: idusuario }, { estado: "Pendiente" }] })
      .then((solicitudes) => {
        res.send(solicitudes);
      })
      .catch((err) => {
        res.send(err);
      });
  });

    
//eliminar peticiones por id
router.delete('/eliminar_peticion/:idpeticion', (req, res) => {
  peticiones.findOneAndDelete(req.params.idpeticion)
    .then(() => {
      res.send("Peticion eliminada");
    }
    )
    .catch((err) => {
      res.send(err);
    }
    );
});

//actualizar para aceptar peticiones
router.post('/aceptar_peticion/:idpeticion', (req, res) => {
  const idPeticion = req.params.idpeticion;
  const descripcionAdmin = req.body.descripcion;

  peticiones.findOneAndUpdate(
    { idpeticion: idPeticion },
    {
      estado: 'Aceptado',
      descripcion_admin: descripcionAdmin
    },
    { new: true }
  )
    .then(() => {
      res.send('Estado actualizado');
    })
    .catch(err => {
      res.send(err);
    });
});


router.get('/obtener_solicitudes_aceptadas/:idusuario', (req, res) => {
  const idusuario = req.params.idusuario;
  peticiones.find({ $and: [{ idencargado: idusuario }, { estado: "Aceptado" }] })
    .then((usuario) => {
      res.send(usuario);
    })
    .catch((err) => {
      res.send(err);
    });
});


//actualizar a estado en proceso y descripcion
router.post('/actualizar_estado_en_proceso/:idpeticion', (req, res) => {
  const idPeticion = req.params.idpeticion;
  const descripcionAdmin = req.body.descripcion;

  peticiones.findOneAndUpdate(
    { idpeticion: idPeticion },
    {
      estado: 'En proceso',
      descripcion_admin: descripcionAdmin
    },
    { new: true }
  )
    .then(() => {
      res.send('Estado actualizado');
    })
    .catch(err => {
      res.send(err);
    });
});
//obtener solicitudes en proceso
router.get('/obtener_solicitudes_en_proceso/:idusuario', (req, res) => {
  const idusuario = req.params.idusuario;
  peticiones.find({ $and: [{ idencargado: idusuario }, { estado: "En proceso" }] })
    .then((usuario) => {
      res.send(usuario);
    })
    .catch((err) => {
      res.send(err);
    });
});

//actualizar a estado  a cancelado
router.post('/actualizar_estado_cancelado/:idpeticion', (req, res) => {
  const idPeticion = req.params.idpeticion;
  const descripcionAdmin = req.body.descripcion;

  peticiones.findOneAndUpdate(
    { idpeticion: idPeticion },
    {
      estado: 'Cancelado',
      descripcion_admin: descripcionAdmin
    },
    { new: true }
  )
    .then(() => {
      res.send('Estado actualizado');
    })
    .catch(err => {
      res.send(err);
    });
}
);


//obtener solicitudes canceladas
router.get('/obtener_solicitudes_canceladas/:idusuario', (req, res) => {
  const idusuario = req.params.idusuario;
  peticiones.find({ $and: [{ idencargado: idusuario }, { estado: "Cancelado" }] })
    .then((usuario) => {
      res.send(usuario);
    })
    .catch((err) => {
      res.send(err);
    });
}
);

//actualizar a estado a false 
router.post('/actualizar_estado_false/:idpeticion', (req, res) => {
  const idPeticion = req.params.idpeticion;
  const descripcionAdmin = req.body.descripcion;

  peticiones.findOneAndUpdate(
    { idpeticion: idPeticion },
    {
      estado: 'Falso',
      descripcion_admin: descripcionAdmin
    },
    { new: true }
  )
    .then(() => {
      res.send('Estado actualizado');
    })
    .catch(err => {
      res.send(err);
    });
}
);
//obtener solicitudes falsas
router.get('/obtener_solicitudes_falsas/:idusuario', (req, res) => {
  const idusuario = req.params.idusuario;

  peticiones.find({ $and: [{ idencargado: idusuario }, { estado: "Falso" }] })
    .then((usuario) => {
      res.send(usuario);
    })
    .catch((err) => {
      res.send(err);
    });
}
);


//Eliminar peticiones por id

router.post('/eliminar_peticion/:idpeticion', (req, res) => {
  const idPeticion = req.params.idpeticion;

  peticiones.findOneAndDelete({ idpeticion: idPeticion })
    .then((deletedPeticion) => {
      if (deletedPeticion) {
        res.send('Peticion eliminada');
      } else {
        res.status(404).send('Peticion no encontrada');
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
});



