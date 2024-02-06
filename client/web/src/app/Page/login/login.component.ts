import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { LoginService } from 'src/app/core/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  title = 'Control Login';
  myForm!: FormGroup;

  private destroy$ = new Subject<any>();

  /*constructor(public fb: FormBuilder)
  {
    this.myForm = this.fb.group({
      user: ["", [Validators.required]],
      password: [""]
    })
  }*/
  constructor(public fb: FormBuilder, public srvLogin: LoginService) {
    this.createForm();
  }

  createForm() {
    this.myForm = this.fb.group({
      email: [null, Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  Login() {
    Swal.fire({
      title: 'Está seguro que ingreso las credenciales correctas?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Verificando Usuario...',
          didOpen: () => {
            Swal.showLoading();
          },
        });

        this.srvLogin
          .postLogin(this.myForm.value)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (resp: any) => {
              if (resp.status) {
                Swal.close();
                Swal.fire({
                  icon: 'success',
                  title: resp.message,
                  showDenyButton: false,
                  confirmButtonText: 'Aceptar',
                });
                console.log(
                  'RESPONSE LOGIN',
                  resp,
                  'Json => ',
                  JSON.stringify(resp.usuario)
                );
                localStorage.setItem('user', JSON.stringify(resp.usuario));
                window.location.href = '/raking';
                console.log('LocalStorage', localStorage);
              } else {
                Swal.close();
                Swal.fire({
                  icon: 'error',
                  title: resp.message,
                  text: 'Algo salió mal',
                });
              }
              this.myForm.reset();
              // this.srvModal.closeModal();
              // localStorage.clear();
            },
            error: (err) => {
              console.log('ERROR CREATE PRECONTRACTUAL', err);
              Swal.fire({
                title: err.error.error,
                text: 'Por favor comuníquese con el servicio técnico',
                icon: 'error',
                footer: 'Error: ' + err.error.errorStack,
                showDenyButton: false,
                confirmButtonText: 'Aceptar',
              });
            },
          });
      } else if (result.isDenied) {
        Swal.fire('Los cambios no fueron guardados', '', 'info');
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
