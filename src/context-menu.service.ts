import { Injectable, ComponentRef } from '@angular/core';
import { ContextMenuComponent } from './context-menu.component';
import { ContextSubMenuDirective } from './context-sub-menu.directive';
@Injectable()
export class ContextMenuService 
{
    private currentSubMenuRef: ContextSubMenuDirective;
    setCurrentSubMenu(subMenuRef:ContextSubMenuDirective)
    {
        if(this.currentSubMenuRef && this.currentSubMenuRef != subMenuRef)
            this.currentSubMenuRef.closeCurrent();
        this.currentSubMenuRef = subMenuRef;
    }
}