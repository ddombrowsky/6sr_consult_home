
import {
    Spindle,
    ConsoleTowerDisplay
       } from './hanoi';

let ht = 20;
let a = new Spindle(ht);
let b = new Spindle(ht);
let c = new Spindle(ht);
let cdisp = new ConsoleTowerDisplay(ht + 2);


for (let i = ht; i > 0; i--) {
    a.push(i);
}

function display(round: number) {
    a.render(cdisp);
    b.render(cdisp);
    c.render(cdisp);

    // clear screen
    process.stdout.write('\x1Bc');

    console.log('rounds: ' + round);

    // show towers
    cdisp.show();

    cdisp.resetDisplay();

    let i = 1000;
    while (i > 0) {
        process.stdout.write('.\x0d');
        i--;
    }
}

let move = 1;

// Use the iterative solution:
//   make legal move src -> store
//   make legal move src -> dst
//   make legal move store -> dst
//   repeat until done
function solve3towers(src: Spindle, dst: Spindle, store: Spindle) {
    if (store.peek() > src.peek()) {
        src.popTo(store);
        move++;
    } else if (store.length() > 0) {
        store.popTo(src);
        move++;
    }
    display(move);
    if (isSolved()) { return; }

    if (dst.peek() > src.peek()) {
        src.popTo(dst);
        move++;
    } else if (dst.length() > 0) {
        dst.popTo(src);
        move++;
    }
    display(move);
    if (isSolved()) { return; }

    if (dst.peek() > store.peek()) {
        store.popTo(dst);
        move++;
    } else if(dst.length() > 0) {
        dst.popTo(store);
        move++;
    }
    display(move);
    if (isSolved()) { return; }
}

function isSolved(): boolean {
    return c.length() == ht;
}

function go() {
    if (!isSolved()) {
        if ((ht & 1) == 0) {
            // even
            solve3towers(a, c, b);
        } else {
            // odd
            solve3towers(a, b, c);
        }

        // Make sure the display is refreshed before calling 
        // the next iteration.
        process.stdout.write(move + '\n', go);
    }
}

display(move);
go();

