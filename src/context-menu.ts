import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ContextMenuComponent } from './context-menu.component';
import { ContextMenuDirective } from './context-menu.directive';
import { ContextSubMenuDirective } from './context-sub-menu.directive';
import { OverlayComponent } from './overlay.component';
import { ContextMenuHtmlDirective } from './context-menu-html.directive';
import { ContextMenuService } from './context-menu.service';

@NgModule({
  declarations: [
    ContextMenuDirective,
    ContextMenuComponent,
    ContextSubMenuDirective,
    OverlayComponent,
    ContextMenuHtmlDirective
  ],
  exports: [ContextMenuDirective],
  imports: [
    CommonModule
  ],
  entryComponents: [
    ContextMenuComponent,
    OverlayComponent
  ],
  providers: [ContextMenuService]
})

export class ContextMenuModule {
}