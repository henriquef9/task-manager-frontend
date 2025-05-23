import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextComponent } from '../../../../core/components/form/input-text/input-text.component';
import { ButtonSubmitComponent } from '../../../../core/components/form/button-submit/button-submit.component';
import { InputProfilePictureComponent } from '../../../../core/components/form/input-profile-picture/input-profile-picture.component';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, InputTextComponent, ButtonSubmitComponent, InputProfilePictureComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  form_register!: FormGroup;

  _fb: FormBuilder = inject(FormBuilder);


  ngOnInit(): void {
    
    this.form_register = this._fb.group({
      img_profile: new FormControl(null),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirm_password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

  }

  get img_profile(): FormControl {
    return this.form_register.get('img_profile') as FormControl;
  }

  get name(): FormControl {
    return this.form_register.get('name') as FormControl;
  }

  get email(): FormControl {
    return this.form_register.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form_register.get('password') as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.form_register.get('confirm_password') as FormControl;
  }


  onSubmit() {

    if(this.form_register.valid){
      console.log(this.form_register, 'Válido');
    }else{

      this.form_register.markAllAsTouched();
      console.log(this.form_register, 'Inválido');
    }

  }



}
