import { Component } from '@angular/core';
import { NgxExtendedPdfViewerModule, PageRenderedEvent } from 'ngx-extended-pdf-viewer';
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
  public pageNumber: number = 1;

  public pdfUrls: string[] = [
    '/assets/PDF/Group1.pdf',
    '/assets/PDF/Group2.pdf',
    '/assets/PDF/Group1.pdf',
    '/assets/PDF/Group1.pdf',
    '/assets/PDF/Group1.pdf',
    '/assets/PDF/Group2.pdf'
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

  goToStep2() {
    this.router.navigate(['/step-2-pdf']);
  }

  onPageRendered(event: PageRenderedEvent) {
    const canvas = event.source?.canvas;
    if (!canvas) return; // ถ้าไม่มี canvas ให้ return ออกไป
  
    const ctx = canvas.getContext('2d');
    if (!ctx) return; // ถ้าไม่มี context ให้ return ออกไป
  
    const img = new Image();
    img.src = 'assets/icon/Screenshot.png'; // โหลดรูปจาก assets
  
    img.onload = () => {
      // ตำแหน่งของรูปภาพใน PDF
      const x = canvas.width * 0.78; // 78% จากขอบซ้าย
      const y = canvas.height * 0.72; // 72% จากขอบบน
  
      // กำหนดขนาดรูปภาพ
      const imgWidth = canvas.width * 0.09; // 9% ของความกว้าง PDF
      const imgHeight = imgWidth * (img.height / img.width); // คงอัตราส่วนของรูป
  
      ctx.drawImage(img, x, y, imgWidth, imgHeight);
    };
  }
}
