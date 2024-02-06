import 'dart:convert';

class ErrorResponse {
  final bool status;
  final String error;
  final String errorStack;

  ErrorResponse({
    required this.status,
    required this.error,
    required this.errorStack,
  });

  factory ErrorResponse.fromJson(String str) =>
      ErrorResponse.fromMap(json.decode(str));

  String toJson() => json.encode(toMap());

  factory ErrorResponse.fromMap(Map<String, dynamic> json) => ErrorResponse(
        status: json["status"],
        error: json["error"],
        errorStack: json["errorStack"],
      );

  Map<String, dynamic> toMap() => {
        "status": status,
        "error": error,
        "errorStack": errorStack,
      };
}
