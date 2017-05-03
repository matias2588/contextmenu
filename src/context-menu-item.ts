export interface IContextMenuItem {
  label?: string;
  divider?: boolean;
  onClick?($event: any): void;
  visible?(context: any): boolean;
  disabled?(context: any): boolean;
  subMenuItems?: IContextMenuItem[];
}
