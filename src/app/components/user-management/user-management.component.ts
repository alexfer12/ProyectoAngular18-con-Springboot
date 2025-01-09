import { User } from '../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

interface ApiResponse {
  content: User[];
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  searchId: number = 0;
  isEditMode: boolean = false;

  page: number = 0;
  pageSize: number = 5;
  totalUsers: number = 0;
  totalPages: number = 0;

  sort: string = 'id';
  direction: string = 'asc';

  constructor(private userService: UserService, private authService: AuthService,  private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers(this.page, this.pageSize, this.sort, this.direction).subscribe({
      next: (response) => {
        this.users = response.content;
        this.totalUsers = response.totalElements;
        this.totalPages = response.totalPages;
      },
      error: (err) => console.error('Error al obtener usuarios:', err),
    });
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.page = page;
      this.getUsers();
    }
  }

  searchUserById(): void {
    if (this.searchId) {
      this.userService.getUserById(this.searchId).subscribe({
        next: (response) => {
          this.selectedUser = response;
          this.isEditMode = false;
        },
        error: (err) => {
          console.error('Error al buscar usuario por ID:', err);
          alert('Usuario no encontrado');
          this.selectedUser = null;
        },
      });
    } else {
      alert('Por favor ingrese un ID válido');
      this.selectedUser = null;
      this.isEditMode = false;
    }
  }

  updateUser(): void {
    if (this.selectedUser) {
      console.log('Actualizando usuario:', this.selectedUser);
      this.userService.updateUser(this.selectedUser).subscribe({
        next: () => {
          alert('Perfil actualizado correctamente');
          this.getUsers();
          this.selectedUser = null;
        },
        error: (err) => {
          console.error('Error al actualizar el usuario:', err);
          alert('Hubo un error al actualizar el usuario.');
        },
      });
    } else {
      alert('No se ha seleccionado un usuario para actualizar');
    }
  }


  deleteUser(userId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          alert('Usuario eliminado correctamente');
          this.getUsers();
        },
        error: (err) => {
          console.error('Error al eliminar el usuario:', err);
          alert('Hubo un error al eliminar el usuario.');
        },
      });
    }
  }

  selectUserForEdit(user: User): void {
    this.selectedUser = { ...user };
    this.isEditMode = true;
  }

  closeEdit(): void {
    this.selectedUser = null;
    this.isEditMode = false;
  }
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

}
