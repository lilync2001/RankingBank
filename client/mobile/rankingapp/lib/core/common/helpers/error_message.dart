import 'package:flutter/material.dart';
import 'package:rankingapp/core/common/components/text_custom.dart';
import 'package:rankingapp/core/themes/colors.dart';

void errorMessageSnack(BuildContext context, String error) {
  ScaffoldMessenger.of(context).showSnackBar(SnackBar(
      content: TextCustom(text: error, color: lightColorScheme.onError),
      backgroundColor: lightColorScheme.error));
}
