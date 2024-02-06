import 'dart:async';
import 'dart:convert';
import 'dart:developer' as dev;
import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';
import 'package:rankingapp/core/global/enviroments.dart';
import 'package:rankingapp/domain/services/ranking_service.dart';
import 'package:rankingapp/domain/services/secure_storage.dart';

import 'package:socket_io_client/socket_io_client.dart' as IO;
import 'package:rankingapp/data/models/ranking_response.dart';

part 'ranking_event.dart';
part 'ranking_state.dart';

class RankingBloc extends Bloc<RankingEvent, RankingState> {
  RankingBloc() : super(RankingInitial()) {
    on<RankingEvent>((event, emit) {});
    on<GetRankingEvent>(_onGetRankingHandler);
    on<AddCreditEvent>(_onAddCreditHandler);
    on<AddEventCreditEvent>(_onAddEventCreditHandler);
  }
  late IO.Socket _socket;
  final _storage = SecureStorageService();

  void initSocket() async {
    final token = await _storage.getToken();
    final urlSocket = Enviroments.getApiSocketUrl();
    _socket = IO.io(urlSocket, <String, dynamic>{
      'transports': ['websocket'],
      'autoConnect': true,
      'forceNew': true,
      'extraHeaders': {'x-token': token}
    });

    _socket.connect();

    _socket.on('ranking', (data) {
      final rankingList = RankingResponse.fromJson(json.encode(data));
      final event = GetRankingEvent(rankingList.rankings);
      add(event);
    });
  }

  void disconnectFromSocket() {
    _socket.disconnect();
  }

  @override
  Future<void> close() {
    _socket.disconnect();
    return super.close();
  }

  Future<void> _onGetRankingHandler(
      GetRankingEvent event, Emitter<RankingState> emit) async {
    emit(state.copyWith(ranking: event.ranking));
  }

  Future<void> _onAddCreditHandler(
      AddCreditEvent event, Emitter<RankingState> emit) async {
    try {
      emit(LoadingRankingState());
      final resp = await rankingService.addCredito(
          id: event.id,
          monto: event.monto,
          plazo: event.plazo,
          fecha: event.fecha);
      if (resp.status) {
        emit(SuccessRankingState());
      } else {
        emit(FailureRankingState(error: resp.message));
      }
    } catch (e) {
      emit(FailureRankingState(error: e.toString()));
    }
  }

  Future<void> _onAddEventCreditHandler(
      AddEventCreditEvent event, Emitter<RankingState> emit) async {
    if (_socket.connected) {
      _socket.emit('sale', {});
    }
  }
}
