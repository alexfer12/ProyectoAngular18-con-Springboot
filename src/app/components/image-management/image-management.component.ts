import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-management',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './image-management.component.html',
  styleUrls: ['./image-management.component.css']
})
export class ImageManagementComponent implements OnInit {
  userId: number | null = null;
  selectedFile: File | null = null;
  displayedImage: string | null = null;
  isAdmin: boolean = false;
  isUser: boolean = false;

  constructor(
    private imageService: ImageService,
    private authService: AuthService,
    private router: Router
  ) {}



  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.isUser = !this.isAdmin;
    if (this.isUser) {
      const userIdFromToken = this.authService.getUserId();
      if (userIdFromToken) {
        this.userId = userIdFromToken;
      } else {
        console.error('Error: No se pudo obtener el User ID del token.');
      }
    }
  }

  // Método para seleccionar archivo
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  // Subir Imagen
  uploadImage(): void {
    if (this.selectedFile && this.userId && this.isAdmin) {
      this.imageService.uploadImage(this.selectedFile, this.userId).subscribe({
        next: () => {
          console.log('Imagen subida correctamente');
          alert('Imagen subida correctamente');
        },
        error: (error) => console.error('Error al subir la imagen', error)
      });
    } else {
      console.error('Falta el archivo o el User ID');
    }
  }

  // Actualizar Imagen
  updateImage(): void {
    if (this.selectedFile && this.userId && this.isAdmin) {
      this.imageService.updateImage(this.selectedFile, this.userId).subscribe({
        next: () => {
          console.log('Imagen actualizada correctamente');
          alert('Imagen actualizada correctamente');
        },
        error: (error) => console.error('Error al actualizar la imagen', error)
      });
    } else {
      console.error('Falta el archivo o el User ID');
    }
  }


 // Ver al imagen
 viewImage(): void {
  const idToView = this.isAdmin ? this.userId : this.userId;

  if (idToView) {
    this.imageService.getImage(idToView).subscribe({
      next: (imageBlob) => {
        const fileURL = URL.createObjectURL(imageBlob);
        this.displayedImage = fileURL;
      },
      error: (error) => {
        console.error('Error al obtener la imagen', error);
        alert('No se encontró la imagen para el User ID proporcionado.');
      }
    });
  } else {
    alert('No se pudo determinar el User ID.');
  }
}



  // Eliminar Imagen
  deleteImage(): void {
    if (this.userId && this.isAdmin) {
      this.imageService.deleteImage(this.userId).subscribe({
        next: () => {
          console.log('Imagen eliminada correctamente');
          alert('Imagen eliminada correctamente');
        },
        error: (error) => console.error('Error al eliminar la imagen', error)
      });
    } else {
      console.error('Falta el User ID');
    }
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
