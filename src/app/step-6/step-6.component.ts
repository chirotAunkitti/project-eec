import { Component } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-6',
  standalone: true,
  imports: [NgxExtendedPdfViewerModule,CommonModule],
  templateUrl: './step-6.component.html',
  styleUrl: './step-6.component.css'
})
export class Step6Component {
  pdfUrls: string[] = [
    '/assets/PDF/file-select.pdf',
    '/assets/PDF/file.pdf',

  ];

  selectedPdfs: boolean[] = [false, false, false]; // เก็บสถานะของการเลือกไฟล์
  currentPdfIndex = 0;
  currentPdf = 1;
  totalfiles = 3;

  constructor(private router: Router) {}

  // ฟังก์ชันเลือกไฟล์ PDF ที่จะดู
  getSelectedPdfUrl() {
    const selectedIndex = this.selectedPdfs.findIndex(isSelected => isSelected);
    return this.pdfUrls[selectedIndex]; // คืนค่า URL ของไฟล์ที่เลือก
  }

  // ฟังก์ชันจัดการเลือก PDF
  onPdfSelect(index: number, event: any) {
    this.selectedPdfs[index] = event.target.checked;
  }

  prevPdf() {
    if (this.currentPdfIndex > 0) {
      this.currentPdfIndex--;
    }
  }

  nextPdf() {
    if (this.currentPdfIndex < this.totalfiles - 1) {
      this.currentPdfIndex++;
    }
  }

  // ฟังก์ชันไปยัง Step 7 และส่งข้อมูลไฟล์ที่เลือก
  goToStep7() {
    const selectedFiles = this.pdfUrls.filter((url, index) => this.selectedPdfs[index]);
    // ส่งข้อมูลไปยัง Step 7
    this.router.navigate(['/step-7-pdf'], { queryParams: { files: JSON.stringify(selectedFiles) } });
  }
  isAnyPdfSelected() {
    return this.selectedPdfs.some(isSelected => isSelected);
  }
}
