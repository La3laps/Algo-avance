import { Direction, vecDir } from "../move-utils";
import { Cell } from "../cell/cell-interface";


export var dfsDirection: Direction[] = [];
let stack: Cell[] = [];
let path: Cell[] = [];
var exitCell!: Cell;

export function depthFirstSearch(mazeGrid: Cell[][], currPos: Cell): Direction {
    var dir: Direction = dfsDirection[0];
    path.shift();
    return dir
}

export async function calculatePath(mazeGrid: Cell[][], startCell: Cell) {
    let stack: Cell[] = [];
    let path: Cell[] = [];

    stack.push(startCell);
    startCell.visitedForAlgo = true;

    while (stack.length > 0) {
        const current = stack.pop()!;
        path.push(current);

        if (current.exit) {
            break;
        }

        let moved = false;

        for (let i = 0; i < vecDir.length; i++) {
            if (current.walls[i]) continue;

            const newX = current.posX + vecDir[i].dirX;
            const newY = current.posY + vecDir[i].dirY;

            const neighbor = mazeGrid[newX]?.[newY];
            if (!neighbor || neighbor.visitedForAlgo) continue;

            neighbor.visitedForAlgo = true;
            neighbor.cameFromDir = vecDir[i].dir;
            neighbor.parent = current;

            stack.push(current);
            stack.push(neighbor);

            moved = true;
            break;
        }


    }
    exitCell = path[path.length - 1];
    if (exitCell) {
        dfsDirection = reconstructPathFromExit(exitCell);
    }

}

function reconstructPathFromExit(exitCell: Cell): Direction[] {
    const directions: Direction[] = [];
    let current: Cell | undefined = exitCell;

    while (current?.parent) {
        directions.unshift(current.cameFromDir!);
        current = current.parent;
    }

    return directions;
}

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
