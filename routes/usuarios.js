const express = require("express");
const router = express.Router();

const Usuario = require("../models/usuario");

router.get("/usuarios", async (req, res) => {
  let usuarios = await Usuario.find()
    .then((todosLosUsuarios) => {
      return todosLosUsuarios;
    })
    .catch((error) => {
      console.log(error);
    });
  res.send(usuarios);
});

router.get("/usuario/:id", async (req, res) => {
  let idUsuario = req.params.id;
  let usuario = await Usuario.findById(idUsuario).then(
      (usuarioEncontrado) => {
    return usuarioEncontrado;
  }
  );
  res.send(usuario);
});

router.post("/nuevoUsuario", async (req, res) => {
  let nombreUsuario = req.body.nombre;
  let idUsuario = req.params.id;
  let edadUsuario = req.body.usuario;
  let emailUsuario = req.body.email;
  let passwordUsuario = req.body.password;
  let ciudadUsuario = req.body.ciudad;
  let razasFavoritasUsuario = req.body.razasFavoritas;
  let interesUsuario = req.body.interesEnAdoptar;
  let usuarioCreado = await Usuario.create({
    nombre: nombreUsuario,
    _id: idUsuario,
    edad: edadUsuario,
    email: emailUsuario,
    password: passwordUsuario,
    ciudad: ciudadUsuario,
    razasFavoritas: razasFavoritasUsuario,
    interesEnAdoptar: interesUsuario,
  })
    .then((nuevoUsuario) => {
      console.log(nuevoUsuario);
      return nuevoUsuario;
    })
    .catch((error) => {
      console.log(error);
    });
  res.send(usuarioCreado);
});

router.put("/actualizarUsuario/:id", async (req, res) => {
  let nombreUsuario = req.body.nombre;
  let idUsuario = req.params.id;
  let edadUsuario = req.body.usuario;
  let emailUsuario = req.body.email;
  let passwordUsuario = req.body.password;
  let ciudadUsuario = req.body.ciudad;
  let razasFavoritasUsuario = req.body.razasFavoritas;
  let interesUsuario = req.body.interesEnAdoptar;
  Usuario.findByIdAndUpdate(idUsuario, {
    nombre: nombreUsuario,
    _id: idUsuario,
    edad: edadUsuario,
    email: emailUsuario,
    password: passwordUsuario,
    ciudad: ciudadUsuario,
    razasFavoritas: razasFavoritasUsuario,
    interesEnAdoptar: interesUsuario,
  })
    .then((usuarioActualizado) => {
      res.redirect(`/usuario/${usuarioActualizado._id}`);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.delete("/borrarUsuario/:id", (req, res) => {
  let nuevoIdUsuario = req.params.id;
  Usuario.findByIdAndDelete(nuevoIdUsuario).then((usuarioBorrado) => {
    res.redirect("/perros");
  });
});

module.exports = router;
