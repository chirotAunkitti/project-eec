import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


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
function saveAs(selectedPdf: Blob, arg1: string) {
  throw new Error('Function not implemented.');
}

