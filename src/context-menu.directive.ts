import { Directive, Input, HostListener, ViewContainerRef, OnInit, ComponentFactoryResolver, ComponentRef, ElementRef } from "@angular/core";

import { OverlayComponent } from './overlay.component';
import { IContextMenuItem } from "./context-menu-item";
import { ContextMenuComponent, ContextMenuPosition } from "./context-menu.component";

@Directive({
  selector: '[context-menu]'
})
export class ContextMenuDirective {
  @Input('context-menu') menuItems: IContextMenuItem[];
  @Input('cm-data-context') dataContext: any;

  ctxComponent: ComponentRef<ContextMenuComponent>;
  overlayComponent: ComponentRef<OverlayComponent>;

  constructor(
    private viewRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
  ) { }

  @HostListener('contextmenu', ['$event'])
  onClick(event: MouseEvent) {
    this.closeMenu();
    this.ctxComponent = this.createContextComponent();
    this.overlayComponent = this.createOverlayComponent();

    this.registerBindings();
    this.registerEvents();
    this.setLocation(event);

    return false;
  }

  registerEvents() {
    this.ctxComponent.instance.onClose.subscribe(() => {
      this.closeMenu()
    });

    this.overlayComponent.instance.onClick.subscribe(() => { this.closeMenu() });
  }

  registerBindings() {
    this.ctxComponent.instance.items = this.menuItems;
    this.ctxComponent.instance.dataContext = this.dataContext;
  }

  createContextComponent(): ComponentRef<ContextMenuComponent> {
    let contextMenuFactory = this.resolver.resolveComponentFactory(ContextMenuComponent);
    let contextComponentRef = this.viewRef.createComponent(contextMenuFactory);

    return contextComponentRef;
  }

  createOverlayComponent(): ComponentRef<OverlayComponent> {
    let contextOverlayFactory = this.resolver.resolveComponentFactory(OverlayComponent);
    let contextOverlayRef = this.viewRef.createComponent(contextOverlayFactory);

    return contextOverlayRef;
  }

  setLocation(event: MouseEvent) {
    let { clientX, clientY } = event;

    let position: ContextMenuPosition = {
      top: clientY,
      left: clientX
    };

    this.ctxComponent.instance.position = position;
  }

  closeMenu() {
    this.viewRef.clear();
  }
}
