import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(): boolean {
        const role = localStorage.getItem('role');
        if (role === 'admin') {
            return true;
        }
        this.router.navigate(['/auth']);
        return false;
    }
}
