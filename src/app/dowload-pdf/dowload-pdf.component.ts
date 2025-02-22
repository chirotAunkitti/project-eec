import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfSignatureServic } from '../../service/PdfService ';
import { Step6Component } from '../step-6/step-6.component';


@Component({
  selector: 'app-dowload-pdf',
  standalone: true,
  imports: [CommonModule, NgxExtendedPdfViewerModule],
  templateUrl: './dowload-pdf.component.html',
  styleUrls: ['./dowload-pdf.component.css']
})
export class DownloadPdfComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private pdfSignatureServic: PdfSignatureServic) {}

  ngOnInit(): void {}

async downloadPdf(): Promise<void> {

}



  
}
