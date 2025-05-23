import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LogoComponent } from '../../core/components/logo/logo.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet, LogoComponent, NgClass, RouterLink],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {

  _route = inject(Router)

  type_form: boolean = true;
  message: string = 'Que bom te ver de novo! Faça login para acessar sua conta. Se ainda não tem uma, cadastre-se.'; 
  text_btn: string = 'Criar Conta';

  ngOnInit(): void {
      
    if(this._route.url == '/auth/register'){
      this.message = 'Você já é cadastrado? Acesse sua conta.'; 
      this.text_btn = 'Login';    
      this.type_form = false; 
    }

  }

  formToggle() {

    if(this.type_form){
      this.message = 'Você já é cadastrado? Acesse sua conta.'; 
      this.text_btn = 'Login';    
    }
    else {
      this.message = 'Que bom te ver de novo! Faça login para acessar sua conta. Se ainda não tem uma, cadastre-se.'; 
      this.text_btn = 'Criar Conta';    
    }

    this.type_form = !this.type_form

  }

}
