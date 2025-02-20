import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  // ตัวอย่างข้อมูลเอกสารที่เซ็นแล้ว
  private signedDocuments = [
    { name: 'เอกสาร 1', url: 'http://localhost:4200/assets/PDF/file-select.pdf'},
    { name: 'เอกสาร 2', url: '/assets/PDF/file.pdf' }
  ];

  // ตัวอย่าง URL ของ PDF สำหรับดาวน์โหลด
  public pdfUrls: string[] = [
    '/assets/PDF/file-select.pdf',
    '/assets/PDF/file.pdf',
  ];

  getSignedDocuments() {
    return this.signedDocuments;
  }

  getPdfUrls() {
    return this.pdfUrls;
  }
}
