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

A **binary search** is a search that always have 2 possibility "thus the name _binary_", it's either in the part i'm looking for or not.
0 | 1.
In a real case it would be a ternary because you can be on the "it is what i'm looking for":

```typescript
function bs_list(haystack: number[], needle: number): boolean {

    let low = 0;
    let high = haystack.length;

    do {
        const medimum = Math.floor(low + (high - low) / 2);
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
```
Complexity of O(n).

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

### Bubble Sort

_Bubble Sort_ could be thaught this way :
Imagine you have to add every number from 1 to 100. You would do 1 .. 100 = 101 | 2 .. 99 = 101 | 3.. 98 = 101 all the way to 50 .. 51 = 101 .
The mathematical method would be 101 * 50 === (N+1) * N/2 === N(N+1)/2
You drop the constants "2", you are left with N² + N, you drop the insignificants values (the smallest one).
The final complexity of Bubble Sort = O(N²).

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

       this.length--;
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
            this.head = head.perv;

            return head?.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}
```
