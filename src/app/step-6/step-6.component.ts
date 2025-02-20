import { Component, OnInit, Inject } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PdfService } from '../../service/PdfService ';

@Component({
  selector: 'app-step-6',
  standalone: true,
  imports: [NgxExtendedPdfViewerModule,CommonModule,],
  templateUrl: './step-6.component.html',
  styleUrl: './step-6.component.css'
})
export class Step6Component implements OnInit {
  signedDocs: any[] = []; // เอกสารที่เซ็นแล้ว
  public pdfUrls: string[] = [];
  currentPdfIndex: number = 0; // ตำแหน่งของ PDF ปัจจุบัน
  pageNumber: number = 1; // เลขหน้าปัจจุบันของ PDF

  constructor(private router: Router, private pdfService: PdfService) {}

  ngOnInit() {
    // โหลดเอกสาร PDF จาก Service
    this.pdfUrls = this.pdfService.pdfUrls.length > 0 ? this.pdfService.pdfUrls : [
      './assets/PDF/file-select.pdf',
      './assets/PDF/file.pdf',
    ];
  }

  // ไปยัง PDF ก่อนหน้า
  prevPdf() {
    if (this.currentPdfIndex > 0) {
      this.currentPdfIndex--;
    }
  }

  // ไปยัง PDF ถัดไป
  nextPdf() {
    if (this.currentPdfIndex < this.pdfUrls.length - 1) {
      this.currentPdfIndex++;
    }
  }

  // ดาวน์โหลดเอกสาร
  goToDownloadPdf() {
    this.router.navigate(['/download-pdf']);
  }

  // แสดงหมายเลขของ PDF ปัจจุบัน
  get currentPdf(): number {
    return this.currentPdfIndex + 1;
  }

  // แสดงจำนวนไฟล์ทั้งหมด
  get totalfiles(): number {
    return this.pdfUrls.length;
  }
}
