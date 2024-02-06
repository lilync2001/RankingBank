import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:rankingapp/core/themes/colors.dart';
import 'package:rankingapp/domain/blocs/auth/auth_bloc.dart';
import 'package:rankingapp/domain/blocs/ranking/ranking_bloc.dart';
import 'package:rankingapp/view/screens/login.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider(create: (context) => AuthBloc()),
        BlocProvider(create: (context) => RankingBloc())
      ],
      child: MaterialApp(
          title: 'MetaRank App',
          theme: ThemeData(
            colorScheme: lightColorScheme,
            useMaterial3: true,
          ),
          home: const LoginScreen()),
    );
  }
}
