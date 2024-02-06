import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'raking',
        loadChildren: () =>
          import('./ranking/ranking.module').then((m) => m.RankingModule),
      },
    ],
  },
];

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminModule {}
