import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditoComponent } from './credito/credito.component';

@NgModule({
  declarations: [CreditoComponent],
  imports: [CommonModule],
  exports: [CreditoComponent],
})
export class CreditosModule {}
