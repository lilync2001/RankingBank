import bcrypt from "bcryptjs";  
import { generartoken } from "../utils/index.utils.js";
import UsuarioRepository from "../repositories/usuario.respository.js";
import { CustomError } from "../errors/index.error.js";

class UsuarioService {
  constructor() {
    this.usuarioRepository = new UsuarioRepository();
    //this.usuarioInsertado = new Usuario();
  }

  async crearUsuario(usuario) {
    try {
      let salt = bcrypt.genSaltSync();
      usuario.password = bcrypt.hashSync(usuario.password, salt);
      //regla de negocio para que un usuario solo tenga un unico registro
      const {cedula} = usuario
      //console.log('cedula', cedula)
      const usuarioExistente = await this.usuarioRepository.obtenerUsuarioPorCedula(cedula);
     // console.log('usuarioExistente', usuarioExistente)
      if(usuarioExistente){
        throw Error("Ya existe un usuario con el mismo número de cédula");
      }
        
      const usuarioCreado = await this.usuarioRepository.crearUsuario(usuario);
      return usuarioCreado;
    } catch (error) {
      throw new CustomError("Error servicio al crear el usuario", 500, error);
    }
  }

  async login(data) {
    const { email, password } = data;
    try {
      const usuario = await this.usuarioRepository.obtenerUsuarioPorEmail(
        email
      );

      if (!usuario) throw Error("Usuario no encontrado");

      if (!bcrypt.compareSync(password, usuario.password))
        throw Error("Crendeciales incorrectas");

      const token = await generartoken({
        usuarioID: usuario.usuarioID,
        rol: usuario.rol,
      });

      delete usuario.password;
      usuario.token = token;

      return usuario;
    } catch (error) {
      let statusCode = 500;
      if (error.message === "Usuario no encontrado") statusCode = 404;
      if (error.message === "Crendeciales incorrectas") statusCode = 400;
      throw new CustomError("Error servicio login", statusCode, error);
    }
  }
  async obtenerUsuarioPorCedula(cedula) {
    try {
      const usuario = await this.usuarioRepository.obtenerUsuarioPorCedula(cedula);
      if (!usuario) {
        return null; // Devolver null si no se encontró ningún usuario
      }
      return usuario;
    } catch (error) {
      let statusCode = 500;
      if (error instanceof Error) statusCode = 404;
      throw new CustomError(
        "Error servicio al obtener el usuario por cedula",
        statusCode,
        error
      );
    }
  }
  async obtenerUsuarioPorEmail(email) {
    try {
      const usuario = await this.usuarioRepository.obtenerUsuarioPorEmail({
        email,
      });
      return usuario;
    } catch (error) {
      let statusCode = 500;
      if (error instanceof Error) statusCode = 404;
      throw new CustomError(
        "Error servicio obtener usuario por email",
        statusCode,
        error
      );
    }
  }

  async obtenerUsuarioPorID(id) {
    try {
      const usuario = await this.usuarioRepository.obtenerUsuarioPorId(id);
      return usuario;
    } catch (error) {
      let statusCode = 500;
      if (error instanceof Error) statusCode = 404;
      throw new CustomError(
        "Error servicio al obtener el usuario por id",
        statusCode,
        error
      );
    }
  }

  async obtenerUsuarios() {
    try {
      const usuarios = await this.usuarioRepository.obtenerUsuarios();
      return usuarios;
    } catch (error) {
      throw new CustomError(
        "Error servicio  al obtener los usuarios",
        500,
        error
      );
    }
  }

  async actualizarUsuario(usuario) {
    try {
      const usuarioActualizado = await this.usuarioRepository.actualizarUsuario(
        usuario
      );
      return usuarioActualizado;
    } catch (error) {
      let statusCode = 500;
      if (error.message === "Usuario no encontrado") statusCode = 404;
      throw new CustomError(
        "Error servicio al actualizar el usuario",
        statusCode,
        error
      );
    }
  }

  async eliminarUsuario(usuarioID) {
    try {
      const usuarioaEliminar = await this.usuarioRepository.obtenerUsuarioPorId(
        usuarioID
      );
      //regla de negocio para que el administrador del sistema no pueda ser eliminado
      if(usuarioaEliminar.rol === 'ADMIN'){
        throw new Error('No se puede eliminar al usuario administrador');
      }
      const usuarioEliminado = await this.usuarioRepository.eliminarUsuario(
        usuarioID
      );
      return usuarioEliminado;
    } catch (error) {
      let statusCode = 500;
      if (error.message === "Usuario no encontrado") statusCode = 404;
      throw new CustomError(
        "Error servicio al eliminar el usuario",
        statusCode,
        error
      );
    }
  }
}

export default UsuarioService;
