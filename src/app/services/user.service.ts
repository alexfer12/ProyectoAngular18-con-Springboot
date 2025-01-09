import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { RegisterUserDto } from '../models/signup-request';
import { User } from '../models/user.model';



@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8005/users';

  constructor(private http: HttpClient) {}

  // Obtener headers con JWT
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('Token no disponible');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // Obtener usuarios con paginación
  getUsers(page: number, size: number, sort: string, direction: string): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort)
      .set('direction', direction);

    return this.http.get<any>(this.apiUrl, { params, headers: this.getAuthHeaders() });
  }

  getUserById(userId: number): Observable<any> {
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.get<any>(`${this.apiUrl}`, { params, headers: this.getAuthHeaders() }).pipe(
      catchError((err) => {
        console.error('Error al obtener el usuario:', err);
        return throwError(err);
      })
    );
  }


  // Actualizar usuario
  updateUser(user: User): Observable<User> {
    const url = `${this.apiUrl}/${user.id}`;
    return this.http.put<User>(url, {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      password: user.password || '',
    }, {
      headers: this.getAuthHeaders(),
    }).pipe(
      catchError((err) => {
        console.error('Error al actualizar el usuario:', err);
        alert('Hubo un error al actualizar el usuario.');
        return throwError(err);
      })
    );
  }


  // Eliminar usuario
  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${userId}`, { headers: this.getAuthHeaders() });
  }
   // Método para registrar un usuario
   registerUser(request: RegisterUserDto): Observable<any> {
    return this.http.post(`${this.apiUrl}`, request);
  }
}
