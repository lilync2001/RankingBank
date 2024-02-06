import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarUsuarioComponent } from './mostrar-usuario.component';

describe('MostrarUsuarioComponent', () => {
  let component: MostrarUsuarioComponent;
  let fixture: ComponentFixture<MostrarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
