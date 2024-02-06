import 'dart:convert';

class DefaultResponse {
  final bool status;
  final String message;

  DefaultResponse({
    required this.status,
    required this.message,
  });

  factory DefaultResponse.fromJson(String str) =>
      DefaultResponse.fromMap(json.decode(str));

  String toJson() => json.encode(toMap());

  factory DefaultResponse.fromMap(Map<String, dynamic> json) => DefaultResponse(
        status: json["status"],
        message: json["message"],
      );

  Map<String, dynamic> toMap() => {
        "status": status,
        "message": message,
      };
}
