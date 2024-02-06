import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RankingRoutingModule } from './ranking-routing.module';
import { RankingComponent } from './ranking.component';
import { CardsModule } from 'src/app/components/cards/cards.module';
import { CreditosModule } from 'src/app/components/creditos/creditos.module';

@NgModule({
  declarations: [RankingComponent],
  imports: [CommonModule, RankingRoutingModule, CardsModule, CreditosModule],
})
export class RankingModule {}
