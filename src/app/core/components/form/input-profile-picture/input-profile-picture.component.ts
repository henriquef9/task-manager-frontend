import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator } from '@angular/forms';


@Component({
  selector: 'app-input-profile-picture',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './input-profile-picture.component.html',
  styleUrl: './input-profile-picture.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputProfilePictureComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputProfilePictureComponent),
      multi: true,
    }
  ]
})
export class InputProfilePictureComponent implements ControlValueAccessor, Validator {

  @Input() acceptedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  @Input() maxSizeMB = 2;

  protected file: File | null = null;
  previewUrl: string | null = null;

  onChange = (file: File | null) => {};
  onTouched = () => {}; 

  // Métodos do ControlValueAccessor
  writeValue(file: File | null): void {
    this.file = file;
    if (file) this.generatePreview(file);
    else this.previewUrl = null;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onChange = fn
  }

  setDisabledState?(isDisabled: boolean): void {}
 
  // Validação
  validate(control: AbstractControl): ValidationErrors | null {
    const errors: any = {};

    if(!this.file){
      null;
    } else {
      if(!this.acceptedTypes.includes(this.file.type)){
        errors.invalidType = true;
      }

      const maxSizeBytes = this.maxSizeMB * 1024 * 1024;

      if(this.file.size > maxSizeBytes){
        errors.maxSize = {
          maxSizeMB: this.maxSizeMB,
          actualSizeMB: (this.file.size / (1024 * 1024)).toFixed(2),
        };
      }
    }

    return Object.keys(errors).length ? errors : null;

  }


  onFileSelected(event: Event) {
   const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      this.file = file;
      this.onChange(file);
      this.onTouched();
      this.generatePreview(file);
    }
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
    this.onChange(null);
    this.onTouched();
  }


}
