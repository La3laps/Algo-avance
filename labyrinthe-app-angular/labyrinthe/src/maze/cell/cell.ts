import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export enum squareType {
  empty,
  start,
  finish,
  path,
}

@Component({
  selector: 'app-cell',
  imports: [CommonModule],
  templateUrl: './cell.html',
  styleUrl: './cell.css',
})
export class Cell {
  @Input() walls: boolean[] = [false, false, false, false];
  @Input() posX!: number;
  @Input() posY!: number;
  @Input() mazeSize!: number;
  @Input() cellPixelSize!: number;
  @Input()
  set squareCssClass(value: string) {
    this._squareCssClass = value;
  }

  get wallThickness(): string {
    const cellSize = Math.floor(600 / this.mazeSize);
    const wall = Math.max(1, Math.floor(cellSize * 0.1));
    return `${wall}px`;
  }

  private _squareType: squareType = squareType.empty;
  public _squareCssClass: string = '';

  ngOnInit() {
    this.setType(this._squareCssClass);
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

  wallStyle(direction: 'top' | 'left' | 'right' | 'bottom'): object {
    const thickness = parseInt(this.wallThickness, 10);
    if (direction === 'top' || direction === 'bottom') {
      return { height: `${thickness}px` };
    } else {
      return { width: `${thickness}px` };
    }
  }

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
}
