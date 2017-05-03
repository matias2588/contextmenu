import { ElementRef } from '@angular/core';
import { AfterContentInit } from '@angular/core';
import { Input } from '@angular/core';
import { Directive } from '@angular/core';

@Directive({
  selector: '[context-menu-html]'
})
export class ContextMenuHtmlDirective implements AfterContentInit {
  @Input('context-menu-html') 
  content: String;

  constructor(private elmRef: ElementRef){}

  ngAfterContentInit(): void {
    this.elmRef.nativeElement.insertAdjacentHTML('afterbegin', this.content);
  }

}
