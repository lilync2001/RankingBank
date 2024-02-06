import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { RankingService } from 'src/app/core/services/ranking.service';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit, OnDestroy {
  Ranking: any = [];
  private destroy$ = new Subject<any>();

  constructor(public srvRanking: RankingService, private socket: Socket) {}

  ngOnInit(): void {
    console.log(
      'Token => ',
      `${JSON.parse(localStorage.getItem('user') || '{}').token}`
    );
    this.getRanking().subscribe((data) => {
      this.Ranking = data;
    });

    this.getError().subscribe((data) => {
      console.log('Error recibido => ', data);
    });
  }

  getRanking() {
    const rankSocket = this.socket.fromEvent('ranking').pipe(
      map((data) => {
        return data;
      })
    );
    return rankSocket;
  }

  getError() {
    const errorSocket = this.socket.fromEvent('error').pipe(
      map((data) => {
        return data;
      })
    );
    return errorSocket;
  }

  getMedal(ranking: number) {
    if (ranking == 1) return '#FED931';
    if (ranking == 2) return '#CFCFD0';
    if (ranking == 3) return '#BD7B65';
    return false;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
