import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecureStorageService {
  final secureStorage = const FlutterSecureStorage();
  Future<void> deleteToken() async {
    await secureStorage.delete(key: 'token');
    await secureStorage.deleteAll();
  }

  Future<String?> getToken() async {
    return await secureStorage.read(key: 'token');
  }

  Future<void> saveToken(String token) async {
    await secureStorage.write(key: 'token', value: token);
  }
}

final secureStorage = SecureStorageService();
