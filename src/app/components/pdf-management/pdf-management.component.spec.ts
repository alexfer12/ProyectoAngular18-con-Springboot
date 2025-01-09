import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfManagementComponent } from './pdf-management.component';

describe('PdfManagementComponent', () => {
  let component: PdfManagementComponent;
  let fixture: ComponentFixture<PdfManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
