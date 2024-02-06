import 'dart:convert';

class LoginResponse {
  final bool status;
  final Usuario usuario;

  LoginResponse({
    required this.status,
    required this.usuario,
  });

  factory LoginResponse.fromJson(String str) =>
      LoginResponse.fromMap(json.decode(str));

  String toJson() => json.encode(toMap());

  factory LoginResponse.fromMap(Map<String, dynamic> json) => LoginResponse(
        status: json["status"],
        usuario: Usuario.fromMap(json["usuario"]),
      );

  Map<String, dynamic> toMap() => {
        "status": status,
        "usuario": usuario.toMap(),
      };
}

class Usuario {
  final int usuarioId;
  final String nombre;
  final String apellido;
  final String cedula;
  final String email;
  final String rol;
  final bool estado;
  final String token;

  Usuario({
    required this.usuarioId,
    required this.nombre,
    required this.apellido,
    required this.cedula,
    required this.email,
    required this.rol,
    required this.estado,
    required this.token,
  });

  factory Usuario.fromJson(String str) => Usuario.fromMap(json.decode(str));

  String toJson() => json.encode(toMap());

  factory Usuario.fromMap(Map<String, dynamic> json) => Usuario(
        usuarioId: json["usuarioID"],
        nombre: json["nombre"],
        apellido: json["apellido"],
        cedula: json["cedula"],
        email: json["email"],
        rol: json["rol"],
        estado: json["estado"],
        token: json["token"],
      );

  Map<String, dynamic> toMap() => {
        "usuarioID": usuarioId,
        "nombre": nombre,
        "apellido": apellido,
        "cedula": cedula,
        "email": email,
        "rol": rol,
        "estado": estado,
        "token": token,
      };
}
