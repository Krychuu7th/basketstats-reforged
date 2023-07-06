import { Component, ElementRef, Input, SecurityContext, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FileType } from '../../enum/file-type';
const draggedOnClassName = 'dragged-on';

@Component({
  selector: 'app-file-dropzone-input',
  templateUrl: './file-dropzone-input.component.html',
  styleUrls: ['./file-dropzone-input.component.scss']
})
export class FileDropzoneInputComponent {

  @Input()
  public control: FormControl;
  @Input()
  public formFieldDefName: string;
  @Input()
  public placeholder: string;
  @Input()
  public draggedOverPlaceholder: string;
  @Input()
  public fileType: FileType;
  @Input()
  public readonly: boolean;

  @ViewChild('fileDropzone')
  fileDropzone: ElementRef;

  public isDraggedOver = false;
  public fileUrl: string;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  public fileChange(files: FileList | undefined): void {
    if (!!files?.length) {
      const file = files[0];
      if (file) {
        this.control?.setValue(file);
        this.readFilePreview(file);
      }
    }
  }

  private readFilePreview(file: File): void {
    this.fileUrl = '';
    const fileReader = new FileReader();
    fileReader.onload = event => {
      let fileUrlToSanitize = '';
      fileUrlToSanitize += fileReader.result;
      this.fileUrl += this.sanitizer.sanitize(SecurityContext.URL, fileUrlToSanitize);
    };
    fileReader.readAsDataURL(file);
  }

  public dragOverFileDropzone(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDraggedOver = true;
    this.fileDropzone.nativeElement.classList.add(draggedOnClassName);
  }

  public dragLeaveFileDropzone(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDraggedOver = false;
    this.fileDropzone.nativeElement.classList.remove(draggedOnClassName);
  }

  public dropOnFileDropzone(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDraggedOver = false;
    this.fileDropzone.nativeElement.classList.remove(draggedOnClassName);
    this.fileChange(event.dataTransfer?.files);
  }

}
