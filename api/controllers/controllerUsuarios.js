const auth = require('../config/firebase');
const Usuario= require('../models/Usuario');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongoose').Types;
const { sendWelcomeEmail,sugerenciaCliente } = require("../config/sendgridEmail.js");
const jwt= require('jsonwebtoken');
require('dotenv').config();

const postRegistro =  async (req, res) => {
    try {
      const { correo, contraseña, telefono, nombre,activo } = req.body;
      if (!correo || !contraseña || !telefono || !nombre) {
  return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
      }
      // const userRecord = await auth.createUser({
      //   correo,
      //   contraseña
      //   });
       
   // Verificar si el correo ya existe en la base de datos
   const usuarioExistente = await Usuario.findOne({ correo });
   if (usuarioExistente) {
     return res.status(400).json({ mensaje: 'El correo ya está registrado' });
   }
   // Crear documento de usuario en tu base de datos propia
       const saltRounds = 10;
       const hash = await bcrypt.hash(contraseña, saltRounds);
       const nuevoUsuario = new Usuario({
         nombre,
         correo,
         telefono,
         activo,
         contraseña: hash
       });
      await sendWelcomeEmail(correo, nombre);
      await nuevoUsuario.save();
  
      res.status(200).json({ mensaje: 'Usuario registrado exitosamente' });
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).json({ mensaje: 'Error al registrar usuario' });
    }
  }

const  postLogin= async (req, res) => {
    try {
      const { correo, contraseña } = req.body;
      const usuario = await Usuario.findOne({ correo });
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
}
      const match = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!match) {
          return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }    else {
      const token = jwt.sign({ id: usuario._id }, process.env.SECRET_KEY, {
              expiresIn: '8 days'
            });
                 
          return res.status(200).json({ mensaje: 'Inicio de sesión exitoso',usuario: usuario.nombre,token }); 
}

      // const userRecord = await auth.signInWithEmailAndPassword(correo, contraseña);
      // res.status(200).json({ mensaje: 'Inicio de sesión exitoso' });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ mensaje: 'Error al iniciar sesión' });
    }
  }

  const putUsuario =async (req, res) => {
    
      const { id } = req.params;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ mensaje: 'ID de usuario inválido' });
      }
      const { correo, contraseña, telefono, nombre, activo } = req.body;
  
      // if (!correo || !contraseña || !telefono || !nombre) {
      //   return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
      // }
  
      const usuarioActualizado = {
        nombre,
        correo,
        telefono,
        activo,
        image:[]
      };

      if (req.files) {
        for (const key of Object.keys(req.files)) {
          const file = req.files[key];
          const result = await usuarioImage(file.tempFilePath);
          usuarioActualizado.image.push(result.secure_url);
          await fs.unlink(file.tempFilePath);
        }
      }
       
      // Actualizar el documento de usuario en tu base de datos propia
     try { 
      await Usuario.findByIdAndUpdate(id, usuarioActualizado);
  
      res.status(200).json({ mensaje: 'Usuario actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(500).json({ mensaje: 'Error al actualizar usuario en la base de datos' });
    }
  };
  const getUsuario=async (req, res) => {
    try {
      const { correo } = req.body;
     
      // Obtener el documento de usuario en tu base de datos propia por su ID
      const usuario = await Usuario.findOne({ correo }).select('-contraseña');
  
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
  
      res.json(usuario);
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      res.status(500).json({ mensaje: 'Error al obtener usuario' });
    }
  }
  const deleteUsuario= async (req, res) => {
    try {
      const { id } = req.params;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ mensaje: 'ID de usuario inválido' });
      }
      // Eliminar el documento de usuario en tu base de datos propia
      const usuario = await Usuario.findOneAndUpdate({_id: id, activo: true}, {activo: false});
      if (!usuario) {return res.status(404).send("El usuario no existe o ya ha sido eliminado")};
      res.status(200).json({ mensaje: 'Usuario eliminado exitosamente' });
    } catch (error) {
     
      res.status(500).json({ mensaje: 'Error al eliminar usuario' });
    }
  }

  const postNotification=async(req, res )=>{
    const {name, email, phone, subject, description}=req.body;
    try{

      await sugerenciaCliente(name, email, phone, subject, description);
      res.status(200).json({ mensaje:'Notificacion exitosa' });

      } catch(error)  {
      res.status(500).json({ mensaje:'Error no se realizo la Notificacion' });

    }
  }

  const getUsuarioByCorreo = async (req,res) => {
    const {correo} = req.params;
    
    try {
      let usuario = await Usuario.findOne({correo:correo,activo:true});
      if (!usuario) {return res.status(400).send("El usuario no existe")};
            
      return res.status(200).json(usuario);
  } 
  catch (error) {
      return res.status(500).send("Internal server error");
  }
  };

  module.exports={postRegistro, postLogin, deleteUsuario,getUsuario,putUsuario,postNotification,getUsuarioByCorreo};