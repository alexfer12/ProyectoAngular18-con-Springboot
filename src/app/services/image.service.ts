import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = 'http://localhost:8005/users/images';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Método para obtener los headers de autorización
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Token no disponible');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Subir Imagen
  uploadImage(file: File, userId: number): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);

    const params = { userId: userId.toString() };

    return this.http.post(this.apiUrl, formData, {
      headers: this.getAuthHeaders(),
      params: params
    }).pipe(
      catchError(err => {
        console.error('Error al subir la imagen:', err);
        return throwError(err);
      })
    );
  }




  // Actualizar Imagen
  updateImage(file: File, userId: number): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.put(`${this.apiUrl}?userId=${userId}`, formData, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(err => {
        console.error('Error al actualizar la imagen:', err);
        return throwError(err);
      })
    );
  }

  // Obtener Imagen
  getImage(userId?: number | null): Observable<Blob> {

    if (userId == null) {
      const extractedUserId = this.authService.getUserId();
      if (extractedUserId === null) {
        throw new Error('No se pudo determinar el User ID');
      }
      userId = extractedUserId;
    }

    const url = `${this.apiUrl}?userId=${userId}`;
    return this.http.get(url, {
      headers: this.getAuthHeaders(),
      responseType: 'blob'
    }).pipe(
      catchError((err) => {
        console.error('Error al obtener la imagen:', err);
        return throwError(err);
      })
    );
  }

  // Eliminar Imagen
  deleteImage(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}?userId=${userId}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(err => {
        console.error('Error al eliminar la imagen:', err);
        return throwError(err);
      })
    );
  }
}
