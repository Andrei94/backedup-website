import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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
    return this.httpClient.get<UserSpace>('http://localhost:8081/showSubscriptionSpace/' + username).pipe(map(value => {
      return {usedSpace: value.usedSpace, totalSpace: value.totalSpace};
    }));
  }
}
