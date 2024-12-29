import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { StudentComponent } from './student/student.component';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'student', component: StudentComponent },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth' }
];
