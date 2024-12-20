import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { IUser } from '../interface/user.interface';
import { IAuthResponse } from '../interface/authResponse.interface';
import { LocalStorageService } from '../../utils/service/localStorage.service';
import { ENVIRONMENT } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router,
    private readonly localServiveService: LocalStorageService
  ) {}

  login(user: IUser): Observable<IAuthResponse> {
    user = { ...user, grantType: 'password', clientId: 'myClientId' };

    return this.httpClient
      .post<IAuthResponse>(`${ENVIRONMENT.apiUrl}/auth/token`, user)
      .pipe(
        tap((response) => {
          this.localServiveService.setItem('user', btoa(JSON.stringify(user)));

          const keys: (keyof IAuthResponse)[] = [
            'access_token',
            'refresh_token',
            'session_state',
            'expires_in',
            'refresh_expires_in',
          ];
          keys.forEach((key) => {
            this.localServiveService.setItem(
              key,
              btoa(JSON.stringify(response[key]))
            );
          });

          this.router.navigate(['']);
        })
      );
  }

  get loggedUser(): IUser {
    return this.localServiveService.getItem('user')
      ? JSON.parse(atob(this.localServiveService.getItem('user') as string))
      : null;
  }

  logout() {
    this.localServiveService.clear();
    this.router.navigate(['login']);
  }

  // get obterUsuarioLogado(): IUsuario {
  //   return this.localServiveService.getItem('usuario')
  //     ? JSON.parse(atob(this.localServiveService.getItem('usuario')))
  //     : null;
  // }
  // get obterIdUsuarioLogado(): string {
  //   return this.localServiveService.getItem('usuario')
  //     ? (JSON.parse(atob(this.localServiveService.getItem('usuario'))) as IUsuario).id
  //     : null;
  // }

  get token(): string {
    return this.localServiveService.getItem('access_token')
      ? JSON.parse(
          atob(this.localServiveService.getItem('access_token') as string)
        )
      : null;
  }

  get isLoggedIn(): boolean {
    return this.localServiveService.getItem('access_token') ? true : false;
  }
}
