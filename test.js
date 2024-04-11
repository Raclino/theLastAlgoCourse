"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dir = [[-1, 0], [1, 0], [0, -1], [0, 1]];
function walk(maze, wall, current, end, seen, path) {
    //base case 1, off the map
    if (current.x < 0 || current.x >= maze[0].length ||
        current.y < 0 || current.y >= maze[0].length ||
        //base case 4, we are seen the location
        seen[current.y][current.x] ||
        //base case 2, on a wall
        maze[current.x][current.y] === wall) {
        return false;
    }
    ;
    //base case 3, it's the end
    if (current.x === end.x && current.y === end.y) {
        path.push(end);
        return true;
    }
    ;
    //3 recurses steps
    //pre
    seen[current.y][current.x] = true;
    path.push(current);
    //recurse
    for (var _i = 0, dir_1 = dir; _i < dir_1.length; _i++) {
        var _a = dir_1[_i], dx = _a[0], dy = _a[1];
        if (walk(maze, wall, { x: current.x + dx, y: current.y + dy }, end, seen, path)) {
            return true;
        }
        ;
    }
    ;
    //post
    path.pop();
    return false;
}
;
function maze_solver(maze, wall, start, end) {
    var seen;
    var path;
    for (var _i = 0, maze_1 = maze; _i < maze_1.length; _i++) {
        var element = maze_1[_i];
        seen.push(new Array(element.length).fill(false));
    }
    ;
    if (walk(maze, wall, start, end, seen, path)) {
        return path;
    }
    ;
}
exports.default = maze_solver;
maze_solver([
    "#,#,#,#,#,#, E, #",
    "#, , , , , , , #",
    "#,S,#,#,#,#, #, #",
], "#", { x: 2, y: 1 }, { x: 0, y: 6 });
