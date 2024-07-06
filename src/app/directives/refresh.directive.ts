// src/app/directives/refresh.directive.ts
import { Directive, Input } from '@angular/core';
import { IonRefresher } from '@ionic/angular';
import { DataRefreshService } from '../services/data-refresh/data-refresh.service';

@Directive({
  selector: '[appRefresh]'
})
export class RefreshDirective {
  @Input() refreshHandlers: Array<() => Promise<any>> = [];

  constructor(private dataRefreshService: DataRefreshService) {}

  handleRefresh(event: CustomEvent) {
    const promises = this.refreshHandlers.map(handler => handler());
    Promise.all(promises).then(() => {
      event.detail.complete();
    }).catch(() => {
      event.detail.complete();
    });
  }
}
