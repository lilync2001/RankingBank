import { Component, OnDestroy, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subject, map } from 'rxjs';
import { RankingService } from 'src/app/core/services/ranking.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
})
export class RankingComponent implements OnInit, OnDestroy {
  title = 'client';
  showModal: boolean = false;

  private destroy$ = new Subject<any>();

  upload!: any;
  uploadButtonText!: any;
  uploadFilename!: any;
  fileInput!: File;
  fileName!: any;

  constructor(public srvRanking: RankingService, private socket: Socket) {}

  toggleModal() {
    this.showModal = !this.showModal;
  }

  ngOnInit(): void {}

  onchange($event: any) {
    // Swal.fire({
    //   title: 'Cargando PDF...',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });
    // // verifica que el archivo sea un PDF
    // if ($event.target.files[0].type !== 'text/csv') {
    //   Swal.close();
    //   Swal.fire({
    //     icon: 'warning',
    //     title: 'Selecciona un archivo CSV',
    //     showCancelButton: true,
    //     denyButtonText: `Cancelar`,
    //   });
    // } else {
    //   Swal.close();
    //   this.uploadFilename = document.getElementById(
    //     'upload-filename'
    //   ) as HTMLElement;
    //   this.upload = document.querySelector('.upload') as HTMLElement;
    //   this.uploadButtonText = document.querySelector(
    //     '.upload-button-text'
    //   ) as HTMLElement;
    //   this.fileName = $event.target.files[0].name;
    //   this.uploadFilename.classList.remove('inactive');
    //   this.uploadFilename!.innerText = this.fileName;
    //   this.uploadButtonText!.innerText = 'Cambiar archivo';
    //   this.fileInput = $event.target.files[0];
    // }
  }

  updateRanking() {
    // const dataFile = new FormData();
    // dataFile.append('file', this.fileInput, this.fileName);
    // Swal.fire({
    //   title: 'Actualizando Ranking...',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });
    // console.log('datos del archivo csv =>', dataFile);
    // this.srvRanking.postRanking(dataFile).subscribe({
    //   next: (data: any) => {
    //     this.showModal = !this.showModal;
    //     this.srvRanking.data = data.body;
    //     Swal.close();
    //     Swal.fire({
    //       icon: 'success',
    //       title: 'Ranking actualizado',
    //       showCancelButton: false,
    //       confirmButtonText: `Ok`,
    //     });
    //   },
    //   error: (err) => {
    //     console.log(err);
    //     Swal.close();
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Error al actualizar el ranking',
    //       showCancelButton: false,
    //       confirmButtonText: `Ok`,
    //     });
    //   },
    //   complete: () => {
    //     this.getRangink();
    //   },
    // });
  }

  // getRangink() {
  //   this.srvRanking
  //     .getRanking()
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe({
  //       next: (data: any) => {
  //         console.log(data);
  //         this.srvRanking.data = data.body;
  //       },
  //       error: (err) => {
  //         console.log(err);
  //       },
  //     });
  // }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
