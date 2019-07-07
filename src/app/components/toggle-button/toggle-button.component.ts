import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent implements OnInit {

  @Input() text: string;
  @Output() togglePassword: EventEmitter<boolean> = new EventEmitter();
  dynaButtonState = false; // false means input is hidden,
  // true means otherwise

  constructor() { }

  ngOnInit() {
  }

  setDynamicButtonState(value: boolean) {
    this.dynaButtonState = value;
    return this.dynaButtonState;
  }

  onTogglePassword() {
    this.setDynamicButtonState(!this.dynaButtonState);
    this.togglePassword.emit(this.dynaButtonState);
  }
}
