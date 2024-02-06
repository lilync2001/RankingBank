import 'dart:convert';

class RankingResponse {
  final List<Ranking> rankings;

  RankingResponse({
    required this.rankings,
  });

  factory RankingResponse.fromJson(String str) =>
      RankingResponse.fromMap(json.decode(str));

  String toJson() => json.encode(toMap());

  factory RankingResponse.fromMap(Map<String, dynamic> json) => RankingResponse(
        rankings:
            List<Ranking>.from(json["rankings"].map((x) => Ranking.fromMap(x))),
      );

  Map<String, dynamic> toMap() => {
        "rankings": List<dynamic>.from(rankings.map((x) => x.toMap())),
      };
}

class Ranking {
  final String nombre;
  final String montoTotalVentas;

  Ranking({
    required this.nombre,
    required this.montoTotalVentas,
  });

  factory Ranking.fromJson(String str) => Ranking.fromMap(json.decode(str));

  String toJson() => json.encode(toMap());

  factory Ranking.fromMap(Map<String, dynamic> json) => Ranking(
        nombre: json["nombre"],
        montoTotalVentas: json["montoTotalVentas"],
      );

  Map<String, dynamic> toMap() => {
        "nombre": nombre,
        "montoTotalVentas": montoTotalVentas,
      };
}
