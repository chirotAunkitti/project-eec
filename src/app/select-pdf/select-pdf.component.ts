import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-pdf',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-pdf.component.html',
  styleUrl: './select-pdf.component.css'
})
export class SelectPDFComponent {
  public isLoading: boolean = false;

  constructor(private router: Router) {}

  async onFileSelected() {
    if (!this.isLoading) {
      this.isLoading = true;
      try {
        // จำลองการโหลดไฟล์
        await new Promise(resolve => setTimeout(resolve, 1000
        ));
        await this.router.navigate(['/check-document']);
      } catch (error) {
        console.error('Error:', error);

      } finally {
        this.isLoading = false;
      }
    }
  }
}