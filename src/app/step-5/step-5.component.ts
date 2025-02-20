import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-5',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-5.component.html',
  styleUrl: './step-5.component.css'
})
export class Step5Component {
  isLoading: boolean = false;  // ใช้เพื่อควบคุมการแสดงผล spinner

  constructor(private router: Router) {}

  ngOnInit(): void {
    // ใช้ setTimeout เพื่อหน่วงเวลา 1 วินาที
    setTimeout(() => {
      this.showStatusAndNavigate();
    }, 1000); // หน่วงเวลา 1000ms = 1 วินาที
  }

  async showStatusAndNavigate() {
    this.isLoading = true; // ตั้งค่าการโหลด
    try {
      // จำลองสถานะการโหลด
      await new Promise(resolve => setTimeout(resolve, 2000)); // รอ 2 วินาที
      this.router.navigate(['/step-6-pdf']);  // หลังจากโหลดเสร็จ, ไปยัง step-6
    } catch (error) {
      console.error('Error:', error);
    } finally {
      this.isLoading = false; // ปิดการโหลด
    }
  }
}
