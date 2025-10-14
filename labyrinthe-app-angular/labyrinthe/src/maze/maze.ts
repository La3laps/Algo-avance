import { Component, OnInit } from '@angular/core';
import { mazeData as _mazeData } from '../data/labyrinthes';
import { CommonModule } from '@angular/common';
import { Cell as CellComponent } from "./cell/cell";
import { squareType } from './cell/cell'; // Adjust the path

interface Cell {
  posX: number;
  posY: number;
  walls: boolean[]; // [top, right, bottom, left]
  entrance?: boolean;
  exit?: boolean;
  visited?: boolean; // For algorithm use
}

@Component({
  standalone: true,
  selector: 'app-maze',
  imports: [CommonModule, CellComponent],
  templateUrl: './maze.html',
  styleUrl: './maze.css'
})

export class Maze implements OnInit {
  squareType = squareType;
  mazeData = _mazeData;
  mazeGrid: Cell[][] = [];
  mazeSize = 3; // Default size
  path: Cell[] = [];

  ngOnInit() {
    this.loadMaze('3', 'ex-0');
    this.createCells();
  }

  loadMaze(sizeKey: string, exampleKey: string) {
    const mazeCells = this.mazeData[sizeKey][exampleKey];
    this.mazeGrid = Array.from({ length: this.mazeSize }, () => Array(this.mazeSize).fill(null));
    mazeCells.forEach((cell: any) => {
      this.mazeGrid[cell.posX][cell.posY] = cell;
    });
    console.log(this.mazeGrid);
  }

  createCells() {
    const cells = [];
    for (let i = 0; i < this.mazeSize; i++) {
      for (let j = 0; j < this.mazeSize; j++) {
        cells.push(this.mazeGrid[i][j]);
      }
    }
  }

  checkCellType(cell: Cell): squareType {
    if (cell.entrance) return squareType.start;
    if (cell.exit) return squareType.finish;
    // if (this.path.includes(cell)) return squareType.path;
    return squareType.empty;
  }

  getCellCssClass(cell: Cell): string {
    const type = this.checkCellType(cell);
    switch (type) {
      case squareType.start:
        return 'start';
      case squareType.finish:
        return 'finish';
      case squareType.path:
        return 'path';
      default:
        return 'empty';
    }
  }
}
