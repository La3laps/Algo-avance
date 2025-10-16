import { Component, OnInit, ViewChildren, QueryList, HostListener } from '@angular/core';
import { mazeData as _mazeData } from '../data/labyrinthes';
import { CommonModule } from '@angular/common';
import { Cell as CellComponent } from './cell/cell';
import { Cell } from './cell/cell-interface';
import { cellType } from './cell/cell-type-enum';
import { MazeCommunicationService } from '../components/dropdown-exercice/maze-communication-service';
import { Subscription } from 'rxjs';
import { TunicFox } from '../components/tunic-fox-image/tunic-fox/tunic-fox';
import { MoveUtils, Direction } from './move-utils';
import confetti from 'canvas-confetti';
import { algorithms } from './maze-algorithms/maze-algorithms';
import { calculatePath } from './maze-algorithms/maze-depth-first-search';

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
  currentAlgorithm: string = "";
  exerciseKeyForPrint!: string;

  foxFlipped: boolean = false;
  stopFox: boolean = false;


  ///////// Classes //////////

  private sub!: Subscription;
  private randomSub!: Subscription;
  private startSub!: Subscription;
  private resetSub!: Subscription;
  private changeAlgorithmSub!: Subscription;
  private moveUtils!: MoveUtils;

  constructor(private mazeCommService: MazeCommunicationService) {
    this.moveUtils = new MoveUtils(this.mazeGrid, this.currentPos);
  }


  /////////// Init ///////////

  async ngOnInit() {

    /////////// Obervables ///////////

    this.sub = this.mazeCommService.exerciceSelected$.subscribe(({ size, exercice }) => {
      if (size && exercice) {
        this.createMaze(size, exercice);
      }
    });

    this.randomSub = this.mazeCommService.randomSelected$.subscribe(() => {
      var randomValuesGen = this.randomizeForDefaultMaze();
      this.createMaze(randomValuesGen.size, randomValuesGen.exercise)
    });

    this.startSub = this.mazeCommService.startSelected$.subscribe(() => {
      var algorithm = algorithms[this.currentAlgorithm];
      this.moveFox(this.mazeGrid, algorithm);
    })

    this.resetSub = this.mazeCommService.resetSelected$.subscribe(() => {
      this.createMaze(this.sizeKey, this.exerciseKey);
      var returnToEntrance: boolean = true;
      this.stopsFox(returnToEntrance);
    })

    this.changeAlgorithmSub = this.mazeCommService.algorithmSelected$.subscribe((algorithmName) => {
      this.currentAlgorithm = algorithmName;
    })

    /////////// Default ///////////

    this.setMazeSizeAndExerciseKey(this.sizeKey, this.exerciseKey);
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
  }

  createMaze(size: string, exercise: string) {
    this.setMazeSizeAndExerciseKey(size, exercise);
    this.constructMaze();
    this.resetVisitedCells();
    this.getCurrentCellOnViewport();
  }

  ////////////////////////////
  ////////////////////////////
  ////// Movement Logic //////
  ////////////////////////////
  ////////////////////////////

  async moveFox(mazeGrid: Cell[][], algorithm: (mazeGrid: Cell[][], currPos: Cell) => Direction) {

    await this.delay(300);

    if (this.currentAlgorithm === "") {
      window.alert('Veuillez choisir un algorithme!')
      return
    };
    if (this.stopFox) return;

    var direction: Direction = algorithm(mazeGrid, this.currentPos);

    // Move the coordinates for fox
    const newPos: Cell = this.moveUtils.moveToNextCell(this.mazeGrid, this.currentPos, direction);
    this.currentPos = newPos;

    // Change fox image and flip if needed
    this.foxImg = 'tunic_fox_stand.gif';
    if (direction === Direction.LEFT) this.foxFlipped = true;
    if (direction === Direction.RIGHT) this.foxFlipped = false;

    this.getCurrentCellOnViewport();
    await this.delay(300);

    if (this.stopFox) return;
    if (this.checkCellType(this.currentPos) === cellType.finish) return this.celebrate();

    this.moveFox(mazeGrid, algorithm);
  }

  async stopsFox(returnToEntrance: boolean = false) {
    this.stopFox = true;

    await this.delay(1000);
    this.foxImg = 'tunic_fox_sleep.gif'
    this.stopFox = false;

    if (returnToEntrance) this.setCurrentPos(-1, -1);
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
    this.exerciseKeyForPrint = exercise.replace('ex-', '');
  }



  loadMaze() {
    const mazeCells = this.mazeData[this.sizeKey][this.exerciseKey];
    this.mazeGrid = Array.from({ length: this.mazeSize }, () => Array(this.mazeSize).fill(null));
    mazeCells.forEach((cell: any) => {
      this.mazeGrid[cell.posX][cell.posY] = cell;
    });
    this.setCurrentPos();
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
  getPrintedNameFromString(algo: string): string {
    switch (algo) {
      case 'random':
        return "Aléatoire";
      case 'dfs':
        return "Depth First Search (DFS)";
      case 'bfs':
        return "Breadth First Search (BFS)"
    }
    return '';
  }
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Confetti GG u know why
  celebrate() {
    confetti({
      particleCount: 60,
      spread: 10000,
      origin: { y: 0 },
      colors: ['#ffffff'],
    });
  }
}
