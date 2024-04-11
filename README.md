# theLastAlgoCourse

This repository purpose is to keep track of some notes i took while watching and learning multiples algos and datastructurs from ThePrimeAgen course on frontendmasters.com : <https://frontendmasters.com/courses/algorithms/introduction/>
Every exemples code will be in typescript for comprehensive reasons

## Array

### Array Data Structures

An array in javascript is a _list_ not a Array, by definition an Array has limited defined space allocation in memory. To create a **real** array in Javascript would be created with the Array() constructor like so:

```typescript
let myNewArray = new Array(5)
```

This code would create a statically array with 5 empty slots, <00 00 00 00 00>, byteLength : 5

## Search

A **binary search** is a search that always have 2 possibility thus the name "_binary_", it's either in the part i'm looking for or not.
0 | 1.
In a real case it would be a ternary because you can be on the "it is what i'm looking for":

```typescript
function binarySearch_list(haystack: number[], needle: number): boolean {

    let low = 0;
    let high = haystack.length;

    do {
        const medium = Math.floor(low + (high - low) / 2);
        const value = haystack[medium];

        if(value === needle) {
            return true;
        } else if (value > needle) {
            high = medium;
        } else {
            low = medium + 1;
        }
    } while (low < high);

    return false;
};

const haystack = [9, 25, 44, 63, 91, 95, 116, 118, 172, 207, 226, 272, 287, 306, 309, 312, 365, 370, 384, 396, 401, 437, 479, 482, 500, 501, 535, 541, 580, 599, 607, 639, 647, 652, 674, 725, 744, 770, 779, 790, 805, 806, 828, 847, 876, 893, 933, 956, 960, 976];
```

Complendy of O(n).

### The two crystal ball problem

Given two crystal balls that will break if dropped from high enough distance, determine the exact spot in which it will break in the most optimized way.

Exemple: given

```typescript
const breaks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
```

```typescript
export function two_crystal_ball(breaks: boolean[]): number {
    const jmpAmount = Math.floor(Math.sqrt(breaks.length));

    let i = jmpAmount;
    for (; i < breaks.length; i += jmpAmount) {
        if (breaks[i]) {
            break;
        }
    }

    i -= jmpAmount;

    for (let j=0; j < jmpAmount && i < breaks.length; ++j, ++i) {
        if (breaks[i]) {
            return i;
        }
    }

    return -1;
}
```

Complexity of O($\sqrt{n}$)

## Sort

By definition a sorted array always have Xi <= Xi + 1

### Bubble Sort Algorithms

_Bubble Sort_ could be thaught this way :
Imagine you have to add every number from 1 to 100. You would do 1 .. 100 = 101 | 2 + 99 = 101 | 3 + 98 = 101 all the way to 50 + 51 = 101 .
The mathematical method would be 101 * 50 === (N+1) * N/2 === N(N+1)/2
You drop the constants "2", you are left with N² + N, you drop the insignificants values (the smallest one).
The final complendy of Bubble Sort = O(N²).

```typescript
export function bubble_sort(array: number[]): void {
        for (let i = 0; i < array.lenght; ++i) {
            for (let j = 0; j < array.lenght -1 -i ; ++j) {
                if (array[j] > array[j + 1]) {
                    const tmp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = tmp;
                }
            }
        }
}
```

### Link list Data Structure

Inserting in a link list is always O(1)

```typescript
interface linkedList<T> {
    get length(): number;
    insertAt(item : T, index: number): void;
    remove(item : T): T | undefined;
    removeAt(index : number): T | undefined;
    append(item : T): void;
    prepend(item : T): void;
    get(item: number): T | undefined;
}
```

### Queue Data Structure

The simple rule is _First in, first out_. A queue is a specific  implementation of a singly link list.

```typescript
export class Queue<T> {
    constructor() {
    this.head = this.tail = undefined;
    this.length = 0;
    }

    enqueue(item: T): void {
        const node = {value: item} as Node<T>;
        this.length++;
        if(!this.tail){
            this.tail = this.head = node;
            return;
        }

        this.tail.next = node;
        this.tail = node;
    }

    deque(): T | undefined {
        if (!this.head) {
            return undefined;
        }
        this.length--;

        const head = this.head;
        this.head = this.head.next;

        //free allocation
        head.next = undefined;

        if(this.tail === 0) {
            this.tail = undefined;
        }

        return head.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}
```

### Stack Data Structure

A stack a like a queue but in reverse. The rule is _Last in, First out_.
You can apply, push / pop / peek methods that are all of a constant running time O(1)

```typescript
type Node<T> = {
    value: T,
    prev?: Node<T>,
}

export class Stack<T> {
    public length: number;
    private head?: Node<T>;

    constructor() {
    this.head = undefined;
    this.length = 0;
    }

    push(item: T): void {
       const node = {value: item} as Node<T>;

       this.length++;
       if (!this.head) {
            this.head = node;
            return;
       }

       node.prev = this.head;
       this.head = node;
    }

    pop(): T | undefined {
        this.length = Math.max(0, this.length = -1);
        if (this.length === 0) {
            const head = this.head;
            this.head = undefined;
            return head.value;
        }

            const head = this.head as Node<T>;
            this.head = head.prev;

            return head?.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}
```

#### ArrayList

In javascript **array** are **ArrayList**, meaning they can grow in capacity, for exemple you could have : ArrayList[ 5 , _ , _ , _] it is a array of number that have 4 of capacity but a length of 1 since only 1 "slot" is being used. If you would fill the 3 last slot with [5, 8, 3, 9] and still want to push(6) the number 6 in this array it would automatically increase his capacity [5, 8, 3, 9, _, _, _,] for exemple then push the number 6 at the 4th index.
As a note to remember **Array** are memory defined and **List** can grow

## Recursion

The definition of recursion is a function that call itself until it met his "_base case_".
Here is simple exemple :
Sum the number between 0 to n.

```typescript
function sum(n: number): number {
    if (n === 1 ) {
        return 1;
    }

    return n + sum(n - 1);
}
```

One simple rule is **always** know your base case.
Here n = 1, meaning that we went to every number between n and 1.
There is always 3 steps in recursion (pre, recurse, post).
Recursion will create a **Stack** of functions call then reverse itself with the return value from the last invoked function.

### Maze Solver | Path Finding

Let's imagine that we are given a array of string:
[
    "#,#,#,#,#,#, E, #",
    "#, , , , , ,  , #",
    "#,S,#,#,#,#, #, #",
]
We want to go from the starting position S to the end E.
We cannot go throught wall. What are our base case ? :

1. we are off the map
2. it's a wall
3. it's the end
4. if we have seen the location

```typescript

type Point = { x: number; y: number };
type Direction = [number, number];
const dir: Direction[] = [[-1, 0], [1, 0], [0, -1], [0, 1]];

function walk(maze: string[], wall: string, current: Point, end: Point, seen: boolean[][], path: Point[]): boolean {
    //base case 1, off the map
    if (current.x < 0 || current.x >= maze[0].length ||
        current.y < 0 || current.y >= maze[0].length ||
        //base case 4, we are seen the location
        seen[current.y][current.x] ||
        //base case 2, on a wall
        maze[current.x][current.y] === wall;
        ) {
            return false;
        };

    //base case 3, it's the end
    if (current.x === end.x && current.y === end.y) {
        path.push(end)
        return true;
    };

    //3 recurses steps
    //pre
    seen[current.y][current.x] = true;
    path.push(current)
    //recurse
    for (const [dx, dy] of dir) {
        if (walk(maze, wall, { x: current.x + dx, y: current.y + dy}, end, seen, path)) {
            return true
        };
    };
    //post
    path.pop();
    return false;
};

export default function maze_solver(maze: string[], wall: string, start: Point, end: Point): Point[] {
    const seen: boolean[][];
    const path: Point[];

    for ( let i = 0; i < maze.length; ++i) {
        seen.push(new Array(maze[i].length).fill(false));
    };

    if (walk(maze, wall, start, end, seen, path)) {
        return path;
    };

};
```

### Quick Sort Algorithms

Quick sort is a sorting algorithms that use a pivot and recursion to sort an array of number.
Here is a implementation:

```typescript

const arr = [7, 5, 9, 11, 3, 6, 18, 4];

function qs(arr: number[], lo: number, hi: number): void {
    if (lo >= hi) {
        return
    }

    const pivotIdx = partition(arr, lo, hi);

    qs(arr, lo, pivotIdx - 1 );
    qs(arr, pivotIdx + 1, hi);
}

function partition(arr: number[], lo: number, hi: number): number {
    const pivot = arr[hi];

    let idx = -1;
        if (arr[i] <= pivot) {
        idx++;
        const tmp = arr[i];
        arr[i] = arr[idx];
        arr[idx] = tmp;
        }
    }

    idx++;
    arr[hi] = arr[idx];
    arr[idx] = pivot;

    return idx;
}

export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1);
}

```

## Doubly Linked List Data Structure

```typescript
type Node<T> = {
    value: T,
    prev?: Node<T>,
    next?: Node <T>,
}

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    prepend(item: T): void {
        const node = {value: item} as Node<T>;

        this.length++;
        if (!this.head) {
            this.head = this.tail = node;
            return
        }

        node.next = this.head;
        this.head.prev = node;
        this.head = node
    }

    insertAt(item: T, idx: number): void {

        if (idx > this.length) {
            throw new Error("oh no")
        } else if (idx = this.length) {
            this.append(item);
            return;
        } else if (idx = 0) {
            this.prepend(item);
            return;
        }

        this.length++;

        let curr = this.head;
        const curr = this.getAt(idx) as Node<T>;

        const node = {value: item} as Node<T>;

        node.next = curr;
        node.prev = curr.prev;
        curr.prev = node;

        if (node.prev) {
            node.prev.next = curr;
        }
    }
    append(item: T): void {
        this.length++;
        const node = {value: item} as Node<T>;
        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }

        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
    }

    remove(item: T): T | undefined {

        if (!curr) {
            return undefind;
        }

        this.length--;

        if (this.length === 0) {
            const out = this.head?.value;
            this.head = this.tail = undefined;
            return out;
        }

        if (curr.prev) {
            curr.prev = curr.next;
        }

        if (curr.next) {
            curr.next = curr.prev;
        }

        if (curr === this.head) {
            curr.head = curr.next;
        }

        if (curr === this.tail) {
            curr.tail = curr.prev;
        }

        curr.prev = curr.next = undefined;
        return current.value;
    }

    get(idx: number): T | undefined {
        return node = this.getAt()
    }

    removeAt(idx: number): T | undefined {
        const node = this.getAt(idx);

        if (!node) {
            return undefined;
        }

        return removeNode(node);
    }

    private removeNode(node: Node<T>): T | undefined{
        this.length--;

        if (this.length === 0) {
           const out = this.head?.value;
           this.head = this.tail = undefined;
           return out;
        }

        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }

        if (curr === this.head) {
            curr.head = curr.next;
        }

        if (curr === this.tail) {
            curr.tail = curr.prev;
        }

        curr.prev = curr.next = undefined;
        return current.value;
    }

    private getAt(idx: number): Node<T> | undefined {
        let curr = this.head;
        for (let i = 0; curr && i < idx ; ++i){
            curr = curr.next;
        }
        return curr;
    }

}
```

## Trees Data Structure

Some terminology :

- root : The most parent node. The first. Adam.
- height: The longest path from the root to the most child node.
- binary tree: a tree in which has at most 2 children. at least 0 children.
- general tree: a tree with 0 or more children.
- binary search tree: a tree in which has a specific ordering to the node and at most 2 children.
- leaves: a node whitout children.
- balanded: a tree is _perfectly_ balanced when any node's left and right children have the same height.
- branching factor: The amount of children a tree has.

### Tree Traversal

A traversal is when you attempt to visit every single node in you tree.

There are 3 type of traversal :

- **pre-order** : I first visit the node, then i recurse on the left child, when i hit the leaves, i take one step back and visit the right child etc until the whole tree is visited.The _root_ end up in the begining.

- **in order** : You first go to the _leaves_ at the maximum _height_ then you start recursing and going right. The _root_ end up in the middle.

- **post order** : You first go to the _leaves_ at the maximum _height on the left, and take everything at this "floor" then the same on the other side of the tree and you recurse etc. All _leaves_ at Bottom level then the bottom -1 level etc. The _root_ end up at the end.

Those operation are in **linear**, O(n). The time double if the lenght double.

### Pre order search on binary tree

```typescript
function walk(curr: BinaryNode<number> | undefined, path: number[]): number[] {
    if (!curr) {
    return path;
    }

    //recurse
    //pre
    path.push(curr.value);

    //recurse
    walk(curr.left, path);
    walk(curr.right, path);

    //post
    return path;
}
export default function pre_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
};


```

### In order search on binary tree

```typescript
function walk(curr: BinaryNode<number> | undefined, path: number[]): number[] {
    if (!curr) {
    return path;
    }

    //recurse

    //recurse
    walk(curr.left, path);

    //pre
    path.push(curr.value);

    walk(curr.right, path);

    //post
    return path;
}

export default function in_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
};


```

### Post order search on binary tree

```typescript
function walk(curr: BinaryNode<number> | undefined, path: number[]): number[] {
    if (!curr) {
    return path;
    }

    //recurse

    //recurse
    walk(curr.left, path);
    walk(curr.right, path);

    //post
    path.push(curr.value);
    return path;
}

export default function post_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
};

```

Those travels are named **Depth first search** because you "visit" the Bottom of the tree, on the _leaves_ node then you go up. **DFS** is like a **Stack**. You visit, can't go to the next anymore you pop() and push() the level + 1
