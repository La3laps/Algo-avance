import { Cell } from "./cell/cell-interface";

export enum Direction {
    UP,
    RIGHT,
    DOWN,
    LEFT,

}
export const vecDir: { dirX: number, dirY: number, dir: Direction }[] = [
    { dirX: -1, dirY: 0, dir: Direction.UP }, // UP
    { dirX: 0, dirY: 1, dir: Direction.RIGHT },   // RIGHT
    { dirX: 1, dirY: 0, dir: Direction.DOWN },  // DOWN
    { dirX: 0, dirY: -1, dir: Direction.LEFT }, // LEFT

];


export class MoveUtils {
    private grid: Cell[][];
    private currentPos: Cell;

    constructor(mazeGrid: Cell[][], currPos: Cell) {
        this.grid = mazeGrid;
        this.currentPos = currPos;
    }

    moveToNextCell(mazeGrid: Cell[][], currPos: Cell, direction: Direction): Cell {
        const move = vecDir[direction];
        if (!move) {
            console.error("Invalid direction:", direction);
            return currPos;
        }

        if (this.checkForWalls(currPos, direction)) {
            return currPos;
        }

        if (!this.isWithinBounds(mazeGrid, currPos, move)) {
            return currPos;
        }

        const newX = currPos.posX + move.dirX;
        const newY = currPos.posY + move.dirY;
        this.currentPos = mazeGrid[newX][newY];
        this.currentPos.visited = true;

        return this.currentPos;
    }

    checkForWalls(currPos: Cell, direction: Direction): boolean {
        switch (direction) {
            case Direction.UP: return currPos.walls[0];
            case Direction.RIGHT: return currPos.walls[1];
            case Direction.DOWN: return currPos.walls[2];
            case Direction.LEFT: return currPos.walls[3];
            default: return false;
        }
    }

    isWithinBounds(mazeGrid: Cell[][], currPos: Cell, move: { dirX: number; dirY: number }): boolean {
        const newX = currPos.posX + move.dirX;
        const newY = currPos.posY + move.dirY;
        return !(newX < 0 || newY < 0 || newX >= mazeGrid.length || newY >= mazeGrid[0].length);
    }
};
