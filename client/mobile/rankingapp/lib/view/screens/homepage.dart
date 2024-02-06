import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:rankingapp/core/common/components/animation_route.dart';
import 'package:rankingapp/core/common/components/text_custom.dart';
import 'package:rankingapp/data/models/ranking_response.dart';
import 'package:rankingapp/domain/blocs/auth/auth_bloc.dart';
import 'package:rankingapp/domain/blocs/ranking/ranking_bloc.dart';
import 'package:rankingapp/view/widgets/form_credito.dart';
import 'package:rankingapp/view/widgets/form_password.dart';

class HomePageScreen extends StatefulWidget {
  const HomePageScreen({super.key});

  @override
  State<HomePageScreen> createState() => _HomePageScreenState();
}

class _HomePageScreenState extends State<HomePageScreen> {
  late RankingBloc _rankingBloc;
  @override
  void initState() {
    _rankingBloc = BlocProvider.of<RankingBloc>(context);
    _rankingBloc.initSocket();
    super.initState();
  }

  @override
  void dispose() {
    _rankingBloc.disconnectFromSocket();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).colorScheme;
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        title: const Text('MetaRank App'),
      ),
      body: BlocBuilder<RankingBloc, RankingState>(
        builder: (_, state) {
          if (state.ranking == null || state.ranking!.isEmpty) {
            return const Center(
              child: TextCustom(
                text: 'No hay Ranking disponible',
                color: Colors.red,
                fontSize: 17,
              ),
            );
          }
          return _ListarProductos(listProducto: state.ranking!);
        },
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: colors.primary,
        onPressed: () {
          Navigator.push(
              context, routeTransition(page: const AgregarCredito()));
        },
        child: const Icon(Icons.add),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      bottomNavigationBar: const _BottomAppBar(),
    );
  }
}

class _BottomAppBar extends StatelessWidget {
  const _BottomAppBar();

  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).colorScheme;
    return BottomAppBar(
        color: colors.primaryContainer,
        shape: const CircularNotchedRectangle(),
        child: IconTheme(
          data: IconThemeData(color: colors.onPrimaryContainer),
          child: Row(
            children: [
              IconButton(
                onPressed: () {
                  Navigator.push(context,
                      routeTransition(page: const CambiarContrasena()));
                },
                icon: const Icon(Icons.person),
              ),
              const Spacer(),
              IconButton(
                onPressed: () {
                  showDialog(
                      context: context,
                      builder: (context) => AlertDialog(
                            title: const Text('Cerrar Sesión'),
                            content: const Text(
                                '¿Está seguro que desea cerrar la sesión?'),
                            actions: [
                              TextButton(
                                  onPressed: () => Navigator.pop(context),
                                  child: const Text('Cancelar')),
                              TextButton(
                                  onPressed: () {
                                    final rankingBloc =
                                        BlocProvider.of<RankingBloc>(context);
                                    final authBloc =
                                        BlocProvider.of<AuthBloc>(context);
                                    authBloc.add(LogoutAuthEvent());
                                    rankingBloc.disconnectFromSocket();
                                    Navigator.pop(context);
                                    Navigator.pop(context);
                                  },
                                  child: const Text('Cerrar'))
                            ],
                          ));
                },
                icon: const Icon(Icons.logout),
              ),
            ],
          ),
        ));
  }
}

class _ListarProductos extends StatelessWidget {
  final List<Ranking> listProducto;
  const _ListarProductos({required this.listProducto});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 10.0),
      physics: const BouncingScrollPhysics(),
      itemCount: listProducto.length,
      itemBuilder: (_, i) => Padding(
        padding: const EdgeInsets.only(bottom: 15.0),
        child: Container(
          height: 55,
          width: MediaQuery.of(context).size.width,
          padding: const EdgeInsets.symmetric(horizontal: 20.0),
          decoration: BoxDecoration(
              color: Colors.grey[100],
              borderRadius: BorderRadius.circular(10.0)),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Container(
                height: 20,
                width: 20,
                decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(7.0),
                    border: Border.all(color: Colors.red, width: 4.5)),
              ),
              const SizedBox(width: 20.0),
              Expanded(
                child: TextCustom(
                    textOverflow: TextOverflow.ellipsis,
                    text:
                        '${listProducto[i].nombre} - ${listProducto[i].montoTotalVentas}'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
