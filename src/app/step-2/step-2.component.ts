import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-2.component.html',
  styleUrl: './step-2.component.css'
})
export class Step2Component {
  @Output() drawSignature = new EventEmitter<void>();
  @Output() uploadSignature = new EventEmitter<void>();

  constructor(
    private router: Router
  ) {}

  onDrawClick() {
    this.router.navigate(['/step-3-pdf']);
  }

  onUploadClick() {
    this.router.navigate(['/step-4-pdf']);
  }
}