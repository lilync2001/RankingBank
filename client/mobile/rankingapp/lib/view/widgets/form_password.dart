import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:rankingapp/core/common/components/text_custom.dart';
import 'package:rankingapp/core/common/helpers/modal_loading.dart';
import 'package:rankingapp/domain/blocs/auth/auth_bloc.dart';

class CambiarContrasena extends StatelessWidget {
  const CambiarContrasena({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Cambiar Contraseña'),
      ),
      body: const Column(
        children: [
          SizedBox(height: 20.0),
          TextCustom(text: 'Cambiar Contraseña'),
          SizedBox(height: 20.0),
          _FormularioCambiarContrasena(),
        ],
      ),
    );
  }
}

class _FormularioCambiarContrasena extends StatefulWidget {
  const _FormularioCambiarContrasena();

  @override
  State<_FormularioCambiarContrasena> createState() =>
      _FormularioCambiarContrasenaState();
}

class _FormularioCambiarContrasenaState
    extends State<_FormularioCambiarContrasena> {
  final _formKey = GlobalKey<FormState>();
  late bool passwordVisible;
  late bool newPasswordVisible;
  late bool confirmPasswordVisible;
  String _password = '';
  String _newPassword = '';
  String _confirmPassword = '';

  @override
  initState() {
    passwordVisible = false;
    newPasswordVisible = false;
    confirmPasswordVisible = false;
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).colorScheme;
    return BlocListener<AuthBloc, AuthState>(
      listener: (context, state) {
        if (state is LoadingAuthState) {
          modalLoading(context);
        }
        if (state is SuccessAuthState) {
          Navigator.pop(context);
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Contraseña cambiada con éxito'),
              backgroundColor: Colors.green,
            ),
          );
          Navigator.pop(context);
        }
        if (state is FailureAuthState) {
          Navigator.pop(context);
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text(state.error),
              backgroundColor: Colors.red,
            ),
          );
          Navigator.pop(context);
        }
      },
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                obscureText: !passwordVisible,
                decoration: InputDecoration(
                  labelText: 'Contraseña Actual',
                  border: const OutlineInputBorder(),
                  prefixIcon: const Icon(Icons.lock),
                  suffixIcon: InkWell(
                      onTap: () {
                        setState(() {
                          passwordVisible = !passwordVisible;
                        });
                      },
                      child: Icon(passwordVisible
                          ? Icons.visibility
                          : Icons.visibility_off)),
                ),
                validator: (value) => value!.isEmpty ? 'Campo requerido' : null,
                onChanged: (value) => setState(() => _password = value),
              ),
              const SizedBox(height: 20.0),
              TextFormField(
                obscureText: !newPasswordVisible,
                decoration: InputDecoration(
                  labelText: 'Nueva Contraseña',
                  border: const OutlineInputBorder(),
                  prefixIcon: const Icon(Icons.lock),
                  suffixIcon: InkWell(
                      onTap: () {
                        setState(() {
                          newPasswordVisible = !newPasswordVisible;
                        });
                      },
                      child: Icon(newPasswordVisible
                          ? Icons.visibility
                          : Icons.visibility_off)),
                ),
                validator: (value) => value!.isEmpty ? 'Campo requerido' : null,
                onChanged: (value) => setState(() => _newPassword = value),
              ),
              const SizedBox(height: 20.0),
              TextFormField(
                obscureText: !confirmPasswordVisible,
                decoration: InputDecoration(
                  labelText: 'Confirmar Contraseña',
                  border: const OutlineInputBorder(),
                  prefixIcon: const Icon(Icons.lock),
                  suffixIcon: InkWell(
                      onTap: () {
                        setState(() {
                          confirmPasswordVisible = !confirmPasswordVisible;
                        });
                      },
                      child: Icon(confirmPasswordVisible
                          ? Icons.visibility
                          : Icons.visibility_off)),
                ),
                validator: (value) => value!.isEmpty ? 'Campo requerido' : null,
                onChanged: (value) => setState(() => _confirmPassword = value),
              ),
              const SizedBox(height: 20.0),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: colors.primary,
                ),
                onPressed: () {
                  final valid = _formKey.currentState!.validate();
                  if (!valid) return;

                  if (_newPassword != _confirmPassword) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Las contraseñas no coinciden'),
                        backgroundColor: Colors.red,
                      ),
                    );
                    return;
                  }

                  final hasUpperCase = _newPassword.contains(RegExp(r'[A-Z]'));
                  final hasDigits = _newPassword.contains(RegExp(r'[0-9]'));
                  final hasMinLength = _newPassword.length >= 8;

                  if (!hasUpperCase || !hasDigits || !hasMinLength) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text(
                            'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número'),
                        backgroundColor: Colors.red,
                      ),
                    );
                    return;
                  }

                  final authBloc = BlocProvider.of<AuthBloc>(context);
                  authBloc.add(CambiarContrasenaAuthEvent(
                    password: _password,
                    newPassword: _newPassword,
                    id: authBloc.state.usuarioId,
                    email: authBloc.state.email,
                  ));
                },
                child: Text('Cambiar Contraseña',
                    style: TextStyle(color: colors.onPrimary)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
