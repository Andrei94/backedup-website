import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

export class UserSpace {
  usedSpace: number;
  totalSpace: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserSpaceService {

  constructor(private httpClient: HttpClient) {
  }

  getSpace(username: string): Observable<UserSpace> {
    return this.httpClient.get<UserSpace>(environment.showSubscriptionUrl + username).pipe(map(value => {
      return {usedSpace: value.usedSpace, totalSpace: value.totalSpace};
    }));
  }
}
