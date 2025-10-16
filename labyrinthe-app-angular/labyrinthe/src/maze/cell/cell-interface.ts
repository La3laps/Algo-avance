import { Direction } from "../move-utils";

export interface Cell {
  posX: number;
  posY: number;
  walls: boolean[]; // [top, right, bottom, left]
  entrance?: boolean;
  exit?: boolean;
  visited?: boolean; // For algorithm use
  parent?: Cell;
  visitedForAlgo?: boolean;
  cameFromDir?: Direction;
}
