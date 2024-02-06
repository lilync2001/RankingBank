import { Component, OnDestroy, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subject, map, takeUntil } from 'rxjs';
import { RankingService } from 'src/app/core/services/ranking.service';
import { parseMoneySimple } from 'src/app/utils/parser/money.parser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-credito',
  templateUrl: './credito.component.html',
  styleUrls: ['./credito.component.css'],
})
export class CreditoComponent implements OnInit, OnDestroy {
  creditos: any = [];
  private destroy$ = new Subject<any>();

  constructor(private socket: Socket, public srvRank: RankingService) {}

  ngOnInit(): void {
    this.getCreditos().subscribe((data) => {
      this.creditos = data;
      console.log('Creditos => ', this.creditos);
    });

    this.getError().subscribe((data) => {
      console.log('Error recibido => ', data);
    });
  }

  getCreditos() {
    const creditokSocket = this.socket.fromEvent('creditos').pipe(
      map((data) => {
        return data;
      })
    );
    return creditokSocket;
  }

  sendMessage() {
    const sendSale = this.socket.emit('sale', {});
    return sendSale;
  }

  getError() {
    const errorSocket = this.socket.fromEvent('error').pipe(
      map((data) => {
        return data;
      })
    );
    return errorSocket;
  }

  money(num: number) {
    return parseMoneySimple(num);
  }

  aprobarCredi(id: number, tipo: string) {
    console.log('Aprobar Credito', id, tipo);
    Swal.fire({
      title:
        tipo === 'APROBADO'
          ? 'Está seguro que desea APROBAR el microcredito?'
          : 'Está seguro que desea RECHAZAR el microcredito?',
      showDenyButton: true,
      confirmButtonText: tipo === 'APROBADO' ? 'APROBAR' : 'RECHAZAR',
      denyButtonText: `CANCELAR`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title:
            tipo === 'APROBADO'
              ? 'Aprobando microcredito...'
              : 'Rechazando microcredito...',
          didOpen: () => {
            Swal.showLoading();
          },
        });

        this.srvRank
          .putEstadoCredito(id, tipo)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (resp: any) => {
              if (resp.estado) {
                Swal.close();
                Swal.fire({
                  icon: 'success',
                  title: resp.message,
                  showDenyButton: false,
                  confirmButtonText: 'Aceptar',
                });
                this.sendMessage();
              } else {
                Swal.close();
                Swal.fire({
                  icon: 'error',
                  title: resp.message,
                  text: 'Algo salió mal',
                });
              }
            },
            error: (err) => {
              console.log('ERROR Al aprobar el micro credito', err);
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
