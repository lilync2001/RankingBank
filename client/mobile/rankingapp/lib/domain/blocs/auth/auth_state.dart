part of 'auth_bloc.dart';

@immutable
class AuthState extends Equatable {
  final Usuario? usuario;
  final String rol;
  final int usuarioId;
  final String email;
  const AuthState(
      {this.usuario, this.rol = '', this.usuarioId = 0, this.email = ''});

  AuthState copyWith(
          {Usuario? usuario, String? rol, int? usuarioId, String? email}) =>
      AuthState(
          usuario: usuario ?? this.usuario,
          rol: rol ?? this.rol,
          usuarioId: usuarioId ?? this.usuarioId,
          email: email ?? this.email);

  @override
  List<Object?> get props => [usuario, rol, usuarioId, email];
}

class AuthInitialState extends AuthState {
  const AuthInitialState() : super(rol: '', usuario: null);
}

class LoadingAuthState extends AuthState {}

class SuccessAuthState extends AuthState {}

class LogOutAuthState extends AuthState {
  const LogOutAuthState() : super(rol: '', usuario: null);
}

class FailureAuthState extends AuthState {
  const FailureAuthState({required this.error});
  final String error;
}
