import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:intl/intl.dart';
import 'package:rankingapp/core/common/components/text_custom.dart';
import 'package:rankingapp/core/common/helpers/modal_loading.dart';
import 'package:rankingapp/domain/blocs/auth/auth_bloc.dart';
import 'package:rankingapp/domain/blocs/ranking/ranking_bloc.dart';

class AgregarCredito extends StatefulWidget {
  const AgregarCredito({super.key});

  @override
  State<AgregarCredito> createState() => _AgregarCreditoState();
}

class _AgregarCreditoState extends State<AgregarCredito> {
  final _formKey = GlobalKey<FormState>();

  String montos = '';
  String montoFormat = '';
  String plazos = '';
  DateTime selectedDateTime = DateTime.now();

  Future<void> _selectDateTime() async {
    DateTime? pickedDate = await showDatePicker(
      context: context,
      initialDate: selectedDateTime,
      firstDate: DateTime(2024),
      lastDate: DateTime(2100),
    );
    if (pickedDate != null) {
      setState(() {
        selectedDateTime = DateTime(
          pickedDate.year,
          pickedDate.month,
          pickedDate.day,
        );
      });
    }
  }

  final moneyFormat = NumberFormat.currency(locale: 'en_US', symbol: '\$');

  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).colorScheme;
    final rankinBloc = BlocProvider.of<RankingBloc>(context);
    return BlocListener<RankingBloc, RankingState>(
      listener: (context, state) {
        if (state is LoadingRankingState) {
          modalLoading(context);
        }
        if (state is SuccessRankingState) {
          Navigator.pop(context);
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Microcrédito agregado'),
            ),
          );
          Navigator.pop(context);
        }
        if (state is FailureRankingState) {
          Navigator.pop(context);
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text(state.error),
              backgroundColor: colors.error,
            ),
          );
          Navigator.pop(context);
        }
      },
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Agregar Microcrédito'),
        ),
        body: Column(
          children: [
            const SizedBox(height: 20.0),
            const TextCustom(text: 'Agregar Microcrédito'),
            const SizedBox(height: 20.0),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20.0),
              child: Form(
                key: _formKey,
                child: Column(
                  children: [
                    TextFormField(
                      readOnly: true,
                      controller: TextEditingController(
                          text: selectedDateTime.toString()),
                      decoration: const InputDecoration(
                        labelText: 'Fecha de Inicio',
                        border: OutlineInputBorder(),
                        prefixIcon: Icon(Icons.calendar_today),
                      ),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Por favor ingrese una fecha';
                        }
                        return null;
                      },
                      onTap: () async {
                        _selectDateTime();
                      },
                    ),
                    const SizedBox(height: 20.0),
                    TextFormField(
                      keyboardType: TextInputType.number,
                      decoration: const InputDecoration(
                        labelText: 'Plazos',
                        border: OutlineInputBorder(),
                        prefixIcon: Icon(Icons.calendar_today),
                      ),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Por favor ingrese un plazo';
                        }
                        return null;
                      },
                      onChanged: (value) => setState(() => plazos = value),
                    ),
                    const SizedBox(height: 20.0),
                    // text para reflejar el monto ingresado
                    TextCustom(
                      text:
                          ' ${moneyFormat.format(double.parse(montoFormat.isEmpty ? '0' : montoFormat))}',
                      fontWeight: FontWeight.bold,
                      fontSize: 20.0,
                    ),
                    TextFormField(
                      keyboardType: TextInputType.number,
                      decoration: const InputDecoration(
                        labelText: 'Monto',
                        border: OutlineInputBorder(),
                        prefixIcon: Icon(Icons.monetization_on),
                      ),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Por favor ingrese un monto';
                        }
                        return null;
                      },
                      onChanged: (value) => setState(() {
                        montos = value;
                        montoFormat = (int.parse(value) / 100).toString();
                      }),
                    ),
                    const SizedBox(height: 20.0),
                    ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: colors.primary,
                      ),
                      onPressed: () {
                        final valid = _formKey.currentState!.validate();
                        if (!valid) return;
                        final authBloc = BlocProvider.of<AuthBloc>(context);

                        final id = authBloc.state.usuario!.usuarioId;

                        rankinBloc.add(AddCreditEvent(
                            montos, plazos, selectedDateTime.toString(), id));
                        rankinBloc.add(AddEventCreditEvent());
                      },
                      child: Text('Agregar',
                          style: TextStyle(color: colors.onPrimary)),
                    )
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
