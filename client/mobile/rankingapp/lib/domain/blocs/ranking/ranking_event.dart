part of 'ranking_bloc.dart';

@immutable
abstract class RankingEvent {}

class GetRankingEvent extends RankingEvent {
  final List<Ranking> ranking;
  GetRankingEvent(this.ranking);
}

class AddCreditEvent extends RankingEvent {
  final String monto;
  final String plazo;
  final String fecha;
  final int id;
  AddCreditEvent(this.monto, this.plazo, this.fecha, this.id);
}

class AddEventCreditEvent extends RankingEvent {}
