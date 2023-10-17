# theLastAlgoCourse

This repository purpose is to keep track of some notes i took while watching and learning multiples algos and datastructurs from ThePrimeAgen course on frontendmasters.com : <https://frontendmasters.com/courses/algorithms/introduction/>
Every exemples code will be in typescript for comprehensive reasons

## Array

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
