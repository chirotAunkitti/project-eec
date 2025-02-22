import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';  // นำเข้า ReactiveFormsModule

@Component({
  selector: 'app-step-4',
  templateUrl: './step-4.component.html',
  styleUrls: ['./step-4.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]  // เพิ่ม ReactiveFormsModule
})
export class Step4Component {
  selectedImage: string | null = null;
  zoomLevel: number = 1;
  fileName: string = 'No file chosen';
  isLoading: boolean = false;

  // ใช้ FormControl และ Validators
  nameControl = new FormControl('', [Validators.required, Validators.minLength(2)]);

  constructor(private router: Router) {}

  getNameErrorMessage(): string {
    if (this.nameControl.hasError('required')) {
      return 'กรุณากรอกชื่อก่อนบันทึก';
    }
    if (this.nameControl.hasError('minlength')) {
      return 'ชื่อควรมีอย่างน้อย 2 ตัวอักษร';
    }
    return '';
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
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

  async onSave(): Promise<void> {
    if (this.nameControl.invalid || !this.selectedImage || this.isLoading) {
      return;
    }

    this.isLoading = true;
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      await this.router.navigate(['/step-7-pdf']);
    } catch (error) {
      console.error('Error saving signature:', error);
    } finally {
      this.isLoading = false;
    }
  }

  onNono(): void {
    if (!this.isLoading) {
      this.router.navigate(['/step-2-pdf']);
    }
  }
}
