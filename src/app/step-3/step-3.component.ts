import { Component, ElementRef, ViewChild, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-3',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step-3.component.html',
  styleUrls: ['./step-3.component.css']
})
export class Step3Component implements AfterViewInit {
  @ViewChild('signatureCanvas') signatureCanvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private isDrawing = false;
  private lastX = 0;
  private lastY = 0;
  private hasSignature = false;
  private platformId = inject(PLATFORM_ID);
  
  nameControl = new FormControl('', [Validators.required, Validators.pattern(/^[ก-๙\s]+$/)]);
  public isLoading: boolean = false;
  public isBrowser: boolean;

  constructor(private router: Router) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.initializeCanvas();
    }
  }

  private initializeCanvas() {
    const canvas = this.signatureCanvas.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    
    this.ctx.scale(2, 2);
    this.ctx.strokeStyle = '#000';
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
  }

  startDrawing(event: MouseEvent | TouchEvent) {
    if (!this.isBrowser) return;
    
    this.isDrawing = true;
    const pos = this.getPosition(event);
    this.lastX = pos.x;
    this.lastY = pos.y;
  }

  draw(event: MouseEvent | TouchEvent) {
    if (!this.isBrowser || !this.isDrawing) return;
    
    event.preventDefault();
    const pos = this.getPosition(event);
    const currentX = pos.x;
    const currentY = pos.y;

    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(currentX, currentY);
    this.ctx.stroke();

    this.lastX = currentX;
    this.lastY = currentY;
    this.hasSignature = true;
  }

  stopDrawing() {
    if (!this.isBrowser) return;
    this.isDrawing = false;
  }

  clearCanvas() {
    if (!this.isBrowser || this.isLoading) return;
    
    this.ctx.clearRect(0, 0, this.signatureCanvas.nativeElement.width, this.signatureCanvas.nativeElement.height);
    this.hasSignature = false;
  }

  isFormValid(): boolean {
    return this.hasSignature && this.nameControl.valid;
  }

  async saveSignature() {
    if (!this.isBrowser || this.isLoading || !this.isFormValid()) return;
    
    this.isLoading = true;
    try {
      const dataUrl = this.signatureCanvas.nativeElement.toDataURL('image/png');
      const name = this.nameControl.value;
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Signature saved:', { signature: dataUrl, name });
      
      this.router.navigate(['/step-5-pdf']);
    } catch (error) {
      console.error('Error saving signature:', error);
      // Handle error here
    } finally {
      this.isLoading = false;
    }
  }

  cancel() {
    if (!this.isLoading) {
      this.router.navigate(['/step-2-pdf']);
    }
  }

  private getPosition(event: MouseEvent | TouchEvent) {
    const canvas = this.signatureCanvas.nativeElement;
    const rect = canvas.getBoundingClientRect();
    let x, y;

    if (event instanceof MouseEvent) {
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
    } else {
      const touch = event.touches[0];
      x = touch.clientX - rect.left;
      y = touch.clientY - rect.top;
    }

    return { x, y };
  }

  getNameErrorMessage(): string {
    if (this.nameControl.hasError('required')) {
      return 'กรุณากรอกชื่อ-นามสกุล';
    }
    if (this.nameControl.hasError('pattern')) {
      return 'กรุณากรอกชื่อเป็นภาษาไทยเท่านั้น';
    }
    return '';
  }
}