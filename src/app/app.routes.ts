import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { SelectPDFComponent } from './select-pdf/select-pdf.component';
import { CheckDocumentComponent } from './check-document/check-document.component';
import { Step2Component } from './step-2/step-2.component';
import { Step3Component } from './step-3/step-3.component';
import { Step4Component } from './step-4/step-4.component';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/select-pdf', 
    pathMatch: 'full' 
  },
  { 
    path: 'select-pdf', 
    component: SelectPDFComponent 
  },
  { path: 'check-document', 
    component: CheckDocumentComponent 
  },
  { path: 'step-2-pdf',  
    component: Step2Component 
  },
  { path: 'step-3-pdf',  
    component: Step3Component 
  },
  { path: 'step-4-pdf',  
    component: Step4Component 
  },

];

export const appRouting = provideRouter(routes);
