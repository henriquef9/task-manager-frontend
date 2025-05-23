import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-submit',
  imports: [],
  templateUrl: './button-submit.component.html',
  styleUrl: './button-submit.component.scss'
})
export class ButtonSubmitComponent {

  @Input({required: true}) label: string = '';

  

}
