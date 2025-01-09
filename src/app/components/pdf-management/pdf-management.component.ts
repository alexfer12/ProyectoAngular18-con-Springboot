import { Component, OnInit } from '@angular/core';
import { UserPdfService } from '../../services/pdf.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pdf-management',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './pdf-management.component.html',
  styleUrls: ['./pdf-management.component.css']
})
export class PdfManagementComponent implements OnInit {
  userId: number | null = null;
  selectedFile: File | null = null;
  displayedPdf: string | null = null;
  isAdmin: boolean = false;

  constructor(private userPdfService: UserPdfService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    console.log('isAdmin:', this.isAdmin);
  }

  // Método para seleccionar archivo
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  // Subir PDF
  uploadPdf(): void {
    if (this.selectedFile && this.userId && this.isAdmin) {
      this.userPdfService.uploadPdf(this.selectedFile, this.userId).subscribe({
        next: () => {
          console.log('PDF subido correctamente');
          alert('PDF subido correctamente');
        },
        error: (error) => console.error('Error al subir el PDF', error)
      });
    } else {
      console.error('Falta el archivo o el UserID');
    }
  }

  // Actualizar PDF
  updatePdf(): void {
    if (this.selectedFile && this.userId && this.isAdmin) {
      this.userPdfService.updatePdf(this.selectedFile, this.userId).subscribe({
        next: () => {
          console.log('PDF actualizado correctamente');
          alert('PDF actualizado correctamente');
        },
        error: (error) => console.error('Error al actualizar el PDF', error)
      });
    } else {
      console.error('Falta el archivo o el UserID');
    }
  }

  // Ver PDF
  viewPdf(): void {
    if (this.userId) {
      this.userPdfService.getPdf(this.userId).subscribe({
        next: (pdf) => {
          const fileURL = URL.createObjectURL(pdf);
          this.displayedPdf = fileURL;
          window.open(fileURL);
        },
        error: (error) => {
          console.error('Error al obtener el PDF', error);
          alert('No se encontró el PDF para el User ID proporcionado.');
        }
      });
    } else {
      alert('Por favor, introduce un User ID.');
    }
  }

  // Eliminar PDF
  deletePdf(): void {
    if (this.userId && this.isAdmin) {
      this.userPdfService.deletePdf(this.userId).subscribe({
        next: () => {
          console.log('PDF eliminado correctamente');
          alert('PDF eliminado correctamente');
        },
        error: (error) => console.error('Error al eliminar el PDF', error)
      });
    } else {
      console.error('Falta el UserID');
    }
  }
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
