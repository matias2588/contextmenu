import { Directive, Output, ElementRef, EventEmitter, Input, HostListener, ViewContainerRef, ComponentFactoryResolver, ComponentRef, OnInit } from "@angular/core";

import { IContextMenuItem } from "./context-menu-item";
import { ContextMenuComponent, ContextMenuPosition } from "./context-menu.component";
import { ContextMenuService } from './context-menu.service';

@Directive({
  selector: '[context-sub-menu]'
})
export class ContextSubMenuDirective implements OnInit {
  @Input('context-sub-menu') menuItems: IContextMenuItem[];
  @Input('cm-data-context') dataContext: any;
  @Output() closeSubMenu = new EventEmitter();

  ctxComponent: ComponentRef<ContextMenuComponent>;

  constructor(
    private viewRef: ViewContainerRef,
    private elmRef: ElementRef,
    private resolver: ComponentFactoryResolver,
    private cmService: ContextMenuService
  ) { }

  ngOnInit(): void {
  }

  createComponent(event: MouseEvent){
    this.ctxComponent = this.createContextComponent();
    this.ctxComponent.instance.isSubMenu = true;

    this.registerBindings();
    this.registerEvents();
    this.setLocation(event);
  }

  @HostListener('mouseover', ['$event'])
  onMouseOver(event: MouseEvent) {
    this.createComponent(event);

    return false;
  }
/*
  @HostListener('click', ['$event'])
  onMouseClick(event: MouseEvent) {
    if(this.showing) 
      this.closeCurrent();
    else
      this.createComponent(event);

    return false;
  }*/

  registerEvents() {
    this.ctxComponent.instance.onClose.subscribe(() => {
      this.closeSubMenu.emit();
    });
  }

  registerBindings() {
    this.ctxComponent.instance.items = this.menuItems;
    this.ctxComponent.instance.dataContext = this.dataContext;
  }

  createContextComponent(): ComponentRef<ContextMenuComponent> {
    let contextMenuFactory = this.resolver.resolveComponentFactory(ContextMenuComponent);
    let contextComponentRef = this.viewRef.createComponent(contextMenuFactory);
    this.cmService.setCurrentSubMenu(this);
    return contextComponentRef;
  }

  setLocation(event) {
    const { top, left, width } =
      this.viewRef.element.nativeElement.getClientRects()[0];

    let position: ContextMenuPosition = {
      top: top,
      left: left + width
    };

    this.ctxComponent.instance.position = position;
  }

  closeMenu() {
    this.closeSubMenu.emit();
  }

  closeCurrent() {
    this.viewRef.clear();
  }
}
