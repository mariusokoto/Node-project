import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router,RouterModule } from '@angular/router';

@Component({
  standalone: true, // Mark the component as standalone
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class AuthComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {
    console.log('AuthComponent loaded');

  }

  login(): void {
    this.http.post('http://localhost:3000/api/users/login', { email: this.email, password: this.password })
      .subscribe(
        (response: any) => {
          console.log('Login successful', response);
          this.router.navigate(['/student']);
        },
        (error) => {
          this.errorMessage = error.error.message || 'Login failed';
        }
      );
  }
}
