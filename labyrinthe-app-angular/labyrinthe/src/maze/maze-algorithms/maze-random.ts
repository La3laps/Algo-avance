import { Direction } from "../move-utils";
import { Cell } from "../cell/cell-interface";

export function randomDirectionAlgo(mazeGrid: Cell[][]): Direction {
    return Math.floor(Math.random() * 4);
}