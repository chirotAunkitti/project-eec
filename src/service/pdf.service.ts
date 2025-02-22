import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private signatureData: string | null = null;
  private signedUserName: string = '';
  private signaturePosition: { 
    x: number;
    y: number;
    scale: number;
  } | null = null;
  public pdfUrls: string[] = [];
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadFromStorage();
    }
  }

  setSignatureData(signature: string, userName: string) {
    try {
      if (!signature || !userName) {
        throw new Error('Signature and username are required');
      }
      this.signatureData = signature;
      this.signedUserName = userName;
      
      if (isPlatformBrowser(this.platformId)) {
        this.saveToStorage();
      }
    } catch (error) {
      console.error('Error saving signature:', error);
      throw error;
    }
  }

  setSignaturePosition(x: number, y: number, scale: number = 1) {
    try {
      if (x < 0 || y < 0) {
        throw new Error('Position values must be positive');
      }
      this.signaturePosition = { x, y, scale };
      
      if (isPlatformBrowser(this.platformId)) {
        this.saveToStorage();
      }
    } catch (error) {
      console.error('Error setting position:', error);
      throw error;
    }
  }

  getSignatureData(): string | null {
    return this.signatureData;
  }

  getSignedUserName(): string {
    return this.signedUserName;
  }

  getSignaturePosition() {
    return this.signaturePosition;
  }

  private saveToStorage() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const data = {
          signature: this.signatureData,
          userName: this.signedUserName,
          position: this.signaturePosition
        };
        localStorage.setItem('signatureData', JSON.stringify(data));
      } catch (error) {
        console.error('Error saving to storage:', error);
      }
    }
  }

  private loadFromStorage() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const savedData = localStorage.getItem('signatureData');
        if (savedData) {
          const data = JSON.parse(savedData);
          this.signatureData = data.signature;
          this.signedUserName = data.userName;
          this.signaturePosition = data.position;
        }
      } catch (error) {
        console.error('Error loading from storage:', error);
      }
    }
  }

  clearSignatureData() {
    this.signatureData = null;
    this.signedUserName = '';
    this.signaturePosition = null;
    
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('signatureData');
    }
  }
}