import { Component, OnInit, Renderer2, ViewChild, ElementRef, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PdfService } from '../../service/pdf.service';

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
  pdfDimensions = { width: 0, height: 0 };
  signaturePosition = { x: 800, y: 500, scale: 1 };
  private isBrowser: boolean;

  constructor(
    private router: Router,
    private pdfService: PdfService,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.initializePdf();
  }

  async initializePdf() {
    this.pdfUrls = this.pdfService.pdfUrls.length > 0 ? 
      this.pdfService.pdfUrls : 
      ['./assets/PDF/Group1.pdf', './assets/PDF/Group2.pdf', '/assets/PDF/Group1.pdf'];

    this.signatureData = this.pdfService.getSignatureData();
    this.signedUserName = this.pdfService.getSignedUserName() ?? 'ไม่ระบุชื่อ';

    if (this.isBrowser) {
      setTimeout(() => {
        this.updatePdfDimensions();
        const savedPosition = this.pdfService.getSignaturePosition();
        if (savedPosition) {
          this.signaturePosition = savedPosition;
          this.updateSignaturePosition();
        }
      }, 1000);
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
    if (this.isBrowser) {
      const pdfContainer = document.querySelector('.pdf-container');
      if (pdfContainer) {
        const rect = pdfContainer.getBoundingClientRect();
        this.pdfDimensions = {
          width: rect.width,
          height: rect.height
        };
      }
    }
  }

  updateSignaturePosition() {
    if (this.isBrowser) {
      const { x, y, scale } = this.signaturePosition;
      
      // คำนวณตำแหน่งจริงโดยใช้เปอร์เซ็นต์ของขนาด container
      const actualX = (x / 100) * this.pdfDimensions.width;
      const actualY = (y / 100) * this.pdfDimensions.height;
      
      const signatureElement = document.querySelector('.signature-container') as HTMLElement;
      if (signatureElement) {
        signatureElement.style.left = `${actualX}px`;
        signatureElement.style.top = `${actualY}px`;
        signatureElement.style.transform = `scale(${scale})`;
      }
    }
  }
  setSignaturePosition(x: number, y: number, scale: number = 1) {
    this.signaturePosition = { x, y, scale };
    this.pdfService.setSignaturePosition(x, y, scale);
    if (this.isBrowser) {
      this.updateSignaturePosition();
    }
  }

  onPdfClick(event: MouseEvent) {
    if (this.isBrowser) {
      const pdfContainer = document.querySelector('.pdf-container');
      if (pdfContainer) {
        const rect = pdfContainer.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        this.setSignaturePosition(x, y);
      }
    }
  }

  prevPdf() {
    if (this.currentPdfIndex > 0) {
      this.currentPdfIndex--;
      if (this.isBrowser) {
        setTimeout(() => this.updateSignaturePosition(), 500);
      }
    }
  }

  nextPdf() {
    if (this.currentPdfIndex < this.pdfUrls.length - 1) {
      this.currentPdfIndex++;
      if (this.isBrowser) {
        setTimeout(() => this.updateSignaturePosition(), 500);
      }
    }
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