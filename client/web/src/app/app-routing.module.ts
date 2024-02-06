import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import config from 'config/config';
import { LoginModule } from './Page/login/login.module';
import { Layouts } from './layout/layout';
import { AdminModule } from './Page/admin/admin.module';
import { ConfiguracionModule } from './Page/configuracion/configuracion.module';

const routes: Routes = [
  {
    path: config.URL_BASE_PATH,
    data: { layout: Layouts.Simple },
    children: [
      // { path: '', loadChildren: () => HomeModule },
      // { path: '404', loadChildren: () => FailedModule },
      // { path: 'denegado', loadChildren: () => DeniedModule },
      { path: '', loadChildren: () => LoginModule },
    ],
  },
  {
    path: config.URL_BASE_PATH,
    data: { layout: Layouts.Full },
    // canActivate: [PermisoGuard, RolesGuard],
    children: [
      { path: '', loadChildren: () => AdminModule },
      { path: 'ajuste', loadChildren: () => ConfiguracionModule },
    ],
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
