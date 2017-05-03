import { ContextMenuService } from './context-menu.service';
import { Component, Input, Output, EventEmitter, ViewEncapsulation, OnInit, ElementRef, AfterViewInit, ViewChild, AfterContentInit } from "@angular/core";

import { IContextMenuItem } from "./context-menu-item";

export interface ContextMenuPosition {
  top: number;
  left: number;
}

@Component({
  selector: 'context-menu',
  template: `
    <div #childRef class="context--container"
      [style.left]="position.left + 'px'"
      [style.top]="position.top + 'px'">
      <ul>
          <li *ngFor="let item of items"
            [ngClass]="{'menu-item': !item.divider, 'context-divider': item.divider, 'menu-disabled': isItemDisabled(item), 'menu-hidden': !isItemVisible(item)}"
            (click)="onClick(item)">
              <div *ngIf="!item.divider && !item.subMenu" [context-menu-html]="item.label" (mouseover)="closeSubMenus()">
              </div>
              <div *ngIf="item.subMenu"
                [context-sub-menu]="item.subMenuItems"
                [cm-data-context]="dataContext"
                (closeSubMenu)="close()"
                [context-menu-html]="item.label">
               <div class="right-arrow"></div>
              </div>
          </li>
      </ul>
    </div>
`,
  styles: [`
  .context--container{
    font-family: sans-serif;
    position: fixed;
    background: #ececec;
    min-width: 150px;
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 3px;
    box-shadow: 0 0 10px 2px rgba(0,0,0,0.1);
    z-index: 100;
    color: black;
  }

  .context--container ul{
    list-style: none;
    padding: 5px 0;
    margin: 0;
  }

  .context--container ul li{
      padding: 5px 10px 5px 15px;
      transition: all 0.15s;
  }

  .context--container ul li.context-divider{
      height: 1px;
      margin: 1px 1px 8px 1px;
      overflow: hidden;
      background-color: #ececec;
      border-bottom: 1px solid #d0d0d0;
      line-height: 10px;
    }

  .context--container ul li.menu-item:hover{
      cursor: pointer;
      background: #4b8bec;
      color: white;
  }

  .context--container ul li.menu-disabled{
      color: #d0d0d0;
   }

   .context--container ul li.menu-item.menu-hidden{
      display: none;
   }

  .context--container ul li.menu-disabled:hover{
      cursor: not-allowed;
      color: #d0d0d0;
      background: #ececec;
  }

  .right-arrow{
    float: right;
    margin-left: 10px;
    margin-top: 3px;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 8px solid black;
  }

  .left-arrow{
    float: left;
    margin-right: 10px;
    margin-top: 3px;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-right: 8px solid black;
  }
`]
})
export class ContextMenuComponent implements OnInit, AfterContentInit {
  @Input() position: ContextMenuPosition;
  @Input() items: IContextMenuItem[];
  @Input() dataContext: any;
  @Output() onClose = new EventEmitter();

  @ViewChild('childRef') childRef: ElementRef;
  isSubMenu: boolean = false;

  constructor(private cmService: ContextMenuService
  ) { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
  }

  close() {
    this.onClose.emit();
  }

  onClick(item: IContextMenuItem) {
    if (this.isItemDisabled(item))
      return;

    if (item.onClick) {
      item.onClick({
        menuItem: item,
        dataContext: this.dataContext
      });
      this.close()
    }
  }

  closeSubMenus(){
    if(!this.isSubMenu)
    this.cmService.setCurrentSubMenu(null);
  }

  isItemDisabled(item: IContextMenuItem) {
    if (!item.disabled)
      return false;

    return item.disabled(this.dataContext);
  }

  isItemVisible(item: IContextMenuItem) {
    if (!item.visible)
      return true;

    return item.visible(this.dataContext);
  }

}
