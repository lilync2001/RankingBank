import UsuarioService from "../services/usuario.services.js";

export default class UsuarioController {
  constructor() {
    this.usuarioService = new UsuarioService();
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const usuario = await this.usuarioService.login({ email, password });

      return res.status(200).json({
        status: true,
        usuario,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: false,
        error: error.message,
        errorStack: "" + error.originalError,
      });
    }
  }

  async actualizarContrasena(req, res) {
    try {
      const { id } = req.params;

      const { email, password, newPassword } = req.body;

      await this.usuarioService.actualizarContrasena({
        id,
        email,
        password,
        newPassword,
      });

      return res.status(200).json({
        status: true,
        message: "Contraseña actualizada correctamente",
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: false,
        error: error.message,
        errorStack: "" + error.originalError,
      });
    }
  }

  async crearUsuario(req, res) {
    try {
      const { nombre, apellido, cedula, telefono, email, password, rol } =
        req.body;
      const usuario = await this.usuarioService.crearUsuario({
        nombre,
        apellido,
        cedula,
        telefono,
        email,
        password,
        rol,
      });
      res.status(200).json({
        status: true,
        message: "Usuario creado correctamente",
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: false,
        error: error.message,
        errorStack: "" + error.originalError,
      });
    }
  }

  async obtenerUsuarioPorID(req, res) {
    try {
      const { id } = req.params;
      const usuario = await this.usuarioService.obtenerUsuarioPorID(id);
      return res.status(200).json({
        status: true,
        message: "Usuario obtenido correctamente",
        body: usuario,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: false,
        error: error.message,
        errorStack: "" + error.originalError,
      });
    }
  }
  async obtenerUsuarioPorCedula(req, res) {
    try {
      const { cedula } = req.params;
      const usuario = await this.usuarioService.obtenerUsuarioPorCedula(cedula);

      if (!usuario) {
        return res.status(404).json({
          status: false,
          error: "Usuario no encontrado con la cédula especificada",
          errorStack: "",
        });
      }

      return res.status(200).json({
        status: true,
        message: "Usuario obtenido correctamente",
        body: usuario,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: false,
        error: error.message,
        errorStack: "" + error.originalError,
      });
    }
  }

  async obtenerUsuarios(req, res) {
    try {
      const usuarios = await this.usuarioService.obtenerUsuarios();
      return res.status(200).json({
        status: true,
        message: "Usuarios obtenidos correctamente",
        body: usuarios,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: false,
        error: error.message,
        errorStack: "" + error.originalError,
      });
    }
  }

  async actualizarUsuario(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;

      const usuario = await this.usuarioService.obtenerUsuarioPorID(id);
      body.usuarioID = usuario.usuarioID;
      await this.usuarioService.actualizarUsuario(body);
      res.status(200).json({
        status: true,
        message: "Usuario actualizado correctamente",
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: false,
        error: error.message,
        errorStack: "" + error.originalError,
      });
    }
  }

  async eliminarUsuario(req, res) {
    try {
      const { id } = req.params;
      await this.usuarioService.eliminarUsuario(id);
      res.status(200).json({
        status: true,
        message: "Usuario eliminado correctamente",
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: false,
        error: error.message,
        errorStack: "" + error.originalError,
      });
    }
  }
}