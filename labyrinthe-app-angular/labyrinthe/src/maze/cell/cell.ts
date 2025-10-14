import { Component, Input } from '@angular/core';

export enum squareType { empty, start, finish, path };

@Component({
  selector: 'app-cell',
  imports: [],
  templateUrl: './cell.html',
  styleUrl: './cell.css'
})
export class Cell {
  private _squareType: squareType = squareType.empty;
  public _squareCssClass: string = '';

  wall_left: boolean = false;
  wall_top: boolean = false;
  wall_right: boolean = false
  wall_bottom: boolean = false;

  @Input()
  set squareCssClass(value: string) {
    this._squareCssClass = value;
  }
  ngOnInit() {
    this.setType(this._squareCssClass);
    console.log(this.squareCssClass);
  }

  setType(classCss: string) {
    switch (classCss) {
      case "empty":
        this._squareType = squareType.empty;
        break;
      case "start":
        this._squareType = squareType.start;
        break;
      case "finish":
        this._squareType = squareType.finish;
        break;
      case "path":
        this._squareType = squareType.path;
        break;
      default:
        break;
    }
  }
}
