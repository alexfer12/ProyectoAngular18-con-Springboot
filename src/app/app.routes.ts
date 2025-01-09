import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { ImageManagementComponent } from './components/image-management/image-management.component';
import { PdfManagementComponent } from './components/pdf-management/pdf-management.component';
import { UserManagementComponent } from './components/user-management/user-management.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'images', component: ImageManagementComponent },
  { path: 'pdfs', component: PdfManagementComponent },
  { path: 'users', component: UserManagementComponent },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule, FormsModule, ReactiveFormsModule]
})
export class AppRoutingModule {}
