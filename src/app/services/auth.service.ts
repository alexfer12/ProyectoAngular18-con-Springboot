// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8005/auth';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  // Login: almacena el token en localStorage
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem(this.tokenKey, response.token);
        }
      })
    );
  }

  // Obtener el token desde localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Obtener todos los roles del usuario desde el token decodificado
  getUserRoles(): string[] {
    const token = this.getToken();
    if (!token) {
      return [];
    }

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.roles || [];
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return [];
    }
  }

  // Verificar si el usuario es administrador
  isAdmin(): boolean {
    const roles = this.getUserRoles();
    return roles.includes('ROLE_ADMIN');
  }

  // Obtener el ID del usuario desde el token
  getUserId(): number | null {
    const token = this.getToken();
    if (!token) {
      console.error('No se encontró el token en localStorage.');
      return null;
    }

    try {
      const decodedToken: any = jwtDecode(token);

      if (decodedToken && typeof decodedToken.userId === 'number') {
        return decodedToken.userId;
      } else {
        console.warn('El token no contiene un userId válido.');
        return null;
      }
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }



  // Logout: elimina el token del localStorage
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
