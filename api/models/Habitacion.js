
const mongoose = require('mongoose');

const imagenSchema = new mongoose.Schema({
  url: { type: String, required: true },
  // Otros campos relacionados con la imagen si es necesario
});

const habitacionSchema = new mongoose.Schema({
  numero: { type: Number, required: true },
  tipo: { type: String, required: true },
  precio: { type: Number, required: true },
  disponible: { type: Boolean, default: true },
  descripción: { type: String },
  imagenes: [imagenSchema]
});

const Habitacion = mongoose.model('Habitacion', habitacionSchema);


module.exports =  Habitacion;





// db.Habitaciones.insertOne({
//   numero: 101,
//   tipo: "individual",
//   precio: 100,
//   disponible: true
// })

// db.Habitaciones.insertOne({
//   numero: 201,
//   tipo: "doble",
//   precio: 150,
//   disponible: true
// })

// // Agregar más documentos de habitaciones según sea necesario
// db.createCollection("Reservaciones")

// db.Reservaciones.insertOne({
//   habitacionId: ObjectId("ID_DE_HABITACION"),
//   fechaInicio: ISODate("2023-06-01"),
//   fechaFin: ISODate("2023-06-05"),
//   huesped: {
//     nombre: "Juan Perez",
//     direccion: "Calle Principal 123",
//     telefono: "555-1234"
//   }
// })

// Agregar más documentos de reservaciones según sea necesario