import { Cell } from "../cell/cell-interface";

export const vecDir: { dirX: number, dirY: number }[] = [
    { dirX: -1, dirY: 0 }, // UP
    { dirX: 1, dirY: 0 },  // DOWN
    { dirX: 0, dirY: -1 }, // LEFT
    { dirX: 0, dirY: 1 }   // RIGHT
];
export enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT
}

export class MoveUtils {
    private grid: Cell[][];
    private currentPos: Cell;

    constructor(mazeGrid: Cell[][], currPos: Cell) {
        this.grid = mazeGrid;
        this.currentPos = currPos;
    }

    moveToNextCell(mazeGrid: Cell[][], currPos: Cell, direction: Direction): Cell {
        const possibleMoves = vecDir;

        if (this.checkForWalls(mazeGrid, currPos, possibleMoves[direction])) {
            return currPos;
        }

        if (this.checkOutOfBounds(mazeGrid, currPos, possibleMoves[direction])) {
            const newX = currPos.posX + possibleMoves[direction].dirX;
            const newY = currPos.posY + possibleMoves[direction].dirY;
            this.currentPos = mazeGrid[newX][newY];
            currPos = this.currentPos;
        }
        return currPos;
    }

    checkForWalls(mazeGrid: Cell[][], currPos: Cell, move: { dirX: number, dirY: number }): boolean {
        const possibleMoves = vecDir;

        switch (move) {
            case possibleMoves[Direction.UP]:
                return currPos.walls[0];

            case possibleMoves[Direction.RIGHT]:
                return currPos.walls[1];

            case possibleMoves[Direction.DOWN]:
                return currPos.walls[2];

            case possibleMoves[Direction.LEFT]:
                return currPos.walls[3];

            default:
                return false;
        }
    }

    checkOutOfBounds(mazeGrid: Cell[][], currPos: Cell, move: { dirX: number, dirY: number }): boolean {
        const newX = currPos.posX + move.dirX;
        const newY = currPos.posY + move.dirY;
        if (newX < 0 || newY < 0 || newX >= mazeGrid.length || newY >= mazeGrid[0].length) {
            return false; // Out of bounds
        }
        return true; // Within bounds
    }
};
