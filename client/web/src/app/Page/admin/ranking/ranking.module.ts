import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RankingRoutingModule } from './ranking-routing.module';
import { RankingComponent } from './ranking.component';
import { CardsModule } from 'src/app/components/cards/cards.module';

@NgModule({
  declarations: [RankingComponent],
  imports: [CommonModule, RankingRoutingModule, CardsModule],
})
export class RankingModule {}
