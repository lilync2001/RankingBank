import { Usuario as UsuarioModel } from "../models/usuarios/usuario.model.js";

class UsuarioRepository {
  async crearUsuario(usuario) {
    try {
      const usuarioCreado = await UsuarioModel.create(usuario);
      return {
        usuarioID: usuarioCreado.usuarioID,
        nombre: usuarioCreado.nombre,
        apellido: usuarioCreado.apellido,
        cedula: usuarioCreado.cedula,
        telefono: usuarioCreado.telefono,
        email: usuarioCreado.email,
        rol: usuarioCreado.rol,
        estado: usuarioCreado.estado,
      };
    } catch (error) {
      throw error;
    }
  }

  async obtenerUsuarioPorEmail(email) {
    try {
      const usuario = await UsuarioModel.findOne({
        where: {
          email,
        },
      });
      if (!usuario) throw Error("Usuario no encontrado");
      return {
        usuarioID: usuario.usuarioID,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        cedula: usuario.cedula,
        email: usuario.email,
        password: usuario.password,
        rol: usuario.rol,
        estado: usuario.estado,
      };
    } catch (error) {
      throw error;
    }
  }

  async obtenerUsuarioPorId(id) {
    try {
      const usuario = await UsuarioModel.findOne({
        where: {
          usuarioID: id,
        },
        attributes: {
          exclude: ["password"],
        },
      });
      if (!usuario) throw Error("Usuario no encontrado");
      return {
        usuarioID: usuario.usuarioID,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        cedula: usuario.cedula,
        email: usuario.email,
        rol: usuario.rol,
        estado: usuario.estado,
      };
    } catch (error) {
      throw error;
    }
  }

  async obtenerUsuarioPorCedula(cedula) {
    try {
      const usuario = await UsuarioModel.findOne({
        where: {
          cedula: cedula,
        },
      });
      if (!usuario) return null; //throw Error("Usuario no encontrado");
      return {
        usuarioID: usuario.usuarioID,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        cedula: usuario.cedula,
        email: usuario.email,
        rol: usuario.rol,
        estado: usuario.estado,
      };
    } catch (error) {
      throw error;
    }
  }

  async obtenerUsuarios() {
    try {
      const usuarios = await UsuarioModel.findAll();
      return usuarios.map((usuario) => {
        return {
          usuarioID: usuario.usuarioID,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          cedula: usuario.cedula,
          email: usuario.email,
          rol: usuario.rol,
          estado: usuario.estado,
        };
      });
    } catch (error) {
      throw error;
    }
  }

  async actualizarUsuario(body, id) {
    try {
      const usuarioActualizado = await UsuarioModel.update(body, {
        where: {
          usuarioID: id,
        },
      });
      if (usuarioActualizado[0] === 0) throw Error("Usuario no encontrado");
      return "Usuario actualizado correctamente";
    } catch (error) {
      throw error;
    }
  }

  async eliminarUsuario(usuarioID) {
    try {
      const usuarioEliminado = await UsuarioModel.destroy({
        where: {
          usuarioID,
        },
      });
      if (!usuarioEliminado) throw Error("Usuario no encontrado");
      return usuarioEliminado;
    } catch (error) {
      throw error;
    }
  }
}

export default UsuarioRepository;