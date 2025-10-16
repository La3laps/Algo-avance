import { Component, OnInit, ViewChildren, QueryList, HostListener } from '@angular/core';
import { mazeData as _mazeData } from '../data/labyrinthes';
import { CommonModule } from '@angular/common';
import { Cell as CellComponent } from './cell/cell';
import { Cell } from './cell/cell-interface';
import { cellType } from './cell/cell-type-enum';
import { MazeCommunicationService } from '../components/dropdown-exercice/maze-communication-service';
import { Subscription } from 'rxjs';
import { TunicFox } from '../components/tunic-fox-image/tunic-fox/tunic-fox';
import { MoveUtils, Direction } from './maze-algorithms/move-utils';
import confetti from 'canvas-confetti';


@Component({
  standalone: true,
  selector: 'app-maze',
  imports: [CommonModule, CellComponent, TunicFox,],
  templateUrl: './maze.html',
  styleUrl: './maze.css',
})
export class Maze implements OnInit {

  /////// Data values ////////

  cellType = cellType;
  mazeData = _mazeData;
  mazeSize!: number; // Default size
  mazeGrid: Cell[][] = [];
  currentPos!: Cell;
  sizeKey: string = '3';
  exerciseKey: string = 'ex-0';
  @ViewChildren('cellElement') cellElements!: QueryList<CellComponent>;


  /////// Style values ///////

  maxWidth = 600;
  posForFox: { posX: number; posY: number } = { posX: 0, posY: 0 };
  foxImg: string = 'tunic_fox_sleep.gif';
  foxFlipped: boolean = false;


  ///////// Classes //////////

  private sub!: Subscription;
  private randomSub!: Subscription;
  private moveUtils!: MoveUtils;

  constructor(private mazeCommService: MazeCommunicationService) {
    this.moveUtils = new MoveUtils(this.mazeGrid, this.currentPos);
  }


  /////////// Init ///////////

  async ngOnInit() {

    this.sub = this.mazeCommService.exerciceSelected$.subscribe(({ size, exercice }) => {
      if (size && exercice) {
        this.setMazeSizeAndExerciseKey(size, exercice);
        this.constructMaze();
        this.resetVisitedCells();
        this.getCurrentCellOnViewport();
      }
    });

    this.randomSub = this.mazeCommService.randomSelected$.subscribe(() => {
      var randomValuesGen = this.randomizeForDefaultMaze();
      this.setMazeSizeAndExerciseKey(randomValuesGen.size, randomValuesGen.exercise);
      this.constructMaze();
      this.resetVisitedCells();
      this.getCurrentCellOnViewport();
    });

    //Default
    var randomValuesGen = this.randomizeForDefaultMaze();
    this.setMazeSizeAndExerciseKey(randomValuesGen.size, randomValuesGen.exercise);
    this.constructMaze();
  }

  ngAfterViewInit() {
    this.getCurrentCellOnViewport();
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
    this.randomSub.unsubscribe();
  }

  constructMaze() {
    this.loadMaze();
    this.createCells();
    this.moveFox(Direction.DOWN, this.randomDirectionGen);
  }



  ////////////////////////////
  ////////////////////////////
  ////// Movement Logic //////
  ////////////////////////////
  ////////////////////////////

  async moveFox(direction: Direction, algorithm: () => Direction) {

    await this.delay(300);

    // Move the coordinates for fox
    const newPos: Cell = this.moveUtils.moveToNextCell(this.mazeGrid, this.currentPos, direction);
    this.currentPos = newPos;

    // Change fox image and flip if needed
    this.foxImg = 'tunic_fox_stand.gif';
    if (direction === Direction.LEFT) this.foxFlipped = true;
    if (direction === Direction.RIGHT) this.foxFlipped = false;

    this.getCurrentCellOnViewport();
    await this.delay(300);

    if (this.checkCellType(this.currentPos) === cellType.finish) return this.celebrate();

    // Algorithms go here
    const nextDir: Direction = algorithm();
    this.moveFox(nextDir, algorithm);
  }

  //temp algorithm to move in mave
  randomDirectionGen(): Direction {
    return Math.floor(Math.random() * 4);
  }

  updateVisitedCell() {
    this.mazeGrid.forEach((row: Cell[]) => {
      row.forEach((col: Cell) => {
        if (this.currentPos == col) {
          col.visited = true;
        }
      })
    })
  }

  resetVisitedCells() {
    this.mazeGrid.forEach((row: Cell[]) => {
      row.forEach((col: Cell) => {
          col.visited = false;
      })
    })
  }


  ////////////////////////////
  ////////////////////////////
  /// Maze Creation Logic ////
  ////////////////////////////
  ////////////////////////////

  setMazeSizeAndExerciseKey(size: string, exercise: string) {
    this.mazeSize = Number(size);
    this.sizeKey = size;
    this.exerciseKey = exercise;
  }



  loadMaze() {
    const mazeCells = this.mazeData[this.sizeKey][this.exerciseKey];
    this.mazeGrid = Array.from({ length: this.mazeSize }, () => Array(this.mazeSize).fill(null));
    console.log(this.mazeGrid)
    mazeCells.forEach((cell: any) => {
      this.mazeGrid[cell.posX][cell.posY] = cell;
    });
    this.setCurrentPos();
    // console.log('Current Pos: ' + this.currentPos.posX + ' ' + this.currentPos.posY);
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


  ////////////////////////////
  ////////////////////////////
  //// Maze Update Logic /////
  ////////////////////////////
  ////////////////////////////

  setCurrentPos(posX: number = -1, posY: number = -1) {
    if (posX === -1 && posY === -1) {
      for (let i = 0; i < this.mazeSize; i++) {
        for (let j = 0; j < this.mazeSize; j++) {
          const cell = this.mazeGrid[i][j];
          if (cell && cell.entrance) {
            this.currentPos = cell;
            return;
          }
        }
      }
    } else {
      this.currentPos = this.mazeGrid[posX][posY];
    }
  }

  async getCurrentCellOnViewport() {
    await this.delay(100);
    this.cellElements.forEach((comp) => {
      if (comp.posX === this.currentPos.posX && comp.posY === this.currentPos.posY) {
        const rect = (comp as any).getBoundingClientRect?.();
        if (rect) {
          this.posForFox.posX = rect.top;
          this.posForFox.posY = rect.left;
        }
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.getCurrentCellOnViewport();
  }

  checkCellType(cell: Cell): cellType {
    if (cell?.entrance) return cellType.start;
    if (cell?.exit) return cellType.finish;
    if (cell?.visited) return cellType.visited;
    return cellType.empty;
  }

  setType(cell: Cell): cellType {
    return this.checkCellType(cell);
  }



  ///// Misc /////

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Confetti GG u know why
  celebrate() {
    console.log(this.mazeGrid)
    confetti({
      particleCount: 60,
      spread: 10000,
      origin: { y: 0 },
      colors: ['#ffffff'],
    });
  }
}
