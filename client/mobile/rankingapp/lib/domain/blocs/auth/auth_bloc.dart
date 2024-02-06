import 'dart:async';
import 'dart:developer' as dev;
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';
import 'package:rankingapp/data/models/login_response.dart';
import 'package:rankingapp/domain/services/auth_service.dart';
import 'package:rankingapp/domain/services/secure_storage.dart';

part 'auth_event.dart';
part 'auth_state.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  AuthBloc() : super(const AuthState()) {
    on<LoginAuthEvent>(_onLoginHandler);
    on<LogoutAuthEvent>(_onLogoutHandler);
    on<CambiarContrasenaAuthEvent>(_onCambiarContrasenaHandler);
  }

  Future<void> _onLoginHandler(
      LoginAuthEvent event, Emitter<AuthState> emit) async {
    try {
      emit(LoadingAuthState());
      final loginResponse =
          await authService.login(email: event.email, password: event.password);

      emit(state.copyWith(
          usuario: loginResponse.usuario,
          rol: loginResponse.usuario.rol,
          usuarioId: loginResponse.usuario.usuarioId,
          email: loginResponse.usuario.email));
    } catch (e) {
      emit(FailureAuthState(error: e.toString()));
    }
  }

  Future<void> _onLogoutHandler(
      LogoutAuthEvent event, Emitter<AuthState> emit) async {
    final storage = SecureStorageService();
    await storage.deleteToken();
    emit(const LogOutAuthState());
  }

  Future<void> _onCambiarContrasenaHandler(
      CambiarContrasenaAuthEvent event, Emitter<AuthState> emit) async {
    try {
      emit(LoadingAuthState());

      final resp = await authService.cambiarContrasena(
          id: event.id,
          email: event.email,
          password: event.password,
          newPassword: event.newPassword);
      if (resp.status) {
        emit(SuccessAuthState());
      } else {
        emit(FailureAuthState(error: resp.message));
      }
    } catch (e) {
      dev.log(e.toString());
      emit(FailureAuthState(error: e.toString()));
    }
  }
}
