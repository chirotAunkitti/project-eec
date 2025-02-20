import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PdfService } from '../../service/PdfService ';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
@Component({
  selector: 'app-dowload-pdf',
  standalone: true,
  imports: [CommonModule,NgxExtendedPdfViewerModule],
  templateUrl: './dowload-pdf.component.html',
  styleUrl: './dowload-pdf.component.css'
})
export class DownloadPdfComponent implements OnInit {
  pdfUrls: string[] = [];
  selectedPdfs: boolean[] = [];

  constructor(private pdfService: PdfService) {}

  ngOnInit() {
    // ดึง URL ของ PDF จาก service
    this.pdfUrls = this.pdfService.getPdfUrls();
    this.selectedPdfs = new Array(this.pdfUrls.length).fill(false);
  }

  onPdfSelect(i: number, event: any) {
    this.selectedPdfs[i] = event.target.checked;
  }

  isAnyPdfSelected(): boolean {
    return this.selectedPdfs.some(selected => selected);
  }

  getSelectedPdfUrl(): string {
    // สมมุติให้แสดง PDF ของไฟล์แรกที่ถูกเลือก (คุณสามารถปรับ logic ได้ตามต้องการ)
    const index = this.selectedPdfs.findIndex(selected => selected);
    return index !== -1 ? this.pdfUrls[index] : '';
  }

  downloadSelectedPdfs() {
    // Implement logic สำหรับดาวน์โหลดเอกสาร PDF ที่เลือก
    // เช่น เปิดลิงค์ดาวน์โหลด, เรียก service เพื่อดาวน์โหลด, เป็นต้น
    console.log('ดาวน์โหลดเอกสาร PDF ที่เลือก:', this.selectedPdfs);
  }
}
