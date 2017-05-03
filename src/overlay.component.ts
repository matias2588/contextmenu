import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'context-overlay',
  template: `<div class="context-overlay" (mousedown)="onClick.emit()"></div>`,
  styles: [`
    .context-overlay{
      position: fixed;
      top:0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 99;
      background-color: transparent;
   }
  `]
})
export class OverlayComponent{
  @Output() onClick = new EventEmitter()
}
