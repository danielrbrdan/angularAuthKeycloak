import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { notAuthenticatedGuard } from './auth/guards/notAutenticatedGuard';
import { authenticatedGuard } from './auth/guards/autenticatedGuard';
import { LogoutComponent } from './auth/logout/logout.component';
import { TestComponent } from './test/test.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [notAuthenticatedGuard],
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [authenticatedGuard],
  },
  {
    path: '',
    component: TestComponent,
    canActivate: [authenticatedGuard],
  },
  {
    path: 'test',
    component: TestComponent,
    canActivate: [authenticatedGuard],
  },
];
