import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:rankingapp/core/common/components/animation_route.dart';
import 'package:rankingapp/core/common/helpers/error_message.dart';
import 'package:rankingapp/core/common/helpers/modal_loading.dart';
import 'package:rankingapp/domain/blocs/auth/auth_bloc.dart';
import 'package:rankingapp/view/screens/homepage.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  late TextEditingController _emailCtrl;
  late TextEditingController _passCtrl;
  final formKey = GlobalKey<FormState>();
  FocusNode? _emailFocusNode;
  FocusNode? _passFocusNode;
  late bool passwordVisible;

  @override
  void initState() {
    _emailCtrl = TextEditingController();
    _passCtrl = TextEditingController();
    passwordVisible = false;
    super.initState();
  }

  @override
  void dispose() {
    _emailCtrl.clear();
    _passCtrl.clear();
    _emailCtrl.dispose();
    _passCtrl.dispose();
    _emailFocusNode?.dispose();
    _passFocusNode?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final authBloc = BlocProvider.of<AuthBloc>(context);
    final colors = Theme.of(context).colorScheme;

    return BlocListener<AuthBloc, AuthState>(
      listener: (context, state) async {
        if (state is LoadingAuthState) {
          modalLoading(context);
        } else if (state is LogOutAuthState) {
          Navigator.of(context).pop();
        } else if (state is FailureAuthState) {
          Navigator.pop(context);
          errorMessageSnack(context, state.error.toString());
        } else if (state.rol != '' && state.usuario != null) {
          Navigator.pop(context);
          Navigator.push(
              context, routeTransition(page: const HomePageScreen()));
        } else {
          Navigator.pop(context);
        }
      },
      child: Scaffold(
          // backgroundColor: const Color(0xffF2F2F2),
          backgroundColor: colors.background,
          body: SafeArea(
            child: SingleChildScrollView(
              physics: const BouncingScrollPhysics(),
              child: SizedBox(
                height: MediaQuery.of(context).size.height * 0.7,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Padding(
                      padding:
                          const EdgeInsetsDirectional.fromSTEB(0, 24, 0, 0),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Expanded(
                              child: Padding(
                            padding: const EdgeInsetsDirectional.fromSTEB(
                                24, 0, 24, 0),
                            child: Column(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                TextField(
                                  controller: _emailCtrl,
                                  focusNode: _emailFocusNode,
                                  obscureText: false,
                                  keyboardType: TextInputType.emailAddress,
                                  decoration: InputDecoration(
                                    labelText: 'Usuario',
                                    hintText: 'Tu usuario o correo',
                                    hintStyle: TextStyle(
                                      color: colors.secondary,
                                    ),
                                    prefixIcon: Icon(
                                      Icons.person_outline,
                                      color: colors.onPrimaryContainer,
                                    ),
                                    enabledBorder: UnderlineInputBorder(
                                      borderSide: BorderSide(
                                          color: colors.secondary, width: 1),
                                    ),
                                    focusedBorder: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(8),
                                      borderSide: BorderSide(
                                          color: colors.primary, width: 1),
                                      // gapPadding: 10,
                                    ),
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsetsDirectional.fromSTEB(
                                      0, 24, 0, 0),
                                  child: TextField(
                                    controller: _passCtrl,
                                    focusNode: _passFocusNode,
                                    obscureText: !passwordVisible,
                                    decoration: InputDecoration(
                                      labelText: 'Contraseña',
                                      hintText: 'Tu contraseña aquí',
                                      hintStyle: TextStyle(
                                        color: colors.secondary,
                                      ),
                                      prefixIcon: Icon(
                                        Icons.lock_outline,
                                        color: colors.onPrimaryContainer,
                                      ),
                                      suffixIcon: InkWell(
                                        onTap: () {
                                          setState(() {
                                            passwordVisible = !passwordVisible;
                                          });
                                        },
                                        focusNode:
                                            FocusNode(skipTraversal: true),
                                        child: Icon(
                                          passwordVisible
                                              ? Icons.visibility
                                              : Icons.visibility_off,
                                          color: colors.onPrimaryContainer,
                                        ),
                                      ),
                                      enabledBorder: UnderlineInputBorder(
                                        borderSide: BorderSide(
                                            color: colors.secondary, width: 1),
                                      ),
                                      focusedBorder: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(8),
                                        borderSide: BorderSide(
                                            color: colors.primary, width: 1),
                                        // gapPadding: 10,
                                      ),
                                    ),
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsetsDirectional.fromSTEB(
                                      0, 8, 0, 0),
                                  child: Align(
                                    alignment: AlignmentDirectional.centerEnd,
                                    child: TextButton(
                                      onPressed: null,
                                      child: Text(
                                        '¿Olvidaste tu contraseña?',
                                        style: TextStyle(
                                          color: colors.primary,
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                                Padding(
                                    padding:
                                        const EdgeInsetsDirectional.fromSTEB(
                                            0, 24, 0, 0),
                                    child: ElevatedButton(
                                        onPressed: () {
                                          authBloc.add(LoginAuthEvent(
                                              email: _emailCtrl.text,
                                              password: _passCtrl.text));
                                        },
                                        style: ElevatedButton.styleFrom(
                                            elevation: 2,
                                            backgroundColor: colors.primary,
                                            shape: RoundedRectangleBorder(
                                                borderRadius:
                                                    BorderRadius.circular(8))),
                                        child: SizedBox(
                                          width: double.infinity,
                                          height: 56,
                                          child: Center(
                                            child: Text(
                                              'Iniciar sesión',
                                              style: TextStyle(
                                                  color: colors.onPrimary,
                                                  fontSize: 17),
                                            ),
                                          ),
                                        ))),
                              ],
                            ),
                          )),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          )),
    );
  }
}
