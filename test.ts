type Point = { x: number; y: number; };
type Direction = [number, number];
const dir: Direction[] = [[-1, 0], [1, 0], [0, -1], [0, 1]];

function walk(maze: string[], wall: string, current: Point, end: Point, seen: boolean[][], path: Point[]): boolean {
    if (current.x < 0 || current.x >= maze[0].length ||
        current.y < 0 || current.y >= maze.length ||
        seen[current.y][current.x] ||
        maze[current.y][current.x] === wall) {
        return false;
    }

    if (current.x === end.x && current.y === end.y) {
        path.push(end);
        return true;
    }

    seen[current.y][current.x] = true;
    path.push({ ...current });

    for (const [dx, dy] of dir) {
        if (walk(maze, wall, { x: current.x + dx, y: current.y + dy }, end, seen, path)) {
            return true;
        }
    }

    path.pop();
    return false;
}

function maze_solver(maze: string[], wall: string, start: Point, end: Point): Point[] {
    let seen: boolean[][] = maze.map(row => new Array(row.length).fill(false));
    let path: Point[] = [];

    if (walk(maze, wall, start, end, seen, path)) {
        return path;
    } else {
        return [];
    }
}

// Example usage (after fixing the maze representation as needed)
const result = maze_solver([
    "######E#",
    "#     ##",
    "#S#### #",
], "#", { x: 1, y: 2 }, { x: 6, y: 0 });

console.log(result);
