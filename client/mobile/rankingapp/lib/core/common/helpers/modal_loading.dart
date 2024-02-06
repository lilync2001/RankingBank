import 'package:flutter/material.dart';
import 'package:rankingapp/core/common/components/text_custom.dart';
import 'package:rankingapp/core/themes/colors.dart';

void modalLoading(BuildContext context) {
  showDialog(
    context: context,
    barrierDismissible: false,
    barrierColor: Colors.white54,
    builder: (context) => AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15.0)),
      content: SizedBox(
        height: 100,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                TextCustom(
                    text: 'Ranking',
                    color: lightColorScheme.primary,
                    fontWeight: FontWeight.w500),
                const TextCustom(text: 'App', fontWeight: FontWeight.w500),
              ],
            ),
            const Divider(),
            const SizedBox(height: 10.0),
            Row(
              children: [
                CircularProgressIndicator(color: lightColorScheme.primary),
                const SizedBox(width: 15.0),
                const TextCustom(text: 'Loading...')
              ],
            ),
          ],
        ),
      ),
    ),
  );
}
