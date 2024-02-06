part of 'ranking_bloc.dart';

@immutable
class RankingState {
  final List<Ranking>? ranking;
  const RankingState({this.ranking});

  RankingState copyWith({List<Ranking>? ranking}) =>
      RankingState(ranking: ranking ?? this.ranking);
}

class RankingInitial extends RankingState {}

class LoadingRankingState extends RankingState {}

class SuccessRankingState extends RankingState {}

class FailureRankingState extends RankingState {
  const FailureRankingState({required this.error});
  final String error;
}
