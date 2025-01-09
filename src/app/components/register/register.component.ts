import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RegisterUserDto } from '../../models/signup-request';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isSubmitting: boolean = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  // Formulario  registro
  signupForm: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  // Método para manejar el envío del formulario
  public onSubmit() {
    if (this.signupForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = null;

      const formValue = this.signupForm.value;

      // Crear la solicitud de registro
      const request: RegisterUserDto = {
        fullName: formValue.fullName,
        email: formValue.email,
        password: formValue.password,
        role: "ROLE_USER"
      };

      // Llamada al servicio
      this.userService.registerUser(request).subscribe({
        next: (response) => {

          this.isSubmitting = false;
          this.successMessage = 'Registro exitoso. Redirigiendo al login...';

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        error: (err) => {
          this.isSubmitting = false;
          this.successMessage = null;


          console.error("Error de respuesta recibido: ", err);

          // Manejo errores
          if (err.status === 400 && err.error?.message?.includes('password')) {
            alert('La contraseña debe contener al menos una mayúscula, una minúscula y un número.');
          } else if (err.status === 400) {
            alert('Error de validación. Por favor, revisa los campos.');
          } else if (err.status === 500) {
            alert('Error en el servidor. Intenta más tarde.');
          } else {
            alert('Error al registrar el usuario. Intenta nuevamente.');
          }

          this.errorMessage = 'Error al registrar el usuario. Intenta nuevamente.';
        }
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }
}
