class Enviroments {
  static const String entorno = 'dev';
  static String apiUrl = 'https://metasrank-developer.up.railway.app/api';
  static String apiSocketUrl = 'https://metasrank-developer.up.railway.app/';
  static String devApiUrl = 'http://192.168.100.213:3001/api';
  static String devApiSocketUrl = 'http://192.168.100.213:3001/';

  static String getApiUrl() {
    return (entorno == 'dev') ? devApiUrl : apiUrl;
  }

  static String getApiSocketUrl() {
    return (entorno == 'dev') ? devApiSocketUrl : apiSocketUrl;
  }
}
