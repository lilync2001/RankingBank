import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarUsuarioComponent } from './ajustes/mostrar-usuario/mostrar-usuario.component';
import { EditarUsuarioComponent } from './ajustes/editar-usuario/editar-usuario.component';
import { CrearUsuarioComponent } from './ajustes/crear-usuario/crear-usuario.component';

@NgModule({
  declarations: [
    MostrarUsuarioComponent,
    EditarUsuarioComponent,
    CrearUsuarioComponent,
  ],
  imports: [CommonModule],
  exports: [
    MostrarUsuarioComponent,
    EditarUsuarioComponent,
    CrearUsuarioComponent,
  ],
})
export class ConfiguracionModule {}
