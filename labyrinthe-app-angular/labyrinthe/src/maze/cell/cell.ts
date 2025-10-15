import { Component, Input } from '@angular/core';

export enum squareType {
  empty,
  start,
  finish,
  path,
}

@Component({
  selector: 'app-cell',
  imports: [],
  templateUrl: './cell.html',
  styleUrl: './cell.css',
})
export class Cell {
  @Input() walls: boolean[] = [false, false, false, false];
  @Input() posX!: number;
  @Input() posY!: number;
  @Input() mazeSize!: number;
  private _squareType: squareType = squareType.empty;
  public _squareCssClass: string = '';

  @Input()
  set squareCssClass(value: string) {
    this._squareCssClass = value;
  }
  ngOnInit() {
    this.setType(this._squareCssClass);
    console.log(this.walls);
  }

  /////////////////////////////////////
  //////// LOGIC FOR BG COLOR /////////
  /////////////////////////////////////

  setType(classCss: string) {
    switch (classCss) {
      case 'empty':
        this._squareType = squareType.empty;
        break;
      case 'start':
        this._squareType = squareType.start;
        break;
      case 'finish':
        this._squareType = squareType.finish;
        break;
      case 'path':
        this._squareType = squareType.path;
        break;
      default:
        break;
    }
  }
  /////////////////////////////////////
  ////////// LOGIC FOR WALLS //////////
  /////////////////////////////////////

  get wallClasses(): string {
    return [
      this.walls[0] ? 'wall-top' : '',
      this.walls[1] ? 'wall-right' : '',
      this.walls[2] ? 'wall-bottom' : '',
      this.walls[3] ? 'wall-left' : '',
    ]
      .filter((c) => c)
      .join(' ');
  }

  //Corner logic
  showTopLeftCorner(): boolean {
    return this.posX > 0 && this.posY > 0;
  }

  showTopRightCorner(): boolean {
    return this.posX > 0 && this.posY < this.mazeSize - 1;
  }

  showBottomLeftCorner(): boolean {
    return this.posX < this.mazeSize - 1 && this.posY > 0;
  }

  showBottomRightCorner(): boolean {
    return this.posX < this.mazeSize - 1 && this.posY < this.mazeSize - 1;
  }
}
