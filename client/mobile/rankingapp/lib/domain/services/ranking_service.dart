import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:rankingapp/core/errors/exceptions.dart';

import 'package:rankingapp/core/global/enviroments.dart';
import 'package:rankingapp/data/models/default_reponse.dart';
import 'package:rankingapp/data/models/error_response.dart';
import 'package:rankingapp/domain/services/secure_storage.dart';

class RankignService {
  final _storage = SecureStorageService();

  Future<DefaultResponse> addCredito(
      {required int id,
      required String monto,
      required String plazo,
      required String fecha}) async {
    try {
      final token = await _storage.getToken();
      if (token == null) {
        throw const APIException(message: 'No hay token', statusCode: 401);
      }
      final data = {
        'usuarioID': id,
        'monto': monto,
        'plazo': plazo,
        'fecha': fecha
      };
      final urlServer = Enviroments.getApiUrl();
      final url = Uri.parse('$urlServer/credito');
      final resp = await http.post(url,
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

final rankingService = RankignService();
