import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pokemon/:id', component: HomeComponent },
  { path: '**', redirectTo: '' }
];
