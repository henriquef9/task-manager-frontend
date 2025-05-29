import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-input-text',
  imports: [NgIf, ReactiveFormsModule, NgxMaskDirective, NgClass],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss'
})
export class InputTextComponent {

  @Input({required: true}) type: 'text' | 'email' | 'password' | 'number' = 'text';
  @Input({required: true}) placeholder: string = '';
  @Input({required: false}) mask: string = '';

  @Input({required: true}) controlName!: string;
  @Input({required: true}) control!: FormControl;
  @Input({required: true}) form!: FormGroup;
  

  get isError(): boolean {
    return this.control.invalid && (this.control.touched || this.control.dirty);
  }

  errorMessage(): string {
    if (this.control.errors) {
      if (this.control.errors['required']) return 'Campo obrigatório';
      if (this.control.errors['email']) return 'Email inválido';
      if (this.control.errors['minlength'])
        return `Mínimo de ${this.control.errors['minlength'].requiredLength} caracteres`;
      if (this.control.errors['maxlength'])
        return `Máximo de ${this.control.errors['maxlength'].requiredLength} caracteres`;
      if(this.control.errors['invalidConfirmPassword'])
        return `As senhas não coincidem.`;
    }
    return 'Campo inválido';
  }


}
