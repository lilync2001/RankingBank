import UsuarioService from "../errorHandling/usuario.errorhandling.js";

class UsuarioController {
  constructor() {
    this.usuarioService = new UsuarioService();
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const usuario = await this.usuarioService.login({ email, password });

      return res.status(200).json({
        status: true,
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

  async crearUsuario(req, res) {
    try {
      const { nombre, apellido, email, password, rol } = req.body;
      const usuario = await this.usuarioService.crearUsuario({
        nombre,
        apellido,
        email,
        password,
        rol,
      });
      return res.status(201).json({
        status: true,
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

  async obtenerUsuarioPorID(req, res) {
    try {
      const { id } = req.params;
      const usuario = await this.usuarioService.obtenerUsuarioPorID(id);
      return res.status(200).json({
        status: true,
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
      const usuarioActualizado = await this.usuarioService.actualizarUsuario(
        body
      );
      return res.status(200).json({
        status: true,
        body: usuarioActualizado,
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
      const usuario = await this.usuarioService.eliminarUsuario(id);
      return res.status(200).json({
        status: true,
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
}

export default UsuarioController;
