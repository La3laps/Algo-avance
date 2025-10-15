import { Component, OnInit } from '@angular/core';
import { mazeData as _mazeData } from '../data/labyrinthes';
import { CommonModule } from '@angular/common';
import { Cell as CellComponent } from './cell/cell';
import { squareType } from './cell/cell';
import { MazeCommunicationService } from '../components/dropdown-exercice/maze-communication-service';
import { Subscription } from 'rxjs';

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
  styleUrl: './maze.css',
})
export class Maze implements OnInit {
  squareType = squareType;
  mazeData = _mazeData;
  mazeGrid: Cell[][] = [];
  mazeSize!: number; // Default size
  path: Cell[] = [];

  // Style values
  maxWidth = 700;
  cellPixelSize = this.maxWidth / this.mazeSize;

  private sub!: Subscription;
  private randomSub!: Subscription;

  constructor(private mazeCommService: MazeCommunicationService) {}

  ngOnInit() {
    this.sub = this.mazeCommService.exerciceSelected$.subscribe(({ size, exercice }) => {
      if (size && exercice) {
        this.constructMaze(size, exercice);
      }
    });

    this.randomSub = this.mazeCommService.randomSelected$.subscribe(() => {
      var randomValuesGen = this.randomizeForDefaultMaze();
      this.constructMaze(randomValuesGen.size, randomValuesGen.exercise);
    });

    //Default
    var randomValuesGen = this.randomizeForDefaultMaze();
    this.constructMaze(randomValuesGen.size, randomValuesGen.exercise);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.randomSub.unsubscribe();
  }

  constructMaze(sizeKey: string, exerciseKey: string) {
    this.mazeSize = Number(sizeKey);
    this.loadMaze(sizeKey, exerciseKey);
    this.createCells();
  }

  loadMaze(sizeKey: string, exerciseKey: string) {
    const mazeCells = this.mazeData[sizeKey][exerciseKey];
    this.mazeGrid = Array.from({ length: this.mazeSize }, () => Array(this.mazeSize).fill(null));
    mazeCells.forEach((cell: any) => {
      this.mazeGrid[cell.posX][cell.posY] = cell;
    });
  }

  createCells() {
    const cells = [];
    for (let i = 0; i < this.mazeSize; i++) {
      for (let j = 0; j < this.mazeSize; j++) {
        cells.push(this.mazeGrid[i][j]);
      }
    }
  }

  randomizeForDefaultMaze() {
    var randomSizeNumber: number = Math.floor(Math.random() * (25 - 3 + 1)) + 3;
    var randomExerciseNumber = Math.floor(Math.random() * 3);
    const sizeString: string = randomSizeNumber.toString();
    const exerciseString: string = 'ex-' + randomExerciseNumber.toString();

    const toBeReturned: { size: string; exercise: string } = {
      size: sizeString,
      exercise: exerciseString,
    };
    return toBeReturned;
  }

  checkCellType(cell: Cell): squareType {
    if (cell?.entrance) return squareType.start;
    if (cell?.exit) return squareType.finish;
    if (this.path.includes(cell)) return squareType.path;
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
