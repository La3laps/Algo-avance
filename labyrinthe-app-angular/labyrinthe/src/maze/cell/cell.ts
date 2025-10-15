import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cellType } from './cell-type-enum';

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
  @Input() type!: cellType;
  @ViewChild('cellDiv', { static: true }) cellDiv!: ElementRef;

  @Input() currentCellType: cellType = cellType.empty;
  public nbrOfPathsLeft!: number;

  get wallThickness(): string {
    const cellSize = Math.floor(600 / this.mazeSize);
    const wall = Math.max(1, Math.floor(cellSize * 0.1));
    return `${wall}px`;
  }

  ngOnInit() {

  }
  /////////////////////////////////////
  //////// LOGIC FOR BG COLOR /////////
  /////////////////////////////////////


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

  /////////////////////////////////////
  //////// LOGIC FOR CELL_POS /////////
  /////////////////////////////////////
  getBoundingClientRect() {
    return this.cellDiv.nativeElement.getBoundingClientRect();
  }
}
