import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private signatureData: string | null = null;
  private signedUserName: string = '';
  // เพิ่ม scale เพื่อคำนวณตำแหน่งตามขนาด PDF
  private signaturePosition: { 
    x: number ;  // ตำแหน่ง X คิดจากขอบซ้าย PDF (0-100%)
    y: number;  // ตำแหน่ง Y คิดจากขอบบน PDF (0-100%)
    scale: number;  // อัตราส่วนการย่อขยาย
  } | null = null;
  public pdfUrls: string[] = [];

  constructor() {}

  setSignatureData(signature: string, userName: string) {
    this.signatureData = signature;
    this.signedUserName = userName;
  }

  // ปรับปรุง method เก็บตำแหน่ง
  setSignaturePosition(x: number, y: number, scale: number = 1) {
    this.signaturePosition = { x, y, scale };
  }

  getSignatureData(): string | null {
    return this.signatureData;
  }

  getSignedUserName(): string {
    return this.signedUserName;
  }

  getSignaturePosition() {
    return this.signaturePosition;
  }
}