import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDropzoneInputComponent } from './file-dropzone-input.component';

describe('FileDropzoneInputComponent', () => {
  let component: FileDropzoneInputComponent;
  let fixture: ComponentFixture<FileDropzoneInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileDropzoneInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileDropzoneInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
