import { Direction } from "../move-utils";
import { randomDirectionAlgo } from "./maze-random";
import { depthFirstSearch } from "./maze-depth-first-search";
import { Cell } from "../cell/cell-interface";

export const algorithms: Record<string, (mazeGrid : Cell[][], currPos: Cell) => Direction> = {
    random: randomDirectionAlgo,
    dfs: depthFirstSearch,
};

// To use :

// const dir = algorithms["random"]()