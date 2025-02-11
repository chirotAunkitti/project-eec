import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-select-pdf',
  standalone: true,
  imports: [],
  templateUrl: './select-pdf.component.html',
  styleUrl: './select-pdf.component.css'
})
export class SelectPDFComponent {

  constructor(private router: Router) {}

  onFileSelected() {
    this.router.navigate(['/check-document']);
  }
}