import 'dart:convert';
import 'dart:developer' as dev;
import 'package:http/http.dart' as http;
import 'package:rankingapp/core/errors/exceptions.dart';
import 'package:rankingapp/core/global/enviroments.dart';
import 'package:rankingapp/data/models/default_reponse.dart';
import 'package:rankingapp/data/models/error_response.dart';
import 'package:rankingapp/data/models/login_response.dart';
import 'package:rankingapp/domain/services/secure_storage.dart';

class AuthService {
  final _storage = SecureStorageService();
  Future<LoginResponse> login(
      {required String email, required String password}) async {
    try {
      await _storage.deleteToken();
      final urlServer = Enviroments.getApiUrl();
      final data = {'email': email, 'password': password};
      final url = Uri.parse('$urlServer/auth/login');

      final resp = await http.post(url,
          body: jsonEncode(data),
          headers: {'Content-Type': 'application/json'});

      if (resp.statusCode != 200 && resp.statusCode != 201) {
        final errorResponse = ErrorResponse.fromJson(resp.body);
        final messageError =
            '${errorResponse.error} - ${errorResponse.errorStack}';
        throw APIException(message: messageError, statusCode: resp.statusCode);
      }

      final loginResponse = LoginResponse.fromJson(resp.body);
      await _storage.saveToken(loginResponse.usuario.token);
      return loginResponse;
    } on APIException {
      rethrow;
    } catch (e) {
      throw APIException(message: e.toString(), statusCode: 505);
    }
  }

  Future<DefaultResponse> cambiarContrasena(
      {required int id,
      required String email,
      required String password,
      required String newPassword}) async {
    try {
      final token = await _storage.getToken();
      dev.log(token ?? 'No hay token');
      if (token == null) {
        throw const APIException(message: 'No hay token', statusCode: 401);
      }
      final data = {
        'email': email,
        'password': password,
        'newPassword': newPassword
      };
      final urlServer = Enviroments.getApiUrl();
      final url = Uri.parse('$urlServer/usuario/password/$id');
      final resp = await http.put(url,
          headers: {'Content-Type': 'application/json', 'x-token': token},
          body: jsonEncode(data));

      if (resp.statusCode != 200 && resp.statusCode != 201) {
        final errorResponse = ErrorResponse.fromJson(resp.body);
        final messageError =
            '${errorResponse.error} - ${errorResponse.errorStack}';
        throw APIException(message: messageError, statusCode: resp.statusCode);
      }

      final defaultResponse = DefaultResponse.fromJson(resp.body);
      return defaultResponse;
    } on APIException {
      rethrow;
    } catch (e) {
      throw APIException(message: e.toString(), statusCode: 505);
    }
  }
}

final authService = AuthService();
