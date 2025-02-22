import { Component, OnInit, Renderer2, ViewChild, ElementRef, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PdfService } from '../../service/pdf.service';

interface PageRenderedEvent {
  source?: {
    canvas?: HTMLCanvasElement;
  };
}

@Component({
  selector: 'app-step-6',
  standalone: true,
  imports: [NgxExtendedPdfViewerModule, CommonModule],
  templateUrl: './step-6.component.html',
  styleUrls: ['./step-6.component.css']
})
export class Step6Component implements OnInit {
  @ViewChild('pdfViewer') pdfViewer!: ElementRef;
  
  signedDocs: any[] = [];
  public pdfUrls: string[] = [];
  currentPdfIndex: number = 0;
  pageNumber: number = 1;
  signatureData: string | null = null;
  signedUserName: string = '';
  isSignatureVisible: boolean = false;
  pdfDimensions = { width: 0, height: 0 };
  signaturePosition = { x: 50, y: 50, scale: 1 }; // ตั้งค่าเริ่มต้นที่กลางหน้า
  private isBrowser: boolean;
  private pdfLoadTimeout: any;

  constructor(
    private router: Router,
    private pdfService: PdfService,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      console.log('Initializing Step 6 Component');
      this.initializePdf();
    }
  }

  ngOnDestroy() {
    if (this.pdfLoadTimeout) {
      clearTimeout(this.pdfLoadTimeout);
    }
  }

  async initializePdf() {
    try {
      // โหลด URLs ของ PDF
      this.pdfUrls = this.pdfService.pdfUrls.length > 0 ? 
        this.pdfService.pdfUrls : 
        ['./assets/PDF/Group1.pdf', './assets/PDF/Group2.pdf', '/assets/PDF/Group1.pdf'];

      // โหลดข้อมูลลายเซ็น
      this.signatureData = this.pdfService.getSignatureData();
      this.signedUserName = this.pdfService.getSignedUserName() || 'ไม่ระบุชื่อ';

      console.log('Signature Data:', this.signatureData);
      console.log('Signed Username:', this.signedUserName);

      // รอให้ PDF โหลดเสร็จ
      this.pdfLoadTimeout = setTimeout(() => {
        this.updatePdfDimensions();
        const savedPosition = this.pdfService.getSignaturePosition();
        if (savedPosition) {
          this.signaturePosition = savedPosition;
        }
        this.updateSignaturePosition();
        this.isSignatureVisible = true;
      }, 1000);

    } catch (error) {
      console.error('Error initializing PDF:', error);
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (this.isBrowser) {
      this.updatePdfDimensions();
      this.updateSignaturePosition();
    }
  }

  updatePdfDimensions() {
    try {
      const pdfContainer = document.querySelector('.pdf-container');
      if (pdfContainer) {
        const rect = pdfContainer.getBoundingClientRect();
        this.pdfDimensions = {
          width: rect.width,
          height: rect.height
        };
        console.log('PDF Dimensions updated:', this.pdfDimensions);
      }
    } catch (error) {
      console.error('Error updating PDF dimensions:', error);
    }
  }

  updateSignaturePosition() {
    try {
      const signatureElement = document.querySelector('.signature-container') as HTMLElement;
      if (signatureElement) {
        const { x, y, scale } = this.signaturePosition;
        
        // ใช้ค่า pixel แทน percentage
        signatureElement.style.left = `${x}px`;
        signatureElement.style.top = `${y}px`;
        signatureElement.style.transform = `scale(${scale})`;
      }
    } catch (error) {
      console.error('Error updating signature position:', error);
    }
  }

  // onPdfClick(event: MouseEvent) {
  //   if (!this.isBrowser || !this.signatureData) return;
    
  //   try {
  //     const pdfContainer = document.querySelector('.pdf-container');
  //     if (pdfContainer) {
  //       const rect = pdfContainer.getBoundingClientRect();
        
  //       // คำนวณตำแหน่งเป็นเปอร์เซ็นต์
  //       const x = ((event.clientX - rect.left) / rect.width) * 100;
  //       const y = ((event.clientY - rect.top) / rect.height) * 100;
        
  //       this.setSignaturePosition(x, y, this.signaturePosition.scale);
  //       console.log('New signature position:', { x, y });
  //     }
  //   } catch (error) {
  //     console.error('Error handling PDF click:', error);
  //   }
  // }

  setSignaturePosition(x: number, y: number, scale: number = 1) {
    try {
      this.signaturePosition = { x, y, scale };
      this.pdfService.setSignaturePosition(x, y, scale);
      this.updateSignaturePosition();
    } catch (error) {
      console.error('Error setting signature position:', error);
    }
  }

  onPageRendered(event: PageRenderedEvent) {
    if (!this.signatureData || !this.isBrowser) return;
    
    try {
      const canvas = event.source?.canvas;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const img = new Image();
      img.src = this.signatureData;
      
      img.onload = () => {
        // กำหนดขนาดคงที่สำหรับลายเซ็น (เป็นสัดส่วนกับความกว้างของ PDF)
        const signatureWidth = canvas.width * 0.15;
        const signatureHeight = signatureWidth * (img.height / img.width);
        
        // กำหนดตำแหน่งคงที่สำหรับทั้งกลุ่ม (ลายเซ็น + ชื่อ)
        const groupX = canvas.width * 0.83;
        const groupY = canvas.height * 0.71;
        
        // คำนวณตำแหน่งลายเซ็น (อยู่กึ่งกลางของกลุ่ม)
        const signatureX = groupX - (signatureWidth / 2);
        
        // วาดลายเซ็น
        ctx.drawImage(img, signatureX, groupY, signatureWidth, signatureHeight);
        
        // กำหนดขนาดและรูปแบบตัวอักษร
        const fontSize = Math.min(canvas.width * 0.015, signatureWidth * 0.2); // ขนาดตัวอักษรสัมพันธ์กับลายเซ็น
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        
        // วาดชื่อใต้ลายเซ็น (ใช้ตำแหน่งเดียวกับลายเซ็น)
        const textY = groupY + signatureHeight + (fontSize * 0.8); // ระยะห่างจากลายเซ็นเป็นสัดส่วนกับขนาดตัวอักษร
        ctx.fillText(this.signedUserName, groupX, textY);
        
        console.log('Signature and name rendered together', {
          signatureWidth,
          signatureHeight,
          fontSize,
          groupX,
          groupY
        });
      };
    } catch (error) {
      console.error('Error rendering signature:', error);
    }
}

  // Navigation methods
  prevPdf() {
    if (this.currentPdfIndex > 0) {
      this.currentPdfIndex--;
      this.resetSignatureAfterNavigation();
    }
  }

  nextPdf() {
    if (this.currentPdfIndex < this.pdfUrls.length - 1) {
      this.currentPdfIndex++;
      this.resetSignatureAfterNavigation();
    }
  }

  private resetSignatureAfterNavigation() {
    // รอให้ PDF โหลดใหม่เสร็จก่อนอัพเดตลายเซ็น
    setTimeout(() => {
      this.updatePdfDimensions();
      this.updateSignaturePosition();
    }, 500);
  }

  goBarkPdf() {
    this.router.navigate(['/step-2-pdf']);
  }

  goToDownloadPdf() {
    this.router.navigate(['/download-pdf']);
  }

  get currentPdf(): number {
    return this.currentPdfIndex + 1;
  }

  get totalfiles(): number {
    return this.pdfUrls.length;
  }
}