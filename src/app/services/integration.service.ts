import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import {  LoginUserDto } from '../models/login-request';
import { RegisterUserDto } from '../models/signup-request';
import { SignupResponse } from '../models/signup-response';


@Injectable({
  providedIn: 'root'
})
export class IntegrationService {
  private apiUrl = 'http://localhost:8005/auth';
  private imageUrl = 'http://localhost:8005/users/images';

  constructor(private http: HttpClient) {}

  registerUser(user: RegisterUserDto): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>('http://localhost:8005/users', user, { headers });
  }
  login(user: LoginUserDto): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}/login`, user, { headers });
  }



  // Métodos para gestionar imágenes
  getImage(userId: number): Observable<Blob> {
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.get(this.imageUrl, { params, responseType: 'blob' });
  }

  uploadImage(file: File, userId: number): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('userId', userId.toString());
    return this.http.post(this.imageUrl, formData);
  }

  updateImage(file: File, userId: number): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('userId', userId.toString());
    return this.http.put(this.imageUrl, formData);
  }

  deleteImage(userId: number): Observable<any> {
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.delete(this.imageUrl, { params });
  }
}
