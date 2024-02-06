part of 'auth_bloc.dart';

@immutable
abstract class AuthEvent {}

class LoginAuthEvent extends AuthEvent {
  final String email;
  final String password;
  LoginAuthEvent({required this.email, required this.password});
}

class CambiarContrasenaAuthEvent extends AuthEvent {
  final String newPassword;
  final String password;
  final int id;
  final String email;
  CambiarContrasenaAuthEvent(
      {required this.newPassword,
      required this.password,
      required this.id,
      required this.email});
}

class LogoutAuthEvent extends AuthEvent {}

class CheckAuthEvent extends AuthEvent {}
