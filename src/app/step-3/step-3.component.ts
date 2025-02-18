import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
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
  nameControl = new FormControl('');

  constructor(
    private router: Router
  ) {}

  ngAfterViewInit() {
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
    this.isDrawing = true;
    const pos = this.getPosition(event);
    this.lastX = pos.x;
    this.lastY = pos.y;
  }

  draw(event: MouseEvent | TouchEvent) {
    if (!this.isDrawing) return;
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
  }

  stopDrawing() {
    this.isDrawing = false;
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.signatureCanvas.nativeElement.width, this.signatureCanvas.nativeElement.height);
  }

  saveSignature() {
    // const dataUrl = this.signatureCanvas.nativeElement.toDataURL('image/png');
    // const name = this.nameControl.value;
    // console.log('Signature saved:', { signature: dataUrl, name });
    this.router.navigate(['/step-5-pdf']);
  }

  cancel() {
    // this.clearCanvas();
    // this.nameControl.reset();
    this.router.navigate(['/step-2-pdf']);
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
}