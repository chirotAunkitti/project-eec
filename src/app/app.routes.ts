import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { SelectPDFComponent } from './select-pdf/select-pdf.component';
import { CheckDocumentComponent } from './check-document/check-document.component';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/select-pdf', 
    pathMatch: 'full' 
  },
  { 
    path: 'select-pdf', 
    component: SelectPDFComponent },
  { path: 'check-document', 
    component: CheckDocumentComponent },

];

export const appRouting = provideRouter(routes);
