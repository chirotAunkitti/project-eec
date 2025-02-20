import { Component } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-document',
  standalone: true,
  imports: [NgxExtendedPdfViewerModule],
  templateUrl: './check-document.component.html',
  styleUrl: './check-document.component.css'
})
export class CheckDocumentComponent {
  public currentPdfIndex = 0;
  public currentPdf = 1;
  public totalfiles = 2;
  public pageNumber: number = 1;

  public pdfUrls: string[] = [
    '/assets/PDF/file(2).pdf',
    '/assets/PDF/file.pdf'
  ];

  constructor(private router: Router) {}

  nextPdf() {
    if (this.currentPdfIndex < this.totalfiles - 1) {
      this.currentPdfIndex++;
      this.currentPdf++;
      this.pageNumber = 1;
    }
  }

  prevPdf() {
    if (this.currentPdfIndex > 0) {
      this.currentPdfIndex--;
      this.currentPdf--;
      this.pageNumber = 1;
    }
  }
  public goToStep2() {
    this.router.navigate(['/step-2-pdf']);
  }
}
