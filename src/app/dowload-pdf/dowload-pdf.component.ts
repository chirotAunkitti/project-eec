import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-dowload-pdf',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dowload-pdf.component.html',
  styleUrl: './dowload-pdf.component.css'
})
export class DowloadPdfComponent {

  selectedPdf: Blob = new Blob([new Uint8Array([])], { type: 'application/pdf' });

  downloadFile() {
    saveAs(this.selectedPdf, 'selected-file.pdf');
  }
}
