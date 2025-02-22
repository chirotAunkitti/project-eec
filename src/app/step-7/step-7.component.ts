import { Component } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver'; // นำเข้า FileSaver

@Component({
  selector: 'app-step-7',
  standalone: true,
  imports: [NgxExtendedPdfViewerModule],
  templateUrl: './step-7.component.html',
  styleUrls: ['./step-7.component.css']
})
export class Step7Component {
  public currentPdfIndex = 0;
  public currentPdf = 1;
  public pageNumber: number = 1;

  public pdfUrls: string[] = [
    '/assets/PDF/Group 39.pdf',
    '/assets/PDF/Group 37.pdf',
    '/assets/PDF/Group 39.pdf'
  ];

  get totalfiles(): number {
    return this.pdfUrls.length;
  }

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

  goBarkPdf() {
    this.router.navigate(['/step-2-pdf']);
  }

  public downloadAllFiles() {
    this.pdfUrls.forEach((url, index) => {
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to download ${url}`);
          }
          return response.blob();
        })
        .then(blob => {
          const fileName = url.split('/').pop() || `file-${index + 1}.pdf`; // ตั้งชื่อไฟล์ตาม URL หรือใช้ index
          FileSaver.saveAs(blob, fileName);
        })
        .catch(error => console.error(`Error downloading ${url}:`, error));
    });
  }
}
