import {Injectable} from '@angular/core';
import Auth from '@aws-amplify/auth';
import {Hub} from '@aws-amplify/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
  id: string | null;
  email: string | null;
}

const initialAuthState = {
  isLoggedIn: false,
  username: null,
  id: null,
  email: null
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authState = new BehaviorSubject<AuthState>(
    initialAuthState
  );
  readonly auth$: Observable<AuthState> = this.authState.asObservable();
  readonly isLoggedIn$: Observable<boolean> = this.auth$.pipe(map(state => state.isLoggedIn));

  constructor() {
    Auth.currentAuthenticatedUser().then(
      (user: any) => this.setUser(user),
      () => this.authState.next(initialAuthState)
    );

    Hub.listen('auth', ({payload: {event, data}}) => {
      if (event === 'signIn') {
        this.setUser(data);
      } else {
        this.authState.next(initialAuthState);
      }
    });
  }

  private setUser(user: any) {
    if (!user) {
      return;
    }

    const {
      attributes: {sub: id, email},
      username
    } = user;

    this.authState.next({isLoggedIn: true, id, username, email});
  }

  signOut() {
    Auth.signOut({global: true}).catch(err => console.log(err));
    this.authState.next({isLoggedIn: false, email: null, username: null, id: null});
  }
}
