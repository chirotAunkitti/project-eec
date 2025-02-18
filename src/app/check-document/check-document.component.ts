import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-check-document',
  standalone: true,
  imports: [],
  templateUrl: './check-document.component.html',
  styleUrl: './check-document.component.css'
})
export class CheckDocumentComponent {
  @Output() public portalStepChange = new EventEmitter<string>();

  // public modalEl: NgbModalRef | undefined; 
  // public pdfFiles: PdfFile[] = []; 

  public pdfSrc: Blob | string | undefined;

  public annotationsForPdf = [
    // { currentPdf: 1, pageNumbers: [1], x: 65, y: 91, width: 100, imageSrc: 'assets/images/Signed_here.png' },
    // { currentPdf: 1, pageNumbers: [3], x: 59, y: 79, width: 100, imageSrc: 'assets/images/Signed_here.png' },
    // { currentPdf: 1, pageNumbers: [4], x: 59, y: 63, width: 100, imageSrc: 'assets/images/Signed_here.png' },
    // { currentPdf: 1, pageNumbers: [5], x: 59, y: 75, width: 100, imageSrc: 'assets/images/Signed_here.png' },
    // { currentPdf: 1, pageNumbers: [6], x: 71, y: 85, width: 100, imageSrc: 'assets/images/Signed_here.png' },
    // { currentPdf: 2, pageNumbers: [1], x: 39, y: 86, width: 100, imageSrc: 'assets/images/Signed_here.png' },
    // { currentPdf: 2, pageNumbers: [3], x: 62, y: 25, width: 100, imageSrc: 'assets/images/Signed_here.png' },
    // { currentPdf: 3, pageNumbers: [3], x: 47, y: 38.5, width: 100, imageSrc: 'assets/images/Signed_here.png' },
    // { currentPdf: 4, pageNumbers: [1], x: 62, y: 83.5, width: 100, imageSrc: 'assets/images/Signed_here.png' },
    // { currentPdf: 4, pageNumbers: [2], x: 61, y: 25, width: 100, imageSrc: 'assets/images/Signed_here.png' },
    // { currentPdf: 4, pageNumbers: [2], x: 55, y: 72, width: 100, imageSrc: 'assets/images/Signed_here.png' },
  ];

  public currentPdfIndex = 0;
  public currentPdf = 1;

  public totalPages: number = 0;
  public isScrolledToBottom: boolean = false;
  public pageNumber: number = 1;
  public savedPdfId: string | null = null;
  public totalfiles: number = 0;
  public isConfirmed: boolean[] = []; 
  public isLoading: boolean = false;

  constructor(
    // private loadingModalService: LoadingModalService,
    // private handleModalService: HandleModalService,
    // private http: HttpClient,
    // private sessionStorage: SessionStorageService,
    // private authService: AuthenticationService,
  ) {}

  public ngOnInit() {
   
  }

  public loadPdf(id: number): void {
    
  }

  public nextPdf() {
    // this.isScrolledToBottom = false;
    // const confirmAction = () => {
    //     this.currentPdfIndex++;
    //     if (this.currentPdfIndex < this.totalfiles) {
    //         this.currentPdf++;
    //         this.loadPdf(this.currentPdf);
    //     } else {
    //         this.portalStepChange.emit("step-3");
    //         this.authService.setCurrentStep("step-3");
    //         this.sessionStorage.removeItem('currentPdf');
    //     }
    // };
    
    // if (!this.isConfirmed[this.currentPdfIndex]) {
    //   this.isScrolledToBottom = true;
    //   this.handleModalService
    //       .openConfirmModal(
    //         [{ text: 'preview_pdf_text_1' }
    //       ]).result
    //       .then(() => {
    //           this.isConfirmed[this.currentPdfIndex] = true;
    //           confirmAction();
    //         },
    //         () => {}
    //       );
    // } else {
    //     confirmAction();
    // }
   
  }

  public prevPdf() {
    if (this.currentPdfIndex > 0) {
      this.currentPdf--;
      this.currentPdfIndex--;
      this.loadPdf(this.currentPdf);
    }
  }

  public handlePdfLoaded() {    
    // this.totalPages = event.pagesCount;
    // this.handlePageChange(this.pageNumber);
  }

  public handlePageChange(pageNumber: number) {
    this.pageNumber = pageNumber;
    if (this.pageNumber === this.totalPages) {
      this.isScrolledToBottom = true;
    }
  }

  public handleReadCompleted(event: boolean) {
    this.pageNumber = 1;
    this.isScrolledToBottom = event;
  }
}
