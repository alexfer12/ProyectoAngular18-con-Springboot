import { Component, inject } from '@angular/core';
import { IntegrationService } from '../../services/integration.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginUserDto } from '../../models/login-request';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private integration: IntegrationService) {}

  usuForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  router = inject(Router);
  request: LoginUserDto = new LoginUserDto();

  login() {
    const formValue = this.usuForm.value;

    if (formValue.email === '' || formValue.password === '') {
      alert('Credenciales inválidas');
      return;
    }

    this.request.email = formValue.email;
    this.request.password = formValue.password;


    this.integration.login(this.request).subscribe({
      next: (res) => {
        console.log("Respuesta recibida: " + res.token);
        localStorage.setItem('authToken', res.token);
        console.log("JWT guardado en localStorage.");

        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        console.error("Error de respuesta recibido: ", err);
        alert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
      }
    });
  }
}
