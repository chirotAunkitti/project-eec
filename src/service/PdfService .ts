import { Injectable } from '@angular/core';

interface SignedDocument {
  name: string;
  url: string;
  signedDataUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class  PdfSignatureServic {
  private signedDocuments: SignedDocument[] = [];


  addSignedDocument(doc: SignedDocument) {
    this.signedDocuments.push(doc);
  }

  // ดึงรายการเอกสารที่เซ็นแล้ว
  getSignedDocuments(): SignedDocument[] {
    return this.signedDocuments;
  }

  // อัพเดตเอกสารที่เซ็นแล้ว
  updateSignedDocument(index: number, signedDataUrl: string) {
    if (this.signedDocuments[index]) {
      this.signedDocuments[index].signedDataUrl = signedDataUrl;
    }
  }

  // ดาวน์โหลดเอกสาร
downloadDocument(index: number) {
  const doc = this.signedDocuments[index];
  if (doc && doc.signedDataUrl) {
    // ตรวจสอบว่า URL ใช้งานได้
    if (this.isValidUrl(doc.signedDataUrl)) {
      const link = document.createElement('a');
      link.href = doc.signedDataUrl;
      link.download = `${doc.name}.pdf`;
      link.click();
    } else {
      console.error('Invalid URL for document download');
    }
  } else {
    console.error('No signed document available at this index');
  }
}

// ตรวจสอบว่า URL เป็น URL ที่สามารถเข้าถึงได้
isValidUrl(url: string): boolean {
  try {
    new URL(url); // พยายามสร้าง URL object
    return true;
  } catch (e) {
    return false;
  }
}


  // ดาวน์โหลดทุกเอกสาร
  downloadAllDocuments() {
    this.signedDocuments.forEach((doc, index) => {
      setTimeout(() => {
        if (doc.signedDataUrl) {
          const link = document.createElement('a');
          link.href = doc.signedDataUrl;
          link.download = `${doc.name}.pdf`;
          link.click();
        }
      }, index * 1000);
    });
  }

  // ล้างข้อมูลเอกสารทั้งหมด
  clearDocuments() {
    this.signedDocuments = [];
  }
}