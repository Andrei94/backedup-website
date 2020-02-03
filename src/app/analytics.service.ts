import { Injectable } from '@angular/core';

declare let gtag:Function;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor() { }

  public emitEvent(eventCategory: string,
                   eventAction: string,
                   eventLabel: string = null,
                   eventValue: string = null) {
    gtag('send', 'event', { eventCategory, eventLabel, eventAction, eventValue });
  }
}
