import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-step-4',
  templateUrl: './step-4.component.html',
  styleUrls: ['./step-4.component.css'],
  standalone: true,
  imports: [CommonModule] 
})
export class Step4Component {
  selectedImage: string | null = null;
  zoomLevel: number = 1;
  fileName: string = 'No file chosen';

  constructor(
    private router: Router
  ) {}

  
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
        console.log('Image loaded:', this.selectedImage);
      };
      reader.readAsDataURL(file);
    }
  }

  zoomIn(): void {
    if (this.zoomLevel < 3) {
      this.zoomLevel += 0.1;
    }
  }

  zoomOut(): void {
    if (this.zoomLevel > 0.5) {
      this.zoomLevel -= 0.1;
    }
  }

  reset(): void {
    this.selectedImage = null;
    this.zoomLevel = 1;
    this.fileName = 'No file chosen';
  }

  onSave(): void {
    if (this.selectedImage) {
      this.router.navigate(['/step-5-pdf']);
    }
  }

  onNono(): void {
      this.router.navigate(['/step-2-pdf']);
    }

}