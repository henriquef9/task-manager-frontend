import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-input-profile-picture',
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './input-profile-picture.component.html',
  styleUrl: './input-profile-picture.component.scss',
})

export class InputProfilePictureComponent {

  @Input() acceptedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  @Input() maxSizeMB = 2;

  @Input({required: true}) controlName!: string;
  @Input({required: true}) control!: FormControl;
  @Input({required: true}) form!: FormGroup;
  @Output('onFile') onFileSelectionEmitter = new EventEmitter<File | null>();

  protected file: File | null = null;
  previewUrl: string | null = null;

  error: boolean = false;
 

  onFileSelected(event: Event) {
   const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      this.error = false;

      if(!this.acceptedTypes.includes(file.type)){
        // error
        this.error = true;
      }

      const maxSizeBytes = this.maxSizeMB * 1024 * 1024;
      if(maxSizeBytes < file.size){
          //error 
          this.error = true;
      }

      if(!this.error) {
          this.file = file;
          this.generatePreview(file);
          this.onFileSelectionEmitter.emit(file);
      } else {
          this.file = null;
          this.previewUrl = null;
          this.control.setValue(null);
          this.onFileSelectionEmitter.emit(null);
      }
    
    }


    input.value = ''; 
  }

  generatePreview(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };

  }

  removeFile() {
    this.file = null;
    this.previewUrl = null;
    this.error = false;
    this.control.setValue(null);
    this.onFileSelectionEmitter.emit(null);
  }


}
