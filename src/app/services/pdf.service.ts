import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserPdfService {
  private apiUrl = 'http://localhost:8005/users/pdfs';

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

  // Subir PDF
  uploadPdf(file: File, userId: number): Observable<any> {
    const formData = new FormData();
    formData.append('pdf', file);
    const params = { userId: userId.toString() };

    return this.http.post(this.apiUrl, formData, {
      headers: this.getAuthHeaders(),
      params: params
    }).pipe(
      catchError(err => {
        console.error('Error al subir el PDF:', err);
        return throwError(err);
      })
    );
  }

  // Actualizar PDF
  updatePdf(file: File, userId: number): Observable<any> {
    const formData = new FormData();
    formData.append('pdf', file);

    return this.http.put(`${this.apiUrl}?userId=${userId}`, formData, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(err => {
        console.error('Error al actualizar el PDF:', err);
        return throwError(err);
      })
    );
  }

  // Obtener PDF
  getPdf(userId: number): Observable<Blob> {
    const url = `${this.apiUrl}?userId=${userId}`;

    return this.http.get(url, {
      headers: this.getAuthHeaders(),
      responseType: 'blob'
    }).pipe(
      catchError(err => {
        console.error('Error al obtener el PDF:', err);
        return throwError(err);
      })
    );
  }

  // Eliminar PDF
  deletePdf(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}?userId=${userId}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(err => {
        console.error('Error al eliminar el PDF:', err);
        return throwError(err);
      })
    );
  }
}
