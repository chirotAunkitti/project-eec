import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPDFComponent } from './select-pdf.component';

describe('SelectPDFComponent', () => {
  let component: SelectPDFComponent;
  let fixture: ComponentFixture<SelectPDFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectPDFComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
