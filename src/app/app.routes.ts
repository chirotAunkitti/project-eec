import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { SelectPDFComponent } from './select-pdf/select-pdf.component';
import { CheckDocumentComponent } from './check-document/check-document.component';
import { Step2Component } from './step-2/step-2.component';
import { Step3Component } from './step-3/step-3.component';
import { Step4Component } from './step-4/step-4.component';
import { Step5Component } from './step-5/step-5.component';
import { DownloadPdfComponent } from './dowload-pdf/dowload-pdf.component';
import { Step6Component } from './step-6/step-6.component';
import { Step7Component } from './step-7/step-7.component';
// import { ServiceComponent } from './service/service.component';


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
  { path: 'step-5-pdf',
    component: Step5Component
  },
  {
    path: 'step-6-pdf',
    component: Step6Component
  },
  {
    path: 'download-pdf',
    component:DownloadPdfComponent
  },
  {
    path: 'step-7-pdf',
    component:Step7Component
  },
  // {
  //   path:'service',
  //   component: ServiceComponent
  // }
];

export const appRouting = provideRouter(routes);
