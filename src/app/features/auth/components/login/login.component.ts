import { Component, inject, OnInit } from '@angular/core';
import { InputTextComponent } from '../../../../core/components/form/input-text/input-text.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonSubmitComponent } from '../../../../core/components/form/button-submit/button-submit.component';

@Component({
  selector: 'app-login',
  imports: [InputTextComponent, ReactiveFormsModule, ButtonSubmitComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  form_login!: FormGroup; 

  _fb: FormBuilder = inject(FormBuilder);

  ngOnInit(): void {
    
    this.form_login = this._fb.group({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    console.log(this.form_login)  

  }

  get name(): FormControl {
    return this.form_login.get('name') as FormControl;
  }

  get password(): FormControl {
    return this.form_login.get('password') as FormControl;
  }

  onSubmit() {

    if(this.form_login.valid){
      console.log(this.form_login.value, 'Válido');
    }else{
      this.form_login.markAllAsTouched();
      console.log(this.form_login.value, 'Inválido');
    }

  }

}
