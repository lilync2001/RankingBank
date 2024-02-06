import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';
import { Layouts } from './layout/layout';
import { Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<any>();
  title = 'client';
  Layouts = Layouts;
  layout: Layouts = Layouts.Simple;

  constructor(private router: Router) {}
  ngOnInit() {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        if (data instanceof RoutesRecognized) {
          this.layout = data.state.root.firstChild?.data['layout'];
        }
        // if (data instanceof NavigationEnd) {
        //   this.showLoading = false;
        // }
        // if (data instanceof NavigationStart) {
        //   this.showLoading = true;
        // }
      },
      error: (err) => {
        console.log('err =>', err);
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
